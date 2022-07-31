import { Link } from 'react-router-dom'
import styles from './Logo.module.css'

function Logo() {
    return (
        <Link to='/'>
            <div className={styles.logo}>
                <img src="https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_64,w_64,q_auto/250253/Asset_22xxxhdpi_kw5dnj.png" alt="logo" />
                <h1>wysa</h1>
            </div>
        </Link>
    )
}

export default Logo