'use client';

import { useState, useEffect } from 'react';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './tasks.module.css';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface TaskFile {
  label: string;
  file: string; // path under /tasks/
  zipFile?: string; // optional zip bundle path
}

interface Category {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  tasks: TaskFile[];
}

const categories: Category[] = [
  {
    id: 'electronics',
    icon: 'https://img.icons8.com/?size=100&id=OJOjlfysbJp2&format=png&color=FFFFFF',
    title: 'PPT Format',
    description: "Official NAVKRITI '26 Idea Presentation format. Download the template to prepare your pitch deck.",
    color: '#e10600',
    tasks: [
      { label: "NAVKRITI '26 Idea Presentation Format", file: '../navkriti-files/Navkriti26-IDEA-Presentation-Format.pdf' },
    ],
  },
  {
    id: 'mechanical',
    icon: '⚙️',
    title: 'Mechanical',
    description: 'CAD modelling, fabrication, structural design and mechanism tasks.',
    color: '#e10600',
    tasks: [
      { label: 'Mechanical Task 1', file: 'M_1.pdf', zipFile: 'Mechanical_Tasks.zip' },
      { label: 'Mechanical Task 2', file: 'M_2.pdf', zipFile: 'Mechanical_Tasks.zip' },
    ],
  },
  {
    id: 'software',
    icon: '💻',
    title: 'Software',
    description: 'Programming, algorithms, ROS, computer vision and automation tasks.',
    color: '#00a651',
    tasks: [
      { label: 'Software Task 1', file: 'SW_1.pdf' },
      { label: 'Software Task 2', file: 'SW_2.pdf' },
      { label: 'Software Task 3', file: 'SW_3.pdf' },
    ],
  },
  {
    id: 'hardware',
    icon: '🔧',
    title: 'Hardware',
    description: 'Hands-on hardware circuit building, testing and troubleshooting tasks.',
    color: '#8e44ad',
    tasks: [
      { label: 'Hardware Task 1', file: 'HC_1.pdf' },
      { label: 'Hardware Task 2', file: 'HC_2.pdf' },
    ],
  },
  {
    id: 'mathlabs',
    icon: '📊',
    title: 'Mathlabs / Data',
    description: 'Data analysis, visualisation and Python plotting tasks using Mathlabs.',
    color: '#e67e22',
    tasks: [
      { label: 'Mathlabs Task 1', file: 'ML_1.pdf' },
    ],
  },
  {
    id: 'pr',
    icon: '📣',
    title: 'Public Relations',
    description: 'Communication, content creation, outreach and team representation tasks.',
    color: '#16a085',
    tasks: [
      { label: 'Public Relations Task 1', file: 'PR_1.pdf' },
      { label: 'Public Relations Task 2', file: 'PR_2.pdf' },
    ],
  },
];

interface HackathonSection {
  id: number;
  icon: string;
  title: string;
  badge?: string;
  content: React.ReactNode;
}

