/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Youtube, Github, Sun, Moon } from 'lucide-react';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('raw_theme');
    if (saved === 'dark') {
      setTheme('dark');
      applyTheme('dark');
    } else {
      setTheme('light');
      applyTheme('light');
    }
  }, []);

  const applyTheme = (t: 'light' | 'dark') => {
    if (t === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('raw_theme', next);
    applyTheme(next);
  };

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Competitions', href: '/competitions' },
    { label: 'Robots', href: '/robots-gallery' },
    { label: 'Team', href: '/team' },
    { label: 'Gallery', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/teamraw_sfit',
      icon: <Instagram size={17} />,
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/team-raw-sfit',
      icon: <Linkedin size={17} />,
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@teamrawsfit2026',
      icon: <Youtube size={17} />,
    },
    {
      label: 'GitHub',
      href: 'https://github.com/teamrawsfit/',
      icon: <Github size={17} />,
    },
  ];

  const isDark = theme === 'dark';

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Grid */}
        <div className={styles.mainGrid}>
          {/* Brand & Affiliation Column */}
          <div className={styles.brandColumn}>
            <div className={styles.brandLogoWrap}>
              <Image
                src="/logo 1.png"
                alt="Team RAW SFIT Logo"
                width={150}
                height={65}
                className={styles.brandLogoImg}
                priority
              />
            </div>
            <h2 className={styles.brandTitle}>TEAM RAW</h2>
            <h3 className={styles.brandSubtitle}>Robotics & Aviation Wing</h3>
            <p className={styles.brandText}>
              Building the next generation of autonomous robots through innovation, engineering excellence, and collaborative teamwork.
            </p>

            <div className={styles.divider} />

            <div className={styles.affiliationBox}>
              <span className={styles.affiliationLabel}>OFFICIALLY AFFILIATED WITH</span>
              <div className={styles.affiliationBadgeRow}>
                <div className={styles.collegeBadge}>
                  <Image
                    src="/collegelogo.png"
                    alt="SFIT Logo"
                    width={48}
                    height={48}
                    className={styles.collegeLogoImg}
                  />
                </div>
                <span className={styles.collegeTitle}>St. Francis Institute of Technology</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className={styles.navColumn}>
            <h3 className={styles.columnTitle}>Quick Links</h3>
            <ul className={styles.linksList}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.linkItem}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us Column */}
          <div className={styles.contactColumn}>
            <h3 className={styles.columnTitle}>Contact Us</h3>
            <div className={styles.contactDetails}>
              <p className={styles.addressLine}>St. Francis Institute of Technology</p>
              <p className={styles.addressLine}>Mount Poinsur, S.V.P. Road</p>
              <p className={styles.addressLine}>Borivali (West), Mumbai 400103</p>
              <p className={styles.contactEmailRow}>
                Email: <a href="mailto:teamraw@sfit.ac.in" className={styles.emailLink}>teamraw@sfit.ac.in</a>
              </p>
            </div>
          </div>

          {/* Follow Us Column with Switch Toggle */}
          <div className={styles.followColumn}>
            <h3 className={styles.columnTitle}>Follow Us</h3>
            <div className={styles.socialCirclesRow}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={styles.circleIconBtn}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Pill Toggle Switch */}
            <div className={styles.themeToggleContainer}>
              <Sun size={17} className={`${styles.themeIcon} ${!isDark && mounted ? styles.activeIcon : ''}`} />
              
              <button
                type="button"
                onClick={toggleTheme}
                className={styles.switchTrack}
                aria-label="Toggle light and dark theme"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                <motion.div
                  className={styles.switchThumb}
                  animate={{ x: isDark || !mounted ? 22 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>

              <Moon size={16} className={`${styles.themeIcon} ${isDark || !mounted ? styles.activeIcon : ''}`} />
            </div>
          </div>
        </div>

        {/* Bottom Bar Section */}
        <div className={styles.bottomBar}>
          <p className={styles.copyrightText}>
            © {currentYear} Team RAW SFIT. All rights reserved.
          </p>
          <div className={styles.legalGroup}>
            <Link href="/contact" className={styles.legalLink}>Terms and Conditions</Link>
            <Link href="/contact" className={styles.legalLink}>Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
