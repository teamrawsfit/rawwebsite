/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 * Team RAW - Robots & Innovation Gallery Component
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Calendar, 
  Search, 
  Sparkles, 
  Award, 
  Cpu, 
  X, 
  ChevronRight, 
  ShieldCheck, 
  Wrench,
  Users,
  Compass
} from 'lucide-react';
import { useGlobalData } from '@/context/DataContext';
import initialRobotsData from '@/data/robotsData';
import initialGalleryData from '@/data/galleryData';
import styles from '@/app/styles/RobotsGallery.module.css';

export function getValidRobotImage(name: string = '', year?: number, existingUrl?: string): string {
  if (existingUrl && !existingUrl.includes('placeholder') && existingUrl.length > 5) {
    return existingUrl;
  }
  const cleanName = (name || '').toLowerCase();
  const yr = year || (cleanName.match(/\b(202\d)\b/) ? parseInt(cleanName.match(/\b(202\d)\b/)![1]) : 2026);
  const isR2 = cleanName.includes('robot 2') || cleanName.includes('r2');
  if (yr === 2026) return isR2 ? '/images/2026 bots.jpg' : '/images/2026 r1.PNG';
  if (yr === 2025) return isR2 ? '/images/2025 r1.jpeg' : '/images/2025 r1.jpeg';
  if (yr === 2024) return isR2 ? '/images/2024 r1.jpeg' : '/images/2024 r1.jpeg';
  if (yr === 2023) return isR2 ? '/images/2023 r2.jpeg' : '/images/2023 r1.jpeg';
  if (yr === 2022) return isR2 ? '/images/2022r2.jpeg' : '/images/2022 r1.jpeg';
  if (yr === 2021) return isR2 ? '/images/2021 r2.jpeg' : '/images/2021 r1.jpeg';
  if (yr === 2020) return isR2 ? '/images/2020 r2.jpeg' : '/images/2020 r1.jpeg';
  return '/images/2026 r1.PNG';
}

export type GalleryUnifiedItem = {
  id: string;
  name: string;
  type: string;
  category: 'robots' | 'events' | 'workshops' | 'competitions' | 'team';
  description: string;
  longDescription?: string;
  imageUrl: string;
  images?: string[];
  specs?: string[];
  tags?: string[];
  features?: string[];
  achievements?: string[];
  year?: number;
  status?: string;
  teamLead?: string;
  isFeatured?: boolean;
};

