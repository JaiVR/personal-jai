import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.content}>
      <p><small>i am jai, undergrad at <Link href="https://twitter.com/bitspilaniindia" target="_blank" rel="noopener noreferrer">bits pilani, india</Link>.</small></p>
      <p><small>trying to build something meaningful, vibe coding just removed that friction, if you need it, you can build it.</small></p>
      {/* <p><small>to reset: 🏎️♟️🏸🏀📚🎧🎬🎮</small></p> */}

      <p><small>email me at <Link href='mailto:f20221264@pilani.bits-pilani.ac.in'>f20221264@pilani.bits-pilani.ac.in</Link></small></p>
      <div className={styles.socialLinks}>
        <p><small>
          <Link href="https://twitter.com/Destryet" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            🐦 twitter
          </Link> • <Link href="https://open.spotify.com/user/31cpv25vi7suldbtuqr2ncqg3mha?si=148f2ac4a1d94e40" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            🎧 spotify
          </Link> • <Link href="https://www.linkedin.com/in/jai-vr-291b2b250/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            💼 linkedin
          </Link>
        </small></p>
      </div>
    </div>
  )
}