'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from '../page.module.css'

function ProjectGroup({ title, children }: { title: string, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={styles.projectGroup}>
            <div
                className={styles.dropdownHeader}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={styles.arrow}>{isOpen ? '▼' : '▶'}</span>
                <h4 className={styles.groupTitle}>{title}</h4>
            </div>
            {isOpen && <div className={styles.dropdownContent}>{children}</div>}
        </div>
    )
}

function ExperienceItem({ title, company, techStack, children, defaultOpen = false }: { title: string, company: string, techStack: string, children: React.ReactNode, defaultOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    return (
        <div className={styles.experienceItem}>
            <div
                className={styles.experienceHeader}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className={styles.arrow} style={{ marginRight: '8px', paddingTop: '4px' }}>
                    {isOpen ? '▼' : '▶'}
                </div>
                <div style={{ flex: 1 }}>
                    <div className={styles.jobHeader}>
                        <h3 className={styles.jobTitle}>{title}</h3>
                        <div className={styles.companyInfo}>
                            <span className={styles.company}>{company}</span>
                            {isOpen && <span className={styles.techStack}>{techStack}</span>}
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <div className={styles.experienceContent}>{children}</div>}
        </div>
    )
}

export default function Work() {
    return (
        <div className={styles.content}>
            <div className={styles.workSection}>
                <h3 className={styles.sectionTitle}>exp</h3>

                <ExperienceItem
                    title="r&d intern"
                    company="📡 ericsson telecomm"
                    techStack="tech stack: golang"
                    defaultOpen={true}
                >
                    <p className={styles.jobDescription}><small>built RCA for Ericsson’s 5G cloud infra using causal graph modeling to pinpoint failures across distributed systems</small></p>
                </ExperienceItem>

                <ExperienceItem
                    title="research intern"
                    company="🏛️ ceeri, chennai"
                    techStack="tech stack: python"
                >
                    <p className={styles.jobDescription}><small>worked on building a machine learning model to predict octane value of a fuel given the nir spectra of the fuel</small></p>
                </ExperienceItem>

                <ExperienceItem
                    title="frontend developer"
                    company="🏫 su tech team"
                    techStack="tech stack: nextjs"
                >
                    <p className={styles.jobDescription}><small>worked on some cool projects here, <Link href="https://studydeck.bits-sutechteam.org/" target="_blank" rel="noopener noreferrer">this is one</Link></small></p>
                </ExperienceItem>
            </div>

            <div className={styles.workSection}>
                <h3 className={styles.sectionTitle}>projects</h3>

                <ProjectGroup title="ai/ml">
                    <div className={styles.projectItem}>
                        <Link href="https://github.com/JaiVR/VAE_GenAI" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                            📁 vae_genai
                        </Link>
                    </div>
                    <div className={styles.projectItem}>
                        <Link href="https://github.com/JaiVR/Intelligent-Tutoring-System" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                            📁 intelligent-tutoring-system
                        </Link>
                    </div>
                    <div className={styles.projectItem}>
                        <Link href="https://github.com/JaiVR/AIvsHuman-classifier" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                            📁 aivshuman-classifier
                        </Link>
                    </div>
                    <div className={styles.projectItem}>
                        <Link href="https://github.com/JaiVR/federated-learning-sop" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                            📁 federated-learning-sop
                        </Link>
                    </div>
                    <div className={styles.projectItem}>
                        <Link href="https://github.com/JaiVR/Credit_score-prediction-pySpark-" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                            📁 credit-score-prediction-pyspark
                        </Link>
                    </div>
                    <div className={styles.projectItem}>
                        <Link href="https://github.com/JaiVR/nir_chemometrics" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                            📁 nir-chemometrics
                        </Link>
                    </div>
                    <div className={styles.projectItem}>
                        <Link href="https://github.com/JaiVR/suttmltask_1" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                            📁 suttmltask-1
                        </Link>
                    </div>
                </ProjectGroup>

                <ProjectGroup title="frontend">
                    <div className={styles.projectItem}>
                        <Link href="https://studydeck.bits-sutechteam.org/" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                            🌐 studydeck
                        </Link>
                    </div>
                    <div className={styles.projectItem}>
                        <Link href="https://room.studydeck.bits-sutechteam.org/" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                            🌐 roombooking portal
                        </Link>
                    </div>
                    <div className={styles.projectItem}>
                        <Link href="https://jaivr.github.io/spinxdigitalclone.github.io/#" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                            🌐 spinx digital clone
                        </Link>
                    </div>
                    <div className={styles.projectItem}>
                        <Link href="https://jaivr.github.io/mycalendar.github.io/" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                            🌐 my calendar
                        </Link>
                    </div>
                </ProjectGroup>
            </div>
        </div>
    )
}
