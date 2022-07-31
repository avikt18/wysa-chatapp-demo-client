import React from 'react'
import { useEffect, useState } from 'react'

function Loading({color}) {
    const [dots, setDots] = useState('...')

    useEffect(() => {
        const interval = setInterval(() => {
            if (dots.length > 3)
                setDots('.')
            else
                setDots(dots + ".")
        }, 500)
        return () => clearInterval(interval)
    }, [dots])

    return (
        <h3 style={{color: color}}>
            {dots}
        </h3>
    )
}

export default Loading