'use client'

import { motion } from 'framer-motion'
import { FaMicrochip, FaPalette, FaCode } from 'react-icons/fa'
import styles from './About.module.css'

interface AboutProps {
  onNavigate?: (id: string) => void
}

const About = ({ onNavigate }: AboutProps) => {
  const skills = [
    {
      icon: <FaMicrochip />,
      title: 'EMBEDDED SYSTEMS',
      description: 'Firmware design, microcontrollers, and IoT solutions for modern hardware applications.',
      color: 'lime',
      stats: { label: 'DEVICES PROGRAMMED', value: '15+' },
    },
    {
      icon: <FaPalette />,
      title: 'CONTENT CREATOR',
      description: 'Founder of DeeThunderNexus Ventures, creating educational electronics and tech content.',
      color: 'magenta',
      stats: { label: 'STUDENTS REACHED', value: '100+' },
    },
    {
      icon: <FaCode />,
      title: 'STEM EDUCATOR',
      description: 'Training and mentoring the next generation of engineers in embedded systems and electronics.',
      color: 'cyan',
      stats: { label: 'WORKSHOPS LED', value: '5+' },
    },
  ]

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>
            <span className={styles.titleLine}>HARDWARE.</span>
            <span className={`${styles.titleLine} ${styles.highlight}`}>ENGINEER.</span>
            <span className={styles.titleLine}>EDUCATOR.</span>
          </h2>
          <p className={styles.tagline}>
            High-performance engineering across{' '}
            <span className={styles.accentLime}>hardware</span>,{' '}
            <span className={styles.accentMagenta}>firmware</span>, and{' '}
            <span className={styles.accentCyan}>education</span>.
          </p>
        </motion.div>

        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              className={`${styles.skillCard} ${styles[skill.color]}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.skillIcon}>{skill.icon}</div>
              <div className={styles.skillHeader}>
                <h3 className={styles.skillTitle}>{skill.title}</h3>
                <div className={styles.statusIndicator}>
                  <span className={styles.statusDot} />
                  <span>OPERATIONAL</span>
                </div>
              </div>
              <p className={styles.skillDescription}>{skill.description}</p>
              <div className={styles.skillStats}>
                <div className={styles.statValue}>{skill.stats.value}</div>
                <div className={styles.statLabel}>{skill.stats.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.initButton}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <button
            className={styles.btnInit}
            onClick={() => onNavigate?.('works')}
          >
            EXPLORE PROJECTS →
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default About
