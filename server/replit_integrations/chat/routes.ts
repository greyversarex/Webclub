import type { Express, Request, Response } from "express";
import OpenAI from "openai";

function getAIClient(): { client: OpenAI; model: string } {
  if (process.env.OPENROUTER_API_KEY) {
    return {
      client: new OpenAI({
        apiKey: process.env.OPENROUTER_API_KEY,
        baseURL: "https://openrouter.ai/api/v1",
        defaultHeaders: {
          "HTTP-Referer": "https://webcorex.net",
          "X-Title": "WebCorex Chat",
        },
      }),
      model: "qwen/qwen3-8b:free",
    };
  }
  if (process.env.GROQ_API_KEY) {
    return {
      client: new OpenAI({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1",
      }),
      model: "llama-3.3-70b-versatile",
    };
  }
  return {
    client: new OpenAI({
      apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
      baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL || undefined,
    }),
    model: "gpt-5.1",
  };
}

const SYSTEM_PROMPT = `Ты — умный ИТ-консультант компании WebClub. Помогаешь клиентам разобраться в IT-решениях, отвечаешь на вопросы об услугах компании и даёшь профессиональные советы.

О компании WebClub:
- Разрабатываем IT-решения для бизнеса: интернет-магазины, корпоративные сайты, мобильные приложения (Android/iOS), банковские и государственные IT-системы, CRM-системы, автоматизация бизнеса
- Более 100 успешных проектов, 8+ лет опыта, поддержка 24/7
- Работаем со стеком: React, Node.js, PostgreSQL, React Native, TypeScript, Vue.js, Python, Docker, Angular и другими технологиями

Ты можешь:
- Консультировать по выбору типа решения для бизнеса клиента
- Объяснять технические вопросы простым языком
- Рассказывать об услугах компании
- Давать общие рекомендации по IT-стратегии
- Отвечать на любые вопросы, связанные с IT и бизнесом

Будь дружелюбным, профессиональным и конкретным. Отвечай на языке, на котором написан вопрос (русский, английский и т.д.).`;

export function registerChatRoutes(app: Express): void {
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { messages } = req.body as {
        messages: Array<{ role: "user" | "assistant"; content: string }>;
      };

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "messages array is required" });
      }

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const { client: openai, model } = getAIClient();
      const stream = await openai.chat.completions.create({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
        max_tokens: 1024,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (error) {
      console.error("Chat error:", error);
      if (res.headersSent) {
        res.write(`data: ${JSON.stringify({ error: "Ошибка соединения с AI" })}\n\n`);
        res.end();
      } else {
        res.status(500).json({ error: "Не удалось получить ответ" });
      }
    }
  });
}
