import React, { useContext } from 'react';
import { GlobalContext } from '../App';
import { motion } from 'framer-motion'
import { memo } from 'react'
import { CgClose } from 'react-icons/cg'

import { Link } from "react-router-dom";
import styled from 'styled-components/macro'
import { FooterSocials } from '../globals/Footer/Footer'
import { useEscapeKey } from '../hooks'
import Menu from './Menu'
import ThemeSwitch from './ThemeSwitch';
import logo1 from '../assets/images/logo1.svg'
import logo2 from '../assets/images/logo2.svg'
const Wrapper = styled(motion.div)`
    background-color: ${({ theme }) => theme.background};
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    padding: 48px 40px 15px;
    top: 0;
    left: 0;
    right: 0;
    @media(max-height: 700px) {
        height: fit-content;
    }
    @media(max-width: 700px) {
        padding: 16px 12px;


}
`
const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    @media(max-width: 700px) {
        gap: 24px;


}
`
const Logo = styled.img`
    height: 77px;
    width: 171px;
    margin: 0 0 28px;
    @media(max-width: 700px) {
        margin: 0 0 -4px;
        height: 69px;
        width: 158px;


}
`

export default memo(function MobileNav({ setShowMobileNav }) {
    const { darkTheme } = useContext(GlobalContext);
    useEscapeKey(setShowMobileNav);
    return (
        <Wrapper
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }} transition={{ duration: 0.5, type: 'spring' }}>
            <Content>
                <Link  to="/" onClick={() => setShowMobileNav(false)}><Logo className="menu-mobile__logo" alt="logo" src={darkTheme ? logo1 : logo2} /></Link>
                <Menu setShowMobileNav={setShowMobileNav} />
                <ThemeSwitch />
                <FooterSocials />
            </Content>
            <span><CgClose onClick={() => setShowMobileNav(false)} strokeWidth={1.5} size={35} /></span>
        </Wrapper>
    )
})
