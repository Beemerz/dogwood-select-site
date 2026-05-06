'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import BrandMark from '@/components/site/BrandMark';
import ServiceCategoryIcon from '@/components/site/ServiceCategoryIcon';
import { primaryNav, serviceCategories } from '@/lib/site';

export default function SiteHeader() {
  const pathname = usePathname();
  const [compressed, setCompressed] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const servicesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setCompressed(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const media = window.matchMedia('(max-width: 980px)');
    const update = () => setIsMobile(media.matches);
    update();

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    return () => {
      if (servicesTimer.current) {
        clearTimeout(servicesTimer.current);
      }
    };
  }, []);

  const openServices = () => {
    if (servicesTimer.current) {
      clearTimeout(servicesTimer.current);
    }
    setServicesOpen(true);
  };

  const closeServicesSoon = () => {
    if (isMobile) {
      return;
    }
    if (servicesTimer.current) {
      clearTimeout(servicesTimer.current);
    }
    servicesTimer.current = setTimeout(() => setServicesOpen(false), 45);
  };

  const closeServicesNow = () => {
    if (servicesTimer.current) {
      clearTimeout(servicesTimer.current);
    }
    setServicesOpen(false);
  };

  return (
    <header
      className={`sticky-header ${compressed ? 'sticky-header-compressed' : ''}`}
      role="banner"
    >
      <div className="site-frame">
        <div className={`sticky-header-row ${isMobile ? 'sticky-header-row-mobile' : ''}`}>
          <div className="sticky-header-main">
            <BrandMark variant="header" className="header-logo" />
            {isMobile ? (
              <Link href="/book-consultation" className="button-primary header-cta">
                Book a Free Consultation
              </Link>
            ) : null}
          </div>

          <nav aria-label="Primary" className={`sticky-nav ${isMobile ? 'sticky-nav-mobile' : ''}`}>
            {primaryNav.map((item) => {
              if (item.href === '/services') {
                const active = pathname === '/services';
                return (
                  <div
                    key={item.href}
                    className={`nav-dropdown ${servicesOpen ? 'nav-dropdown-open' : ''}`}
                    onMouseEnter={isMobile ? undefined : openServices}
                    onMouseLeave={isMobile ? undefined : closeServicesSoon}
                  >
                    <div className="nav-link-group">
                      <Link
                        href="/services"
                        className={`nav-link ${active ? 'nav-link-active' : ''}`}
                        onFocus={isMobile ? undefined : openServices}
                        onClick={() => {
                          if (isMobile) {
                            closeServicesNow();
                          }
                        }}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        className="nav-caret-button"
                        aria-label="Open services menu"
                        aria-expanded={servicesOpen}
                        aria-haspopup="true"
                        onClick={() => setServicesOpen((current) => !current)}
                        onFocus={isMobile ? undefined : openServices}
                      >
                        <span className="nav-caret" aria-hidden="true">
                          ▾
                        </span>
                      </button>
                    </div>

                    {!isMobile ? (
                      <div
                        className="nav-dropdown-panel"
                        onMouseEnter={openServices}
                        onMouseLeave={closeServicesSoon}
                      >
                        <div className="nav-dropdown-grid">
                          {serviceCategories.map((category) => (
                            <Link
                              key={category.id}
                              href={`/services#${category.id}`}
                              className="nav-dropdown-link"
                              onClick={() => setServicesOpen(false)}
                            >
                              <span className="nav-dropdown-icon-wrap">
                                <ServiceCategoryIcon name={category.icon} />
                              </span>
                              <span className="nav-dropdown-text">
                                <span className="nav-dropdown-title">{category.navTitle}</span>
                                <span className="nav-dropdown-copy">{category.navCopy}</span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              }

              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${active ? 'nav-link-active' : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {isMobile && servicesOpen ? (
            <div className="nav-dropdown-panel-mobile">
              <div className="nav-dropdown-grid">
                {serviceCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/services#${category.id}`}
                    className="nav-dropdown-link"
                    onClick={() => setServicesOpen(false)}
                  >
                    <span className="nav-dropdown-icon-wrap">
                      <ServiceCategoryIcon name={category.icon} />
                    </span>
                    <span className="nav-dropdown-text">
                      <span className="nav-dropdown-title">{category.navTitle}</span>
                      <span className="nav-dropdown-copy">{category.navCopy}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {!isMobile ? (
            <Link href="/book-consultation" className="button-primary header-cta">
              Book a Free Consultation
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
