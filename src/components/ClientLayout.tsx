'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './layout.module.css'
import Navigation from './Navigation'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [isDarkTheme, setIsDarkTheme] = useState(false)
    const pathname = usePathname()

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme)
    }

    const getPageTitle = () => {
        if (pathname === '/work') return 'work'
        if (pathname === '/reads') return 'reads'
        return 'about me'
    }

    return (
        <div className={`${styles.container} ${isDarkTheme ? `${styles.darkTheme} dark-theme` : ''}`}>
            <Navigation isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
            <div className={styles.contentArea}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{getPageTitle()}</h1>
                </header>
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </div>
    )
}
