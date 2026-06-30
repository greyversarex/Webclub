import { LogoLoop } from './logo-loop';
import {
  SiReact, SiTypescript, SiNodedotjs, SiPostgresql, SiDocker,
  SiFlutter, SiSwift, SiKotlin, SiVuedotjs, SiLaravel,
  SiMongodb, SiRedis, SiNginx, SiGit, SiLinux,
} from 'react-icons/si';

const techLogos = [
  { node: <SiReact />,       title: 'React',       href: 'https://react.dev' },
  { node: <SiTypescript />,  title: 'TypeScript',  href: 'https://www.typescriptlang.org' },
  { node: <SiNodedotjs />,   title: 'Node.js',     href: 'https://nodejs.org' },
  { node: <SiPostgresql />,  title: 'PostgreSQL',  href: 'https://www.postgresql.org' },
  { node: <SiDocker />,      title: 'Docker',      href: 'https://www.docker.com' },
  { node: <SiFlutter />,     title: 'Flutter',     href: 'https://flutter.dev' },
  { node: <SiSwift />,       title: 'Swift',       href: 'https://swift.org' },
  { node: <SiKotlin />,      title: 'Kotlin',      href: 'https://kotlinlang.org' },
  { node: <SiVuedotjs />,    title: 'Vue.js',      href: 'https://vuejs.org' },
  { node: <SiLaravel />,     title: 'Laravel',     href: 'https://laravel.com' },
  { node: <SiMongodb />,     title: 'MongoDB',     href: 'https://www.mongodb.com' },
  { node: <SiRedis />,       title: 'Redis',       href: 'https://redis.io' },
  { node: <SiNginx />,       title: 'Nginx',       href: 'https://nginx.org' },
  { node: <SiGit />,         title: 'Git',         href: 'https://git-scm.com' },
  { node: <SiLinux />,       title: 'Linux',       href: 'https://kernel.org' },
];

export function PartnersStrip() {
  return (
    <div className="relative border-t border-white/5 bg-white/[0.02] backdrop-blur-sm py-6 overflow-hidden">
      <div style={{ height: 52, position: 'relative' }}>
        <LogoLoop
          logos={techLogos}
          speed={80}
          direction="left"
          logoHeight={28}
          gap={56}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#05050f"
          ariaLabel="Технологии, которые мы используем"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        />
      </div>
    </div>
  );
}
