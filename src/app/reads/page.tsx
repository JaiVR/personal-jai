'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import styles from './reads.module.css'

interface ReadItem {
    id: number
    title: string
    url: string
    created_at: string
}

export default function Reads() {
    const [reads, setReads] = useState<ReadItem[]>([])

    // Admin & Modal State
    const [isAdmin, setIsAdmin] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [passwordInput, setPasswordInput] = useState('')
    const [verifiedPassword, setVerifiedPassword] = useState('')

    const [newReadTitle, setNewReadTitle] = useState('')
    const [newReadEmoji, setNewReadEmoji] = useState('📚') // Default emoji
    const [newReadUrl, setNewReadUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    const [fetchError, setFetchError] = useState<string | null>(null)

    useEffect(() => {
        fetchReads()
    }, [])

    const fetchReads = async () => {
        setIsFetching(true)

        console.log('Fetching reads...')
        const { data, error } = await supabase
            .from('reads')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Supabase Error:', error)
            setFetchError(error.message)
        }

        if (data) {
            console.log('Reads fetched:', data)
            setReads(data)
        }
        setIsFetching(false)
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await fetch('/api/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: passwordInput })
            })

            if (res.ok) {
                setIsAdmin(true)
                setVerifiedPassword(passwordInput)
                setPasswordInput('')
            } else {
                alert('Incorrect password')
            }
        } catch (error) {
            console.error('Error verifying password:', error)
            alert('Verification failed')
        } finally {
            setIsLoading(false)
        }
    }

    const handleAddRead = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Combine Emoji and Title: "Emoji Title"
        // If the user replaces the default emoji with something else, it just works.
        const finalTitle = `${newReadEmoji} ${newReadTitle}`.trim()

        try {
            const res = await fetch('/api/reads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: finalTitle,
                    url: newReadUrl,
                    password: verifiedPassword
                })
            })

            if (res.ok) {
                setNewReadTitle('')
                setNewReadUrl('')
                setNewReadEmoji('📚') // Reset to default
                setShowModal(false) // Close modal on success
                fetchReads()
            } else {
                alert('Failed to add read. Auth error?')
                setIsAdmin(false) // Safety reset
            }
        } catch (error) {
            console.error('Error adding read:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteRead = async (e: React.MouseEvent, id: number) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('Delete requested for ID:', id)

        // Check auth
        if (!verifiedPassword) {
            console.warn('Delete failed: No verified password')
            alert('Please unlock admin mode first')
            setShowModal(true)
            return
        }

        if (!confirm('Delete this read?')) return

        try {
            console.log('Sending delete request...')
            const res = await fetch('/api/reads', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    password: verifiedPassword
                })
            })

            const data = await res.json()
            console.log('Delete response:', res.status, data)

            if (res.ok) {
                fetchReads()
            } else {
                alert('Failed to delete. Check password.')
                setIsAdmin(false)
            }
        } catch (error) {
            console.error('Error deleting read:', error)
        }
    }

    return (
        <div className={styles.content}>
            {isFetching ? (
                <div className={styles.loaderContainer}>
                    <div className={styles.loader}></div>
                    <span style={{ fontSize: '12px' }}>Loading items...</span>
                </div>
            ) : (
                reads.map((read) => (
                    <div key={read.id} className={styles.projectItem} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link href={read.url} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                            {read.title}
                        </Link>
                        {isAdmin && (
                            <button
                                onClick={(e) => handleDeleteRead(e, read.id)}
                                className={styles.deleteButton}
                            >
                                [x]
                            </button>
                        )}
                    </div>
                ))
            )}

            <div className={styles.adminParams}>
                {fetchError && <span style={{ color: 'red', fontSize: '10px' }}>sync error</span>}
                <button
                    onClick={() => setShowModal(true)}
                    className={styles.adminButton}
                >
                    add more content
                </button>
            </div>

            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <span className={styles.modalTitle}>{isAdmin ? 'Add New Read' : 'Admin Access'}</span>
                            <button className={styles.closeButton} onClick={() => setShowModal(false)}>
                                X
                            </button>
                        </div>

                        <div className={styles.modalBody}>
                            {!isAdmin ? (
                                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <input
                                        type="password"
                                        placeholder="password"
                                        value={passwordInput}
                                        onChange={(e) => setPasswordInput(e.target.value)}
                                        className={styles.modalInput}
                                        autoFocus
                                    />
                                    <button type="submit" className={styles.modalButton} disabled={isLoading}>
                                        {isLoading ? '...' : 'Unlock'}
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleAddRead} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <input
                                            type="text"
                                            value={newReadEmoji}
                                            onChange={(e) => setNewReadEmoji(e.target.value)}
                                            className={styles.modalInput}
                                            style={{ width: '50px', textAlign: 'center' }}
                                            placeholder="📚"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={newReadTitle}
                                            onChange={(e) => setNewReadTitle(e.target.value)}
                                            className={styles.modalInput}
                                        />
                                    </div>
                                    <input
                                        type="url"
                                        placeholder="URL"
                                        value={newReadUrl}
                                        onChange={(e) => setNewReadUrl(e.target.value)}
                                        className={styles.modalInput}
                                    />
                                    <button type="submit" className={styles.modalButton} disabled={isLoading}>
                                        {isLoading ? 'Saving...' : 'Add Read'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
