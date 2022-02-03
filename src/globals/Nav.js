import { useContext } from "react";
import styled from "styled-components/macro";
import { GlobalContext } from "../App";
import logo1 from '../assets/images/logo1.svg'
import logo2 from '../assets/images/logo2.svg'
import burgerMenu from '../assets/images/burgerMenu.png'
import burgerMenuWhite from '../assets/images/burgerMenuWhite.png'
import ThemeSwitch from "../components/ThemeSwitch";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MobileNav from "../components/MobileNav";
import Menu from "../components/Menu";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_AUTH } from "./utils";

const Wrappper = styled.nav`
    margin: 14px 0 0 ;
    display: flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
    color: ${props => props.theme.textColor};
    & .menu {
        display: flex;
        flex-wrap: wrap;
        gap: 35px;
        margin-right: auto;
    }
    & .nav-right {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        justify-content: center;
    }
    @media (max-width: 1325px) {
        justify-content: center;
        & .menu {
            display: none;
        }
    }
    @media(max-width: 500px) {
        justify-content: space-between;
    }
    &  .logo {
        display: flex;
        align-items: center;
        margin: 0;
        margin-right: 106px;
        @media(max-width: 1500px) {
            margin-right: 61px;
        }
        @media(max-width: 1325px) {
            margin-right: auto;
        }
        & img {
            height: 84px;
            width: 187px;
            @media (max-width: 1400px) {
                height: 60px;
                width: 134px;
            }
        }
    }
    & #helpCenter {
        position: absolute;
        top: 15px;
        right: 80px;
        text-decoration: underline;
        color: inherit;
        font-weight: 600;
        font-size: 26px;
        @media (max-width: 1500px) {
            right: 40px;
            font-size: 22px;
        }
        @media (max-width: 720px) {
            top: 0px;
            right: 5vw;
        }
        @media (max-width: 500px) {
            top: 5px;
            font-size: 13px;
        }
    }
    
`

const DashboardBtn = styled.button`
    font-size: 24px;
    background-color: #4B75FC;
    color: #fff;
    font-weight: 500;
    height: 52px;
    border-radius: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;   
    border: none;
    padding: 0 24px 0;
    cursor: pointer;
    width: max-content;
    @media(max-width: 1325px) {
        margin-right: 35px;
        font-size: 20px;
    }
    @media(max-width: 500px) {
        margin-right: 0px;
        width: fit-content;
        flex-wrap: wrap;
        font-size: 16px;
    }
    @media(max-width: 400px) {
        padding: 0 10px 0;
        font-weight: 500;
        font-size: 16px;
        line-height: 100%;
        width: 88px;
    }
    &:hover {
        color: #fff;
        transform: scale(1.03);
        transition: ease 0.2s;
    }
`;
const MenuBtn = styled.img`
    cursor: pointer;
    display: none;
    @media (max-width: 1325px) {
        display: block;
    }
`;

export default function Nav() {
    const { darkTheme, setLoginForm, isMobile, showMobileNav, setShowMobileNav } = useContext(GlobalContext);
    const {accessToken, refreshToken} = useSelector(store => store.auth);
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const logged_in = pathname === "/dashboard" && accessToken

    const handleButton = () => {
        if (logged_in) { dispatch({type: DELETE_AUTH}); setLoginForm(false); }
        else if(refreshToken) {setLoginForm(false) }
        else setLoginForm(true)
    }

    return (
        <Wrappper>
            <Link className="logo" to="/"><img alt="logo" src={darkTheme ? logo1 : logo2} /></Link>
            <div className="menu">
                <Menu />
            </div>
            <a id="helpCenter" href="tel:+7 495 795 95 66">+7 495 795 95 66</a>
            <div className="nav-right">
                {isMobile || <ThemeSwitch />}
                <DashboardBtn as={Link} to={logged_in ? "/" : refreshToken ? "/d" : pathname} onClick={handleButton}>{logged_in ? "выйти" : "личный кабинет"}</DashboardBtn>
            </div>
            <MenuBtn onClick={() => setShowMobileNav(true)} src={darkTheme ? burgerMenuWhite : burgerMenu} />
            <AnimatePresence>
                {showMobileNav && <MobileNav setShowMobileNav={setShowMobileNav} />}
            </AnimatePresence>
        </Wrappper>
    )
}
