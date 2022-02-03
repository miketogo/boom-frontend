import React from 'react';

import './Banner.css';

import rocket from '../../assets/images/banenr-rocket.png'

export default function FirstBanner() {


    return (
        <div className={`banner__card banner__card_with-roket`}>
            <p className={`banner__card-title`}>Безлимитный 4G Интернет!</p>
            <p className={`banner__card-subtitle`}>По всей стране без ограничений</p>
            <img className={`banner__card-img_roket`} src={rocket} alt="Картинка"/>
        </div>
    )

}
