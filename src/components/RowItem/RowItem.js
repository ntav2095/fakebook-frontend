import { useState } from 'react'


import './RowItem.scss'

function RowItem(props) {

    const [hover, setHover] = useState(false)

    const { leftIcon, text, rightIcon, image, borderRadius, onClick, bgHover, bg, color, height, width, imgSz, fw, ...other } = props

    return (
        <div
            style=
            {{
                background: hover ? bgHover : bg,
                color: color,
                width: width,
                height: height

            }}
            className="RowItem"
            onClick={onClick}
            {...other}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {
                leftIcon
                &&
                <div style={{
                    borderRadius: borderRadius
                }}
                    className="leftIcon">
                    {leftIcon}
                </div>
            }

            {image && <div
                style={{
                    borderRadius: borderRadius,
                    width: imgSz,
                    height: imgSz
                }}
                className="image">
                <img src={image} alt="" />
            </div>}

            <div className="text">
                <p style={{
                    fontWeight: fw
                }}>{text}</p>
            </div>

            {
                rightIcon
                &&
                <div className="rightIcon">
                    {rightIcon}
                </div>
            }
        </div>
    )
}

export default RowItem