'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMail, HiUser, HiChatAlt2, HiArrowNarrowRight, HiCheckCircle } from 'react-icons/hi'
import styles from './Contact.module.css'

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://formspree.io/f/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
      } else {
        alert('There was an error sending your message. Please try again.')
      }
    } catch (error) {
      alert('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Send a <span className={styles.highlight}>Message</span></h2>
          <p className={styles.subtitle}>
            Send us a message and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className={styles.content}>
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={styles.form}
                onSubmit={handleSubmit}
              >
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.label}>
                    <HiUser className={styles.icon} />
                    <span>Name</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Full Name..."
                    className={styles.input}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.label}>
                    <HiMail className={styles.icon} />
                    <span>Email</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="email@protocol.com"
                    className={styles.input}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="message" className={styles.label}>
                    <HiChatAlt2 className={styles.icon} />
                    <span>Message</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    placeholder="Enter message..."
                    className={styles.textarea}
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${styles.submitBtn} ${isSubmitting ? styles.loading : ''}`}
                >
                  <span className={styles.btnText}>
                    {isSubmitting ? 'TRANSMITTING...' : 'EXECUTE SEND'}
                  </span>
                  {!isSubmitting && <HiArrowNarrowRight className={styles.arrow} />}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={styles.successMessage}
              >
                <HiCheckCircle className={styles.successIcon} />
                <h3>TRANSMISSION COMPLETE</h3>
                <p>Message successfully received. I'll get back to you as soon as possible.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className={styles.resetBtn}
                >
                  SEND ANOTHER MESSAGE
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Contact
