import { useState, useEffect, useRef } from 'react'



import './Dots.scss'

function Dots(props) {
    const [show, setShow] = useState(false)
    const childrenRef = useRef()
    const { post, children, left, right, ...other } = props

    const childrenStyle = left ? { right: 0 } : right ? { left: 0 } : { left: "50%", transfrom: "translateX(-50%)" }

    useEffect(() => {
        if (show) {
            const listenClickOutside = (e) => {
                if (!childrenRef.current.contains(e.target)) {
                    setShow(false)
                }
            }

            setTimeout(() => document.addEventListener("click", listenClickOutside), 1)

            return () => document.removeEventListener("click", listenClickOutside)
        }
    }, [show])

    return (
        <div {...other} className="Dots boxShadow" onClick={() => setShow(prev => !prev)}>
            <span></span>
            <span></span>
            <span></span>
            {show &&
                <div
                    ref={childrenRef}
                    className="Dots__children"
                    style={childrenStyle}
                    onClick={(e) => e.stopPropagation()}

                >
                    {children}
                </div>
            }
        </div>
    )
}

export default Dots