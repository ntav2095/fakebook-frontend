import './Avatar.scss'

function Avatar({ image, size }) {

    return (
        <div
            style={{
                width: size,
                height: size
            }}
            className='Avatar'
        >

            <img src={image} alt="" />
        </div>
    )
}

export default Avatar