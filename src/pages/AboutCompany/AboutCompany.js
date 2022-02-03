import React, { useContext } from 'react';
import MetaTags from 'react-meta-tags';
import './AboutCompany.css';
import { Link } from "react-router-dom";
import { GlobalContext } from '../../App';
import logo1 from '../../assets/images/logo1.svg'
import logo2 from '../../assets/images/logo2.svg'
import youngGuard from '../../assets/images/young-guard.png'
import largeFamilies from '../../assets/images/union-of-large-families.png'
export default function AboutCompany() {
    const { darkTheme } = useContext(GlobalContext);
    return (
        <section className={`about-company`}>
            <MetaTags>
                <title>Про компанию</title>
                <meta property="og:title" content="Boom - Про компанию" />
            </MetaTags>
            <h2 className={`about-company__title ${darkTheme ? 'about-company__text_dark' : ''}`}>Про компанию</h2>
            <div className={`about-company__main-container ${darkTheme ? 'about-company__container_dark' : ''}`}>
                <div className={`about-company__column_first`}>
                    <Link to="/">
                        <img src={darkTheme ? logo1 : logo2} alt="Логотип" className={`about-company__logo`} />
                    </Link>

                    <p className={`about-company__main-container-text ${darkTheme ? 'about-company__text_dark' : ''}`}>
                        Команда Boom Telecom — это виртуальный оператор,  созданный для предоставления связи всем желающим.
                        <br /><br />
                        Мы не просто компания на рынке телекоммуникаций. Наш главный приоритет — предоставление максимально выгодной и качественной связи для наших пользователей. 
                        <br /><br />
                        Наши абоненты — это наши друзья и партнеры, которые получают качественную связь.
                        <br /><br />
                        Наша главная миссия — сделать связь Вашим помощником в ежедневных делах для решения любых задач. Мы делаем тарифные планы для Вас более доступными, а возможности общения и пользования Интернетом более обширными.
                        <br /><br />
                        Если Вы хотите иметь надёжную связь, постоянный доступ в Интернет и возможность быть частью нашей команды, то добро пожаловать в Boom Telecom!
                    </p>
                </div>
                <div className={`about-company__column_second`}>
                    <div className={`about-company__main-container-info`}>
                        <p className={`about-company__main-container-info_number`}>20 000</p>
                        <p className={`about-company__main-container-info_text ${darkTheme ? 'about-company__text_dark' : ''}`}>Активных абонентов</p>
                    </div>
                    <div className={`about-company__main-container-info`}>
                        <p className={`about-company__main-container-info_number`}>15 000</p>
                        <p className={`about-company__main-container-info_text ${darkTheme ? 'about-company__text_dark' : ''}`}>База красивых номеров</p>
                    </div>
                    <div className={`about-company__main-container-info`}>
                        <p className={`about-company__main-container-info_number`}>24</p>
                        <p className={`about-company__main-container-info_text ${darkTheme ? 'about-company__text_dark' : ''}`}>Тарифа на выбор</p>
                    </div>
                </div>
            </div>
            <h2 className={`about-company__title ${darkTheme ? 'about-company__text_dark' : ''}`}>Наши партнеры</h2>
            <div className={`about-company__partners`}>
                <div className={`about-company__partner ${darkTheme ? 'about-company__container_dark' : ''}`}>

                    <img className={`about-company__partner-logo`} src={youngGuard} alt="Молодая гвардия" />


                    <div className={`about-company__partner-text`}>
                        <a className={`about-company__link`} target="_blank" rel="noreferrer" href="https://mger.ru/">
                            <h2 className={`about-company__partner-name ${darkTheme ? 'about-company__text_dark' : ''}`}>Молодая Гвардия Единой России</h2>
                        </a>
                        <p className={`about-company__partner-description ${darkTheme ? 'about-company__text_dark' : ''}`}>
                            Практически во всех уголках нашей страны действуют региональные
                            и местные отделения «Молодой Гвардии». Они объединяют молодых
                            людей разных национальностей, социального положения, вероисповедания.
                            <br /> <br />
                            В содружестве с Boom Telecom члены всероссийской общественной организаций «Молодая Гвардия» могут воспользоваться мобильной связью по доступным тарифам.
                        </p>
                    </div>
                </div>
                <div className={`about-company__partner ${darkTheme ? 'about-company__container_dark' : ''}`}>

                    <img className={`about-company__partner-logo`} src={largeFamilies} alt="Межрегиональный Союз Общественных Объединений Многодетных Семей" />

                    <div className={`about-company__partner-text`}>
                        <a className={`about-company__link`} target="_blank" rel="noreferrer" href="https://www.mcoomc.ru/">
                            <h2 className={`about-company__partner-name ${darkTheme ? 'about-company__text_dark' : ''}`}>Межрегиональный Союз Общественных Объединений Многодетных Семей</h2>
                        </a>
                        <p className={`about-company__partner-description ${darkTheme ? 'about-company__text_dark' : ''}`}>
                            Миссия организации — сформировать справедливое
                            устройство общества в РФ на принципах справедливости.
                            <br /> <br />
                            Так как многодетные семьи являются основой будущего
                            Российской Федерации, Boom Telecom в содружестве с
                            Межрегиональным Союзом Общественных
                            Объединений Многодетных Семей предоставляет улуги
                            мобильной связи на льготных условиях многодетным семьям
                            по всей стране.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}
