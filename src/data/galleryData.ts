/**
 * Author: Taksh Gandhi
 * Email: takshgandhi4@gmail.com
 */

/**
 * STATIC GALLERY DATA
 * Events, Workshops, Competitions, and Team Moments with real verified assets.
 * Note: Robot models are defined exclusively in robotsData.ts to eliminate duplicate entries.
 */

export interface GalleryImage {
  _id: string;
  title: string;
  description?: string;
  detailedDescription?: string;
  imageUrl: string;
  category: 'events' | 'workshops' | 'competitions' | 'team';
  uploadedBy?: string;
  createdAt?: string;
  year?: number;
}

export const galleryImages: GalleryImage[] = [
  // EVENTS
  {
    _id: 'event-mu-techconnect-2026',
    title: 'MU TechConnect Exhibition 2026',
    description: 'Team RAW official robotics and technology showcase at Mumbai University TechConnect.',
    detailedDescription: 'Interactive demonstration of Team RAW autonomous rovers, sensor telemetry systems, and aviation prototypes presented at Mumbai University TechConnect.',
    category: 'events',
    imageUrl: '/images/MU Techconnect.jpg',
    uploadedBy: 'Team RAW',
    createdAt: '2026-03-01',
    year: 2026,
  },
  {
    _id: 'event-prayas-2026',
    title: 'PRAYAS 2026 Robotics Showcase',
    description: 'PRAYAS 2026 technical exhibition and live robotics demonstration at SFIT.',
    detailedDescription: 'Robotics innovation, student project certification, and live hardware demonstration conducted during PRAYAS 2026.',
    category: 'events',
    imageUrl: '/images/PRAYAS 2026.jpeg',
    uploadedBy: 'Team RAW',
    createdAt: '2026-02-28',
    year: 2026,
  },
  {
    _id: 'event-mosaic-2025',
    title: 'Mosaic 2025 Technical Fest',
    description: 'Team RAW flagship robotics demonstration & arena showcase at SFIT Mosaic techfest.',
    detailedDescription: 'Full public exhibition of Team RAW autonomous robots, live obstacle courses, and drone telemetry demonstrations presented to SFIT students and engineering guests.',
    category: 'events',
    imageUrl: '/images/Mosaic 2025.jpg',
    uploadedBy: 'Team RAW',
    createdAt: '2025-02-15',
    year: 2025,
  },
  {
    _id: 'event-robocon-national',
    title: 'DD Robocon National Arena',
    description: 'Team RAW on the competition field during the live national arena rounds.',
    detailedDescription: 'Intense match runs featuring coordinated dual-robot tasks, high-speed ball sorting, and precision sensor calibration on the official Doordarshan arena.',
    category: 'events',
    imageUrl: '/robocon2025.png',
    uploadedBy: 'Team RAW',
    createdAt: '2025-06-20',
    year: 2025,
  },

  // TEAM / RECRUITS
  {
    _id: 'team-robocon-2027',
    title: 'ROBOCON 2027 Team',
    description: 'Intensive peer learning sessions for first and second year engineering recruits covering microcontrollers, motor drivers, Fusion 360 CAD, and autonomous navigation architectures.',
    detailedDescription: 'Intensive peer learning sessions for first and second year engineering recruits covering microcontrollers, motor drivers, Fusion 360 CAD, and autonomous navigation architectures.',
    category: 'team',
    imageUrl: '/group foto.jpeg',
    uploadedBy: 'Team RAW',
    createdAt: '2027-01-15',
    year: 2027,
  },

  // COMPETITIONS
  {
    _id: 'comp-eyantra-arena',
    title: 'National Robotics Championship',
    description: 'Championship match staging and technical inspection at IIT Bombay.',
    detailedDescription: 'Rigorous hardware safety reviews, software verification, and timed autonomous trials competing against top technological institutes nationwide.',
    category: 'competitions',
    imageUrl: '/Robococon.png',
    uploadedBy: 'Team RAW',
    createdAt: '2024-04-18',
    year: 2024,
  },

  // TEAM
  {
    _id: 'team-sfit-2026',
    title: 'Team RAW 2026 Robocon Squad',
    description: 'Official 2026 national arena competition squad representing SFIT Mumbai.',
    detailedDescription: 'The 2026 Robocon national arena contingent of Team RAW SFIT with dual autonomous competition robots.',
    category: 'team',
    imageUrl: '/images/2026 Team raw .jpeg',
    uploadedBy: 'Team RAW',
    createdAt: '2026-03-15',
    year: 2026,
  },
  {
    _id: 'team-sfit-2025',
    title: 'Team RAW 2025 Championship Squad',
    description: 'Core robotics committee, mechanical fabricators, electronics leads, and coders for 2025.',
    detailedDescription: 'The dedicated student engineering contingent of St. Francis Institute of Technology driving relentless innovation across mechanical, electrical, and autonomous domains.',
    category: 'team',
    imageUrl: '/images/2025 team raw.PNG',
    uploadedBy: 'Team RAW',
    createdAt: '2025-10-05',
    year: 2025,
  },
  {
    _id: 'team-sfit-2024',
    title: 'Team RAW 2024 Robocon Squad',
    description: 'Team RAW competition squad at national arena stages.',
    detailedDescription: 'Dedicated members who engineered and deployed dual competition rovers for the 2024 Robocon season.',
    category: 'team',
    imageUrl: '/images/2024 team raw.PNG',
    uploadedBy: 'Team RAW',
    createdAt: '2024-10-05',
    year: 2024,
  },
  {
    _id: 'team-sfit-2022',
    title: 'Team RAW 2022 Engineering Team',
    description: 'Team RAW members who built the 2022 Lagori shooter and disc stacker robots.',
    detailedDescription: 'Full engineering team responsible for design, circuit layout, and chassis welding during the 2022 campaign.',
    category: 'team',
    imageUrl: '/images/2022 team raw .jpg',
    uploadedBy: 'Team RAW',
    createdAt: '2022-10-05',
    year: 2022,
  },
  {
    _id: 'team-sfit-2020',
    title: 'Team RAW 2020 Founding Contingent',
    description: 'Founding members and early pioneers of Team RAW SFIT.',
    detailedDescription: 'The inaugural cohort of Team RAW establishing the robotics laboratory and competition standards at SFIT.',
    category: 'team',
    imageUrl: '/images/2020 GroupPicRaw.jpg',
    uploadedBy: 'Team RAW',
    createdAt: '2020-10-05',
    year: 2020,
  },
];

// Filter helper functions
export const getImagesByCategory = (category: string): GalleryImage[] => {
  return galleryImages.filter(img => img.category === category);
};

export const getRecentImages = (count: number = 10): GalleryImage[] => {
  return [...galleryImages]
    .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
    .slice(0, count);
};

export default galleryImages;
