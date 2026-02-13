'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import styles from './Navigation.module.css'

interface NavigationProps {
  onNavigate?: (id: string) => void
  activeView?: string | null
}

const Navigation = ({ onNavigate, activeView }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (id: string) => {
    onNavigate?.(id)
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Works', id: 'works' },
    { label: 'Connect', id: 'connect' },
  ]

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/' },
  ]

  return (
    <motion.nav
      className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => handleNavClick('home')}>
          <div className={styles.logoIcon}>AP</div>
          <div className={styles.logoText}>
            <span className={styles.systemLabel}>Portfolio</span>
            <span className={styles.statusDot} />
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className={styles.navLinks}>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={`${styles.navLink} ${activeView === item.id ? styles.active : ''}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.mobileMenuToggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className={styles.mobileMenu}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`${styles.mobileNavLink} ${activeView === item.id ? styles.active : ''}`}
            >
              {item.label}
            </button>
          ))}
          <div className={styles.mobileSocials}>
            {socialLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.mobileSocialLink}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navigation
