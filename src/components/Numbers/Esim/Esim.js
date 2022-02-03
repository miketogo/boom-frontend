import React, { useContext } from 'react';
import { GlobalContext } from '../../../App';
import FaqCard from './FaqCard';
import { faqData } from './FaqData'
import phone from '../../../assets/images/esim-phone.png'
import questionMark from '../../../assets/images/question-mark.png'
import fire from '../../../assets/images/esim/fire.png'
import hourglass from '../../../assets/images/esim/hourglass.png'
import phoneIcon from '../../../assets/images/esim/phone.png'
import clover from '../../../assets/images/esim/clover.png'
import './Esim.css';


export default function Esim(props) {
    const { darkTheme } = useContext(GlobalContext);
    const [faqOpend, setFaqOpend] = React.useState("");
    const [dropdownOpend, setDropdownOpend] = React.useState("");

    function handleBuyEsim(){
        props.buyEsim()
    }
    return (
        <section className={`esim`}>
            {props.screenWidth > 1795 ?
                <>
                    <div className={`esim__first-column`}>
                        <div className={`esim__about-container`}>
                            <img className={`esim__about-container-img`} alt="Телефон" src={phone} />
                            <p className={`esim__about-container-text`}>eSIM — крошечная микросхема, которая полностью заменяет пластиковую SIM-карту</p>
                            <button onClick={()=> handleBuyEsim()} className={`esim__about-container-button`}>
                                <p className={`esim__about-container-button-text`}>Оформить eSIM</p>
                                <svg className={`esim__about-container-button-arrow`} width="13" height="23" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.5607 12.5607C13.1464 11.9749 13.1464 11.0251 12.5607 10.4393L3.01472 0.893396C2.42894 0.30761 1.47919 0.307609 0.893401 0.893396C0.307614 1.47918 0.307614 2.42893 0.893401 3.01472L9.37868 11.5L0.893396 19.9853C0.307609 20.5711 0.307609 21.5208 0.893396 22.1066C1.47918 22.6924 2.42893 22.6924 3.01472 22.1066L12.5607 12.5607ZM10.5 13L11.5 13L11.5 10L10.5 10L10.5 13Z" fill="white" />
                                </svg>
                            </button>
                        </div>
                        <div className={`esim__faq`}>
                            <div className={`esim__faq-title`}>
                                <img className={`esim__faq-title-img`} alt="?" src={questionMark} />
                                <h2 className={`esim__faq-title-text ${darkTheme? 'esim__faq-title-text_dark' : ''}`}>Вопросы и ответы</h2>
                            </div>
                            <div className={`esim__faq-cards`}>
                                {faqData && faqData.map((item, i) => (
                                    <FaqCard item={item} key={`esim${i}`} setFaqOpend={setFaqOpend} faqOpend={faqOpend} setDropdownOpend={setDropdownOpend} dropdownOpend={dropdownOpend} />
                                ))}


                            </div>
                        </div>
                    </div>
                    <div className={`esim__second-column`}>
                        <div className={`esim__propositions ${darkTheme? 'esim__propositions_dark' : ''}`}>
                            <div className={`esim__proposition`}>
                                <img className={`esim__proposition-img`} alt="Огонь" src={fire} />
                                <p className={`esim__proposition-text ${darkTheme? 'esim__proposition-text_dark' : ''}`}>Оформление<br />eSIM бесплатно</p>
                            </div>
                            <div className={`esim__proposition`}>
                                <img className={`esim__proposition-img`} alt="Песочные часы" src={hourglass} />
                                <p className={`esim__proposition-text ${darkTheme? 'esim__proposition-text_dark' : ''}`}>Получение<br />за 5 минут</p>
                            </div>
                            <div className={`esim__proposition`}>
                                <img className={`esim__proposition-img`} alt="Телефон" src={phoneIcon} />
                                <p className={`esim__proposition-text ${darkTheme? 'esim__proposition-text_dark' : ''}`}>Несколько номеров<br />на телефоне</p>
                            </div>
                            <div className={`esim__proposition`}>
                                <img className={`esim__proposition-img`} alt="Клевер" src={clover} />
                                <p className={`esim__proposition-text ${darkTheme? 'esim__proposition-text_dark' : ''}`}>Безопасно<br />для природы</p>
                            </div>
                        </div>
                        <div className={`esim__how-connect`}>
                            <h2 className={`esim__how-connect-title`}>Как подключить eSIM на гаджете?</h2>
                            <ul className={`esim__how-connect-list`}>
                                <li className={`esim__how-connect-item`}>
                                    <p className={`esim__how-connect-item-number`}>1</p>
                                    <p className={`esim__how-connect-item-text`}>Подключите устройство к Wi-Fi или мобильному интернету</p>
                                </li>
                                <li className={`esim__how-connect-item`}>
                                    <p className={`esim__how-connect-item-number`}>2</p>
                                    <p className={`esim__how-connect-item-text`}>Откройте камеру и отсканируйте QR-код</p>
                                </li>
                                <li className={`esim__how-connect-item`}>
                                    <p className={`esim__how-connect-item-number`}>3</p>
                                    <p className={`esim__how-connect-item-text`}>Настройте тариф по инструкциям на экране устройства</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className={`esim__about-container`}>
                        <img className={`esim__about-container-img`} alt="Телефон" src={phone} />
                        <div>
                            <p className={`esim__about-container-text`}>eSIM — крошечная микросхема, которая полностью заменяет пластиковую SIM-карту</p>
                            <button onClick={()=> handleBuyEsim()} className={`esim__about-container-button`}>
                                <p className={`esim__about-container-button-text`}>Оформить eSIM</p>
                                <svg className={`esim__about-container-button-arrow`} width="13" height="23" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.5607 12.5607C13.1464 11.9749 13.1464 11.0251 12.5607 10.4393L3.01472 0.893396C2.42894 0.30761 1.47919 0.307609 0.893401 0.893396C0.307614 1.47918 0.307614 2.42893 0.893401 3.01472L9.37868 11.5L0.893396 19.9853C0.307609 20.5711 0.307609 21.5208 0.893396 22.1066C1.47918 22.6924 2.42893 22.6924 3.01472 22.1066L12.5607 12.5607ZM10.5 13L11.5 13L11.5 10L10.5 10L10.5 13Z" fill="white" />
                                </svg>
                            </button>
                        </div>

                    </div>
                    <div className={`esim__propositions ${darkTheme? 'esim__propositions_dark' : ''}`}>
                        <div className={`esim__proposition`}>
                            <img className={`esim__proposition-img`} alt="Огонь" src={fire} />
                            <p className={`esim__proposition-text ${darkTheme? 'esim__proposition-text_dark' : ''}`}>Оформление<br />eSIM бесплатно</p>
                        </div>
                        <div className={`esim__proposition`}>
                            <img className={`esim__proposition-img`} alt="Песочные часы" src={hourglass} />
                            <p className={`esim__proposition-text ${darkTheme? 'esim__proposition-text_dark' : ''}`}>Получение<br />за 5 минут</p>
                        </div>
                        <div className={`esim__proposition`}>
                            <img className={`esim__proposition-img`} alt="Телефон" src={phoneIcon} />
                            <p className={`esim__proposition-text ${darkTheme? 'esim__proposition-text_dark' : ''}`}>Несколько номеров<br />на телефоне</p>
                        </div>
                        <div className={`esim__proposition`}>
                            <img className={`esim__proposition-img`} alt="Клевер" src={clover} />
                            <p className={`esim__proposition-text ${darkTheme? 'esim__proposition-text_dark' : ''}`}>Безопасно<br />для природы</p>
                        </div>
                    </div>
                    <div className={`esim__how-connect`}>
                        <h2 className={`esim__how-connect-title`}>Как подключить eSIM на гаджете?</h2>
                        <ul className={`esim__how-connect-list`}>
                            <li className={`esim__how-connect-item`}>
                                <p className={`esim__how-connect-item-number`}>1</p>
                                <p className={`esim__how-connect-item-text`}>Подключите устройство к WiFi или мобильному интернету</p>
                            </li>
                            <li className={`esim__how-connect-item`}>
                                <p className={`esim__how-connect-item-number`}>2</p>
                                <p className={`esim__how-connect-item-text`}>Откройте камеру и отсканируйте QR-код</p>
                            </li>
                            <li className={`esim__how-connect-item`}>
                                <p className={`esim__how-connect-item-number`}>3</p>
                                <p className={`esim__how-connect-item-text`}>Настройте тариф по инструкциям на экране устройства</p>
                            </li>
                        </ul>
                    </div>
                    <div className={`esim__faq`}>
                        <div className={`esim__faq-title`}>
                            <img className={`esim__faq-title-img`} alt="?" src={questionMark} />
                            <h2 className={`esim__faq-title-text ${darkTheme? 'esim__faq-title-text_dark' : ''}`}>Часто задаваемые вопросы</h2>
                        </div>
                        <div className={`esim__faq-cards`}>
                            {faqData && faqData.map((item, i) => (
                                <FaqCard item={item} key={`esim-mobile${i}`} setFaqOpend={setFaqOpend} faqOpend={faqOpend} setDropdownOpend={setDropdownOpend} dropdownOpend={dropdownOpend} />
                            ))}


                        </div>
                    </div>
                </>}


        </section>
    )

}
