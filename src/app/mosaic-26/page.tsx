'use client';

import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import KineticGrid from '@/components/ui/kinetic-grid';
import styles from './mosaic.module.css';

export default function Mosaic26Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "MOSAIC '26 | Team RAW College Event";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      "Official MOSAIC '26 college event document of Robotics and Aviation Wing (RAW) SFIT."
    );
  }, []);

  const imageUrl = '/Mojaic26.png';

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    hidden: {
      filter: 'blur(10px)',
      y: 25,
      opacity: 0,
    },
  };

  return (
    <>
      <Navbar />
      <div className={styles.pageContainer} ref={containerRef}>
        <KineticGrid
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0,
          }}
        />

        <main className={styles.mainContent}>
          {/* Responsive Event Poster */}
          <div className={styles.imageWrapper}>
            <img
              src={imageUrl}
              alt="MOSAIC '26 Event Details"
              className={styles.eventImage}
              loading="eager"
            />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
