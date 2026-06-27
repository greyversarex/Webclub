import { useState } from "react";
import { Phone, Send, Loader2, MapPin } from "lucide-react";
import { SiTelegram, SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
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
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {t.contact.title}
          </h2>
          <p 
            className={`text-white/60 text-lg max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          <Card 
            className={`p-6 md:p-8 bg-white/5 backdrop-blur-sm border-white/10 hover:border-violet-400/40 transition-all duration-500 shadow-lg shadow-black/20 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
          >
            <h3 className="font-display font-semibold text-xl text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-400" />
              {t.contact.formTitle}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white/70 mb-2"
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
                  className="bg-white/5 border-white/15 focus:border-violet-400 text-white placeholder:text-white/30"
                  data-testid="input-name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white/70 mb-2"
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
                  className="bg-white/5 border-white/15 focus:border-violet-400 text-white placeholder:text-white/30"
                  data-testid="input-email"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-white/70 mb-2"
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
                  className="bg-white/5 border-white/15 focus:border-violet-400 text-white placeholder:text-white/30"
                  data-testid="input-phone"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white/70 mb-2"
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
                  className="resize-none bg-white/5 border-white/15 focus:border-violet-400 text-white placeholder:text-white/30"
                  data-testid="input-message"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white border-0 shadow-lg shadow-violet-500/30"
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
              className={`p-6 md:p-8 bg-white/5 backdrop-blur-sm border-white/10 hover:border-emerald-400/40 transition-all duration-500 shadow-lg shadow-black/20 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? '300ms' : '0ms' }}
            >
              <h3 className="font-display font-semibold text-xl text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {t.contact.contactInfo}
              </h3>

              <div className="space-y-5">
                <a
                  href="tel:+992666666960"
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover-elevate active-elevate-2 transition-all hover:border-violet-400/40"
                  data-testid="link-phone-contact"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white/80" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60">{t.contact.phoneLabel}</div>
                    <div className="font-semibold text-white text-lg">
                      +992 666 666 960
                    </div>
                  </div>
                </a>

                <div className="flex gap-3">
                  <a
                    href="https://t.me/+992666666960"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 text-white font-medium shadow-md shadow-sky-400/30 hover:shadow-lg hover:shadow-sky-400/40 transition-all"
                    aria-label="Telegram"
                    data-testid="link-telegram-contact"
                  >
                    <SiTelegram className="w-5 h-5" />
                    Telegram
                  </a>
                  <a
                    href="https://wa.me/992666666960"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 text-white font-medium shadow-md shadow-emerald-400/30 hover:shadow-lg hover:shadow-emerald-400/40 transition-all"
                    aria-label="WhatsApp"
                    data-testid="link-whatsapp-contact"
                  >
                    <SiWhatsapp className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>

              </div>
            </Card>

            <Card 
              className={`p-6 md:p-8 bg-white/5 backdrop-blur-sm border-white/10 hover:border-violet-400/40 transition-all duration-500 shadow-lg shadow-black/20 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? '400ms' : '0ms' }}
              data-testid="card-office"
            >
              <h3 className="font-display font-semibold text-xl text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                {t.contact.officeTitle}
              </h3>
              <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
                <MapPin className="w-4 h-4 text-violet-400" />
                <span data-testid="text-office-address">{t.contact.officeAddress}</span>
              </div>

              <div className="rounded-xl overflow-hidden border border-white/10 shadow-md shadow-black/30">
                <iframe
                  title={t.contact.officeTitle}
                  src="https://yandex.com/map-widget/v1/?ll=68.7837%2C38.5668&z=17&pt=68.7837%2C38.5668%2Cpm2rdm"
                  className="w-full h-64 md:h-72 block dark:brightness-90 dark:contrast-110"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  data-testid="iframe-office-map"
                />
              </div>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
}