export default function RobotsGallery() {
  const { robots: apiRobots, galleryImages: apiGallery } = useGlobalData();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalItem, setActiveModalItem] = useState<GalleryUnifiedItem | null>(null);

  // Build unified items without duplicates, strictly time-wise ordered
  const allItems: GalleryUnifiedItem[] = useMemo(() => {
    // 1. Process Robots Data
    const rawRobots = (apiRobots && apiRobots.length > 0) ? apiRobots : initialRobotsData;
    const processedRobots: GalleryUnifiedItem[] = rawRobots.map((bot: any) => {
      const validImg = getValidRobotImage(bot.name, bot.year, bot.imageUrl);
      return {
        id: bot._id || `bot-${bot.year}-${bot.name}`,
        name: bot.name,
        type: bot.type || 'Competition Robot',
        category: 'robots',
        description: bot.description || 'Precision competition robot engineered by Team RAW.',
        longDescription: bot.longDescription || bot.description,
        imageUrl: validImg,
        images: [validImg],
        specs: bot.specs || ['Autonomous Navigation', 'Precision Gripper'],
        tags: bot.tags || ['DD Robocon', 'Competition'],
        features: bot.features || ['ROS2 Control Architecture', 'High-Traction Chassis'],
        achievements: bot.achievements || ['National Robotics Participant'],
        year: bot.year || 2026,
        status: bot.status || 'active',
        teamLead: bot.teamLead || 'Team RAW',
        isFeatured: bot.year === 2026 && bot.name.includes('Robot 1'),
      };
    });

    // 2. Process Gallery Items (Events, Workshops, Competitions, Team)
    // Filter out any duplicate robot entries from gallery
    const rawGallery = (apiGallery && apiGallery.length > 0) ? apiGallery : initialGalleryData;
    const processedGallery: GalleryUnifiedItem[] = rawGallery
      .filter((item: any) => item.category !== 'robots')
      .map((item: any) => {
        let validImg = item.imageUrl;
        if (!validImg || validImg.includes('placeholder')) {
          if (item.category === 'events') validImg = '/Mosaic26.png';
          else if (item.category === 'workshops') validImg = '/group foto.jpeg';
          else if (item.category === 'competitions') validImg = '/Robococon.png';
          else if (item.category === 'team') validImg = '/team image.JPG';
          else validImg = '/Mosaic26.png';
        }
        return {
          id: item._id || `gallery-${item.title}`,
          name: item.title,
          type: item.category.toUpperCase(),
          category: item.category,
          description: item.description || 'Team RAW technical event and innovation milestone.',
          longDescription: item.detailedDescription || item.description,
          imageUrl: validImg,
          images: [validImg],
          specs: [item.category, `${item.year || 2025}`],
          tags: [item.category, 'SFIT', `${item.year || 2025}`],
          features: ['Public Demonstration', 'Hands-on Technical Experience'],
          achievements: ['Community STEM Excellence'],
          year: item.year || 2025,
          status: 'completed',
          teamLead: item.uploadedBy || 'Team RAW',
          isFeatured: false,
        };
      });

    // Combine and sort chronologically (descending: 2026 -> 2025 -> 2024 ...)
    // For same year: Robot 1 before Robot 2, robots before events
    const combined = [...processedRobots, ...processedGallery];
    return combined.sort((a, b) => {
      const yearA = a.year || 0;
      const yearB = b.year || 0;
      if (yearB !== yearA) {
        return yearB - yearA; // Newest first
      }
      if (a.category === 'robots' && b.category !== 'robots') return -1;
      if (a.category !== 'robots' && b.category === 'robots') return 1;
      if (a.name.includes('Robot 1') && b.name.includes('Robot 2')) return -1;
      if (a.name.includes('Robot 2') && b.name.includes('Robot 1')) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [apiRobots, apiGallery]);

  // Unique years list for filter pills
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(allItems.map((i) => i.year).filter(Boolean) as number[]));
    return years.sort((a, b) => b - a);
  }, [allItems]);

  // Filter items
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesYear = selectedYear === 'all' || item.year === selectedYear;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.specs?.some((s) => s.toLowerCase().includes(query)) ||
        item.tags?.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesYear && matchesSearch;
    });
  }, [allItems, selectedCategory, selectedYear, searchQuery]);

  const robotsCount = useMemo(() => allItems.filter((i) => i.category === 'robots').length, [allItems]);
  const galleryCount = useMemo(() => allItems.filter((i) => i.category !== 'robots').length, [allItems]);

  // Lock body scroll on modal
  useEffect(() => {
    if (activeModalItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModalItem]);

  // ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = [
    { id: 'all', label: 'All Showcase', icon: Compass },
    { id: 'robots', label: 'Robots', icon: Bot },
    { id: 'events', label: 'Events', icon: Sparkles },
    { id: 'workshops', label: 'Workshops', icon: Wrench },
    { id: 'competitions', label: 'Competitions', icon: Award },
    { id: 'team', label: 'Team', icon: Users },
  ];

  return (
    <section id="robots-gallery" className={styles.gallerySection}>
      {/* HEADER SECTION - CLEAN & STYLED, NO BENTO WORD */}
      <div className={styles.headerWrapper}>
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.badge}
        >
          <Bot size={14} color="#ff4d4d" />
          <span>Autonomous Robotics & Aviation Wing • SFIT</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={styles.mainHeading}
        >
          Robots & <span className={styles.redAccent}>Innovation</span> Gallery
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={styles.subtitle}
        >
          Chronological engineering showcase of Team RAW competition bots, autonomous architectures, and national milestones from 2020 to 2026.
        </motion.p>

        {/* Dynamic Telemetry Stats Capsules */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={styles.telemetryRow}
        >
          <div className={styles.telemetryCapsule}>
            <span className={styles.pulseDot} />
            <strong style={{ color: 'var(--color-text-primary)' }}>{robotsCount}</strong> Competition Bots
          </div>
          <div className={styles.telemetryCapsule}>
            <Sparkles size={12} color="#facc15" />
            <strong style={{ color: 'var(--color-text-primary)' }}>{galleryCount}</strong> Technical Milestones
          </div>
          <div className={styles.telemetryCapsule}>
            <Calendar size={12} color="#60a5fa" />
            <strong style={{ color: 'var(--color-text-primary)' }}>2020 – 2026</strong> Timeline
          </div>
        </motion.div>
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div className={styles.toolbar}>
        {/* Top row: Category Pills + Search */}
        <div className={styles.toolbarTop}>
          {/* Category Tabs */}
          <div className={styles.categoryTabs}>
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`${styles.categoryTab} ${isActive ? styles.categoryTabActive : ''}`}
                  type="button"
                >
                  <Icon size={14} color={isActive ? '#ffffff' : '#94a3b8'} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className={styles.searchBox}>
            <Search size={15} className={styles.searchIcon} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bot, spec, subsystem..."
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={styles.clearSearchBtn}
                type="button"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Bottom row: Time-Wise Year Selector Pills */}
        <div className={styles.toolbarBottom}>
          <span className={styles.yearLabel}>
            <Calendar size={13} color="#f87171" />
            Year:
          </span>

          <button
            onClick={() => setSelectedYear('all')}
            className={`${styles.yearPill} ${selectedYear === 'all' ? styles.yearPillActive : ''}`}
            type="button"
          >
            All Years
          </button>

          {availableYears.map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`${styles.yearPill} ${selectedYear === yr ? styles.yearPillActive : ''}`}
              type="button"
            >
              {yr}
            </button>
          ))}
        </div>
      </div>

      {/* GRID FORMAT PRESENTATION */}
      {filteredItems.length === 0 ? (
        <div className={styles.emptyState}>
          <Bot size={44} color="#64748b" />
          <h3 className={styles.emptyTitle}>No items match current filters</h3>
          <p className={styles.emptySubtitle}>
            Try adjusting your search query or selecting a different year/category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedYear('all');
              setSearchQuery('');
            }}
            className={styles.resetBtn}
            type="button"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div
          className={styles.cardsGrid}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.75rem',
            width: '100%',
          }}
        >
          {filteredItems.map((item, index) => {
            const isHeroFlagship = item.category === 'robots' && item.year === 2026 && item.name.includes('Robot 1');

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
                onClick={() => setActiveModalItem(item)}
                className={styles.card}
              >
                {/* Ambient glow accent in corner */}
                <div className={styles.cardAmbientGlow} />

                {/* Top Badge Row */}
                <div>
                  <div className={styles.cardHeaderRow}>
                    <div className={styles.cardHeaderLeft}>
                      <span className={styles.yearBadge}>
                        {item.year}
                      </span>
                      <span className={styles.botSubBadge}>
                        {item.category === 'robots' ? (item.name.includes('Robot 2') ? 'Robot 2' : 'Robot 1') : item.type}
                      </span>
                    </div>

                    <div className={styles.cardHeaderRight}>
                      {isHeroFlagship && (
                        <span className={styles.flagshipBadge}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399' }} />
                          FLAGSHIP
                        </span>
                      )}
                      <span className={styles.categoryTag}>
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* FRAME FIT TO IMAGE CONTAINER - FULL FRAME FILL */}
                  <div
                    className={styles.imageFrame}
                    style={{
                      width: '100%',
                      height: '220px',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      background: 'var(--color-bg-secondary)',
                      border: '1px solid var(--color-border)',
                      padding: 0,
                      marginBottom: '1rem',
                      boxSizing: 'border-box',
                    }}
                  >
                    {/* Robot Image with full frame fit */}
                    <img
                      src={encodeURI(item.imageUrl)}
                      alt={item.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = getValidRobotImage(item.name, item.year);
                      }}
                      className={item.category === 'robots' ? styles.cardImg : styles.eventImg}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        pointerEvents: 'none',
                        userSelect: 'none',
                      }}
                    />
                  </div>

                  {/* Text Details */}
                  <h3 className={styles.cardTitle} title={item.name}>
                    {item.name}
                  </h3>

                  <div className={styles.cardTypeRow}>
                    <span className={styles.cardTypeDot} />
                    <span>{item.type}</span>
                  </div>

                  <p className={styles.cardDescription}>
                    {item.description}
                  </p>
                </div>

                {/* Bottom Tags & Action */}
                <div className={styles.cardFooter}>
                  <div className={styles.specsPreview}>
                    {item.specs?.slice(0, 2).map((spec, idx) => (
                      <span key={idx} className={styles.specBadge}>
                        {spec}
                      </span>
                    ))}
                  </div>

                  <span className={styles.detailsBtn}>
                    Details <ChevronRight size={14} />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* FULL-SCREEN INTERACTIVE DETAIL MODAL */}
      <AnimatePresence>
        {activeModalItem && (
          <div className={styles.modalBackdrop}>
            {/* Backdrop click to dismiss */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalItem(null)}
              style={{ position: 'fixed', inset: 0, cursor: 'pointer' }}
            />

            {/* Modal Dialog Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className={styles.modalBox}
              style={{ zIndex: 10000 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalItem(null)}
                className={styles.modalCloseBtn}
                type="button"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className={styles.modalHeaderTags}>
                <span className={styles.yearBadge}>
                  {activeModalItem.year}
                </span>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
                  {activeModalItem.category} • {activeModalItem.type}
                </span>
              </div>

              <h2 className={styles.modalTitle}>
                {activeModalItem.name}
              </h2>

              <p className={styles.modalDescription}>
                {activeModalItem.longDescription || activeModalItem.description}
              </p>

              {/* Large Frame Fit Showcase Photo */}
              <div className={styles.modalImageFrame}>
                <img
                  src={encodeURI(activeModalItem.imageUrl)}
                  alt={activeModalItem.name}
                  className={styles.modalImg}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = getValidRobotImage(activeModalItem.name, activeModalItem.year);
                  }}
                />
              </div>

              {/* Key Technical Specs Grid */}
              <div className={styles.modalSpecsGrid}>
                <div className={styles.specCard}>
                  <h4 className={styles.specCardTitle} style={{ color: '#f87171' }}>
                    <Cpu size={14} /> Subsystem Specs
                  </h4>
                  <ul className={styles.specList}>
                    {activeModalItem.specs?.map((spec, i) => (
                      <li key={i} className={styles.specItem}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#E10600', flexShrink: 0 }} />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.specCard}>
                  <h4 className={styles.specCardTitle} style={{ color: '#60a5fa' }}>
                    <Award size={14} /> Competition Record
                  </h4>
                  <ul className={styles.specList}>
                    {activeModalItem.achievements?.map((ach, i) => (
                      <li key={i} className={styles.specItem}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#3b82f6', flexShrink: 0 }} />
                        {ach}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Engineering Features */}
              {activeModalItem.features && activeModalItem.features.length > 0 && (
                <div className={styles.specCard} style={{ marginBottom: '1.5rem' }}>
                  <h4 className={styles.specCardTitle} style={{ color: '#34d399' }}>
                    <ShieldCheck size={14} /> Key Engineering Highlights
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem' }}>
                    {activeModalItem.features.map((feat, i) => (
                      <div key={i} className={styles.specItem}>
                        <span style={{ color: '#34d399', fontWeight: 'bold' }}>✓</span>
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer Actions */}
              <div className={styles.modalFooter}>
                <span>Team Lead: <strong style={{ color: '#ffffff', fontFamily: 'var(--font-mono)' }}>{activeModalItem.teamLead}</strong></span>
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className={styles.modalCloseActionBtn}
                >
                  Close Blueprint
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
