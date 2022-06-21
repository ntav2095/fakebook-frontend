import { useEffect, useRef, useState } from 'react'


function ClickOutSide({ children }) {
    const [outside, setOutside] = useState(false)
    const divRef = useRef()

    useEffect(() => {

        const handleClickOutSide = (e) => {
            console.log("divRef.current: ", divRef.current)
            console.log("e.target: ", e.target)
            if (!divRef.current.contains(e.target)) {
                alert("Clicked outside")
                setOutside(true)
            } else {
                alert("Clicked inside")
                setOutside(false)
            }

        }
        document.addEventListener("click", handleClickOutSide)
        return () => document.removeEventListener("click", handleClickOutSide)
    }, [])

    return (
        <div outside={outside.toString()} ref={divRef}>
            {children}
        </div>
    )
}

export default ClickOutSide