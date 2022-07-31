import React, { useEffect, useState } from 'react'
import styles from './ChatWindow.module.css'
import { messagesData } from '../utils/messagesData'
import Loading from './Loading'
import contrastColorFinder from '../utils/contrastColorFinder'

function ChatWindow({ userInfo, delayValue }) {
    const [messageBuffer, setMessageBuffer] = useState(messagesData)
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [textColor, setTextColor] = useState('white') // The text color has to be contrasting


    // **⬇️ As user can select any color for bubble, the text may not look clear so this sets a text color which contrasts the bg color of bubble ** //  

    useEffect(()=>{
        const contrastColor = contrastColorFinder(userInfo?.theme?.bubbleColor)
        setTextColor(contrastColor)
    }, [userInfo])

    // **⬆️ As user can select any color for bubble, the text may not look clear so this sets a text color which contrasts the bg color of bubble ** // 



    // **⬇️ logic for delaying messages with custom value ** //  

    useEffect(() => {
        const isEmpty = !messageBuffer.length
        const showMessage = () => {
            setMessages([...messages, ...messageBuffer.slice(0, 1)])
            setMessageBuffer(messageBuffer.slice(1))
        }
        if (isEmpty)
            setLoading(false)
        else
            setLoading(true)


        const delayedMessage = !isEmpty ? setInterval(showMessage, delayValue) : null

        return () => clearInterval(delayedMessage)
    }, [messageBuffer, messages, delayValue])

    // **⬆️ logic for delaying messages with custom value ** // 

    const refreshMessages = () => {
        setMessageBuffer(messagesData)
        setMessages([])
        }

    return (
        <div className={styles.chatWindow}>
            <button className={`btn ${styles.refreshBtn}`} onClick={refreshMessages}>Refresh</button>

            {messages.map(({ message }, id) => {
                return (
                    <div key={id} className={styles.bubble} style={{ background: userInfo?.theme?.bubbleColor }}>
                        <p style={{ color: textColor }}>{message}</p>
                    </div> //custom bubble background color fetched from userInfo
                )
            })}

            {loading && (
                <div className={styles.bubble} style={{ background: userInfo?.theme?.bubbleColor }}>
                    <Loading color={textColor}/>
                </div>
            )}
        </div>
    )
}

export default ChatWindow