import React, { useState } from "react"
import MetaTags from 'react-meta-tags';
import { useDispatch } from "react-redux"
import { useContext } from "react";
import { GlobalContext } from "../../App";
import { useParams, useHistory } from 'react-router-dom';
import styled from "styled-components/macro"
import bomb from "../../assets/images/services/bomb.png"
import Roaming from "../../components/Roaming/Roaming"
import TariffBar from "../../globals/TariffBar"
import { sendMetriс, services, SHOW_MODAL } from "../../globals/utils"
import './Services.css';

const Wrapper = styled.div`
    color: ${({ theme }) => theme.textColor};
    font-family: Circe, Arial, sans-serif;
`


const WrapServices = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    @media(max-width: 1200px) {
        grid-template-columns: 1fr 1fr;
    }
    @media(max-width: 720px) {
        grid-template-columns: 1fr;
    }
`
const Service = styled.div`
    padding: 24px;
    width: 100%;
    background: ${({ theme }) => theme.darkTheme ? "rgba(255, 255, 255, 0.07)" : "#FFF"};
    color: inherit;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    .serviceTop {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        color: #4B6CFD;
        font-size: 24px;
        font-weight: bold;
        flex-wrap: wrap;
    }
    .serviceTop img {
        width: 160px;
        height: 160px;
        @media(max-width: 1266px) {
            width: 120px;
            height: 120px;
        }
        @media(max-width: 829px) {
            width: 80px;
            height: 80px;
        }
        @media(max-width: 520px) {
            width: 52px;
            height: 52px;
        }
    }
    .serviceBody {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        h3 {
            font-family: Circe;
            font-size: 32px;
            font-weight: bold;
            color: inherit;
            @media(max-width: 829px) {
                font-size: 28px;
            }
            @media(max-width: 520px) {
                font-size: 24px;
            }
        }
        .desc {
            font-family: Circe;
            font-size: 20px;
            margin-bottom: auto;
            @media(max-width: 520px) {
                font-size: 16px;
            }
        }
        button {
            padding: 12px 24px;
            border-radius: 49px;
            font-size: 24px;
            font-weight: bold;
            color: #4B6CFD;
            background: rgba(75, 108, 253, 0.16);
            width: fit-content;
            border: none;
            cursor: pointer;
            margin-top: 27px;
            outline: none;
        }
    }
`

const ServiceComponent = ({ service }) => {
    const [posValues, setPosValues] = useState(!service.title && service.positions[0]);
    const dispatch = useDispatch();
    const handleSubmit = () => {
        if (!service.title) {
            service = { ...posValues, desc: service.desc }
        }
        if (service.ymClickBtn && service.ymForm) {
            sendMetriс(service.ymClickBtn.type, service.ymClickBtn.value)
            dispatch({ type: SHOW_MODAL, payload: { service, ym: { type: service.ymForm.type, value: service.ymForm.value } } })
        }
        else {
            dispatch({ type: SHOW_MODAL, payload: { service, ym: { type: 'reachGoal', value: 'free-service-forma' } } })
        }
    }
    return (
        <Service>
            <div className="serviceTop">
                <img alt="serviceImg" src={service.img} />
                <span>{!service.title ? posValues.price : service.price}</span>
            </div>
            <div className="serviceBody">
                <h3>{!service.title ? posValues.title : service.title}</h3>
                <span className="desc">{service.desc}</span>
                {!service.title && <TariffBar service={true} handlePositionChange={(position) => setPosValues(service.positions[position])} />}
                <button onClick={handleSubmit}>Подключить</button>
            </div>
        </Service>
    )
}


export default function Services() {
    const { darkTheme } = useContext(GlobalContext);
    const history = useHistory();
    let { type } = useParams();
    const [selectedType, setSelectedType] = React.useState(`${type && (type === ':roaming' || type === ':paid' || type === ':free') ? type.split(':')[1] : 'paid'}`);
    React.useEffect(() => {
        setSelectedType(`${type && (type === ':roaming' || type === ':paid' || type === ':free') ? type.split(':')[1] : 'paid'}`)
    }, [type])
    return (
        <section className={`services`}>
            <MetaTags>
                <title>{selectedType === "paid" ? 'Платные услуги' : ''}{selectedType === "free" ? 'Бесплатные услуги' : ''}{selectedType === "roaming" ? 'Роуминг' : ''}</title>
                <meta property="og:title" content={`Boom - ${selectedType === "paid" ? 'Платные услуги' : ''}${selectedType === "free" ? 'Бесплатные услуги' : ''}${selectedType === "roaming" ? 'Роуминг' : ''}`} />
            </MetaTags>
            <Wrapper>
                <div className={`services__head-container`}>
                    <img className={`services__head-logo`} src={bomb} alt="Услуги" />
                    <h2 className={`services__head-title ${darkTheme ? 'services__text_dark' : ''}`}>Бомбезные<br />услуги</h2>
                </div>
                <div className={`services__head-buttons`}>
                    <button onClick={() => {
                        history.push(':paid')
                        setSelectedType('paid')
                    }} className={`services__head-button ${selectedType === "paid" ? "services__head-button_active" : ''} `}>
                        <p className={`services__head-button-text ${darkTheme ? 'services__head-button-text_dark' : ''} ${selectedType === "paid" ? "services__head-button-text_active" : ''} `}>Платные</p>
                    </button>
                    <button onClick={() => {
                        history.push(':free')
                        setSelectedType('free')
                    }} className={`services__head-button ${selectedType === "free" ? "services__head-button_active" : ''} `}>
                        <p className={`services__head-button-text  ${darkTheme ? 'services__head-button-text_dark' : ''} ${selectedType === "free" ? "services__head-button-text_active" : ''}`}>Бесплатные</p>
                    </button>
                    <button onClick={() => {
                        history.push(':roaming')
                        setSelectedType('roaming')
                    }} className={`services__head-button ${selectedType === "roaming" ? "services__head-button_active" : ''} `}>
                        <p className={`services__head-button-text ${darkTheme ? 'services__head-button-text_dark' : ''} ${selectedType === "roaming" ? "services__head-button-text_active" : ''} `}>Роуминг</p>
                    </button>
                </div>
                {selectedType === "roaming" ?
                    <Roaming /> :
                    <></>
                }
                {selectedType === "paid" ?
                    <WrapServices>
                        {services && services.paid && services.paid.map((service) => <ServiceComponent key={`paid-${service.title}`} service={service} />)}
                    </WrapServices> :
                    <></>
                }
                {selectedType === "free" ?
                    <WrapServices>
                        {services && services.free && services.free.map((service) => <ServiceComponent key={`free-${service.title}`} service={service} />)}

                    </WrapServices> :
                    <></>
                }

            </Wrapper>
        </section>

    )
}
