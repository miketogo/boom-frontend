import { AnimatePresence, motion } from "framer-motion"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"
import { GlobalContext } from "../App"

const Items = [
    {
        name: "тарифы", subItems: [
            {
                subname: "- все тарифы",
                link: "/tariffs/:all"
            },
            {
                subname: "- для телефонов",
                link: "/tariffs/:phone"
            },
            {
                subname: "- для устройств",
                link: "/tariffs/:another-devices"
            }]
    },
    {
        name: "номера", subItems: [
            {
                subname: "- все номера",
                link: "/numbers/:все"
            },
            {
                subname: "- перенести свой",
                link: "/numbers/:перенести"
            },
            {
                subname: "- подключить eSIM",
                link: "/numbers/:esim"
            },
        ]
    },
    {
        name: "услуги", subItems: [
            {
                subname: "- платные",
                link: "/services/:paid"
            },
            {
                subname: "- бесплатные",
                link: "/services/:free"
            },
            {
                subname: "- роуминг",
                link: "/services/:roaming"
            }
        ]
    },
    {
        name: "организациям", subItems: [
            {
                subname: "- малый бизнес",
                link: "/organisations/:small-biz"
            },
            {
                subname: "- крупный бизнес",
                link: "/organisations/:big-biz"
            },
            {
                subname: "- госсектор",
                link: "/organisations/:gos-sector"
            },
        ]
    },
    {
        name: "поддержка", subItems: [
            {
                subname: "- о нас",
                link: "/support/about-us"
            },
        ]
    },
];
const Item = styled.div`
    display: flex;
    font-size: 21px;
    gap: 10px;
    align-items: center;
    text-transform: lowercase;
    cursor: pointer;
    position: relative;
    color: inherit;
    & span{
        font-family: Circe;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 29px;
margin: 0;
@media (max-width: 1325px) {
    font-family: Circe;
font-style: normal;
font-weight: bold;
font-size: 28px;
line-height: 41px;
}
    }
    & svg {
        transform: ${({ selected, idx }) => selected === idx && "rotate(180deg)"};
        transition: ease 0.3s;
        margin-left: 5px;
    }
    @media (max-width: 1100px) {
        flex-direction: column;
        align-items: flex-start;
        font-size: 23px;
    }
`
const SubItems = styled(motion.div)`
    position: absolute;
    top: 35px;
    background: #fff;
    color: #121212;
    z-index: 3;
    width: max-content;
    padding: 15px;
    border-radius: 10px;
    @media (max-width: 1100px) {
        position: static;
        left: 0px;
        top: 0px;
    }
`
export default function Menu({ setShowMobileNav }) {
    const [selected, setSelected] = useState(null);
    const { darkTheme, isMobile } = useContext(GlobalContext);
    const Gesture = (idx) => {
        return isMobile ?
            { onClick: () => { setSelected(id => id === idx ? null : idx) } } :
            { onMouseEnter: () => setSelected(idx) }
    }
    return (
        <>
            {Items.map(({ name, subItems }, idx) => <Item idx={idx} selected={selected}
                onMouseLeave={() => setSelected(null)} {...Gesture(idx)} key={name}>
                <span>
                    {name}
                    <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 7V8H9V7H7Z" fill={darkTheme ? '#F8F8F8' : '#010101'} />
                    </svg>
                </span>
                <AnimatePresence>
                    {selected === idx &&
                        <SubItems onClick={(e) => e.stopPropagation()} darkTheme={darkTheme} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {subItems.map((subItem, id) => <Item as={Link} onClick={(e) => {
                                if (setShowMobileNav) setShowMobileNav(false)
                                else e.stopPropagation()
                            }} key={`nav-${subItem.subname}`}
                                to={subItem.link} >{subItem.subname}</Item>)}
                        </SubItems>}
                </AnimatePresence>
            </Item>)}
        </>
    )
}
