import darksun from "../assets/images/darksun.svg";
import darkmoon from "../assets/images/darkmoon.svg";
import { GlobalContext } from "../App";
import { useContext } from "react";
import styled from "styled-components/macro";

export const Switch = styled.span`
    display: flex;
    width: 54px;
    height: 54px;
    border-radius: 26px;
    border: none;
    transition: 0.5s;
    cursor: pointer;
    align-items: center;
    position: relative;
`

const Flick = styled.img`
    width: 52px;
    height: 52px;
    border-radius: 50%;
    padding: 13px;
    transition: 0.5s;
    
    background: ${props => props.theme.textColor};
    z-index: 2;
`

const SwitchBackground = styled.img`
    width: 52px;
    height: 52px;
    border-radius: 50%;
    padding: 13px;
    position: absolute;
    top: 0;
    bottom: 0;
    ${({type})=>type} : 0px;
    z-index: 1;
`

export default function ThemeSwitch() {
    const {darkTheme, setDarkTheme} = useContext(GlobalContext);
    return (
        <Switch onClick={() =>setDarkTheme(dark => !dark)}>
            <SwitchBackground type={"right"} src={darksun} />
            <SwitchBackground type={"left"} src={darkmoon} />
            
            <Flick darkTheme={darkTheme} src={!darkTheme ? darkmoon : darksun} />
        </Switch>
    )
}
