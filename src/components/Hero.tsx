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
        {/* Status Indicators */}
        <motion.div
          className={styles.statusBar}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.statusItem}>
            <span className={styles.statusDotActive} />
            <span>ACTIVE_MODE</span>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className={styles.content}>
          <motion.div
            className={styles.textContent}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className={styles.title}>
              Hub & <span className={styles.highlight}>Resume</span>
            </h1>
            <p className={styles.subtitle}>Multi-disciplined Engineer</p>

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
                <h3>Full name CV</h3>
                <p>Embedded • Graphics • Frontend</p>
              </div>
              <div className={styles.cvActions}>
                <button className={styles.btnDownload}>
                  <HiDownload />
                  Download CV.pdf
                </button>
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
              <div className={styles.profilePlaceholder}>AP</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
