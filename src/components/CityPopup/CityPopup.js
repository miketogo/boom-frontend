import React, { useContext } from 'react';
import { GlobalContext } from '../../App';
import './CityPopup.css';


export default function CityPopup(props) {

    const { darkTheme } = useContext(GlobalContext);
    return (
        <div className={`city-popup ${darkTheme? 'city-popup_dark' : ''} ${props.isCityPopupVisible? 'city-popup_visible' : ''}`}>
            <p className={`city-popup__text  ${darkTheme? 'city-popup__text_dark' : ''}`}>Ваш город <span className={`city-popup__text-span  ${darkTheme? 'city-popup__text_dark' : ''}`}>Москва</span>?</p>
            <div className={`city-popup__buttons`}>
                <div onClick={()=> props.handleCityPopup(true)} className={`city-popup__button`}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M29.9627 12.3L16.9884 24.9622C16.6285 25.3134 16.0433 25.3131 15.6838 24.9622L10.6619 20.0612C10.0817 19.4947 9.14053 19.4947 8.56039 20.0612C7.97987 20.6274 7.97987 21.5459 8.56039 22.1125L13.5823 27.0134C14.3416 27.7545 15.339 28.125 16.3363 28.125C17.3336 28.125 18.331 27.7545 19.0899 27.0134L32.0646 14.3508C32.6451 13.7847 32.6451 12.8661 32.0646 12.2996C31.4845 11.7334 30.5433 11.7334 29.9627 12.3V12.3Z" fill="#32A43E" />
                        <circle cx="20" cy="20" r="19" stroke="#32A43E" strokeWidth="2" />
                    </svg>
                    <p className={`city-popup__button-text  ${darkTheme? 'city-popup__button-text_dark' : ''}`}>Да</p>
                </div>
                <div onClick={()=> props.handleCityPopup(false)} className={`city-popup__button`}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="19" stroke="#FF0202" strokeWidth="2" />
                        <path d="M10 30L30 10" stroke="#FF0202" strokeWidth="2" strokeLinecap="round" />
                        <path d="M30 30L10 10" stroke="#FF0202" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <p className={`city-popup__button-text ${darkTheme? 'city-popup__button-text_dark' : ''}`}>Нет</p>
                </div>


            </div>


        </div>
    )

}
