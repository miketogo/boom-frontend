import React from 'react';

import FirstBanner from './FirstBanner';
import './Banner.css';


export default function Banner() {


    return (
        <section className={`banner`}>
            <FirstBanner />
            <div className={`banner__buttons`}>
                <svg   className={`banner__button`} cursor="pointer" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.9393 20.9393C13.3536 21.5251 13.3536 22.4749 13.9393 23.0607L23.4853 32.6066C24.0711 33.1924 25.0208 33.1924 25.6066 32.6066C26.1924 32.0208 26.1924 31.0711 25.6066 30.4853L17.1213 22L25.6066 13.5147C26.1924 12.9289 26.1924 11.9792 25.6066 11.3934C25.0208 10.8076 24.0711 10.8076 23.4853 11.3934L13.9393 20.9393ZM16 20.5H15V23.5H16V20.5Z" fill="#ffffff" />
                </svg>
                <svg  className={`banner__button`} cursor="pointer"  width="44" height="44" viewBox="0 0 44 44" fill="red" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.0607 23.0607C30.6464 22.4749 30.6464 21.5251 30.0607 20.9393L20.5147 11.3934C19.9289 10.8076 18.9792 10.8076 18.3934 11.3934C17.8076 11.9792 17.8076 12.9289 18.3934 13.5147L26.8787 22L18.3934 30.4853C17.8076 31.0711 17.8076 32.0208 18.3934 32.6066C18.9792 33.1924 19.9289 33.1924 20.5147 32.6066L30.0607 23.0607ZM28 23.5L29 23.5L29 20.5L28 20.5L28 23.5Z" fill="#ffffff" />
                </svg>
            </div>
        </section>
    )

}
