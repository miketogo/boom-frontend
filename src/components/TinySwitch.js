import React from 'react';
import styled from 'styled-components';
import cool from "../assets/images/cool.png";

const Tinyswitch = styled.span`
    display: flex;
    transition: 0.5s;
    cursor: pointer;
    align-items: center;
    position: relative;
    width: 52px;
    height: 30px;
    padding: 2px;
    border-radius: 44px;
    background: ${({checked}) => checked ? "#4B75FC" : "rgba(18, 18, 18, 0.12)"};
    border: 1px solid rgba(255, 255, 255, 0.44);
    box-sizing: border-box;
    @media(max-width: 720px) {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
    }
`

const Flick = styled.span`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #fff;
    transform: ${({checked}) => checked && "translateX(22px)"};
    z-index: 2;
    transition: 0.2s;
`
const SwitchBg = styled.img`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    position: absolute;
    padding: 3px;
    left: 0;
    top: 3px;
    bottom: 0;
    z-index: 1;
`

export default function TinySwitch({checked, setSwitches, title}) {
    return (
        <Tinyswitch onClick={()=>setSwitches(obj => ({...obj, [title]: !obj[title]}))} checked={checked}>
            <Flick checked={checked} />
            <SwitchBg src={cool} />
        </Tinyswitch>
    )
}
