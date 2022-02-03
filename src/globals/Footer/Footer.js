import React, { useContext } from 'react';
import { GlobalContext } from '../../App';
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import ThemeSwitch from "../../components/ThemeSwitch";
import footer_call from '../../assets/images/footer-call.svg'
import footer_whatsapp from '../../assets/images/footer-whatsapp.svg'
import footer_telegram from '../../assets/images/footer-telegram.svg'
import footer_instagram from '../../assets/images/footer-instagram.svg'
import './Footer.css';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_AUTH } from '../utils';

export const FooterSocials = () => (
    <div className={`footer__socials`}>
        <Link to="/" className={`footer__social-link footer__social_type_phone`}>
            <img src={footer_call} className={`footer__social-img`} alt="Телефон"></img>
        </Link>
        <Link to="/" className={`footer__social-link footer__social_type_whatsapp`}>
            <img src={footer_whatsapp} className={`footer__social-img`} alt="WhatsApp"></img>
        </Link>
        <Link to="/" className={`footer__social-link footer__social_type_telegram`}>
            <img src={footer_telegram} className={`footer__social-img footer__social-img_type_telegram`} alt="Telegram"></img>
        </Link>
        <Link to="/" className={`footer__social-link footer__social_type_instagram`}>
            <img src={footer_instagram} className={`footer__social-img`} alt="Telegram"></img>
        </Link>
    </div>
)

