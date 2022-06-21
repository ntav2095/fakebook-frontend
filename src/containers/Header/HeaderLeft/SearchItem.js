import { Link } from 'react-router-dom'



import RowItem from "../../../components/RowItem/RowItem"

function SearchItem({ item, handleClick }) {
    return (
        <li onClick={() => handleClick(item)}>
            {
                item.type === 'user'
                    ? <Link to={`/${item.email}`}>
                        <RowItem image={item.avatar} text={item.name} borderRadius="50%" />
                    </Link>
                    : <Link to={`/post/${item.id}`}>
                        <RowItem fw="400" leftIcon={<i className="fa fa-search"></i>} text={item.text.substring(0, 30) + "..."} borderRadius="50%" />
                    </Link>
            }
        </li>
    )
}

export default SearchItem