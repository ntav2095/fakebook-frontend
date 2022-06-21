import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import useAuth from '../../../Auth/useAuth'

import RowItem from '../../../components/RowItem/RowItem'

import './LeftBar.scss'

const topShortcuts = [
    {
        image: "asset/home-leftbar/friends.png",
        label: "Friends",
        link: "/"
    },
    {
        image: "asset/home-leftbar/ad-center.png",
        label: "Ad Center",
        link: "/"
    },
    {
        image: "asset/home-leftbar/ads-manager.png",
        label: "Ads Manager",
        link: "/"
    },
    {
        image: "asset/home-leftbar/blood-donations.png",
        label: "Blood Donations",
        link: "/"
    },
    {
        image: "asset/home-leftbar/climate-science-center.png",
        label: "Climate Science Center",
        link: "/"
    },
    {
        image: "asset/home-leftbar/crisis-response.png",
        label: "Crisis Response",
        link: "/"
    },
    {
        image: "asset/home-leftbar/emotional-health.png",
        label: "Emotional Health",
        link: "/"
    },
    {
        image: "asset/home-leftbar/events.png",
        label: "Events",
        link: "/"
    },
    {
        image: "asset/home-leftbar/facebook-pay.png",
        label: "Facebook Pay",
        link: "/"
    },
    {
        image: "asset/home-leftbar/favorites.png",
        label: "Favorites",
        link: "/"
    },
    {
        image: "asset/home-leftbar/fundraisers.png",
        label: "Fundraisers",
        link: "/"
    },
    {
        image: "asset/home-leftbar/gaming-video.png",
        label: "Gaming Video",
        link: "/"
    },
    {
        image: "asset/home-leftbar/groups.png",
        label: "Groups",
        link: "/"
    },
    {
        image: "asset/home-leftbar/live-videos.png",
        label: "Live Videos",
        link: "/"
    },
    {
        image: "asset/home-leftbar/marketplace.png",
        label: "Marketplace",
        link: "/"
    },
    {
        image: "asset/home-leftbar/memories.png",
        label: "Memories",
        link: "/"
    },
    {
        image: "asset/home-leftbar/messenger.png",
        label: "Messenger",
        link: "/"
    },
    {
        image: "asset/home-leftbar/messenger-kids.png",
        label: "Messenger Kids",
        link: "/"
    },
    {
        image: "asset/home-leftbar/most-recent.png",
        label: "Most Recent",
        link: "/"
    },
    {
        image: "asset/home-leftbar/pages.png",
        label: "Pages",
        link: "/"
    },
    {
        image: "asset/home-leftbar/play-games.png",
        label: "Play Games",
        link: "/"
    },
    {
        image: "asset/home-leftbar/recent-ad-activity.png",
        label: "Recent Ad Activity",
        link: "/"
    },
    {
        image: "asset/home-leftbar/saved.png",
        label: "Saved",
        link: "/"
    },
    {
        image: "asset/home-leftbar/watch.png",
        label: "Watch",
        link: "/"
    },

]

const bottomShortcuts = [
    {
        image: "asset/home-shortcut/group.png",
        label: "Group Xyz",
        link: "/"
    },
    {
        image: "asset/home-shortcut/pages.png",
        label: "Page Abc",
        link: "/"
    },
    {
        image: "asset/home-shortcut/game1.png",
        label: "Candy Crush",
        link: "/"
    },
    {
        image: "asset/home-shortcut/game2.png",
        label: "Dragon City",
        link: "/"
    },
]

function LeftBar() {
    const [showTop, setShowTop] = useState(false)
    const [topList, setTopList] = useState(topShortcuts.slice(0, 6))
    const [showBottom, setShowBottom] = useState(false)
    const [bottomList, setBottomList] = useState(bottomShortcuts.slice(0, 6))

    const { auth } = useAuth()

    useEffect(() => {
        showTop ? setTopList(topShortcuts) : setTopList(topList.slice(0, 6))
    }, [showTop])

    useEffect(() => {
        showBottom ? setBottomList(bottomShortcuts) : setBottomList(bottomShortcuts.slice(0, 6))
    }, [showBottom])

    return (
        <div className='LeftBar'>
            {/* TOP  */}
            <div className="LeftBar__top">
                <Link to={`/${auth.email}`}>
                    <RowItem
                        imgSz="35px"
                        image={auth.avatar}
                        text={auth.name}
                        borderRadius="50%"
                    />
                </Link>

                {topList.map((item, index) =>
                    <RowItem
                        imgSz="35px"
                        key={index}
                        image={item.image}
                        text={item.label}
                    />
                )}

                {topShortcuts.length > 6 && <RowItem
                    imgSz="35px"
                    leftIcon={<i className={`fa ${showTop ? "fa-angle-up" : "fa-angle-down"}`}></i>}
                    text={`${showTop ? "See less" : "See more"}`}
                    borderRadius="50%"
                    onClick={() => showTop ? setShowTop(false) : setShowTop(true)}
                />}
            </div>

            {/* MIDDLE  */}
            <div className="LeftBar__middle">
                <p>Your shorcuts</p>
                {bottomList.map((item, index) =>
                    <RowItem
                        imgSz="35px"
                        key={index}
                        image={item.image}
                        text={item.label}
                    />
                )}

                {!showBottom && bottomShortcuts.length > 6 && <RowItem
                    imgSz="35px"
                    leftIcon={<i className="fa fa-angle-down"></i>}
                    text="See more"
                    borderRadius="50%"
                    onClick={() => setShowBottom(true)}
                />}

                {showBottom && bottomShortcuts.length > 6 && <RowItem
                    imgSz="35px"
                    leftIcon={<i className="fa fa-angle-up"></i>}
                    text="See less"
                    borderRadius="50%"
                    onClick={() => setShowBottom(false)}
                />}
            </div>
        </div>
    )
}

export default LeftBar