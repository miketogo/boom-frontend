import React, { useContext } from 'react';
import { GlobalContext } from '../../App';
import './Preloader.css'

const Preloader = () => {
    const { darkTheme } = useContext(GlobalContext);
    return (
        <div className="preloader">
            <div className="preloader__container">
                <span className={`preloader__round ${darkTheme? 'preloader__round_dark':''}`}></span>
            </div>
        </div>
    )
};

export default Preloader
