import { useState } from "react";
import { Phone, Globe, Send, Loader2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { SiTelegram, SiWhatsapp, SiViber } from "react-icons/si";
import { apiRequest } from "@/lib/queryClient";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните имя и телефон",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/contact", formData);
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-violet-500/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            Контакты
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-violet-500 bg-clip-text text-transparent">
              Свяжитесь с нами
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Готовы обсудить ваш проект? Оставьте заявку или свяжитесь с нами
            любым удобным способом
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          <Card className="p-6 md:p-8 bg-background/50 backdrop-blur-sm border-violet-500/20 hover:border-violet-500/40 transition-colors shadow-lg shadow-violet-500/5">
            <h3 className="font-display font-semibold text-xl text-foreground mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Оставить заявку
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Имя *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-background/50 border-violet-500/20 focus:border-violet-500/50 focus:ring-violet-500/20"
                  data-testid="input-name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-background/50 border-violet-500/20 focus:border-violet-500/50 focus:ring-violet-500/20"
                  data-testid="input-email"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Телефон *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+992 (__) ___-__-__"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-background/50 border-violet-500/20 focus:border-violet-500/50 focus:ring-violet-500/20"
                  data-testid="input-phone"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Сообщение
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Опишите ваш проект или задайте вопрос..."
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="resize-none bg-background/50 border-violet-500/20 focus:border-violet-500/50 focus:ring-violet-500/20"
                  data-testid="input-message"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
                data-testid="button-submit-contact"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Отправить заявку
                  </>
                )}
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 md:p-8 bg-background/50 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-500/40 transition-colors shadow-lg shadow-cyan-500/5">
              <h3 className="font-display font-semibold text-xl text-foreground mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                Контактная информация
              </h3>

              <div className="space-y-5">
                <a
                  href="tel:+992876220100"
                  className="flex items-center gap-4 p-4 rounded-lg bg-violet-500/10 border border-violet-500/20 hover-elevate active-elevate-2 transition-all hover:border-violet-500/40"
                  data-testid="link-phone-contact"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/30 to-violet-600/20 flex items-center justify-center flex-shrink-0 border border-violet-500/30">
                    <Phone className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Телефон</div>
                    <div className="font-semibold text-foreground text-lg">
                      +992 87 622 0100
                    </div>
                  </div>
                </a>

                <a
                  href="https://webclub.ink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20 hover-elevate active-elevate-2 transition-all hover:border-cyan-500/40"
                  data-testid="link-website"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/30 to-cyan-600/20 flex items-center justify-center flex-shrink-0 border border-cyan-500/30">
                    <Globe className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Сайт</div>
                    <div className="font-semibold text-foreground text-lg">
                      webclub.ink
                    </div>
                  </div>
                </a>
              </div>
            </Card>

            <Card className="p-6 md:p-8 bg-background/50 backdrop-blur-sm border-violet-500/20 hover:border-violet-500/40 transition-colors shadow-lg shadow-violet-500/5">
              <h3 className="font-display font-semibold text-xl text-foreground mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Мессенджеры
              </h3>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://t.me/+992876220100"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  data-testid="link-telegram"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 border-violet-500/30 hover:border-violet-500/50 hover:bg-violet-500/10"
                  >
                    <SiTelegram className="w-5 h-5 text-violet-400" />
                    Telegram
                  </Button>
                </a>

                <a
                  href="https://wa.me/992876220100"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  data-testid="link-whatsapp"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 border-cyan-500/30 hover:border-cyan-500/50 hover:bg-cyan-500/10"
                  >
                    <SiWhatsapp className="w-5 h-5 text-cyan-400" />
                    WhatsApp
                  </Button>
                </a>

                <a
                  href="viber://chat?number=992876220100"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Viber"
                  data-testid="link-viber"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/10"
                  >
                    <SiViber className="w-5 h-5 text-purple-400" />
                    Viber
                  </Button>
                </a>
              </div>
            </Card>

            <div className="p-6 rounded-xl bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/30 to-cyan-600/20 flex items-center justify-center flex-shrink-0 border border-cyan-500/30">
                  <Clock className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Быстрый ответ
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Среднее время ответа на заявку — 48 часов. Работаем с
                    понедельника по пятницу с 9:00 до 18:00.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
