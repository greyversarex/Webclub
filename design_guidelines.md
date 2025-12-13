# WEBCLUB Corporate Website Design Guidelines

## Design Approach
**Reference-Based Strategy**: Drawing from modern IT company aesthetics (Stripe's clarity + Vercel's minimalism + Linear's precision), creating a professional yet approachable corporate identity that establishes technical credibility while remaining accessible.

## Typography System
- **Headings**: Inter or DM Sans (600-700 weight)
  - H1: 3.5rem desktop / 2.5rem mobile
  - H2: 2.5rem desktop / 2rem mobile  
  - H3: 1.75rem desktop / 1.5rem mobile
- **Body**: Inter or System UI (400 regular, 500 medium)
  - Primary: 1.125rem (18px)
  - Secondary: 1rem (16px)
- **Accent Numbers/Stats**: DM Sans or Poppins (700 weight, larger scale)

## Layout System
**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 20, 24 (p-4, gap-6, py-20, etc.)
- Section padding: py-16 mobile, py-24 desktop
- Container: max-w-7xl with px-6 mobile, px-12 desktop
- Grid gaps: gap-8 for cards, gap-12 for major sections

## Component Structure

### Navigation
Full-width header with logo left, navigation center, CTA button right. Include language switcher (RU/EN). Sticky on scroll with subtle backdrop blur.

### Hero Section
Split layout (60/40): Left side with bold headline "Создаём IT-решения для вашего бизнеса", subheadline about WEBCLUB expertise, dual CTA buttons (primary: "Обсудить проект", secondary: "Наши услуги"). Right side features dynamic tech-themed illustration/image. Include trust indicators below: "100+ проектов", "5 лет опыта", "24/7 поддержка".

### Services Grid
Four-column grid (2 mobile): Cards with icons, service names, brief descriptions:
1. Интернет-магазины (e-commerce icon)
2. Корпоративные сайты (building/briefcase icon)
3. Мобильные приложения (smartphone icon) - include App Store/Google Play badges
4. Банковские и госпроекты (shield/security icon)

Each card: icon top, title, 2-3 line description, hover effect with subtle lift and glow.

### Advantages Section
Three-column layout with icon-headline-text pattern:
- Быстрая работа (lightning icon)
- Современный подход (sparkles/innovation icon)  
- Полная поддержка (support/headset icon)

Include stats bar: "876+ довольных клиентов" | "99% успешных проектов" | "48ч среднее время ответа"

### Portfolio/Case Studies
Masonry or staggered grid (3 columns desktop, 2 tablet, 1 mobile). Project cards with large preview images, client logos, tech stack tags, brief outcome description. Hover reveals "Смотреть проект" overlay.

### Technology Stack
Icon grid showcasing technologies: React, Node.js, MongoDB, AWS, etc. Clean, minimal presentation with logos on subtle backgrounds.

### Contact Section
Two-column split:
- **Left**: Contact form (Имя, Email, Телефон, Сообщение)
- **Right**: Contact info card with:
  - Phone: 876-220-100 (clickable tel: link)
  - Website: webclub.ink
  - Social media buttons: Telegram, WhatsApp, Viber (icon buttons in brand colors)
  - Office hours/response time indicator

### Footer
Multi-column (4 sections):
1. WEBCLUB logo + tagline
2. Quick links (Услуги, Портфолио, О нас, Контакты)
3. Services menu
4. Contact + social media

Bottom bar: Copyright, Privacy Policy, Terms

## Interactive Elements
- Cards: Subtle scale (1.02) + shadow increase on hover
- Buttons: Primary with slight gradient, glow on hover; Secondary outlined
- Form inputs: Border glow on focus, smooth transitions
- Minimal animations: Fade-in on scroll for sections, gentle parallax on hero

## Images Strategy
**Large hero image**: YES - Tech/development themed (team working, code screens, or abstract tech visualization)
**Additional images**:
- Portfolio section: 6-9 project screenshots
- Team section (optional): Office photos or team portraits
- Services: Icon-based, no photos needed

All hero/section background images should support text overlays with gradient overlays or blur backdrops on buttons.

## Accessibility
- Icon-only buttons include aria-labels
- Form labels visible and associated
- Color contrast minimum 4.5:1
- Focus states clearly visible
- Social media links with descriptive text for screen readers