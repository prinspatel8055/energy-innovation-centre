import Link from 'next/link';
import { Linkedin, Twitter, Youtube, Mail, MapPin } from 'lucide-react';
import OptimizedImage from '@/components/shared/OptimizedImage';
import FooterSearch from './FooterSearch';

export default function Footer({ footerData }: { footerData?: any }) {
  const currentYear = new Date().getFullYear();
  const tagline = footerData?.tagline || '';
  const rawCopyright = footerData?.copyright || `© Copyright ${currentYear}. Ganpat University — EIC. All rights reserved.`;
  const copyright = rawCopyright.includes('{year}')
    ? rawCopyright.replace(/\{year\}/g, currentYear.toString())
    : rawCopyright.replace(/©\s*Copyright\s*\d{4}/i, `© Copyright ${currentYear}`);
  const columns = footerData?.columns || [];
  const socials = footerData?.socials || [];
  const logoUrl = footerData?.logoUrl || '';
  const logoSize = footerData?.logoSize || 'md';



  return (
    <footer className="bg-[var(--dark-surface)] text-white">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            {logoUrl ? (
              <OptimizedImage
                src={logoUrl}
                alt="Footer Logo"
                className={`mb-4 w-auto object-contain ${
                  logoSize === 'xs' ? 'h-6' :
                  logoSize === 'sm' ? 'h-8' :
                  logoSize === 'md' ? 'h-10' :
                  logoSize === 'lg' ? 'h-12' :
                  logoSize === 'xl' ? 'h-14' : 'h-16'
                }`}
              />
            ) : (
              <h3 className="text-[var(--secondary)] mb-4 text-xl font-bold font-heading">
                EIC
              </h3>
            )}
            <p className="text-white/70 leading-relaxed text-sm">
              {tagline || 'Energy Innovation Centre (EIC) — Centre of Excellence at Ganpat University dedicated to renewable energy, electric vehicles, microgrids, and clean energy innovations.'}
            </p>
          </div>

          {/* Dynamic Columns */}
          {columns.map((col: any, idx: number) => (
            <div key={idx}>
              <h4 className="text-white mb-4 font-semibold text-sm uppercase tracking-wider">{col.heading}</h4>
              <ul className="space-y-2">
                {col.links.map((link: any, lidx: number) => (
                  <li key={lidx}>
                    <Link href={link.href} className="text-white/70 hover:text-[var(--secondary)] transition-colors text-sm font-medium">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* 4th Column: Search + Address */}
          <div>
            <h4 className="text-white mb-4 font-semibold text-sm uppercase tracking-wider">Office</h4>

            {/* Site Search */}
            <FooterSearch />

            {/* Address */}
            <address className="not-italic space-y-2">
              <div className="flex items-start gap-2 text-white/70 text-sm leading-snug">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[var(--secondary)]" />
                <span>
                  Ganpat Vidyanagar, Mehsana-Gozaria Highway,<br />
                  North Gujarat PO – 384012, INDIA.
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Mail size={14} className="shrink-0 text-[var(--secondary)]" />
                <a href="mailto:eic@ganpatuniversity.ac.in" className="hover:text-[var(--secondary)] transition-colors">
                  eic@ganpatuniversity.ac.in
                </a>
              </div>
            </address>

            {/* Socials */}
            {socials.length > 0 && (
              <div className="flex space-x-4 mt-5">
                {socials.map((social: any, idx: number) => {
                  let Icon = Mail;
                  if (social.platform === 'linkedin') Icon = Linkedin;
                  if (social.platform === 'twitter') Icon = Twitter;
                  if (social.platform === 'youtube') Icon = Youtube;
                  return (
                    <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[var(--secondary)] transition-colors">
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-white/50 text-center">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