export default function Footer() {
    const { darkTheme, setLoginForm } = useContext(GlobalContext);
    const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
    const {accessToken, refreshToken} = useSelector(store => store.auth);
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const logged_in = pathname === "/dashboard" && accessToken

    const handleButton = () => {
        if (logged_in) { dispatch({type: DELETE_AUTH}); setLoginForm(false); }
        else if(refreshToken) {setLoginForm(false) }
        else setLoginForm(true)
    }
    
    function handleResize() {
        setScreenWidth(window.innerWidth)
        window.removeEventListener('resize', handleResize);
    }
    React.useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
    
    

    return (
        <footer className={`footer ${darkTheme ? 'footer_dark' : ''}`}>
            {screenWidth > 1155 ?
                <>
                    <div className={`footer__column`}>
                        <ul className={`footer__contacts`}>
                            <li className={`footer__contact`}>
                                <p className={`footer__contact-text ${darkTheme ? 'footer__text_dark' : ''}`}>email:&nbsp;&nbsp;</p>
                                <a className={`footer__contact-link ${darkTheme ? 'footer__text_dark' : ''}`} target="_blank" rel="noreferrer" href="mailto:info@boomtele.com">info@boomtele.com</a>
                            </li>
                            <li className={`footer__contact`}>
                                <p className={`footer__contact-text ${darkTheme ? 'footer__text_dark' : ''}`}>телефон:&nbsp;&nbsp;</p>
                                <a className={`footer__contact-link ${darkTheme ? 'footer__text_dark' : ''}`} target="_blank" rel="noreferrer" href="tel:+74957959566">+7 495 795 95 66</a>
                            </li>
                            <li className={`footer__contact`}>
                                <p className={`footer__contact-text ${darkTheme ? 'footer__text_dark' : ''}`}>адрес:&nbsp;&nbsp;</p>
                                <a className={`footer__contact-link ${darkTheme ? 'footer__text_dark' : ''}`} target="_blank" rel="noreferrer" href={`https://yandex.ru/maps/?pt=37.596857,55.764374&z=18&l=map`}>Малый Козихинский пер., 12</a>
                            </li>
                        </ul>
                        <div className={`footer__copyright-container`}>
                            <a className={`footer__dev-container`} target="_blank" rel="noreferrer" href={`http://caba.tech/`}>
                                <p className={`footer__dev-text ${darkTheme ? 'footer__text_dark' : ''}`}>Разработано в</p>
                                <svg width="103" height="35" viewBox="0 0 103 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.51073 34.5051C7.6925 34.5051 6.06076 34.0739 4.6155 33.2114C3.19355 32.3489 2.06299 31.1834 1.22381 29.7148C0.407936 28.2462 0 26.5912 0 24.7496C0 22.8848 0.384625 21.2181 1.15388 19.7495C1.92313 18.2809 2.98376 17.1271 4.33577 16.2879C5.68779 15.4254 7.23794 14.9941 8.98624 14.9941C10.4781 14.9941 11.8418 15.2855 13.0773 15.8683C14.3127 16.4277 15.385 17.2902 16.2941 18.4558C16.4806 18.6889 16.5505 18.9336 16.5039 19.19C16.4573 19.4465 16.3058 19.6563 16.0494 19.8194C15.8396 19.9826 15.6065 20.0525 15.35 20.0292C15.0936 19.9826 14.8722 19.8427 14.6857 19.6096C13.1938 17.838 11.294 16.9522 8.98624 16.9522C7.61091 16.9522 6.39876 17.2902 5.34978 17.9662C4.32412 18.6422 3.5199 19.563 2.93714 20.7285C2.37768 21.8941 2.09795 23.2344 2.09795 24.7496C2.09795 26.2182 2.41265 27.5469 3.04203 28.7357C3.67142 29.9013 4.53391 30.8337 5.62951 31.533C6.74842 32.209 8.04216 32.547 9.51073 32.547C10.4665 32.547 11.3639 32.4072 12.2031 32.1274C13.0656 31.8477 13.8115 31.4165 14.4409 30.8337C14.6507 30.6472 14.8838 30.5423 15.1402 30.519C15.3967 30.4957 15.6181 30.5773 15.8046 30.7638C16.0377 30.9736 16.1543 31.2183 16.1543 31.498C16.1776 31.7545 16.0843 31.9759 15.8745 32.1624C14.1729 33.7242 12.0516 34.5051 9.51073 34.5051Z" fill={darkTheme ? "#FFFFFF" : "#010101"} />
                                    <path d="M30.5173 34.5051C28.6525 34.5051 26.9741 34.0855 25.4822 33.2463C24.0137 32.3838 22.8481 31.2183 21.9856 29.7497C21.1465 28.2579 20.7269 26.5912 20.7269 24.7496C20.7269 22.8848 21.1465 21.2181 21.9856 19.7495C22.8481 18.2576 24.0137 17.0921 25.4822 16.2529C26.9741 15.3904 28.6525 14.9592 30.5173 14.9592C32.3822 14.9592 34.0489 15.3904 35.5174 16.2529C36.986 17.0921 38.1399 18.2576 38.9791 19.7495C39.8416 21.2181 40.2728 22.8848 40.2728 24.7496V33.2463C40.2728 33.5494 40.1796 33.8058 39.9931 34.0156C39.8066 34.2021 39.5502 34.2953 39.2238 34.2953C38.9208 34.2953 38.6644 34.2021 38.4546 34.0156C38.2681 33.8058 38.1749 33.5494 38.1749 33.2463V30.519C37.4056 31.7311 36.3566 32.6985 35.0279 33.4212C33.6992 34.1438 32.1957 34.5051 30.5173 34.5051ZM30.5173 32.547C31.9859 32.547 33.2913 32.209 34.4335 31.533C35.599 30.8337 36.5081 29.9013 37.1608 28.7357C37.8369 27.5469 38.1749 26.2182 38.1749 24.7496C38.1749 23.2577 37.8369 21.929 37.1608 20.7635C36.5081 19.5747 35.599 18.6422 34.4335 17.9662C33.2913 17.2669 31.9859 16.9173 30.5173 16.9173C29.0721 16.9173 27.7667 17.2669 26.6011 17.9662C25.4356 18.6422 24.5148 19.5747 23.8388 20.7635C23.1628 21.929 22.8248 23.2577 22.8248 24.7496C22.8248 26.2182 23.1628 27.5469 23.8388 28.7357C24.5148 29.9013 25.4356 30.8337 26.6011 31.533C27.7667 32.209 29.0721 32.547 30.5173 32.547Z" fill={darkTheme ? "#FFFFFF" : "#010101"} />
                                    <path d="M55.2631 34.5051C53.4449 34.5051 51.8015 34.0855 50.3329 33.2463C48.8643 32.4072 47.6988 31.2649 46.8363 29.8197C45.9971 28.3744 45.5542 26.7427 45.5076 24.9245V8.03591C45.5076 7.70957 45.6008 7.45315 45.7873 7.26666C45.9971 7.08018 46.2535 6.98694 46.5566 6.98694C46.8829 6.98694 47.1393 7.08018 47.3258 7.26666C47.5123 7.45315 47.6055 7.70957 47.6055 8.03591V18.9453C48.3515 17.7331 49.3888 16.7657 50.7175 16.0431C52.0695 15.3205 53.5847 14.9592 55.2631 14.9592C57.1279 14.9592 58.7946 15.3904 60.2632 16.2529C61.7551 17.0921 62.9206 18.246 63.7598 19.7145C64.6223 21.1831 65.0535 22.8498 65.0535 24.7147C65.0535 26.5795 64.6223 28.2579 63.7598 29.7497C62.9206 31.2183 61.7551 32.3838 60.2632 33.2463C58.7946 34.0855 57.1279 34.5051 55.2631 34.5051ZM55.2631 32.547C56.7316 32.547 58.037 32.209 59.1793 31.533C60.3448 30.8337 61.2656 29.9013 61.9416 28.7357C62.6176 27.5469 62.9556 26.2065 62.9556 24.7147C62.9556 23.2228 62.6176 21.8941 61.9416 20.7285C61.2656 19.563 60.3448 18.6422 59.1793 17.9662C58.037 17.2669 56.7316 16.9173 55.2631 16.9173C53.8178 16.9173 52.5124 17.2669 51.3469 17.9662C50.1814 18.6422 49.2606 19.563 48.5846 20.7285C47.9319 21.8941 47.6055 23.2228 47.6055 24.7147C47.6055 26.2065 47.9319 27.5469 48.5846 28.7357C49.2606 29.9013 50.1814 30.8337 51.3469 31.533C52.5124 32.209 53.8178 32.547 55.2631 32.547Z" fill={darkTheme ? "#FFFFFF" : "#010101"} />
                                    <path d="M79.0394 34.5051C77.1745 34.5051 75.4961 34.0855 74.0043 33.2463C72.5357 32.3838 71.3702 31.2183 70.5077 29.7497C69.6685 28.2579 69.2489 26.5912 69.2489 24.7496C69.2489 22.8848 69.6685 21.2181 70.5077 19.7495C71.3702 18.2576 72.5357 17.0921 74.0043 16.2529C75.4961 15.3904 77.1745 14.9592 79.0394 14.9592C80.9042 14.9592 82.5709 15.3904 84.0395 16.2529C85.508 17.0921 86.6619 18.2576 87.5011 19.7495C88.3636 21.2181 88.7948 22.8848 88.7948 24.7496V33.2463C88.7948 33.5494 88.7016 33.8058 88.5151 34.0156C88.3286 34.2021 88.0722 34.2953 87.7459 34.2953C87.4428 34.2953 87.1864 34.2021 86.9766 34.0156C86.7901 33.8058 86.6969 33.5494 86.6969 33.2463V30.519C85.9276 31.7311 84.8787 32.6985 83.5499 33.4212C82.2213 34.1438 80.7177 34.5051 79.0394 34.5051ZM79.0394 32.547C80.5079 32.547 81.8133 32.209 82.9555 31.533C84.1211 30.8337 85.0302 29.9013 85.6829 28.7357C86.3589 27.5469 86.6969 26.2182 86.6969 24.7496C86.6969 23.2577 86.3589 21.929 85.6829 20.7635C85.0302 19.5747 84.1211 18.6422 82.9555 17.9662C81.8133 17.2669 80.5079 16.9173 79.0394 16.9173C77.5941 16.9173 76.2887 17.2669 75.1232 17.9662C73.9576 18.6422 73.0369 19.5747 72.3609 20.7635C71.6849 21.929 71.3469 23.2577 71.3469 24.7496C71.3469 26.2182 71.6849 27.5469 72.3609 28.7357C73.0369 29.9013 73.9576 30.8337 75.1232 31.533C76.2887 32.209 77.5941 32.547 79.0394 32.547Z" fill={darkTheme ? "#FFFFFF" : "#010101"} />
                                    <circle cx="95.8067" cy="7.48806" r="6.99318" fill="url(#paint0_linear)" />
                                    <path d="M98.1377 4.57422V5.59618H94.6411C94.4831 5.59618 94.4304 5.7665 94.4238 5.85167V8.83238C94.4238 9.01974 94.5819 9.08077 94.6609 9.08787H98.1377V10.1098H94.6609C94.2658 10.124 93.4756 9.91395 93.4756 8.96013V5.7665C93.4756 4.91487 94.0678 4.57422 94.5423 4.57422H98.1377Z" fill="white" />
                                    <defs>
                                        <linearGradient id="paint0_linear" x1="88.8135" y1="7.48806" x2="102.8" y2="7.48806" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#4729FF" />
                                            <stop offset="1" stopColor="#4B0CFF" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                            </a>
                            <p className={`footer__copyright ${darkTheme ? 'footer__text_dark' : ''}`}>&#169; 2021 ПАО «ААПТЕЛЕКОМ»<br />Все права защищены</p>
                        </div>

                    </div>
                    <div className={`footer__column`}>
                        <FooterSocials />
                        <p className={`footer__greeting ${darkTheme ? 'footer__text_dark' : ''}`}>Ваша команда<br /><span className={`footer__greeting-span`}>boom telecom</span></p>
                    </div>
                    <div className={`footer__column`}>
                        <div className="footer__controllers">
                            <ThemeSwitch />
                            <Link className={`footer__dashboard-btn`} to={logged_in ? "/" : refreshToken ? "/d" : pathname} onClick={handleButton}>{logged_in ? "выйти" : "личный кабинет"}</Link>
                        </div>
                        <ul className={`footer__nav`}>
                            <div className={`footer__nav-column`}>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item ${darkTheme ? 'footer__text_dark' : ''}`} to="/">Главная</Link>
                                </li>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item ${darkTheme ? 'footer__text_dark' : ''}`} to="/tariffs">Тарифы</Link>
                                </li>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item ${darkTheme ? 'footer__text_dark' : ''}`} to="/numbers">Номера</Link>
                                </li>
                            </div>
                            <div className={`footer__nav-column`}>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item ${darkTheme ? 'footer__text_dark' : ''}`} to="/organisations">Организациям</Link>
                                </li>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item ${darkTheme ? 'footer__text_dark' : ''}`} to="/services">Услуги</Link>
                                </li>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item ${darkTheme ? 'footer__text_dark' : ''}`} to="/support">Поддержка</Link>
                                </li>
                            </div>

                        </ul>
                    </div>
                </>
                :
                <>
                    <div className={`footer__column`}>
                        <div className={`footer__socials`}>
                            <Link to="/" className={`footer__social-link footer__social_type_phone`}>
                                <img src={footer_call} className={`footer__social-img`} alt="Телефон"></img>
                            </Link>
                            <Link to="/" className={`footer__social-link footer__social_type_whatsapp`}>
                                <img src={footer_whatsapp} className={`footer__social-img`} alt="WhatsApp"></img>
                            </Link>
                            <Link to="/" className={`footer__social-link footer__social_type_telegram`}>
                                <img src={footer_telegram} className={`footer__social-img footer__social-img_type_telegram`} alt="Telegram"></img>
                            </Link>
                            <Link to="/" className={`footer__social-link footer__social_type_instagram`}>
                                <img src={footer_instagram} className={`footer__social-img`} alt="Telegram"></img>
                            </Link>
                        </div>
                        <p className={`footer__greeting ${darkTheme ? 'footer__text_dark' : ''}`}>Ваша команда<br/><span className={`footer__greeting-span`}>boom telecom</span></p>
                        <ul className={`footer__contacts`}>
                            <li className={`footer__contact`}>
                                <p className={`footer__contact-text ${darkTheme ? 'footer__text_dark' : ''}`}>email:&nbsp;&nbsp;</p>
                                <a className={`footer__contact-link ${darkTheme ? 'footer__text_dark' : ''}`} target="_blank" rel="noreferrer" href="mailto:info@boomtele.com">info@boomtele.com</a>
                            </li>
                            <li className={`footer__contact`}>
                                <p className={`footer__contact-text ${darkTheme ? 'footer__text_dark' : ''}`}>телефон:&nbsp;&nbsp;</p>
                                <a className={`footer__contact-link ${darkTheme ? 'footer__text_dark' : ''}`} target="_blank" rel="noreferrer" href="tel:+74957959566">+7 495 795 95 66</a>
                            </li>
                            <li className={`footer__contact`}>
                                <p className={`footer__contact-text ${darkTheme ? 'footer__text_dark' : ''}`}>адрес:&nbsp;&nbsp;</p>
                                <a className={`footer__contact-link ${darkTheme ? 'footer__text_dark' : ''}`} target="_blank" rel="noreferrer" href={`https://yandex.ru/maps/?pt=37.596857,55.764374&z=18&l=map`}>Малый Козихинский пер., 12</a>
                            </li>
                        </ul>
                        <div className={`footer__copyright-container`}>
                            <a className={`footer__dev-container`} target="_blank" rel="noreferrer" href={`http://caba.tech/`}>
                                <p className={`footer__dev-text ${darkTheme ? 'footer__text_dark' : ''}`}>Разработано в</p>
                                <svg width="103" height="35" viewBox="0 0 103 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.51073 34.5051C7.6925 34.5051 6.06076 34.0739 4.6155 33.2114C3.19355 32.3489 2.06299 31.1834 1.22381 29.7148C0.407936 28.2462 0 26.5912 0 24.7496C0 22.8848 0.384625 21.2181 1.15388 19.7495C1.92313 18.2809 2.98376 17.1271 4.33577 16.2879C5.68779 15.4254 7.23794 14.9941 8.98624 14.9941C10.4781 14.9941 11.8418 15.2855 13.0773 15.8683C14.3127 16.4277 15.385 17.2902 16.2941 18.4558C16.4806 18.6889 16.5505 18.9336 16.5039 19.19C16.4573 19.4465 16.3058 19.6563 16.0494 19.8194C15.8396 19.9826 15.6065 20.0525 15.35 20.0292C15.0936 19.9826 14.8722 19.8427 14.6857 19.6096C13.1938 17.838 11.294 16.9522 8.98624 16.9522C7.61091 16.9522 6.39876 17.2902 5.34978 17.9662C4.32412 18.6422 3.5199 19.563 2.93714 20.7285C2.37768 21.8941 2.09795 23.2344 2.09795 24.7496C2.09795 26.2182 2.41265 27.5469 3.04203 28.7357C3.67142 29.9013 4.53391 30.8337 5.62951 31.533C6.74842 32.209 8.04216 32.547 9.51073 32.547C10.4665 32.547 11.3639 32.4072 12.2031 32.1274C13.0656 31.8477 13.8115 31.4165 14.4409 30.8337C14.6507 30.6472 14.8838 30.5423 15.1402 30.519C15.3967 30.4957 15.6181 30.5773 15.8046 30.7638C16.0377 30.9736 16.1543 31.2183 16.1543 31.498C16.1776 31.7545 16.0843 31.9759 15.8745 32.1624C14.1729 33.7242 12.0516 34.5051 9.51073 34.5051Z" fill={darkTheme ? "#FFFFFF" : "#010101"} />
                                    <path d="M30.5173 34.5051C28.6525 34.5051 26.9741 34.0855 25.4822 33.2463C24.0137 32.3838 22.8481 31.2183 21.9856 29.7497C21.1465 28.2579 20.7269 26.5912 20.7269 24.7496C20.7269 22.8848 21.1465 21.2181 21.9856 19.7495C22.8481 18.2576 24.0137 17.0921 25.4822 16.2529C26.9741 15.3904 28.6525 14.9592 30.5173 14.9592C32.3822 14.9592 34.0489 15.3904 35.5174 16.2529C36.986 17.0921 38.1399 18.2576 38.9791 19.7495C39.8416 21.2181 40.2728 22.8848 40.2728 24.7496V33.2463C40.2728 33.5494 40.1796 33.8058 39.9931 34.0156C39.8066 34.2021 39.5502 34.2953 39.2238 34.2953C38.9208 34.2953 38.6644 34.2021 38.4546 34.0156C38.2681 33.8058 38.1749 33.5494 38.1749 33.2463V30.519C37.4056 31.7311 36.3566 32.6985 35.0279 33.4212C33.6992 34.1438 32.1957 34.5051 30.5173 34.5051ZM30.5173 32.547C31.9859 32.547 33.2913 32.209 34.4335 31.533C35.599 30.8337 36.5081 29.9013 37.1608 28.7357C37.8369 27.5469 38.1749 26.2182 38.1749 24.7496C38.1749 23.2577 37.8369 21.929 37.1608 20.7635C36.5081 19.5747 35.599 18.6422 34.4335 17.9662C33.2913 17.2669 31.9859 16.9173 30.5173 16.9173C29.0721 16.9173 27.7667 17.2669 26.6011 17.9662C25.4356 18.6422 24.5148 19.5747 23.8388 20.7635C23.1628 21.929 22.8248 23.2577 22.8248 24.7496C22.8248 26.2182 23.1628 27.5469 23.8388 28.7357C24.5148 29.9013 25.4356 30.8337 26.6011 31.533C27.7667 32.209 29.0721 32.547 30.5173 32.547Z" fill={darkTheme ? "#FFFFFF" : "#010101"} />
                                    <path d="M55.2631 34.5051C53.4449 34.5051 51.8015 34.0855 50.3329 33.2463C48.8643 32.4072 47.6988 31.2649 46.8363 29.8197C45.9971 28.3744 45.5542 26.7427 45.5076 24.9245V8.03591C45.5076 7.70957 45.6008 7.45315 45.7873 7.26666C45.9971 7.08018 46.2535 6.98694 46.5566 6.98694C46.8829 6.98694 47.1393 7.08018 47.3258 7.26666C47.5123 7.45315 47.6055 7.70957 47.6055 8.03591V18.9453C48.3515 17.7331 49.3888 16.7657 50.7175 16.0431C52.0695 15.3205 53.5847 14.9592 55.2631 14.9592C57.1279 14.9592 58.7946 15.3904 60.2632 16.2529C61.7551 17.0921 62.9206 18.246 63.7598 19.7145C64.6223 21.1831 65.0535 22.8498 65.0535 24.7147C65.0535 26.5795 64.6223 28.2579 63.7598 29.7497C62.9206 31.2183 61.7551 32.3838 60.2632 33.2463C58.7946 34.0855 57.1279 34.5051 55.2631 34.5051ZM55.2631 32.547C56.7316 32.547 58.037 32.209 59.1793 31.533C60.3448 30.8337 61.2656 29.9013 61.9416 28.7357C62.6176 27.5469 62.9556 26.2065 62.9556 24.7147C62.9556 23.2228 62.6176 21.8941 61.9416 20.7285C61.2656 19.563 60.3448 18.6422 59.1793 17.9662C58.037 17.2669 56.7316 16.9173 55.2631 16.9173C53.8178 16.9173 52.5124 17.2669 51.3469 17.9662C50.1814 18.6422 49.2606 19.563 48.5846 20.7285C47.9319 21.8941 47.6055 23.2228 47.6055 24.7147C47.6055 26.2065 47.9319 27.5469 48.5846 28.7357C49.2606 29.9013 50.1814 30.8337 51.3469 31.533C52.5124 32.209 53.8178 32.547 55.2631 32.547Z" fill={darkTheme ? "#FFFFFF" : "#010101"} />
                                    <path d="M79.0394 34.5051C77.1745 34.5051 75.4961 34.0855 74.0043 33.2463C72.5357 32.3838 71.3702 31.2183 70.5077 29.7497C69.6685 28.2579 69.2489 26.5912 69.2489 24.7496C69.2489 22.8848 69.6685 21.2181 70.5077 19.7495C71.3702 18.2576 72.5357 17.0921 74.0043 16.2529C75.4961 15.3904 77.1745 14.9592 79.0394 14.9592C80.9042 14.9592 82.5709 15.3904 84.0395 16.2529C85.508 17.0921 86.6619 18.2576 87.5011 19.7495C88.3636 21.2181 88.7948 22.8848 88.7948 24.7496V33.2463C88.7948 33.5494 88.7016 33.8058 88.5151 34.0156C88.3286 34.2021 88.0722 34.2953 87.7459 34.2953C87.4428 34.2953 87.1864 34.2021 86.9766 34.0156C86.7901 33.8058 86.6969 33.5494 86.6969 33.2463V30.519C85.9276 31.7311 84.8787 32.6985 83.5499 33.4212C82.2213 34.1438 80.7177 34.5051 79.0394 34.5051ZM79.0394 32.547C80.5079 32.547 81.8133 32.209 82.9555 31.533C84.1211 30.8337 85.0302 29.9013 85.6829 28.7357C86.3589 27.5469 86.6969 26.2182 86.6969 24.7496C86.6969 23.2577 86.3589 21.929 85.6829 20.7635C85.0302 19.5747 84.1211 18.6422 82.9555 17.9662C81.8133 17.2669 80.5079 16.9173 79.0394 16.9173C77.5941 16.9173 76.2887 17.2669 75.1232 17.9662C73.9576 18.6422 73.0369 19.5747 72.3609 20.7635C71.6849 21.929 71.3469 23.2577 71.3469 24.7496C71.3469 26.2182 71.6849 27.5469 72.3609 28.7357C73.0369 29.9013 73.9576 30.8337 75.1232 31.533C76.2887 32.209 77.5941 32.547 79.0394 32.547Z" fill={darkTheme ? "#FFFFFF" : "#010101"} />
                                    <circle cx="95.8067" cy="7.48806" r="6.99318" fill="url(#paint0_linear)" />
                                    <path d="M98.1377 4.57422V5.59618H94.6411C94.4831 5.59618 94.4304 5.7665 94.4238 5.85167V8.83238C94.4238 9.01974 94.5819 9.08077 94.6609 9.08787H98.1377V10.1098H94.6609C94.2658 10.124 93.4756 9.91395 93.4756 8.96013V5.7665C93.4756 4.91487 94.0678 4.57422 94.5423 4.57422H98.1377Z" fill="white" />
                                    <defs>
                                        <linearGradient id="paint0_linear" x1="88.8135" y1="7.48806" x2="102.8" y2="7.48806" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#4729FF" />
                                            <stop offset="1" stopColor="#4B0CFF" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                            </a>
                            <p className={`footer__copyright ${darkTheme ? 'footer__text_dark' : ''}`}>&#169; 2021 ПАО «ААПТЕЛЕКОМ»<br />Все права защищены</p>
                        </div>
                    </div>
                    <div className={`footer__column`}>
                        <div className="footer__controllers">
                            <ThemeSwitch />
                            <Link className={`footer__dashboard-btn`} to={logged_in ? "/" : refreshToken ? "/d" : pathname} onClick={handleButton}>{logged_in ? "выйти" : "личный кабинет"}</Link>
                        </div>
                        <ul className={`footer__nav`}>
                            <div className={`footer__nav-column`}>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item ${darkTheme ? 'footer__text_dark' : ''}`} to="/">Главная</Link>
                                </li>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item ${darkTheme ? 'footer__text_dark' : ''}`} to="/tariffs">Тарифы</Link>
                                </li>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item ${darkTheme ? 'footer__text_dark' : ''}`} to="/numbers">Номера</Link>
                                </li>
                            </div>
                            <div className={`footer__nav-column`}>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item ${darkTheme ? 'footer__text_dark' : ''}`} to="/organisations">Организациям</Link>
                                </li>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item ${darkTheme ? 'footer__text_dark' : ''}`} to="/services">Услуги</Link>
                                </li>
                                <li className={`footer__nav-item`}>
                                    <Link className={`footer__nav-item ${darkTheme ? 'footer__text_dark' : ''}`} to="/support">Поддержка</Link>
                                </li>
                            </div>

                        </ul>
                    </div>
                </>}


        </footer>

    )
}
