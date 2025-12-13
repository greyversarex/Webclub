import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactRequestSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactRequestSchema.parse(req.body);
      const contactRequest = await storage.createContactRequest(validatedData);
      res.status(201).json({ 
        success: true, 
        message: "Заявка успешно отправлена",
        id: contactRequest.id 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      } else {
        console.error("Error creating contact request:", error);
        res.status(500).json({ 
          success: false, 
          message: "Внутренняя ошибка сервера" 
        });
      }
    }
  });

  app.get("/api/contact", async (_req, res) => {
    try {
      const requests = await storage.getContactRequests();
      res.json(requests);
    } catch (error) {
      console.error("Error fetching contact requests:", error);
      res.status(500).json({ 
        success: false, 
        message: "Внутренняя ошибка сервера" 
      });
    }
  });

  return httpServer;
}
