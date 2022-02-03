import React, { useContext } from 'react';
// import styled from 'styled-components/macro';
// import Slide from '../components/Slide';
// import girl_with_phone from "../assets/images/girl_with_phone_banner.png";
// import hand_banner from "../assets/images/hand_banner.png";
import MetaTags from 'react-meta-tags';
import Banner from '../components/Banner/Banner';
import Tariffs from '../components/Tariffs';
import NumbersForMain from '../components/NumbersForMain/NumbersForMain';
import MainCards from '../components/MainCards/MainCards';
// import СoverageMap from '../components/СoverageMap/СoverageMap';
import CityPopup from '../components/CityPopup/CityPopup';
import { GlobalContext } from '../App';
import TariffCard from '../globals/TariffCard';
import { BUY_NUMBER, tariffTypesArray } from '../globals/utils';
import { useDispatch } from 'react-redux';

// const slides = [
//     {
//         title: "Тарифы, для студентов!",
//         subtitle: "Тарифы для связи, от 350 руб. в месяц",
//         imgUrl: girl_with_phone,
//         url: '/tariff-info/:Базовый'
//     },
//     {
//         title: "БУМ! БУМ!, И ты в бизнесе!",
// subtitle: "Премиальные тарифы для связи, от 1500 руб. в месяц",
//         imgUrl: hand_banner,
//         url: '/tariff-info/:Бизнес'
//     }
// ]

// const Carousel = styled.div`
//     background: linear-gradient(135deg, #4B75FC 0%, #3C4FFF 100%);
//     position: relative;
//     border-radius: 44px;
//     margin-top: 40px;
// `
// const WrapCtrls = styled.span`
//     position: absolute;
//     left: 109px;
//     bottom: 88px;
//     display: flex;
//     color:#FFFFFF;
//     gap: 31px;
//     @media(max-width: 1000px) {
//         left: 48px;
//         bottom: 32px;
//     }
//     @media(max-width: 540px) {
//         left: 20px;
//         bottom: 114px;
//     }
// `;

// const Controls = ({ move }) => {
//     return (
//         <>{(slides.length >= 2) &&
//             <WrapCtrls>
//                 <svg onClick={() => move("previous")} cursor="pointer" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <circle cx="22" cy="22" r="21.5" fill="white" stroke="#E2E2E2" />
//                     <path d="M13.9393 20.9393C13.3536 21.5251 13.3536 22.4749 13.9393 23.0607L23.4853 32.6066C24.0711 33.1924 25.0208 33.1924 25.6066 32.6066C26.1924 32.0208 26.1924 31.0711 25.6066 30.4853L17.1213 22L25.6066 13.5147C26.1924 12.9289 26.1924 11.9792 25.6066 11.3934C25.0208 10.8076 24.0711 10.8076 23.4853 11.3934L13.9393 20.9393ZM16 20.5H15V23.5H16V20.5Z" fill="#121212" />
//                 </svg>
//                 <svg onClick={() => move()} cursor="pointer" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <circle cx="22" cy="22" r="21.5" transform="rotate(-180 22 22)" fill="white" stroke="#E2E2E2" />
//                     <path d="M30.0607 23.0607C30.6464 22.4749 30.6464 21.5251 30.0607 20.9393L20.5147 11.3934C19.9289 10.8076 18.9792 10.8076 18.3934 11.3934C17.8076 11.9792 17.8076 12.9289 18.3934 13.5147L26.8787 22L18.3934 30.4853C17.8076 31.0711 17.8076 32.0208 18.3934 32.6066C18.9792 33.1924 19.9289 33.1924 20.5147 32.6066L30.0607 23.0607ZM28 23.5L29 23.5L29 20.5L28 20.5L28 23.5Z" fill="#121212" />
//                 </svg>
//             </WrapCtrls>}</>
//     )
// }





export default function Main() {
    const { darkTheme } = useContext(GlobalContext);
    const [isCityPopupVisible, setCityPopupVisible] = React.useState(false);
    const [isCityPopupChecked, setCityPopupChecked] = React.useState(false);

    React.useEffect(() => {
        const InMoscow = localStorage.getItem("InMoscow");
        if (!InMoscow) {
            setTimeout(setCityPopupVisible, 1000, true)
        } else {
            setCityPopupChecked(true)
        }

    }, [])


    const dispatch = useDispatch();

    function handleCityPopup(chose) {
        localStorage.setItem('InMoscow', chose);
        setCityPopupVisible(false)
    }

    function buyNumber(numbers) {
        dispatch({ type: BUY_NUMBER, numbers })
    }

    return (
        <>
            <MetaTags>
                <title>Главная</title>
                <meta property="og:title" content="Boom - Главная" />
            </MetaTags>
            {isCityPopupChecked ? <></> : <CityPopup isCityPopupVisible={isCityPopupVisible} handleCityPopup={handleCityPopup} />}
            <Banner />
            <p className={`main-text ${darkTheme ? 'main-text_dark' : ''}`}>Выбирайте только <span>самое необходимое</span></p>
            <Tariffs>
                {tariffTypesArray.map((tariff, id) => <TariffCard key={tariff.title} tariffId={id} tariff={tariff} />)}
            </Tariffs>
            <MainCards />
            <NumbersForMain buyNumber={buyNumber} />

            {/* <СoverageMap /> */}
            {/* <script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A6ef07207ddabc0960bbcba5ae8faa14849723bf94e88096283051f9d6d588401&amp;width=500&amp;height=400&amp;lang=ru_RU&amp;scroll=true"></script> */}
        </>
    )
}
