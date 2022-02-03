import { AiOutlineRight } from "react-icons/ai";
import { CgInfinity } from "react-icons/cg";
import { TiWiFi } from "react-icons/ti";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import Hit from "../assets/images/hit.svg";
import infinity from "../assets/images/infinity.png";
import headphones from "../assets/images/headphones.png";
import info from "../assets/images/info-icon.png";
import beeline from "../assets/images/beeline.png";
import TinySwitch from "../components/TinySwitch";
import TariffCardModal from "./TariffCardModal";
import { memo, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TariffBar from "./TariffBar";
import { SHOW_MODAL , sendMetriс} from "./utils";
import { useDispatch } from "react-redux";

const Wrapper = styled(motion.div)`
    background: ${({ background }) => background};
    background-size: ${({ title }) => title === "VIP" && "600%"};
    width: 520px;
    color: #fff;
    border-radius: 28px;
    padding: 20px 28px;
    display: flex;
    flex-direction: column;
    font-size: initial;
    position: relative;
    overflow: hidden;
    margin-right: 40px;
    &:last-of-type{
        margin-right: 0;
    }
    @media(max-width: 600px) {
        width: 90vw;
        padding: 20px 12px;
    }
    .detailsWrapper {
        width: 70%;
        @media(max-width: 450px) {
            width: 100%;
        }
    }
    .card-top {
        display: flex;
        align-items: center;
        gap: 10px;
        width: fit-content;
    }
    .card-title-icon {
        width: 44px;
        @media(max-width: 450px) {
            width: 36px;
        }
    }
    .card-body {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        margin-top: 40px;
        .tarif-settings {
            display: flex;
            gap: 0 15px;
            width: 100%;
            align-items: center;
            @media(max-width: 450px) {
                gap: 0;
                justify-content: space-between;
            }
        .item {
            font-family: Circe, Arial, sans-serif;
            font-style: normal;
            font-weight: bold;
            font-size: 50px;
            line-height: 100%;
            display: flex;
            align-items: flex-end;
            @media(max-width: 600px) {
                font-size: 30px;
            }
        }
        }
    }
    .priceInfo {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 28px;
        color: #fff;
        width: fit-content;
        gap: 20px;
        flex-wrap: wrap;
        margin-top: 40px;
        @media(max-width: 450px) {
            font-size: 20px;
        }
    }
`;

const Title = styled.p`
    font-family: Circe, Arial, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 44px;
    color: #fff;
    margin: 0;
    word-break: break-all;
    @media(max-width: 720px) {
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        line-height: 100%;
    }
`;

const SubScribeBtn = styled.button`
    font-family: Circe, Arial, sans-serif;
    box-shadow: none;
    color: #121212;
    background: #fff;
    width: 260px;
    height: 76px;
    border-radius: 38px;
    border: none;
    outline: none;
    margin: 0;
    font-size: 24px;
    font-weight: semi-bold;
    cursor: pointer;
    @media(max-width: 720px) {
        width: 100%;
        height: 64px;
    }
`
const Sub = styled.small`
    font-family: Circe, Arial, sans-serif;
    font-style: normal;
    font-weight: 350;
    font-size: 28px;
    @media(max-width: 450px) {
        font-size: 16px;
    }
`
const Details = styled.span`
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 24px;
    font-size: 20px;
    opacity: 0.3;
    transition: opacity 0.3s ease-in-out;
    @media(max-width: 450px) {
        margin-top: 18px;
    }
    &:first-of-type {
        opacity: 1;
        margin-top: 28px;
        @media(max-width: 450px) {
            margin-top: 2px;
        }
        img {
            /* margin-top: 10px; */
        }
    }
    .text-body {
        font-family: Circe, Arial, sans-serif;
        font-size: inherit;
        color: #fff;
        margin: 0;
        @media (max-width: 450px) {
            font-size: 16px;
        }
    }
`

const MiniIcon = styled.img`
    width: 16px;
    &:hover {
        cursor: ${({ pointer }) => pointer && "pointer"}
    }
`
const More = styled(Link)`
    font-family: Circe, Arial, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 100%;
    margin-top: 18px;
    width: fit-content;
    cursor: pointer;
    border-bottom: 1px solid;
    color: inherit; 
    &:hover {
        color: inherit; 
    }
    @media(max-width: 450px) {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 100%;
    }
`
const Switches = styled.span`
    display: flex;
    align-items: stretch;
    font-size: 20px;
    line-height: 29px;
    font-family: Circe, Arial, sans-serif;
    @media(max-width: 450px) {
    font-size: 12px;
    }
`

const FourGSwitchStyles = styled.span`
font-family: Circe;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 10px;
    border-radius: 14px;
    width: ${({buy}) => buy ? "100%" : "50%"};
    padding: 13px;
    font-weight: bold;
    font-size: 20px;
    line-height: 18px;
    &:first-of-type {
        margin-right: ${({buy}) => buy || "20px"};
    }
    @media(max-width: 736px) {
        font-size: 12px;
        gap: 3px;
    }
    @media (max-width: 450px) {
        flex-wrap: wrap;
        padding: 8px 11px;
    }
    ${({price}) => {
        return price === Infinity && {
            gap: "0",
        }
    }}
    background: ${({modal, checked}) => {
        if(modal) {
            return "transparent"
        } else {
            return checked ? "#fff" : "rgba(255, 255, 255, 0.12)";
        }
    }};
    color: ${({checked, modal}) => {
        if(!modal) {
            return checked && "#121212"
        }
    }};
    border: ${({modal, checked}) => {
        if(modal) {
            return checked ? "3px solid #0E5EF8" : "3px solid rgba(1, 1, 1, 0.16)";
        }
    }};
    span {
        font-family: Circe;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        display: flex;
        align-items: center;
        gap: 8px;
        @media(max-width: 736px) {
            font-size: 12px;
            gap: 3px;
        }
        
    }
`

export const FourGSwitch = memo(({title, price, checked, setSwitches, modal=false, buy=false}) => {
    useEffect(() => {
        if(price === Infinity) {
            setSwitches(obj => ({...obj, [title]: false}))
        }
    }, [price, setSwitches, title])
    
    return (
    <FourGSwitchStyles buy={buy} onClick={(e) => e.stopPropagation()} price={price} checked={price ? true : checked} modal={modal}>
        {title}
        {price === Infinity ? 
        (title === "Безлимитный 4G" ? <CgInfinity size={42} /> : <TiWiFi size={42} /> )
        :
        <span>
            <TinySwitch title={title} checked={checked} setSwitches={setSwitches} />
            +{title === "Безлимитный 4G" ? "150" : "50"} ₽
        </span> }
    </FourGSwitchStyles>)
})

export const switchTypes = ["Безлимитный 4G", "Раздача интернета"];
export default memo(function TariffCard({ tariff, tariffId }) {
    const [showDropdown, setShowDropDown] = useState(false);
    const [positionValue, setPositionValue] = useState(0);
    const [switches, setSwitches] = useState({"Безлимитный 4G": false, "Раздача интернета": false});
    const dispatch = useDispatch();
    const {title, icon, background, hit } = tariff;
    const payload = {
        position: positionValue, 
        tariffId,
        switches
    }
    function handlePositionChange(position) {
        setPositionValue(position)
    }
    function handleInfo(e) {
        e.stopPropagation()
        setShowDropDown(true)
    }

    const fourG = switches["Безлимитный 4G"] ? 150 : 0;
    const modem = switches["Раздача интернета"] ? 50 : 0;
    const totalPrice = tariff.price + fourG + modem;
    
    return (
        <Wrapper title={title} background={background} >
            <AnimatePresence>
                {showDropdown && <TariffCardModal setShowDropDown={setShowDropDown} />}
            </AnimatePresence>
            <span className="card-top">
                <img alt="card-icon" className='card-title-icon' src={icon} />
                <Title>{title}</Title>
                {hit && <img alt="hit" src={Hit} />}
            </span>
            <span className="card-body">
                <span className="tarif-settings">
                    <span className="item">{tariff.positions[positionValue].min}<Sub>мин</Sub></span>
                    <span className="item">{tariff.positions[positionValue].gb === Infinity ? <CgInfinity />: tariff.positions[positionValue].gb}<Sub>гб</Sub></span>
                    <span className="item">{tariff.positions[positionValue].sms}<Sub>смс</Sub></span>
                </span>
                <TariffBar vip={title.toLowerCase() === "vip"} handlePositionChange={handlePositionChange} />
                <Switches>
                    {switchTypes.map(title => <FourGSwitch key={title} checked={switches[title]} setSwitches={setSwitches} title={title} price={tariff.positions[positionValue][title]} />)}
                </Switches>
                <span className="detailsWrapper" >
                    <Details style={{ opacity: `${tariff.positions[positionValue].details[0] ? 1 : 0.3}` }}>
                        <MiniIcon src={infinity} /><p className='text-body'>безлимитные соц сети и мессенджеры</p><MiniIcon onClick={handleInfo} onMouseOver={handleInfo} pointer src={info} />
                    </Details>
                    <Details style={{ opacity: `${tariff.positions[positionValue].details[1] ? 1 : 0.3}` }}>
                        <MiniIcon src={beeline} /><p className='text-body'>безлимитное общение <br /> с абонентами внутри сети Билайн</p>
                    </Details>
                    <Details style={{ opacity: `${tariff.positions[positionValue].details[2] ? 1 : 0.3}` }}>
                        <MiniIcon src={headphones} /><p className='text-body'>выделенная линия поддержки</p>
                    </Details>
                </span>
                <More to={`/tariff-info/:${title}`}>Подробнее про тариф</More>
            </span>
            <span className="priceInfo">
                {totalPrice} руб./мес
                <SubScribeBtn onClick={() => {
                    sendMetriс('reachGoal','tarif_podkluchit')
                    dispatch({type: SHOW_MODAL, payload})
                    }}>Подключить <AiOutlineRight style={{transform: "translateY(20%)"}} /></SubScribeBtn>
            </span>
        </Wrapper>
    )
})
