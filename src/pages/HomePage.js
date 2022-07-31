import React from 'react'
import styles from './HomePage.module.css'
import {Link} from 'react-router-dom'

function HomePage() {
  return (
    <div className={styles.container}>
      <h1>Welcome to <span className='primary-blue'>wysa</span></h1>
      <div className={styles.login}>
        <Link className='btn' to='/login'>Login</Link> {/* using global class btn */}
        <Link className='btn' to='/signup'>Signup</Link> {/* using global class btn */}
      </div>
    </div>
  )
}

export default HomePage