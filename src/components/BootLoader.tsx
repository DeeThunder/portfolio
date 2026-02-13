'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import styles from './BootLoader.module.css'

const BootLoader = () => {
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)

  const bootMessages = [
    'INITIALIZING CORE SYSTEMS...',
    'ESTABLISHING PROTOCOLS...',
    'SYSTEM READY',
  ]

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    // Message rotation
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => {
        if (prev < bootMessages.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 800)

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
    }
  }, [])

  return (
    <motion.div
      className={styles.bootLoader}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.content}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>AP</div>
          <div className={styles.systemInfo}>Portfolio</div>
        </div>

        <div className={styles.bootSequence}>
          {bootMessages.map((message, index) => (
            <motion.div
              key={index}
              className={`${styles.bootMessage} ${
                index === currentMessage ? styles.active : ''
              } ${index < currentMessage ? styles.complete : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: index <= currentMessage ? 1 : 0.3,
                x: 0,
              }}
              transition={{ delay: index * 0.2 }}
            >
              <span className={styles.prompt}>{'>'}</span>
              <span className={styles.messageText}>{message}</span>
              {index === currentMessage && (
                <span className={styles.cursor}>_</span>
              )}
            </motion.div>
          ))}
        </div>

        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <motion.div
              className={styles.progressFill}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className={styles.progressText}>{progress}%</div>
        </div>

        <div className={styles.scanLine} />
      </div>
    </motion.div>
  )
}

export default BootLoader
