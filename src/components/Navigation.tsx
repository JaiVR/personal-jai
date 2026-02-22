'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './layout.module.css'

interface NavigationProps {
    isDarkTheme: boolean
    toggleTheme: () => void
}

export default function Navigation({ isDarkTheme, toggleTheme }: NavigationProps) {
    const pathname = usePathname()

    // Determine active tab based on pathname
    // / -> about
    // /work -> work
    // /reads -> reads
    const getActiveTab = () => {
        if (pathname === '/work') return 'work'
        if (pathname === '/reads') return 'reads'
        return 'about'
    }

    const activeTab = getActiveTab()

    return (
        <div className={styles.menuBar}>
            <ul>
                <li>
                    <Link
                        href="/"
                        className={activeTab === 'about' ? styles.active : ''}
                    >
                        about
                    </Link>
                </li>
                <li>
                    <Link
                        href="/work"
                        className={activeTab === 'work' ? styles.active : ''}
                    >
                        work
                    </Link>
                </li>
                <li>
                    <Link
                        href="/reads"
                        className={activeTab === 'reads' ? styles.active : ''}
                    >
                        reads
                    </Link>
                </li>
            </ul>
            <div
                className={`${styles.themeToggle} ${isDarkTheme ? styles.toggleDark : styles.toggleLight}`}
                onClick={toggleTheme}
            >
                <div className={styles.toggleSlider}></div>
            </div>
        </div>
    )
}
