import React, { useContext } from 'react';
import { GlobalContext } from '../../../App';

import './Esim.css';


export default function FaqCard(props) {
    const { darkTheme } = useContext(GlobalContext);
    

    return (
        <>
            {props.item.dropdowns ?
                <div className={`esim__faq-card-container`}>
                    <div className={`esim__faq-card `} onClick={() => {
                        if (props.faqOpend === `${props.item.title}`) {
                            props.setFaqOpend('')
                            props.setDropdownOpend('')
                        } else {
                            props.setFaqOpend(`${props.item.title}`)
                        }

                    }}>
                        <div className={`esim__faq-card-items`}>
                            <h2 className={`esim__faq-card-title ${darkTheme? 'esim__faq-card-title_dark' : ''}`}>{props.item && props.item.title}</h2>
                            <svg className={`esim__faq-card-tick ${props.faqOpend === `${props.item.title}` ? 'esim__faq-card-tick_active' : ''}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.99967 11.985L15.6077 6.20508L16.6663 7.29613L9.99967 14.1671L3.33301 7.29613L4.39162 6.20508L9.99967 11.985Z" fill={darkTheme? '#ffffff' :"#010101"} />
                            </svg>
                        </div>

                    </div>

                    <div className={`esim__faq-answer esim__faq-answer_hidden ${props.faqOpend === `${props.item.title}` ? 'esim__faq-answer_active' : ''}`}>
                        {props.item.dropdowns ? props.item.dropdowns.map((item, i) => (

                            <div key={`faq-card${i}`} className={`esim__faq-answer-dropdown`}>
                                <div className={`esim__faq-answer-dropdown-title`} onClick={() => {
                                    if (props.dropdownOpend === `${item.title}${item.subtitle}`) {
                                        props.setDropdownOpend('')
                                    } else {
                                        props.setDropdownOpend(`${item.title}${item.subtitle}`)
                                    }

                                }}>
                                    <p className={`esim__faq-answer-dropdown-text ${darkTheme? 'esim__faq-card-title_dark' : ''}`}>{item.title}</p>
                                    <p className={`esim__faq-answer-dropdown-text ${darkTheme? 'esim__faq-card-title_dark' : ''}`}>{item.subtitle}</p>
                                    <svg className={`esim__faq-card-tick ${props.dropdownOpend === `${item.title}${item.subtitle}` ? 'esim__faq-card-tick_active' : ''}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.99967 11.985L15.6077 6.20508L16.6663 7.29613L9.99967 14.1671L3.33301 7.29613L4.39162 6.20508L9.99967 11.985Z" fill={darkTheme? '#ffffff' :"#010101"} />
                                    </svg>
                                </div>
                                <ul>

                                    {props.dropdownOpend === `${item.title}${item.subtitle}` ?
                                        item.items.map((itm, i) => (

                                            <li className={`esim__li`} key={`faq-li${i}`}>{itm}</li>

                                        ))

                                        : <></>}
                                </ul>
                            </div>

                        ))

                            : <></>}




                    </div>


                </div>
                :
                <div className={`esim__faq-card-container`}>
                    <div className={`esim__faq-card `} onClick={() => {
                        if (props.faqOpend === `${props.item.title}`) {
                            props.setFaqOpend('')
                            props.setDropdownOpend('')
                        } else {
                            props.setFaqOpend(`${props.item.title}`)
                        }

                    }}>
                        <div className={`esim__faq-card-items`}>
                            <h2 className={`esim__faq-card-title ${darkTheme? 'esim__faq-card-title_dark' : ''}`}>{props.item && props.item.title}</h2>
                            <svg className={`esim__faq-card-tick ${props.faqOpend === `${props.item.title}` ? 'esim__faq-card-tick_active' : ''}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.99967 11.985L15.6077 6.20508L16.6663 7.29613L9.99967 14.1671L3.33301 7.29613L4.39162 6.20508L9.99967 11.985Z" fill={darkTheme? '#ffffff' :"#010101"} />
                            </svg>
                        </div>

                    </div>

                    <div className={`esim__faq-answer esim__faq-answer_hidden ${props.faqOpend === `${props.item.title}` ? 'esim__faq-answer_active' : ''}`}>
                        <p className={`esim__faq-answer-text ${darkTheme? 'esim__faq-card-title_dark' : ''}`}>{props.item.answer}</p>
                    </div>


                </div>}

        </>

    )

}
