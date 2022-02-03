import moment from 'moment';

import { useEffect, useState } from "react";
import './PopupCheckBox.css';




function PopupCheckBox({  defaultState = true, handleSelectChange}) {
    const [isSelected, setSelected] = useState(defaultState);

    function handleChange(){
        setSelected(!isSelected)
        handleSelectChange(!isSelected)
    }
    return (
        <div onClick={()=>{handleChange()}} className='popup-checkbox'>
            <div  className={`popup-checkbox__btn ${!isSelected ? 'popup-checkbox__btn_not-selected': ''}`}>
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 5.7L4.35714 8.5L10.5 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <p className='popup-checkbox__text'>Я подтверждаю, что мне 18 или более лет, выражаю <span className='popup-checkbox__text_blue'>согласие</span> на обработку моих персональных данных и подтверждаю, что ознакомлен с <a className='popup-checkbox__text_link' target="_blank" rel="noreferrer" href='/#'>Пользовательским соглашением</a></p>
        </div>
    )
}

export default PopupCheckBox