import './Footer.scss'
import { Link } from 'react-router-dom'

const LANGUAGES = [
    { key: "vi", desc: "Tieng Viet" },
    { key: "en", desc: "English" },
]

const LINK_ITEMS = [
    {
        link: "/",
        desc: "Sign Up",
    },

    {
        link: "/",
        desc: "Log In",
    },

    {
        link: "/",
        desc: "Messenger",
    },

    {
        link: "/",
        desc: "Facebook ",
    },

    {
        link: "/",
        desc: "Lite",
    },

    {
        link: "/",
        desc: "Watch",
    },

    {
        link: "/",
        desc: "Places",
    },

    {
        link: "/",
        desc: "Games",
    },

    {
        link: "/",
        desc: "Marketplace",
    },

    {
        link: "/",
        desc: "Facebook Pay",
    },

    {
        link: "/",
        desc: "Oculus",
    },

    {
        link: "/",
        desc: "Portal",
    },

    {
        link: "/",
        desc: "Instagram",
    },

    {
        link: "/",
        desc: "Bulletin",
    },

    {
        link: "/",
        desc: "Local",
    },

    {
        link: "/",
        desc: "Fundraisers",
    },
    {
        link: "/",
        desc: "Services",
    },
    {
        link: "/",
        desc: "Voting Information Centre",
    },
    {
        link: "/",
        desc: "Groups",
    },
    {
        link: "/",
        desc: "About",
    },
    {
        link: "/",
        desc: "Create ad",
    },
    {
        link: "/",
        desc: "Create Page",
    },
    {
        link: "/",
        desc: "Developers",
    },
    {
        link: "/",
        desc: "Careers",
    },
    {
        link: "/",
        desc: "Privacy",
    },
    {
        link: "/",
        desc: "Cookies",
    },
    {
        link: "/",
        desc: "AdChoices",
    },
    {
        link: "/",
        desc: "Terms",
    },
    {
        link: "/",
        desc: "Help",
    },
    {
        link: "/",
        desc: "Contact uploading and non-users",
    },
]

const META_2022 = "Meta © 2022"

function Footer() {
    return (
        <div className="Footer">
            <div className="Footer__main">
                <ul className="Footer__languages">
                    {LANGUAGES.map(item =>
                        <li key={item.key}>
                            <button>{item.desc}</button>
                        </li>
                    )}
                </ul>

                <ul className="Footer__links">
                    {LINK_ITEMS.map((item, index) =>
                        <li key={index}>
                            <Link to={item.link} >{item.desc}</Link>
                        </li>
                    )}
                </ul>

                <div className="Footer__metaname">
                    <p>{META_2022}</p>
                </div>
            </div>
        </div>
    )
}

export default Footer