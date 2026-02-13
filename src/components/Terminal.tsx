'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './Terminal.module.css'

interface TerminalLine {
  type: 'command' | 'output' | 'error'
  content: string
  cmd?: string
  url?: string
}

interface TerminalProps {
  onNavigate?: (view: string) => void
}

const Terminal = ({ onNavigate }: TerminalProps) => {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: '[SYSTEM] Interface ready.' },
    { type: 'output', content: 'Available commands:' },
    { type: 'output', content: '  home       - Launch Home dashboard', cmd: 'home' },
    { type: 'output', content: '  about      - Display personnel info', cmd: 'about' },
    { type: 'output', content: '  works      - Open project archive', cmd: 'works' },
    { type: 'output', content: '  connect    - Initialize contact protocol', cmd: 'connect' },
    { type: 'output', content: '  social     - Show external relays', cmd: 'social' },
    { type: 'output', content: '  clear      - Clear terminal buffer', cmd: 'clear' },
    { type: 'output', content: '' },
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const addToHistory = (line: TerminalLine) => {
    setHistory((prev) => [...prev, line])
  }

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()

    addToHistory({ type: 'command', content: `guest@hub:~$ ${cmd}` })

    switch (trimmedCmd) {
      case 'help':
        addToHistory({ type: 'output', content: 'Available commands:' })
        addToHistory({ type: 'output', content: '  home       - Launch Home dashboard', cmd: 'home' })
        addToHistory({ type: 'output', content: '  about      - Display personnel info', cmd: 'about' })
        addToHistory({ type: 'output', content: '  works      - Open project archive', cmd: 'works' })
        addToHistory({ type: 'output', content: '  connect    - Initialize contact protocol', cmd: 'connect' })
        addToHistory({ type: 'output', content: '  social     - Show external relays', cmd: 'social' })
        addToHistory({ type: 'output', content: '  clear      - Clear terminal buffer', cmd: 'clear' })
        break

      case 'home':
        addToHistory({ type: 'output', content: 'Initializing Home GUI...' })
        onNavigate?.('home')
        break

      case 'about':
        addToHistory({ type: 'output', content: 'Loading Personnel Data...' })
        onNavigate?.('about')
        break

      case 'works':
      case 'projects':
        addToHistory({ type: 'output', content: 'Opening Project Archive...' })
        onNavigate?.('works')
        break

      case 'connect':
      case 'contact':
        addToHistory({ type: 'output', content: 'Opening Contact GUI...' })
        onNavigate?.('connect')
        break

      case 'social':
        addToHistory({ type: 'output', content: 'External Relays:' })
        addToHistory({ type: 'output', content: '  GitHub:   https://github.com', url: 'https://github.com' })
        addToHistory({ type: 'output', content: '  LinkedIn: https://linkedin.com', url: 'https://linkedin.com' })
        addToHistory({ type: 'output', content: '  Behance:  https://behance.net', url: 'https://behance.net' })
        break

      case 'clear':
        setHistory([
          { type: 'output', content: '' },
        ])
        break

      default:
        addToHistory({ type: 'error', content: `Command not found: ${cmd}` })
        addToHistory({ type: 'output', content: 'Type "help" for available commands', cmd: 'help' })
    }

    addToHistory({ type: 'output', content: '' })
  }



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setCommandHistory([...commandHistory, input])
      setHistoryIndex(-1)
      executeCommand(input)
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      }
    }
  }

  return (
    <section id="contact" className={styles.terminalSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.terminal}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.terminalHeader}>
            <div className={styles.terminalButtons}>
              <span className={styles.btnRed} />
              <span className={styles.btnYellow} />
              <span className={styles.btnGreen} />
            </div>
            <div className={styles.terminalTitle}>PORTFOLIO TERMINAL</div>
          </div>

          <div className={styles.terminalBody} ref={terminalRef}>
            {history.map((line, index) => (
              <div
                key={index}
                className={`${styles.terminalLine} ${styles[line.type]} ${(line.cmd || line.url) ? styles.clickable : ''}`}
                onClick={() => {
                  if (line.cmd) executeCommand(line.cmd)
                  if (line.url) window.open(line.url, '_blank')
                }}
              >
                {line.content}
              </div>
            ))}

            <form onSubmit={handleSubmit} className={styles.inputLine}>
              <span className={styles.prompt}>guest@hub:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className={styles.input}
                autoFocus
                spellCheck={false}
              />
              <span className={styles.cursor}>_</span>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Terminal
