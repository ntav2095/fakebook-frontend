

import useAuth from '../../../Auth/useAuth'
import useChat from '../../../Context/useChat'

import RowItem from '../../../components/RowItem/RowItem'


import './RightBar.scss'

function RightBar() {
    const { auth } = useAuth()
    const { setShowChat, setReceiver } = useChat()

    return (
        <div className='RightBar'>
            <p className="RightBar__title">Sponsored</p>
            < RowItem
                borderRadius="10px"
                imgSz="90px"
                image="asset/t-shirt.webp"
                text="just for decoration"
                height="100px"
            />

            < RowItem
                borderRadius="10px"
                imgSz="90px"
                image="asset/t-shirt1.webp"
                text="just for decoration"
                height="100px"

            />
            <p className="RightBar__title">Contacts</p>

            {
                auth.friends.length > 0 &&
                auth.friends.map((item, index) =>
                    <RowItem
                        borderRadius="50%"
                        key={index}
                        image={item.avatar}
                        text={item.name}
                        onClick={() => {
                            setShowChat(true);
                            setReceiver(item)
                        }}
                    />


                )

            }

        </div>
    )
}

export default RightBar