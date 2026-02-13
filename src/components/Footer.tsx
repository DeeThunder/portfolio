'use client'

import { FaGithub, FaLinkedin, FaBehance } from 'react-icons/fa'
import { HiViewGrid, HiLightningBolt, HiUser } from 'react-icons/hi'
import styles from './Footer.module.css'

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com',
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://linkedin.com',
    },
    {
      name: 'Behance',
      icon: <FaBehance />,
      url: 'https://behance.net',
    },
  ]

  const bottomNav = [
    {
      label: 'WORKS',
      icon: <HiViewGrid />,
      id: 'projects',
    },
    {
      label: 'CONNECT',
      icon: <HiLightningBolt />,
      id: 'contact',
    },
    {
      label: 'BIO',
      icon: <HiUser />,
      id: 'about',
    },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* External Relays */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>EXTERNAL RELAYS</h3>
          <div className={styles.socialGrid}>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialCard}
              >
                <div className={styles.socialIcon}>{link.icon}</div>
                <div className={styles.socialName}>{link.name}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Navigation (Mobile) */}
        <div className={styles.bottomNav}>
          {bottomNav.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.id)}
              className={styles.navItem}
            >
              <div className={styles.navIcon}>{item.icon}</div>
              <div className={styles.navLabel}>{item.label}</div>
            </button>
          ))}
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <div className={styles.copyrightText}>
            © 2024 Atanda Peace. All rights reserved.
          </div>
          <div className={styles.systemVersion}>
            <span className={styles.versionDot} />
            SYSTEM.V2 OPERATIONAL
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
