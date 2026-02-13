'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
const BootLoader = dynamic(() => import('@/components/BootLoader'), { ssr: false })

const Hero = dynamic(() => import('@/components/Hero'), { ssr: false })
const About = dynamic(() => import('@/components/About'), { ssr: false })
const ProjectGallery = dynamic(() => import('@/components/ProjectGallery'), { ssr: false })
const Terminal = dynamic(() => import('@/components/Terminal'), { ssr: false })
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false })

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [activeView, setActiveView] = useState<string | null>('home')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Show boot loader for 3.5 seconds
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3500)

    return () => {
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timer)
    }
  }, [])

  if (loading) {
    return <BootLoader />
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return <Hero />
      case 'about':
        return <About onNavigate={setActiveView} />
      case 'works':
        return <ProjectGallery />
      case 'connect':
        return <Contact />
      default:
        return null
    }
  }

  return (
    <>
      <main className="portfolio-main">
        {!isMobile && (
          <div className="terminal-container">
            <Terminal onNavigate={setActiveView} />
          </div>
        )}
        <div className={`gui-container ${activeView ? 'active' : ''}`}>
          <Navigation onNavigate={setActiveView} activeView={activeView} />
          <AnimatePresence mode="wait">
            {activeView && (
              <motion.div
                key={activeView}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="view-wrapper"
              >
                {renderActiveView()}
              </motion.div>
            )}
            {!activeView && !isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="empty-state"
              >
                <div className="empty-content">
                  <h2>[SYSTEM] CORE OFFLINE</h2>
                  <p>AWAITING COMMAND INPUT FROM TERMINAL_</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  )
}
