import { useEffect, useState } from 'react'
import styles from './ThemeSelectorModal.module.css'
import axios from 'axios'
import { URL } from '../utils/constants'
import { hexToRgb } from '../utils/contrastColorFinder'
import Loading from './Loading'

function ThemeSelectorModal({ setIsOpen, setUserInfo, userInfo }) {
    const [themes, setThemes] = useState([])
    const [loading, setLoading] = useState(false)
    const [isCustom, setIsCustom] = useState(false)
    const [selectedThemeName, setSelectedThemeName] = useState(userInfo?.theme?.themeName || 'Default')
    const [customTheme, setCustomTheme] = useState({
        backgroundColor: '#000000',
        bubbleColor: '#ffffff',
    })


    const handleSystemTheme = () => {
        const selectedTheme = themes.find(theme => theme.themeName === selectedThemeName)
        saveTheme(selectedTheme)
    } 
    
    const handleCustomTheme = () => {
        const rgbTheme = {
            backgroundColor: customTheme.backgroundColor,
            bubbleColor: hexToRgb(customTheme.bubbleColor)
        }
        saveTheme(rgbTheme)
    } 

    const saveTheme = async (data) => {
        setLoading(true)
        setUserInfo({
            ...userInfo,
            theme: data
        })
        try {
            await axios.post(`${URL}/user/theme`, {
                backgroundColor: userInfo.backgroundColor,
                bubbleColor: userInfo.bubbleColor
            }, {
                headers: {
                    authToken: userInfo.authToken
                }
            })
            localStorage.userInfo = JSON.stringify({
                ...userInfo,
                theme: data
            })
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
        setIsOpen(false)
    }


    useEffect(() => {
        setLoading(true)
        const fetchThemes = async () => {
            try {
                let themesData = await axios.get(`${URL}/theme`)
                setThemes(themesData.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchThemes()
    }, [])

    return (
        <div className={styles.modal}>
            <button className='btn' onClick={() => setIsOpen(false)}>Close</button>
            <div className={styles.dropdown}>
                {
                    !isCustom ? (
                        <div className={styles.systemTheme}>
                            <h2>Choose a theme:</h2>
                            <select name="theme" value={selectedThemeName} onChange={(e) => setSelectedThemeName(e.target.value)} >
                                {themes.map(theme => <option key={theme?._id} value={theme?.themeName}>{theme?.themeName}</option>)}
                            </select>

                            <button className={`btn ${styles.saveBtn}`} onClick={handleSystemTheme}>
                                {loading ? <Loading /> : 'Save'}
                            </button>
                            <button className={`btn ${styles.saveBtn}`} onClick={() => setIsCustom(true)}>Custom Themes</button>
                        </div>
                    ) : (
                        <div className={styles.customTheme}>
                            <h2>Choose custom colors</h2>
                            <div>
                                <label htmlFor="backgroundColor">Background Color:</label>
                                <input type="color" id="backgroundColor" name="backgroundColor" value={customTheme.backgroundColor} onChange={(e) => setCustomTheme({ ...customTheme, backgroundColor: e.target.value })} />
                            </div>
                            <div>
                                <label htmlFor="bubbleColor">Bubble Color:</label>
                                <input type="color" id="bubbleColor" name="bubbleColor" value={customTheme.bubbleColor} onChange={(e) => setCustomTheme({ ...customTheme, bubbleColor: e.target.value })} />
                            </div>
                            <button className={`btn ${styles.saveBtn}`} onClick={handleCustomTheme}>
                                {loading ? <Loading /> : 'Save'}
                            </button>
                            <button className={`btn ${styles.saveBtn}`} onClick={() => setIsCustom(false)}>System Themes</button>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default ThemeSelectorModal