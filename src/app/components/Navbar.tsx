/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (scrollTop > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Registration', href: '/register' },
    { label: 'Competitions', href: '/competitions' },
    { label: 'Robots & Gallery', href: '/robots-gallery' },
    { label: 'Team', href: '/team' },
    { label: 'Sponsors', href: '/sponsors' },
    { label: 'Contact', href: '/contact' },
  ];



  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <motion.div
            className={styles.logo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/">
              <div className={styles.logoWrapper}>
                <Image
                  src="/logo 1.png"
                  alt="Team RAW"
                  width={45}
                  height={45}
                  priority
                  className={styles.logoImage}
                />
              </div>
              <span className={styles.logoText}>TEAM RAW</span>
              <div className={styles.logoDivider}></div>
              <div className={styles.sfitLogoContainer}>
                <Image
                  src="/collegelogo.jpg"
                  alt="St. Francis Institute of Technology"
                  width={38}
                  height={38}
                  priority
                  className={styles.sfitLogo}
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className={styles.desktopMenu}>
            <div className={styles.links}>
              {navLinks.map((link) => (
                <motion.div
                  key={link.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={link.href}
                    className={`${styles.link} ${pathname === link.href ? styles.linkActive : ''}`}
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Join the Team button removed */}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={styles.mobileMenuBtn}
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <span></span>
            <span></span>
            <span></span>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className={`${styles.mobileLink} ${pathname === link.href ? styles.mobileLinkActive : ''}`}
                onClick={() => setIsOpen(false)}
                whileHover={{ x: 5 }}
              >
                {link.label}
              </motion.a>
            ))}
            {/* Join the Team mobile button removed */}
          </motion.div>
        )}
      </nav>
    </>
  );
}
