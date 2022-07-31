import React, { useEffect, useState } from 'react'
import ChatWindow from '../components/ChatWindow'
import ThemeSelectorModal from '../components/ThemeSelectorModal'
import styles from './ChatPage.module.css'
import Counter from '../components/Counter'


// userInfo = {
//   authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmU1ZGQyZGE1M2RlYTg0MzcyMGE5YzkiLCJpYXQiOjE2NTkyMzE1NTYsImV4cCI6MTY1OTMxNzk1Nn0.Si6kP42-oue99-7alohyWUO931XlT5lQ33FeO5C_LrQ"
//   firstname: "avi",
//   theme: {}
// }


function ChatPage() {
  const [userInfo, setUserInfo] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [delayValue, setDelayValue] = useState(2000)


  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      setUserInfo(JSON.parse(localStorage.userInfo))
    }
  }, [])

  return (
    <>
      {isOpen && <ThemeSelectorModal setIsOpen={setIsOpen} setUserInfo={setUserInfo} userInfo={userInfo} />}
      <div className={`container ${styles.chatPage}`} style={{ background: userInfo?.theme?.backgroundColor }} > {/*custom background color fetched from userInfo */}
        <button className={`btn ${styles.switchBtn}`} onClick={() => setIsOpen(true)}>Switch Theme</button>
        <div className={styles.counter}>
          <h4>SetDelay</h4>
          <Counter delayValue={delayValue} setDelayValue={setDelayValue} />
        </div>
        <ChatWindow delayValue={delayValue} userInfo={userInfo} />
      </div>
    </>
  )
}

export default ChatPage
