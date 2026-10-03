'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Bot, ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BotHeroItem {
  id: string;
  year: string;
  botNum: string;
  title: string;
  description: string;
  src: string;
  tag?: string;
}

export const BOTS_HERO_ITEMS: BotHeroItem[] = [
  {
    id: 'bot-2026-r1',
    year: '2026',
    botNum: 'Robot 1',
    title: 'Autonomous Navigation Bot',
    description: 'Advanced SLAM & LiDAR guided tactical competition robot.',
    src: '/images/bots-hero/2026 r1.jpeg',
    tag: 'Latest Prototype',
  },
  {
    id: 'bot-2026-r2',
    year: '2026',
    botNum: 'Robot 2',
    title: 'Precision Gripper Bot',
    description: 'High-torque pneumatic gripper with closed-loop servo control.',
    src: '/images/bots-hero/2026 r2.jpeg',
    tag: 'Precision Unit',
  },
  {
    id: 'bot-2025-r1',
    year: '2025',
    botNum: 'Robot 1',
    title: 'e-Yantra Quad Harvester',
    description: 'High-speed autonomous harvest and sorting mobile platform.',
    src: '/images/bots-hero/2025 r1.png',
    tag: 'Robocon 2025',
  },
  {
    id: 'bot-2025-r2',
    year: '2025',
    botNum: 'Robot 2',
    title: 'Holonomic Defense Bot',
    description: 'Omnidirectional high-traction drive system with active damping.',
    src: '/images/bots-hero/2025 r2.png',
    tag: 'Robocon 2025',
  },
  {
    id: 'bot-2024-r1',
    year: '2024',
    botNum: 'Robot 1',
    title: 'Autonomous Rover R1',
    description: 'Smart optical line following and automated obstacle evasion.',
    src: '/images/bots-hero/2024 r1.png',
    tag: 'National Finalist',
  },
  {
    id: 'bot-2024-r2',
    year: '2024',
    botNum: 'Robot 2',
    title: 'Pneumatic Thrower Bot',
    description: 'Calibrated air reservoir actuator with precision trajectory arc.',
    src: '/images/bots-hero/2024 r2.png',
    tag: 'Robocon 2024',
  },
  {
    id: 'bot-2023-r1',
    year: '2023',
    botNum: 'Robot 1',
    title: 'Omni Ring Caster',
    description: 'Triple-wheel holonomic base with continuous fly-wheel launcher.',
    src: '/images/bots-hero/2023 r1.png',
    tag: 'Robocon 2023',
  },
  {
    id: 'bot-2023-r2',
    year: '2023',
    botNum: 'Robot 2',
    title: 'Pole Climbing Rover',
    description: 'Vertical mast gripping assembly with custom planetary gearboxes.',
    src: '/images/bots-hero/2023 r2.png',
    tag: 'Robocon 2023',
  },
  {
    id: 'bot-2022-r1',
    year: '2022',
    botNum: 'Robot 1',
    title: 'Lagori Shooter Bot',
    description: 'Rapid-fire disc mechanism engineered for dynamic target acquisition.',
    src: '/images/bots-hero/2022 r1.png',
    tag: 'Robocon 2022',
  },
  {
    id: 'bot-2022-r2',
    year: '2022',
    botNum: 'Robot 2',
    title: 'Disc Stacker Bot',
    description: 'Motorized magazine feeder with automatic level alignment.',
    src: '/images/bots-hero/2022 r2.png',
    tag: 'Robocon 2022',
  },
  {
    id: 'bot-2021-r1',
    year: '2021',
    botNum: 'Robot 1',
    title: 'Arrow Launcher Bot',
    description: 'Tension-sprung catapult mechanism designed for archery accuracy.',
    src: '/images/bots-hero/2021 r1.png',
    tag: 'Robocon 2021',
  },
  {
    id: 'bot-2021-r2',
    year: '2021',
    botNum: 'Robot 2',
    title: 'Tactical Defense Bot',
    description: 'Heavy duty chassis with rapid deployment barrier paddles.',
    src: '/images/bots-hero/2021 r2.png',
    tag: 'Robocon 2021',
  },
  {
    id: 'bot-2020-r1',
    year: '2020',
    botNum: 'Robot 1',
    title: 'Passer Robot',
    description: 'Pneumatic ball feeding system with optical sensors.',
    src: '/images/bots-hero/2020 r1.png',
    tag: 'Robocon 2020',
  },
  {
    id: 'bot-2020-r2',
    year: '2020',
    botNum: 'Robot 2',
    title: 'Try Scorer Bot',
    description: 'High-speed autonomous interceptor with catch-and-place boom.',
    src: '/images/bots-hero/2020 r2.png',
    tag: 'Robocon 2020',
  },
];

