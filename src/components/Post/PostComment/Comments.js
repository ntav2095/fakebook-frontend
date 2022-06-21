
import RowItem from "../../RowItem/RowItem"



function Comments({ post }) {
    return (<div className="comments">
        {
            post.comments.map((item, index) =>
                <RowItem key={index} image={item.avatar} text={item.text} borderRadius="50%" />
            )
        }
    </div>)
}

export default Comments