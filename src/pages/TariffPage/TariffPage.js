import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../../App";
import { useParams, useHistory } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import TariffCard from "../../globals/TariffCard";
import Tariffs from "../../components/Tariffs";
import { tariffTypesArray } from "../../globals/utils";
import './TariffPage.css';
import headBox from '../../assets/images/tariff-box.png'




export default function TariffPage() {
    const { darkTheme } = useContext(GlobalContext);
    const history = useHistory();
    let { type } = useParams();
    const [selectedType, setSelectedType] = React.useState(`${type && (type === ':all' || type === ':phone' || type === ':another-devices') ? type.split(':')[1] : 'all'}`);
    React.useEffect(() => {
        setSelectedType(`${type && (type === ':all' || type === ':phone' || type === ':another-devices') ? type.split(':')[1] : 'all'}`)
    }, [type])
    return (
        <section className={`tariffs`}>
            <MetaTags>
                <title>{selectedType === "all" ? 'Все тарифы' : ''}{selectedType === "phone" ? 'Тарифы для телефонов' : ''}{selectedType === "another-devices" ? 'Тарифы для устройств' : ''}</title>
                <meta property="og:title" content={`Boom - ${selectedType === "all" ? 'Все тарифы' : ''}${selectedType === "phone" ? 'Тарифы для телефонов' : ''}${selectedType === "another-devices" ? 'Тарифы для устройств' : ''}`} />
            </MetaTags>
            <div className={`tariffs__head-container`}>
                <img className={`tariffs__head-logo`} src={headBox} alt="Тарифы" />
                <h2 className={`tariffs__head-title ${darkTheme ? 'tariffs__text_dark' : ''}`}>Тарифы</h2>
            </div>

            <div className={`tariffs__head-buttons`}>
                <button onClick={() => {
                    history.push(':all')
                    setSelectedType('all')
                }} className={`tariffs__head-button ${selectedType === "all" ? "tariffs__head-button_active" : ''} `}>
                    <p className={`tariffs__head-button-text ${darkTheme ? 'tariffs__head-button-text_dark' : ''} ${selectedType === "all" ? "tariffs__head-button-text_active" : ''} `}>Все тарифы</p>
                </button>
                <button onClick={() => {
                    history.push(':phone')
                    setSelectedType('phone')
                }} className={`tariffs__head-button ${selectedType === "phone" ? "tariffs__head-button_active" : ''} `}>
                    <p className={`tariffs__head-button-text ${darkTheme ? 'tariffs__head-button-text_dark' : ''} ${selectedType === "phone" ? "tariffs__head-button-text_active" : ''} `}>Для телефонов</p>
                </button>
                <button onClick={() => {
                    history.push(':another-devices')
                    setSelectedType('another-devices')
                }} className={`tariffs__head-button ${selectedType === "another-devices" ? "tariffs__head-button_active" : ''} `}>
                    <p className={`tariffs__head-button-text  ${darkTheme ? 'tariffs__head-button-text_dark' : ''} ${selectedType === "another-devices" ? "tariffs__head-button-text_active" : ''}`}>Для устройств</p>
                </button>
            </div>
            {selectedType === "all" || selectedType === "phone" ?

                <div>
                    <h2 className={`tariffs__title ${darkTheme ? 'tariffs__text_dark' : ''}`}>Тарифы для телефонов</h2>
                    <Tariffs>
                        {tariffTypesArray.map((tariff, id) => <TariffCard key={tariff.title} tariffId={id} tariff={tariff} />)}
                    </Tariffs>
                </div>

                : <></>}
            {selectedType === "all" || selectedType === "another-devices" ?
                <div>
                    <h2 className={`tariffs__title ${darkTheme ? 'tariffs__text_dark' : ''}`}>Тарифы для устройств</h2>
                    <Tariffs >
                        {tariffTypesArray.slice(0, 2).map((tariff, id) => <TariffCard key={tariff.title} tariffId={id} tariff={tariff} />)}
                    </Tariffs>
                </div>
                : <></>}

        </section>
    )
}
