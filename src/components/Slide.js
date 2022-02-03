import React from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import styled from 'styled-components/macro';
import { Link } from "react-router-dom";


const Wrapper = styled.div`
    width: 100%;
    height: 812px;
    max-height: 900px;
    border-radius: 44px;
    display: flex;
    justify-content: space-between;
    padding: 129px 55px 0 109px;
    background: url(${({ bg }) => bg}) no-repeat;
    background-position: 97% 20px;
    background-size: 900px 900px;
    transition: 0.5s ease;
    @media(max-width: 1776px) {
        background-position: 97% 100%;
        background-size: 534px 534px;
    }
    @media(max-width: 1344px) {
        background-position: 97% 100%;
        background-size: 434px 434px;
    }
    @media(max-width: 1184px) {
        background-position: 97% 100%;
        background-size: 334px 334px;
    }
    @media(max-width: 1000px) {
        max-height: unset;
        background-size: 444px 444px;
        background-position: center center;
        padding: 10%;
        height: 960px;
        display: flex;
        flex-direction: column;
        padding: 24px;
    }
    @media(max-width: 540px) {
        height: auto;
        min-height: 774px;
        background-size: 300px 300px;
    }
    @media(max-width: 340px) {
        padding: 20px;
        background-position: center 270px;
        height: auto;
        min-height: 574px;
        background-size: 200px 200px;
    }
`;

const Div = styled.div`
    font-size: 100vw;
`;

const SiteHeader = styled.h1`
font-family: Montserrat, Arial, sans-serif;
font-style: normal;
font-weight: 600;
font-size: 80px;
line-height: 130%;
    color: #FFFFFF;
    @media(max-width: 1000px) {
        font-style: normal;
font-weight: 600;
font-size: 44px;
line-height: 130%;

text-align: center;
    }
    @media(max-width: 540px) {
        font-style: normal;
font-weight: 600;
font-size: 32px;
line-height: 130%;
    }
    @media(max-width: 340px) {
        font-style: normal;
        font-weight: 600;
        font-size: 32px;
        line-height: 130%;
    }
`
const Subtitle = styled.p`
font-family: Circe, Arial, sans-serif;
font-style: normal;
font-weight: normal;
font-size: 40px;
line-height: 130%;
    color: #FFFFFF;
    @media(max-width: 1000px) {
        font-style: normal;
font-weight: normal;
font-size: 24px;
line-height: 130%;

text-align: center;
    }
    @media(max-width: 540px) {
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        line-height: 130%;
    }
    @media(max-width: 340px) {
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        line-height: 130%;
    }
`
const GoButton = styled(Link)`
font-family: Circe, Arial, sans-serif;
    max-width: fit-content;
    color: #4B75FC;
    background: #FFFFFF;
    box-shadow: 0px 0px 0px 5px rgba(75,117,252,0.36);
    font-size: 24px;
    padding: 13px 16px;
    border: none;
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 50px;
    @media(max-width: 1000px) {
        margin: 576px 0 0 0;
    }
    @media(max-width: 540px) {
        width: 100%;
        margin: 503px 0 0 0;
    }
    @media(max-width: 340px) {
        margin: 330px 0 0 0;
    }
`

export default function Slide({ slide: { title, subtitle, imgUrl, url } }) {
    const ttl = title.split(',');
    const subttl = subtitle.split(',');

    return (
        <Wrapper bg={imgUrl}>
            <Div>
                <SiteHeader>{ttl[0]}<br />{ttl[1]}</SiteHeader>
                <Subtitle>{subttl[0]}<br />{subttl[1]}</Subtitle>
                <GoButton to={url}>Подключить <AiOutlineRight style={{ transform: "translateY(10%)" }} /></GoButton>
            </Div>
        </Wrapper>
    )
}
