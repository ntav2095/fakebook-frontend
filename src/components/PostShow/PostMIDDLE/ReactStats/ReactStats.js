import './ReactStats.scss'

function ReactStats({ likes }) {
    // const x = likes.length
    const x = 2

    return (
        <>
            {x > 0 &&
                <div className="ReactStats">
                    {
                        x > 0 &&
                        <div className="Post__likeQty__icon">
                            <i className="fa fa-thumbs-up" />

                            {x > 0 &&
                                <div className="likedInfo">
                                    <h6>Like</h6>
                                    {likes.map((item, index) => <p key={index}>{item.name}</p>)}
                                </div>}
                        </div>
                    }

                    {x === 1 && <span>{likes[0].name}</span>}
                    {x > 1 && <span>{x + " likes"}</span>}

                </div>}
        </>
    )
}

export default ReactStats