'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import styles from './ProjectGallery.module.css'

interface Project {
  id: string
  title: string
  category: string
  description: string
  details: string
  tags: string[]
  image: string
  github: string
  demo: string
}

const ProjectGallery = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [displayedCount, setDisplayedCount] = useState(6)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    // Load projects from JSON
    fetch('/data/projects.json')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects)
        setFilteredProjects(data.projects)
      })
  }, [])

  const categories = [
    { id: 'all', label: 'ALL' },
    { id: 'hardware', label: 'HARDWARE' },
    { id: 'design', label: 'DESIGN' },
    { id: 'frontend', label: 'FRONTEND' },
  ]

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setDisplayedCount(6) // Reset pagination

    if (categoryId === 'all') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((p) => p.category === categoryId))
    }
  }

  const loadMore = () => {
    setDisplayedCount((prev) => prev + 6)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hardware':
        return 'lime'
      case 'design':
        return 'magenta'
      case 'frontend':
        return 'cyan'
      default:
        return 'lime'
    }
  }

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>PROJECT ARCHIVE</h2>
          <p className={styles.subtitle}>Technical Documentation</p>
        </motion.div>

        {/* Category Filters */}
        <div className={styles.filters}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.filterBtn} ${
                activeCategory === category.id ? styles.active : ''
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={styles.grid}>
          <AnimatePresence mode="wait">
            {filteredProjects.slice(0, displayedCount).map((project, index) => (
              <motion.div
                key={project.id}
                className={styles.projectCard}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
              >
                <div className={styles.projectImage}>
                  <div className={styles.imagePlaceholder}>
                    {project.title.substring(0, 2).toUpperCase()}
                  </div>
                  <div className={`${styles.categoryBadge} ${styles[getCategoryColor(project.category)]}`}>
                    {project.category.toUpperCase()}
                  </div>
                </div>
                <div className={styles.projectContent}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <div className={styles.projectTags}>
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {displayedCount < filteredProjects.length && (
          <div className={styles.loadMoreContainer}>
            <button className={styles.loadMoreBtn} onClick={loadMore}>
              LOAD MORE PROJECTS
            </button>
          </div>
        )}

        {/* Project Modal */}
        {selectedProject && (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={() => setSelectedProject(null)}>
                ×
              </button>
              <div className={styles.modalHeader}>
                <h2>{selectedProject.title}</h2>
                <span className={`${styles.modalBadge} ${styles[getCategoryColor(selectedProject.category)]}`}>
                  {selectedProject.category.toUpperCase()}
                </span>
              </div>
              <p className={styles.modalDetails}>{selectedProject.details}</p>
              <div className={styles.modalTags}>
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className={styles.modalActions}>
                <a href={selectedProject.github} className={styles.actionBtn}>
                  <FaGithub /> View on GitHub
                </a>
                <a href={selectedProject.demo} className={styles.actionBtn}>
                  <FaExternalLinkAlt /> Live Demo
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default ProjectGallery
