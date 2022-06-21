import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './About.scss'

function About({ user }) {
    const [aboutStyle, setAboutStyle] = useState({})
    const aboutRef = useRef()

    useEffect(() => {
        const x = ` min(20px, calc(100vh -  ${aboutRef.current.offsetHeight + 50}px))`;
        setAboutStyle({ top: x })
    }, [])
    return (<>


        <div ref={aboutRef} className="About" style={aboutStyle}>
            <div className="intro">
                <p>Name: <span>{user.name}</span></p>
                <p>Email: <span>{user.email}</span></p>
                <p>Gender: </p>
                <p>Phone: </p>
                <p>Date of birth: </p>
                <p>Hobbies: </p>

            </div>

            <div className="friends">
                {user?.friends.map((item, index) => (
                    <div key={index} className="friend">
                        <Link to={`/${item.email}`} className="friendAvatar">
                            <img src={item.avatar} />
                        </Link>
                        <Link className="friendName" to={`/${item.email}`}>{item.name}</Link>
                    </div>)
                )}
            </div>
            {/* 
            <div className="friends">
                {user?.friends.map((item, index) => (
                    <div key={index} className="friend">
                        <Link to={`/${item.email}`} className="friendAvatar">
                            <img src={item.avatar} />
                        </Link>
                        <Link className="friendName" to={`/${item.email}`}>{item.name}</Link>
                    </div>)
                )}
            </div>

            <div className="friends">
                {user?.friends.map((item, index) => (
                    <div key={index} className="friend">
                        <Link to={`/${item.email}`} className="friendAvatar">
                            <img src={item.avatar} />
                        </Link>
                        <Link className="friendName" to={`/${item.email}`}>{item.name}</Link>
                    </div>)
                )}
            </div>

            <div className="friends">
                {user?.friends.map((item, index) => (
                    <div key={index} className="friend">
                        <Link to={`/${item.email}`} className="friendAvatar">
                            <img src={item.avatar} />
                        </Link>
                        <Link className="friendName" to={`/${item.email}`}>{item.name}</Link>
                    </div>)
                )}
            </div> */}

            <div className="photos">

            </div>
        </div>
    </>)
}

export default About