interface BotsHeroCarouselProps {
  className?: string;
  autoPlayInterval?: number; // default 5000ms (5 seconds)
}

export const BotsHeroCarousel: React.FC<BotsHeroCarouselProps> = ({
  className,
  autoPlayInterval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % BOTS_HERO_ITEMS.length);
    setProgressKey((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + BOTS_HERO_ITEMS.length) % BOTS_HERO_ITEMS.length);
    setProgressKey((prev) => prev + 1);
  }, []);

  const goToSlide = (idx: number) => {
    setDirection(idx > currentIndex ? 'next' : 'prev');
    setCurrentIndex(idx);
    setProgressKey((prev) => prev + 1);
  };

  // 5-second automatic image transition
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlayInterval, isPaused, nextSlide]);

  const currentBot = BOTS_HERO_ITEMS[currentIndex];

  const variants = {
    enter: (dir: 'next' | 'prev') => ({
      x: dir === 'next' ? 40 : -40,
      opacity: 0,
      scale: 0.96,
      filter: 'blur(8px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
        filter: { duration: 0.3 },
      },
    },
    exit: (dir: 'next' | 'prev') => ({
      x: dir === 'next' ? -40 : 40,
      opacity: 0,
      scale: 0.96,
      filter: 'blur(8px)',
      transition: {
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
        filter: { duration: 0.2 },
      },
    }),
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartXRef.current = null;
  };

  return (
    <div
      className={className}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '440px',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        background: 'transparent',
        border: 'none',
        padding: '0.5rem 0',
        userSelect: 'none',
        boxSizing: 'border-box',
      }}
    >


      {/* 1. Top Header Badge & Countdown Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.4rem', zIndex: 20, width: '100%', flexWrap: 'wrap', gap: '0.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'var(--color-bg-card, rgba(255,255,255,0.9))', backdropFilter: 'blur(8px)', padding: '0.3rem 0.65rem', borderRadius: '9999px', border: '1px solid var(--color-border, rgba(0,0,0,0.1))', flexWrap: 'wrap', maxWidth: '100%' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ef4444', boxShadow: '0 0 8px #ef4444', flexShrink: 0 }} />
          <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono, monospace)', whiteSpace: 'nowrap' }}>
            {currentBot.year} • {currentBot.botNum}
          </span>
          {currentBot.tag && (
            <span style={{ fontSize: '0.62rem', backgroundColor: 'rgba(225, 6, 0, 0.12)', color: 'var(--color-red, #ef4444)', padding: '0.12rem 0.45rem', borderRadius: '9999px', border: '1px solid rgba(225, 6, 0, 0.3)', fontWeight: 600, whiteSpace: 'nowrap' }}>
              {currentBot.tag}
            </span>
          )}
        </div>

        {/* 5-second countdown timer indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--color-bg-card, rgba(255,255,255,0.9))', backdropFilter: 'blur(8px)', padding: '0.3rem 0.55rem', borderRadius: '9999px', border: '1px solid var(--color-border, rgba(0,0,0,0.1))', flexShrink: 0 }}>
          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Resume auto-play' : 'Pause auto-play (every 5s)'}
            style={{ color: 'var(--color-text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            type="button"
          >
            {isPaused ? <Play size={12} /> : <Pause size={12} />}
          </button>
          <div style={{ width: 40, height: 5, background: 'var(--color-border, rgba(0,0,0,0.15))', borderRadius: 9999, overflow: 'hidden', position: 'relative' }}>
            {!isPaused && (
              <motion.div
                key={progressKey}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: autoPlayInterval / 1000, ease: 'linear' }}
                style={{ height: '100%', backgroundColor: '#ef4444', borderRadius: 9999 }}
              />
            )}
            {isPaused && (
              <div style={{ height: '100%', backgroundColor: '#facc15', borderRadius: 9999, width: '100%', opacity: 0.6 }} />
            )}
          </div>
          <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono, monospace)', color: 'var(--color-text-secondary)' }}>
            {currentIndex + 1}/{BOTS_HERO_ITEMS.length}
          </span>
        </div>
      </div>

      {/* 2. Middle: Robot Image Presentation Container (Direct Squircle Image with Glow) */}
      <div style={{ position: 'relative', width: '100%', minHeight: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible', zIndex: 10, margin: '0.5rem 0', background: 'transparent', border: 'none', boxSizing: 'border-box' }}>
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            key={currentBot.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible' }}
          >
            <img
              src={encodeURI(currentBot.src)}
              alt={`${currentBot.year} ${currentBot.botNum} - ${currentBot.title}`}
              style={{
                width: '100%',
                maxWidth: '280px',
                height: 'auto',
                aspectRatio: '1 / 1',
                objectFit: 'cover',
                borderRadius: '24px', // Direct squircle crop
                boxShadow: '0 16px 36px -6px rgba(0, 0, 0, 0.28), 0 0 28px 2px rgba(225, 6, 0, 0.25)',
                border: '1px solid var(--color-border, rgba(225, 6, 0, 0.2))',
                display: 'block',
                margin: '0 auto',
                pointerEvents: 'none',
                userSelect: 'none',
                transition: 'transform 0.5s ease',
              }}
              loading="eager"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = currentBot.src;
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Bottom Bot Details (in-flow, never clipped) */}
      <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--color-border, rgba(0,0,0,0.1))', zIndex: 20, width: '100%', display: 'flex', flexDirection: 'column', gap: '0.45rem', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
          <h3 style={{ color: 'var(--color-text-primary)', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.02em', fontFamily: "'Orbitron', sans-serif", margin: 0, wordBreak: 'break-word' }}>
            {currentBot.title}
          </h3>
          <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono, monospace)', color: 'var(--color-red, #ef4444)', fontWeight: 600, padding: '0.15rem 0.5rem', background: 'rgba(225, 6, 0, 0.1)', borderRadius: '6px', border: '1px solid rgba(225, 6, 0, 0.3)', flexShrink: 0 }}>
            {currentBot.year}
          </span>
        </div>

        {/* Full description without clipping */}
        <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: '1.45', margin: 0 }}>
          {currentBot.description}
        </p>

        {/* Quick-dots thumbnail slider & Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', paddingTop: '0.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', overflowX: 'auto', maxWidth: '260px', padding: '0.2rem 0' }}>
            {BOTS_HERO_ITEMS.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => goToSlide(idx)}
                  style={{
                    height: 5,
                    width: isActive ? 22 : 6,
                    borderRadius: 9999,
                    backgroundColor: isActive ? '#ef4444' : 'var(--color-border, rgba(0,0,0,0.2))',
                    boxShadow: isActive ? '0 0 8px rgba(239, 68, 68, 0.6)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                  title={`${item.year} - ${item.botNum}`}
                  type="button"
                />
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
            <button
              onClick={prevSlide}
              aria-label="Previous robot"
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'var(--color-bg-card, rgba(0,0,0,0.05))',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-border, rgba(0,0,0,0.1))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              type="button"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next robot"
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'var(--color-bg-card, rgba(0,0,0,0.05))',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-border, rgba(0,0,0,0.1))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              type="button"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotsHeroCarousel;
