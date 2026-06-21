import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import HeartbeatLoader from './HeartbeatLoader'

export default function PageTransition() {
    const location = useLocation()
    const isFirstRender = useRef(true)
    const [showLoader, setShowLoader] = useState(false)
    const [animationKey, setAnimationKey] = useState(0)

    const handleAnimationComplete = useCallback(() => {
        setShowLoader(false)
    }, [])

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        setAnimationKey((prev) => prev + 1)
        setShowLoader(true)
    }, [location.pathname, location.search])

    if (!showLoader) return null

    return (
        <div
            className="fixed inset-0 z-[3000] flex flex-col items-center justify-center gap-4 px-6"
            style={{ backgroundColor: 'rgba(9, 9, 9, 0.92)' }}
        >
            <HeartbeatLoader
                key={animationKey}
                size={220}
                loop={false}
                speed={2}
                onComplete={handleAnimationComplete}
            />

            <p className="text-(--main-color) text-[13px] font-bold animate-pulse">
                جاري التحميل...
            </p>
        </div>
    )
}