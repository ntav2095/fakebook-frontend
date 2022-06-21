import { Link } from 'react-router-dom'



import './Notfound.scss'

function Notfound() {
    return (
        <div className="Notfound">
            <img src="asset/not-found.svg" alt="" />
            <h6>This Page Isn't Available</h6>
            <p>The link may be broken, or the page may have been removed.</p>
            <p>Check to see if the link you're trying to open is correct.</p>
            <Link to="/">Go to home</Link>
        </div>
    )
}

export default Notfound