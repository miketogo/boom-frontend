import React, { useState } from "react";
import { CgInfinity } from "react-icons/cg";
import "./header.css";
import { SHOW_MODAL ,sendMetriс } from "../../globals/utils";
import { useDispatch } from "react-redux";
import TariffPageBar from "../../globals/TariffPageBar";
import icon1 from '../../assets/images/ico1.svg'
import icon2 from '../../assets/images/ico2.svg'
import icon3 from '../../assets/images/ico3.svg'
import icon4 from '../../assets/images/ico4.svg'
import esimQr from '../../assets/images/esim-qr.png'
import { isNumber } from "lodash";

export default function Section(props) {
  const dispatch = useDispatch();
  const [callWrap, setCallWrap] = useState(false);
  const [smsWrap, setSmsWrap] = useState(false);
  const [internetWrap, setInternetWrap] = useState(false);
  const [positionValue, setPositionValue] = useState(0);

  function handlePositionChange(position) {
    setPositionValue(position)
  }
  const payload = {
    position: positionValue,
    tariffId: props.selectedTrariffId,
    switches: { "Безлимитный 4G": false, "Раздача интернета": false }
  }
  function handleEsimBuy() {
    sendMetriс('reachGoal','esim-click')
    dispatch({ type: SHOW_MODAL, payload: { service: { eSim: true}, ym:{type:'reachGoal', value:'esim-forma'} } })
  }
  return (
    <>
      {
        props.tariff.title ? <div>
          <section className="base-container content-wrapper">
            <div className="wrap">
              <div className="tarrif-page__first-row">
                <div className={`blok-data tarrif-page__main-container ${props.darkTheme ? 'blok-data_dark' : ''}`}>
                  <img className="blok-data__icon" src={icon1} alt="Иконка" />
                  <h2>Пакеты</h2>
                  <div className={`blok-data__info d-flex-wrap ${props.darkTheme ? 'blok-data__info_dark' : ''}`}>
                    <div className={`tarrif-page__info-container ${props.darkTheme ? 'blok-data__info-container_dark' : ''}`}>
                      Минуты <span>&ensp;&#183;&ensp;{props.tariff.positions[positionValue].min}</span>
                    </div>
                    <div className={`tarrif-page__info-container ${props.darkTheme ? 'blok-data__info-container_dark' : ''}`}>
                      Интернет (гб) <span>&ensp;&#183;&ensp;{props.tariff.positions[positionValue].gb === Infinity ? <CgInfinity /> : props.tariff.positions[positionValue].gb} </span>
                    </div>
                    <div className={`tarrif-page__info-container ${props.darkTheme ? 'blok-data__info-container_dark' : ''}`}>
                      SMS и MMS <span>&ensp;&#183;&ensp;{props.tariff.positions[positionValue].sms}</span>
                    </div>
                  </div>
                  <div className={`tarrif-page__bar-container ${props.darkTheme ? 'blok-data__info-container_dark' : ''}`}>
                    <p className={`tarrif-page__bar-title ${props.darkTheme ? 'tarrif-page__bar-title_dark' : ''}`}>Настройте тариф под себя</p>
                    <TariffPageBar vip={props.tariff.title.toLowerCase() === "vip"} handlePositionChange={handlePositionChange} />
                  </div>
                  <div className={`tarrif-page__button`}>
                    <div onClick={() => {
                      sendMetriс('reachGoal','tarif_podkluchit')
                      dispatch({ type: SHOW_MODAL, payload })
                      }} className="main-data__button">
                      <p className="main-data__button-text">Подключить</p>
                    </div>
                    <div className={`tarrif-page__subscription ${props.darkTheme ? 'tarrif-page__subscription_dark' : ''}`}>
                      Абонентская плата &#183;<span className={`tarrif-page__subscription_span ${props.darkTheme ? 'tarrif-page__subscription_dark' : ''}`}> {props.tariff.price} руб.</span>
                    </div>
                  </div>

                </div>
                <div className={`tarrif-page__esim-container`}>
                  <img className={`tarrif-page__esim-icon`} src={esimQr} alt="eSIM" />
                  <div className={`tarrif-page__esim-button-container`}>
                    <p className={`tarrif-page__esim-text`}>Подключите с eSIM!</p>
                    <button onClick={() => handleEsimBuy()} className={`tarrif-page__esim-button`}>
                      <p className={`tarrif-page__esim-button-text`}>Подключить</p>
                      <svg className={`tarrif-page__esim-button-arrow`} width="13" height="23" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5607 12.5607C13.1464 11.9749 13.1464 11.0251 12.5607 10.4393L3.01472 0.893396C2.42894 0.30761 1.47919 0.307609 0.893401 0.893396C0.307614 1.47918 0.307614 2.42893 0.893401 3.01472L9.37868 11.5L0.893396 19.9853C0.307609 20.5711 0.307609 21.5208 0.893396 22.1066C1.47918 22.6924 2.42893 22.6924 3.01472 22.1066L12.5607 12.5607ZM10.5 13L11.5 13L11.5 10L10.5 10L10.5 13Z" fill="#121212" />
                      </svg>
                    </button>
                  </div>

                </div>
              </div>
              <div className="blok-data-row row">
                <div className="col">
                  <div className={`blok-data ${props.darkTheme ? 'blok-data_dark' : ''}`}>
                    <img className="blok-data__icon" src={icon2} alt="Иконка" />
                    <h2>Звонки</h2>
                    <div className={`blok-data__info ${props.darkTheme ? 'blok-data__info_dark' : ''}`}>
                      <div className="d-i">
                        <i>Звонки на все номера России (мин)&emsp;</i>
                        <span>&#183;&emsp;</span> <span> {props.tariff.positions[positionValue].min}</span>
                      </div>
                      <div className="select-block">
                        <div
                          className="a-sel"
                          onClick={() => setCallWrap(!callWrap)}
                        >
                          <div className={`select-block__click ${callWrap ? "select-block__click_active" : ""} ${props.darkTheme ? 'select-block__click_dark' : ''}`}>
                            Оплачивается отдельно
                            <svg className={`select-block__click-tick ${callWrap ? "select-block__click-tick_active" : ""}`} width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.6231 0.831347L8.00076 7.4553L1.37841 0.83055C1.06268 0.514817 0.551935 0.514817 0.236202 0.83055C-0.0787339 1.14628 -0.0787339 1.65782 0.236202 1.97355L7.4293 9.16904C7.74423 9.48477 8.25577 9.48477 8.5707 9.16904L15.7638 1.97362C16.0787 1.65789 16.0787 1.14555 15.7638 0.829819C15.4497 0.515614 14.9381 0.515614 14.6231 0.831347Z" fill={props.darkTheme ? '#fff' : '#010101'} />
                            </svg>
                          </div>
                        </div>
                        {callWrap && (
                          <div onClick={() => setCallWrap(!callWrap)} className={`select-block__wrap ${props.darkTheme ? 'select-block__wrap_dark' : ''}`}>
                            <h3>
                              Тарификация сверхвключённых  в пакет объемов услуг
                            </h3>
                            <p>
                              <i>
                                Исходящие вызовы в сети «Билайн» на номера всех
                                операторов на территории РФ, кроме Билайн (за 1 минуту) —&ensp;<span>{`2 ₽`}</span>
                              </i>

                            </p>
                            <p>
                              <i>
                                Исходящие вызовы в сети «Билайн» на все номера
                                «Билайн» (за 1 минуту) —&ensp;<span>{`0 ₽`}</span>
                              </i>

                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className={`blok-data ${props.darkTheme ? 'blok-data_dark' : ''}`}>
                    <img className="blok-data__icon" src={icon3} alt="Иконка" />
                    <h2>Собщения</h2>
                    <div className={`blok-data__info ${props.darkTheme ? 'blok-data__info_dark' : ''}`}>
                      <div className="d-i">
                        <i>Исходящие SMS и MMS (шт) по РФ&emsp;</i><span>&#183;&emsp;</span> <span> {props.tariff.positions[positionValue].sms}</span>
                      </div>
                      <div className="select-block">
                        <div className="a-sel" onClick={() => setSmsWrap(!smsWrap)}>
                          <div className={`select-block__click ${smsWrap ? "select-block__click_active" : ""} ${props.darkTheme ? 'select-block__click_dark' : ''}`}>
                            Оплачивается отдельно
                            <svg className={`select-block__click-tick ${smsWrap ? "select-block__click-tick_active" : ""}`} width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.6231 0.831347L8.00076 7.4553L1.37841 0.83055C1.06268 0.514817 0.551935 0.514817 0.236202 0.83055C-0.0787339 1.14628 -0.0787339 1.65782 0.236202 1.97355L7.4293 9.16904C7.74423 9.48477 8.25577 9.48477 8.5707 9.16904L15.7638 1.97362C16.0787 1.65789 16.0787 1.14555 15.7638 0.829819C15.4497 0.515614 14.9381 0.515614 14.6231 0.831347Z" fill={props.darkTheme ? '#fff' : '#010101'} />
                            </svg>
                          </div>
                        </div>
                        {smsWrap && (
                          <div onClick={() => setSmsWrap(!smsWrap)} className={`select-block__wrap ${props.darkTheme ? 'select-block__wrap_dark' : ''}`}>
                            <h3>
                              Тарификация сверхвключённых в пакет объемов услуг
                            </h3>
                            <p>
                              <i>
                                SMS в сети «Билайн» (за 1 SMS) —&ensp;<span>{`2 ₽`}</span>
                              </i>
                            </p>
                            <p>
                              <i>
                                MMS в сети «Билайн» (за 1 MMS) —&ensp;<span>{`6,45 ₽`}</span>
                              </i>


                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`blok-data ${props.darkTheme ? 'blok-data_dark' : ''}`}>
                <img className="blok-data__icon" src={icon4} alt="Иконка" />
                <h2>Интернет</h2>
                <div className={`blok-data__info d-int-wrap ${props.darkTheme ? 'blok-data__info_dark' : ''}`}>
                  <div className="d-i">
                    <i>Мобильный интернет (гб) по РФ&emsp;</i><span>&#183;&emsp;</span> <span>{props.tariff.positions[positionValue].gb === Infinity ? <CgInfinity /> : props.tariff.positions[positionValue].gb}</span>
                  </div>
                  <div className="d-i">
                    <i>Безлимит на интернет-сервисы&emsp;</i><span>&#183;&emsp;</span> <span>
                      мессенджеры, соц. сети, карты, почтовые сервисы, музыка, видео
                    </span>
                  </div>
                </div>

                <div className=" select-block">
                  <div className="a-sel" onClick={() => setInternetWrap(!internetWrap)}>
                    <div className={`select-block__click ${internetWrap ? "select-block__click_active" : ""} ${props.darkTheme ? 'select-block__click_dark' : ''}`}>
                      Оплачивается отдельно
                      <svg className={`select-block__click-tick ${internetWrap ? "select-block__click-tick_active" : ""}`} width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.6231 0.831347L8.00076 7.4553L1.37841 0.83055C1.06268 0.514817 0.551935 0.514817 0.236202 0.83055C-0.0787339 1.14628 -0.0787339 1.65782 0.236202 1.97355L7.4293 9.16904C7.74423 9.48477 8.25577 9.48477 8.5707 9.16904L15.7638 1.97362C16.0787 1.65789 16.0787 1.14555 15.7638 0.829819C15.4497 0.515614 14.9381 0.515614 14.6231 0.831347Z" fill={props.darkTheme ? '#fff' : '#010101'} />
                      </svg>
                    </div>

                  </div>
                  {internetWrap && (
                    <div onClick={() => setInternetWrap(!internetWrap)} className={` select-block__wrap ${props.darkTheme ? 'select-block__wrap_dark' : ''}`}>
                      <h3>Дополнительные услуги</h3>
                      <p>
                        <i>
                          Раздача интернета на другие устройства —&ensp;<span>{isNumber(props.tariff.modem) ? `${props.tariff.modem} ₽` : `${props.tariff.modem}`}</span>
                        </i>

                      </p>
                      <p>
                        <i>
                          Безлимитный интернет 4G —&ensp;<span>{isNumber(props.tariff.infinitInternet) ? `${props.tariff.infinitInternet} ₽` : `${props.tariff.infinitInternet}`}</span>
                        </i>

                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div> :
          <div className="section-holder"></div>
      }
    </>

  );
}
