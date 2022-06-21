import { Link } from 'react-router-dom'
const FB_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1365px-Facebook_f_logo_%282019%29.svg.png"

function FBLogo() {
    return (
        <Link to="/" ><img src={FB_LOGO} alt="Fakebook Logo" /></Link>
    )
}

export default FBLogo