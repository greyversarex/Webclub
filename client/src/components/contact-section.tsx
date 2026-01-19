import { useState } from "react";
import { Phone, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { SiTelegram, SiWhatsapp } from "react-icons/si";
import { apiRequest } from "@/lib/queryClient";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/lib/language-context";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function ContactSection() {
  const { toast } = useToast();
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
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
        title: t.contact.error,
        description: t.contact.validationError,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/contact", formData);
      toast({
        title: t.contact.success,
        description: t.contact.successDescription,
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast({
        title: t.contact.error,
        description: t.contact.errorDescription,
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
    <section ref={ref as React.RefObject<HTMLElement>} id="contact" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-800 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {t.contact.title}
          </h2>
          <p 
            className={`text-slate-600 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          <Card 
            className={`p-6 md:p-8 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 backdrop-blur-sm border-slate-300 hover:border-violet-300 transition-all duration-500 shadow-lg shadow-slate-300/20 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
          >
            <h3 className="font-display font-semibold text-xl text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-500" />
              {t.contact.formTitle}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  {t.contact.name} *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t.contact.namePlaceholder}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white/70 border-slate-300 focus:border-violet-500 focus:ring-violet-500/20 text-slate-800 placeholder:text-slate-400"
                  data-testid="input-name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  {t.contact.email}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white/70 border-slate-300 focus:border-violet-500 focus:ring-violet-500/20 text-slate-800 placeholder:text-slate-400"
                  data-testid="input-email"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  {t.contact.phone} *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+992 (__) ___-__-__"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-white/70 border-slate-300 focus:border-violet-500 focus:ring-violet-500/20 text-slate-800 placeholder:text-slate-400"
                  data-testid="input-phone"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  {t.contact.message}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t.contact.messagePlaceholder}
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="resize-none bg-white/70 border-slate-300 focus:border-violet-500 focus:ring-violet-500/20 text-slate-800 placeholder:text-slate-400"
                  data-testid="input-message"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 text-slate-800 border-slate-300 shadow-lg shadow-slate-300/25"
                disabled={isSubmitting}
                data-testid="button-submit-contact"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t.contact.submitting}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {t.contact.submit}
                  </>
                )}
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card 
              className={`p-6 md:p-8 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 backdrop-blur-sm border-slate-300 hover:border-emerald-300 transition-all duration-500 shadow-lg shadow-slate-300/20 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? '300ms' : '0ms' }}
            >
              <h3 className="font-display font-semibold text-xl text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {t.contact.contactInfo}
              </h3>

              <div className="space-y-5">
                <a
                  href="tel:+992876220100"
                  className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 border border-slate-300 hover-elevate active-elevate-2 transition-all hover:border-violet-400"
                  data-testid="link-phone-contact"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 flex items-center justify-center flex-shrink-0 shadow-md shadow-slate-300/20">
                    <Phone className="w-6 h-6 text-slate-700" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">{t.contact.phoneLabel}</div>
                    <div className="font-semibold text-slate-800 text-lg">
                      +992 87 622 0100
                    </div>
                  </div>
                </a>

              </div>
            </Card>

            <Card 
              className={`p-6 md:p-8 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 backdrop-blur-sm border-slate-300 hover:border-violet-300 transition-all duration-500 shadow-lg shadow-slate-300/20 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? '400ms' : '0ms' }}
            >
              <h3 className="font-display font-semibold text-xl text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-500" />
                {t.contact.messengers}
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
                    className="gap-2 border-violet-300 text-violet-700 bg-violet-50"
                  >
                    <SiTelegram className="w-5 h-5 text-violet-600" />
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
                    className="gap-2 border-emerald-300 text-emerald-700 bg-emerald-50"
                  >
                    <SiWhatsapp className="w-5 h-5 text-emerald-600" />
                    WhatsApp
                  </Button>
                </a>

              </div>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
}
