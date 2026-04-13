'use client'

import { motion } from 'framer-motion'
import { HiDownload, HiArrowDown } from 'react-icons/hi'
import styles from './Hero.module.css'

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
        {/* Main Content */}
        <div className={styles.content}>
          <motion.div
            className={styles.textContent}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className={styles.title}>
              Isaac-Great <span className={styles.highlight}>Atanda</span>
            </h1>
            <p className={styles.subtitle}>Embedded Systems Engineer</p>

            {/* CV Card */}
            <div className={styles.cvCard}>
              <div className={styles.cvIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="14 2 14 8 20 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={styles.cvInfo}>
                <h3>Isaac-Great Atanda CV</h3>
                <p>Embedded Systems • Electronics • Researcher</p>
              </div>
              <div className={styles.cvActions}>
                <a 
                  href="/pdf/Atanda Isaac-great RESUME.pdf" 
                  download="Isaac-Great-Atanda-CV.pdf"
                  className={styles.btnDownload}
                  style={{ textDecoration: 'none' }}
                >
                  <HiDownload />
                  Download CV.pdf
                </a>
              </div>
            </div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className={styles.profileSection}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className={styles.profileImage}>
              <img src="/images/headshot.jpeg" alt="Isaac-Great Atanda" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