const hackathonSections = (styles: Record<string, string>): HackathonSection[] => [
  {
    id: 1,
    icon: '',
    title: "What is NAVKRITI '26?",
    content: (
      <div>
        <p className={styles.sihText}>
          <strong>NAVKRITI &apos;26</strong> is SFIT&apos;s college-level internal hackathon for Smart India Hackathon 2026. It provides students with a platform to solve pressing real-world challenges, showcase engineering excellence, and present their ideas.
        </p>
        <div className={styles.sihHighlightCard}>
          <h4>Inculcating Innovation</h4>
          <p>NAVKRITI &apos;26 aims to nurture a culture of product design, engineering excellence, and collaborative problem-solving among engineering and technology students.</p>
        </div>
        <ul className={styles.sihList}>
          <li><strong>Edition:</strong> NAVKRITI &apos;26</li>
          <li><strong>Format:</strong> Internal hackathon screening and evaluation by industry experts.</li>
          <li><strong>Eligibility:</strong> Open to all active students of St. Francis Institute of Technology (SFIT).</li>
        </ul>
      </div>
    )
  },
  {
    id: 2,
    icon: '',
    title: 'Who Can Participate?',
    content: (
      <div>
        <p className={styles.sihText}>
          Participation in NAVKRITI &apos;26 must follow these strict composition guidelines:
        </p>
        <div className={styles.sihGrid}>
          <div className={styles.sihCardItem}>

            <h5>Team Size</h5>
            <p>Exactly <strong>6 members</strong> per team. No more, no less.</p>
          </div>
          <div className={styles.sihCardItem}>

            <h5>Gender Diversity</h5>
            <p>At least <strong>1 female member</strong> is mandatory in every team.</p>
          </div>
          <div className={styles.sihCardItem}>

            <h5>Same College</h5>
            <p>All members must be active students of <strong>SFIT</strong>.</p>
          </div>
          <div className={styles.sihCardItem}>

            <h5>Interdepartmental</h5>
            <p>Interdepartmental teams are allowed. Members can be from <strong>different branches</strong>.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    icon: '',
    title: 'Note for Registrations',
    content: (
      <div>
        <p className={styles.sihText}>
          To register your team for NAVKRITI &apos;26, please review these key instructions:
        </p>
        <div className={styles.sihHighlightCard}>
          <h4>Team Leader Registration Only</h4>
          <p>
            Only the <strong>Team Leader</strong> should fill out and submit the registration form for the entire team. Individual team members do not need to register separately.
          </p>
        </div>
        <div className={styles.sihHighlightCard} style={{ marginTop: '1rem', borderLeftColor: '#25D366', background: 'rgba(37, 211, 102, 0.05)' }}>
          <h4 style={{ color: '#128C7E' }}>Join Official WhatsApp Group</h4>
          <p>
            It is mandatory for the Team Leader to join the official coordination group to receive announcements, problem statements, and pitching guidelines:
          </p>
          <a
            href="https://chat.whatsapp.com/IUWSn3zOWUK8Vp5mFJWaeQ?s=cl&p=a&ilr=1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '0.75rem',
              padding: '0.6rem 1.25rem',
              backgroundColor: '#25D366',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.88rem',
              boxShadow: '0 2px 8px rgba(37, 211, 102, 0.3)'
            }}
          >
            💬 Join WhatsApp Group
          </a>
        </div>
      </div>
    )
  },
  {
    id: 4,
    icon: '',
    title: 'Important Dates',
    badge: 'Critical',
    content: (
      <div>
        <p className={styles.sihText}>
          Please keep a close eye on these milestones. Missing deadlines will result in automatic disqualification from the round.
        </p>
        <div className={styles.tableContainer}>
          <table className={styles.sihTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>Milestone / Event</th>
                <th>Deadline / Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Internal Team Registration</td>
                <td><span className={styles.dateBadge}>17th - 22nd August 2026</span></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Problem Statement Submission</td>
                <td><span className={styles.dateBadge}>25th - 28th August 2026</span></td>
              </tr>
              <tr>
                <td>3</td>
                <td>SFIT NAVKRITI &apos;26 Hackathon Round (Jury Pitch)</td>
                <td><span className={styles.dateBadge}>29th August 2026</span></td>
              </tr>
              {/* <tr>
                <td>4</td>
                <td>NAVKRITI &apos;26 Grand Finale Announcement</td>
                <td><span className={styles.dateBadge}>TBA</span></td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    )
  },
  {
    id: 5,
    icon: '',
    title: 'Tracks & Problem Statements',
    content: (
      <div className={styles.sihHighlightCard} style={{ borderLeftColor: '#e10600', background: 'rgba(225, 6, 0, 0.05)' }}>
        <h4 style={{ color: '#e10600' }}>Smart India Hackathon 2026 Problem Statements</h4>
        <p style={{ marginBottom: '1rem' }}>
          The official problem statements for SIH 2026 have been released on the national portal. You can browse them to start brainstorming ideas for NAVKRITI &apos;26.
        </p>
        <a
          href="https://www.sih.gov.in/sih2026PS"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.25rem',
            backgroundColor: '#e10600',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '0.88rem',
            boxShadow: '0 4px 12px rgba(225, 6, 0, 0.2)',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
        >
          🔍 View SIH 2026 Problem Statements
        </a>
      </div>
    )
  },
  {
    id: 6,
    icon: '',
    title: "How NAVKRITI '26 Works",
    content: (
      <div>
        <p className={styles.sihText}>
          The road from team formation to the NAVKRITI &apos;26 final round:
        </p>
        <div className={styles.sihTimeline}>
          <div className={styles.sihTimelineItem}>
            <div className={styles.sihTimelineBadge}>1</div>
            <div className={styles.sihTimelineContent}>
              <h6>Team Setup & Registration</h6>
              <p>Form your team of 6 (minimum 1 female). Submit the internal registration form before the deadline.</p>
            </div>
          </div>
          <div className={styles.sihTimelineItem}>
            <div className={styles.sihTimelineBadge}>2</div>
            <div className={styles.sihTimelineContent}>
              <h6>Preparation Time for Problem statements</h6>
              <p>Complete the domain tasks (listed below) to qualify and show technical execution capabilities.</p>
            </div>
          </div>
          <div className={styles.sihTimelineItem}>
            <div className={styles.sihTimelineBadge}>3</div>
            <div className={styles.sihTimelineContent}>
              <h6>Final Presentation</h6>
              <p>Present your solution PPT at the SFIT NAVKRITI &apos;26 Hackathon round.</p>
            </div>
          </div>
          {/* <div className={styles.sihTimelineItem}>
            <div className={styles.sihTimelineBadge}>4</div>
            <div className={styles.sihTimelineContent}>
              <h6>Final Pitching</h6>
              <p>Selected top teams will pitch at the grand NAVKRITI &apos;26 finale.</p> */}
        </div>
      </div>
    )
  },
  {
    id: 7,
    icon: '',
    title: 'Common Mistakes to Avoid',
    content: (
      <div>
        <p className={styles.sihText}>
          Pay extreme attention to these common pitfalls that have led to immediate disqualification in previous editions:
        </p>
        <div style={{ background: 'rgba(225, 6, 0, 0.05)', borderLeft: '4px solid #e10600', padding: '1rem', borderRadius: '4px' }}>
          <ul className={styles.sihList} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: 0, paddingLeft: '1.25rem' }}>
            <li><strong>1. No Female Teammate:</strong> Absolute showstopper. At least <strong>1 female</strong> is <strong>strictly required</strong>.</li>
            <li><strong>2. Incomplete PPT:</strong> Changing slide layouts, omitting team names, or deleting the <strong>problem statement ID slide</strong>.</li>
            <li><strong>3. Plagiarized Projects:</strong> Copy-pasting popular GitHub repos. <strong>Plagiarism scans</strong> are run by national organizers.</li>
            <li><strong>4. Hardcoded Mockups:</strong> Showing screens that have <strong>zero actual logic</strong> or functionality during evaluation.</li>
            <li><strong>5. Poor Pitch Timing:</strong> Not allocating time for the <strong>prototype demo</strong> during the short jury pitch.</li>
            <li><strong>6. Siloed Contributions:</strong> If the speaker knows everything but other teammates <strong>cannot answer simple questions</strong>.</li>
            <li><strong>7. Choosing Incompatible Tracks:</strong> Submitting a pure software solution under the <strong>hardware track</strong> to avoid software competition.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 8,
    icon: '',
    title: 'Contact & Queries',
    content: (
      <div>
        <p className={styles.sihText}>
          For queries regarding team registration, event rules, or submissions, reach out to the NAVKRITI &apos;26 coordinators:
        </p>
        <div className={styles.contactsGrid}>
          <div className={styles.contactCard}>
            <div className={styles.contactIconWrap}></div>
            <div className={styles.contactDetails}>
              <span className={styles.contactRole}>NAVKRITI &apos;26 Coordinator</span>
              <h5 className={styles.contactName}>Pal Rajak</h5>
              <a href="tel:+917208697241" className={styles.contactPhone}>+91 72086 97241</a>
            </div>
          </div>
          <div className={styles.contactCard}>
            <div className={styles.contactIconWrap}></div>
            <div className={styles.contactDetails}>
              <span className={styles.contactRole}>NAVKRITI &apos;26 Coordinator</span>
              <h5 className={styles.contactName}>Jhoshua Coutinho</h5>
              <a href="tel:+918976357005" className={styles.contactPhone}>+91 89763 57005</a>
            </div>
          </div>
          <div className={styles.contactCard}>
            <div className={styles.contactIconWrap}></div>
            <div className={styles.contactDetails}>
              <span className={styles.contactRole}>NAVKRITI &apos;26 Coordinator</span>
              <h5 className={styles.contactName}>Zion Naranje</h5>
              <a href="tel:+918355818735" className={styles.contactPhone}>+91 83558 18735</a>
            </div>
          </div>
          <div className={styles.contactCard}>
            <div className={styles.contactIconWrap}></div>
            <div className={styles.contactDetails}>
              <span className={styles.contactRole}>NAVKRITI &apos;26 Coordinator</span>
              <h5 className={styles.contactName}>Rich Rebello</h5>
              <a href="tel:+918828242446" className={styles.contactPhone}>+91 88282 42446</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

// ─── Animations ───────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function TasksPage() {
  useEffect(() => {
    document.title = "NAVKRITI '26 | Team RAW Hackathon Portal";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', "Official NAVKRITI '26 hackathon and task submission portal of Robotics and Aviation Wing (RAW) for Smart India Hackathon.");
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'noindex, nofollow');
  }, []);

  const totalTasks = categories.reduce((s, c) => s + c.tasks.length, 0);

  const [activeTab, setActiveTab] = useState(0);
  const sections = hackathonSections(styles);

  const getFileUrl = (file: string) => {
    if (file.startsWith('..')) {
      return file.substring(2);
    }
    return `/navkriti-26/${file}`;
  };

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Open modal directly if URL contains #submit
  useEffect(() => {
    if (window.location.hash === '#submit') {
      setIsSubmitModalOpen(true);
    }
    const onHashChange = () => {
      if (window.location.hash === '#submit') {
        setIsSubmitModalOpen(true);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Keep hash in sync with modal state
  const openSubmitModal = () => {
    setIsSubmitModalOpen(true);
    window.history.replaceState(null, '', '#submit');
  };
  const closeSubmitModal = () => {
    setIsSubmitModalOpen(false);
    window.history.replaceState(null, '', window.location.pathname);
  };

  const [submitFormData, setSubmitFormData] = useState({
    fullName: '',
    pid: '',
    driveLink: '',
    teamName: '',
    problemStatement: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setSubmitError('Please select a PPT file to upload.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // 1. Upload to Supabase Storage
      const supabaseUrl = process.env.NEXT_PUBLIC_Storage_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_Storage_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase configuration is missing. Please contact the administrator.');
      }

      // Generate a descriptive, sanitized file name containing metadata details
      const cleanTeam = submitFormData.teamName.replace(/[^a-zA-Z0-9_-]/g, '_');
      const cleanProblem = submitFormData.problemStatement.replace(/[^a-zA-Z0-9_-]/g, '_');
      const cleanLeader = submitFormData.fullName.replace(/[^a-zA-Z0-9_-]/g, '_');
      const cleanFileName = selectedFile.name.replace(/[^a-zA-Z0-9._-]/g, '_');

      const filePath = `navkriti-26/${cleanTeam}_${cleanProblem}_${cleanLeader}_${submitFormData.pid}_${cleanFileName}`;

      const bucketName = 'submissions';
      const uploadUrl = `${supabaseUrl}/storage/v1/object/${bucketName}/${filePath}`;

      const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': selectedFile.type || 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        },
        body: selectedFile,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.message || 'File upload failed.');
      }

      const filePublicUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${filePath}`;

      // 2. Submit metadata to MongoDB
      const payload = {
        fullName: submitFormData.fullName,
        pid: submitFormData.pid,
        driveLink: filePublicUrl, // Pass the uploaded file URL
        teamName: submitFormData.teamName,
        problemStatement: submitFormData.problemStatement,
      };

      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        setSelectedFile(null);
      } else {
        setSubmitError(result.error || 'Failed to submit metadata. Please try again.');
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      setSubmitError(error.message || 'An unexpected error occurred. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <title>NAVKRITI &apos;26 | Team RAW Hackathon Portal</title>
      <meta name="description" content="Official NAVKRITI '26 hackathon and task submission portal of Robotics and Aviation Wing (RAW) for Smart India Hackathon." />
      <meta name="robots" content="noindex, nofollow" />
      <Navbar />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <span className={styles.heroEyebrow}>NAVKRITI &apos;26</span>
          <h1 className={styles.heroTitle}>
            <span
              className={styles.logoContainer}
              style={{ textShadow: '0 0 18px rgba(255,255,255,0.05), 0 0 40px rgba(255,255,255,0.15), 0 0 80px rgba(255,255,255,0.03)' }}
            >
              <span className={styles.spartanPart}>NAV</span>
              <span className={styles.scriptK}>K</span>
              <span className={styles.spartanPart}>RITI&apos;26</span>
            </span>
            <span style={{ display: 'block', fontSize: '0.25em', color: 'rgba(255,255,255,0.45)', fontWeight: 600, letterSpacing: '0.08em', fontStyle: 'italic', margin: '0.6em 0 0.4em 0' }}>
              ( नवकृतिः : नवमेषः राष्ट्रहितार्थम् )
            </span>
            <span className={styles.accent}>Information Portal</span>
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.25)', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Internal Hackathon for Smart India Hackathon 2026
          </p>
          <p className={styles.heroSubtitle}>
            Review the NAVKRITI &apos;26 rules, team specifications, crucial deadlines, and resources. Solve your domain tasks below to apply.
          </p>
        </motion.div>
      </section>
      
      {/* ── Submit CTA ──
      <motion.section
        className={styles.cta}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.ctaTitle}>Upload your SIH PPT</h2>
        <p className={styles.ctaText}>
          Upload your PPT presentation file containing all work details directly to our reviewers.
        </p>
        <motion.button
          className={styles.ctaBtn}
          onClick={() => setIsSubmitModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          Upload Completed PPT →
        </motion.button>
      </motion.section>
      */}

      {/* ── NAVKRITI Information Section ── */}
      <section className={styles.sihSection} id="navkriti-info">
        <div className={styles.sihDashboard}>
          {/* Tabs Navigation */}
          <div className={styles.sihTabsList}>
            {sections.map((sec, idx) => (
              <button
                key={sec.id}
                className={`${styles.sihTabButton} ${activeTab === idx ? styles.sihTabActive : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                <span className={styles.sihTabNumber}>{String(sec.id).padStart(2, '0')}</span>
                <span className={styles.sihTabIcon}>{sec.icon}</span>
                <span className={styles.sihTabLabel}>{sec.title}</span>
                {sec.badge && (
                  <span
                    className={styles.sihTabBadge}
                    style={{
                      background: sec.badge === 'Critical' ? '#e10600' : '#00a651'
                    }}
                  >
                    {sec.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Content Pane */}
          <div className={styles.sihContentPane}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className={styles.sihContentBody}
              >
                <div className={styles.sihContentHeader}>
                  <span className={styles.sihContentIcon}>{sections[activeTab].icon}</span>
                  <div>
                    <span className={styles.sihContentEyebrow}>
                      Section {String(sections[activeTab].id).padStart(2, '0')}
                    </span>
                    <h3 className={styles.sihContentTitle}>{sections[activeTab].title}</h3>
                  </div>
                </div>
                <div className={styles.sihContentDetail}>
                  {sections[activeTab].content}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>



      {/* ── Category sections ── */}
      <section className={styles.categoriesSection}>
        <div className={styles.categoriesInner}>
          {categories.filter(cat => cat.id === 'electronics').map((cat) => (
            <motion.div
              key={cat.id}
              className={styles.categoryBlock}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
            >
              {/* Category header */}
              <div className={styles.catHeader}>
                <div className={styles.catIcon} style={{ background: cat.color }}>
                  {cat.icon.startsWith('http') ? (
                    <img
                      src={cat.icon}
                      alt=""
                      style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                    />
                  ) : (
                    cat.icon
                  )}
                </div>
                <div className={styles.catInfo}>
                  <h2 className={styles.catTitle}>{cat.title}</h2>
                  <p className={styles.catDesc}>{cat.description}</p>
                </div>
                <span className={styles.catCount} style={{ color: cat.color }}>
                  {cat.tasks.length} task{cat.tasks.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Task cards */}
              <motion.div
                className={styles.taskGrid}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {cat.tasks.map((task) => (
                  <motion.div
                    key={task.file}
                    className={styles.taskCard}
                    variants={cardVariants}
                    whileHover={{ y: -4, boxShadow: `0 12px 32px rgba(0,0,0,0.10)` }}
                  >
                    <div className={styles.taskCardTop}>
                      <div
                        className={styles.taskCardIconWrap}
                        style={{ background: `${cat.color}18`, border: `1.5px solid ${cat.color}30` }}
                      >
                        <span className={styles.taskCardIcon}>📄</span>
                      </div>
                      <div>
                        <p className={styles.taskCardLabel}>{task.label}</p>
                        <p className={styles.taskCardFormat}>
                          PDF Document{task.zipFile ? ' + ZIP Bundle' : ''}
                        </p>
                      </div>
                    </div>

                    <div className={styles.taskCardActions}>
                      <a
                        href={getFileUrl(task.file)}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.btnView}
                        style={{ borderColor: cat.color, color: cat.color }}
                      >
                        👁 View
                      </a>

                      {task.zipFile ? (
                        <div className={styles.downloadDropdown}>
                          <button
                            className={styles.btnDownloadMain}
                            style={{ background: cat.color }}
                          >
                            ⬇ Download ▼
                          </button>
                          <div className={styles.dropdownMenu}>
                            <a
                              href={`/navkriti-26/${task.file}`}
                              download
                              className={styles.dropdownItem}
                            >
                              📄 PDF Only
                            </a>
                            <a
                              href={`/navkriti-26/${task.zipFile}`}
                              download
                              className={styles.dropdownItem}
                            >
                              🗜️ ZIP Bundle
                            </a>
                          </div>
                        </div>
                      ) : (
                        <a
                          href={getFileUrl(task.file)}
                          download
                          className={styles.btnDownload}
                          style={{ background: cat.color }}
                        >
                          ⬇ Download
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>




      {/* ── Submission Modal ── */}
      <AnimatePresence>
        {isSubmitModalOpen && (
          <div className={styles.modalOverlay} onClick={() => setIsSubmitModalOpen(false)}>
            <motion.div
              className={styles.modalContent}
              style={submitSuccess ? { maxWidth: '550px' } : {}}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>
                  Task Submission <span className={styles.accent}>Portal</span>
                </h2>
                <button className={styles.btnClose} onClick={() => setIsSubmitModalOpen(false)}>
                  &times;
                </button>
              </div>

              <div className={styles.modalBody} style={submitSuccess ? { display: 'block', padding: '2rem 1.5rem' } : {}}>
                {submitSuccess ? (
                  <div className={styles.successCard}>
                    <div className={styles.successIcon}>✓</div>
                    <h3 className={styles.successTitle}>Submission Successful!</h3>
                    <p className={styles.successMsg}>
                      Thank you for submitting your task. Your PPT presentation file has been uploaded and received successfully.
                      Our reviewers will evaluate your submission.
                    </p>

                    <div style={{
                      marginTop: '1.5rem',
                      marginBottom: '1.5rem',
                      padding: '1.25rem',
                      border: '1px solid rgba(37, 211, 102, 0.3)',
                      background: 'rgba(37, 211, 102, 0.08)',
                      borderRadius: '8px',
                      textAlign: 'center',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <h4 style={{ color: '#25D366', margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: '700' }}>Join Official WhatsApp Group</h4>
                      <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.9rem', margin: '0 0 1.25rem 0', lineHeight: '1.5', maxWidth: '500px' }}>
                        It is mandatory for the Team Leader to join the official coordination group to receive announcements, problem statements, and pitching guidelines.
                      </p>
                      <a
                        href="https://chat.whatsapp.com/IUWSn3zOWUK8Vp5mFJWaeQ?s=cl&p=a&ilr=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.65rem 1.5rem',
                          backgroundColor: '#25D366',
                          color: '#fff',
                          textDecoration: 'none',
                          borderRadius: '6px',
                          fontWeight: '600',
                          fontSize: '0.88rem',
                          boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)',
                          cursor: 'pointer'
                        }}
                      >
                        💬 Join WhatsApp Group
                      </a>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                      <button
                        className={styles.btnDone}
                        onClick={() => {
                          setIsSubmitModalOpen(false);
                          setSubmitSuccess(false);
                          setSubmitFormData({
                            fullName: '',
                            pid: '',
                            driveLink: '',
                            teamName: '',
                            problemStatement: '',
                          });
                          setSelectedFile(null);
                        }}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Column 1: Instructions */}
                    <div className={styles.instructionsCol}>
                      <div className={styles.instructionSection}>
                        <h3 className={styles.sectionTitle}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }}>
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                          </svg>
                          File Naming
                        </h3>
                        <ul>
                          <li>Rename your PPT file strictly as: <strong>TeamLeaderPID_TeamName</strong> (Example: <code>123123_TeamVolt.pptx</code>).</li>
                          <li>The file must contain your complete <strong>Idea Presentation PPT</strong>.</li>
                          <li>Ensure all information is final and clearly visible.</li>
                        </ul>
                      </div>

                      <div className={styles.instructionSection}>
                        <h3 className={styles.sectionTitle}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }}>
                            <line x1="18" y1="20" x2="18" y2="10"></line>
                            <line x1="12" y1="20" x2="12" y2="4"></line>
                            <line x1="6" y1="20" x2="6" y2="14"></line>
                          </svg>
                          What to Include
                        </h3>
                        <ul>
                          <li><strong>PPT File:</strong> Use the official NAVKRITI &apos;26 Idea Presentation format. Do not alter slide layouts or delete the Problem Statement ID slide.</li>
                          <li>File format must be <code>.ppt</code> or <code>.pptx</code> (max 15MB).</li>
                        </ul>
                      </div>

                      <div className={styles.instructionSection}>
                        <h3 className={styles.sectionTitle}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }}>
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          Team Details
                        </h3>
                        <ul>
                          <li>Only the <strong>Team Leader</strong> should upload the PPT file below.</li>
                          <li>Do <strong>not</strong> submit multiple times — one upload per team only.</li>
                        </ul>
                      </div>

                      <div className={styles.alertBox}>
                        <h4>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem', color: '#ff9800' }}>
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                          </svg>
                          Important Checklist
                        </h4>
                        <ul>
                          <li><strong>Valid PPT File:</strong> Ensure the file uploads successfully and is not corrupted.</li>
                          <li><strong>Correct PPT Format:</strong> Use only the official NAVKRITI &apos;26 template — no layout changes.</li>
                          <li><strong>No Plagiarism:</strong> Submissions are scanned. Copied ideas will be disqualified.</li>
                          <li><strong>Deadline:</strong> Late uploads will not be accepted.</li>
                        </ul>
                      </div>
                    </div>

                    {/* Column 2: Form */}
                    <form className={styles.formCol} onSubmit={handleFormSubmit}>
                      <h3>Submit Your Work</h3>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Team Name *</label>
                        <input
                          type="text"
                          required
                          className={styles.formInput}
                          placeholder="e.g. Team Alfa"
                          value={submitFormData.teamName}
                          onChange={(e) => setSubmitFormData({ ...submitFormData, teamName: e.target.value })}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Leader Name *</label>
                        <input
                          type="text"
                          required
                          className={styles.formInput}
                          placeholder="e.g. Pavitra Prabhakar"
                          value={submitFormData.fullName}
                          onChange={(e) => setSubmitFormData({ ...submitFormData, fullName: e.target.value })}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>PID (6 digits) *</label>
                        <input
                          type="text"
                          required
                          pattern="\d{6}"
                          className={styles.formInput}
                          placeholder="e.g. 270270"
                          value={submitFormData.pid}
                          onChange={(e) => setSubmitFormData({ ...submitFormData, pid: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Problem Statement Track *</label>
                        <input
                          type="text"
                          required
                          className={styles.formInput}
                          placeholder="SIH26001"
                          value={submitFormData.problemStatement}
                          onChange={(e) => setSubmitFormData({ ...submitFormData, problemStatement: e.target.value })}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Upload PPT File (.ppt, .pptx) *</label>
                        <input
                          type="file"
                          required
                          accept=".ppt,.pptx"
                          className={styles.formInput}
                          style={{ padding: '0.5rem' }}
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setSelectedFile(e.target.files[0]);
                            }
                          }}
                        />
                        <span className={styles.infoHint}>Maximum file size: 15MB. Only PowerPoint files (.ppt, .pptx) are allowed.</span>
                      </div>

                      {submitError && (
                        <div className={styles.errorMessage}>
                          {submitError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles.btnSubmit}
                      >
                        {isSubmitting ? (
                          <>
                            <span className={styles.spinner}></span>
                            Uploading...
                          </>
                        ) : (
                          'Upload PPT & Submit'
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
