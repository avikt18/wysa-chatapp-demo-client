import React from 'react'
import styles from './Layout.module.css'
import Logo from './Logo'

function Layout({ children }) {
    return (
        <div className={styles.container}>
            <Logo />
            {children}
        </div>
    )
}

export default Layout