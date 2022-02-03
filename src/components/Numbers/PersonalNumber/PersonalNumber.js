import React, { useContext } from 'react';
import { GlobalContext } from '../../../App';
import moment from 'moment';
import 'moment/locale/ru'
import { DatePicker } from "antd";
import { GoCalendar } from 'react-icons/go';
import oneIcon from '../../../assets/images/numbers/one.png'
import twoIcon from '../../../assets/images/numbers/two.png'
import threeIcon from '../../../assets/images/numbers/three.png'
import fourIcon from '../../../assets/images/numbers/four.png'
import fiveIcon from '../../../assets/images/numbers/five.png'
import sixIcon from '../../../assets/images/numbers/six.png'
import exclamationMark from '../../../assets/images/numbers/exclamation.png'

import './PersonalNumber.css';

import personalIcon from '../../../assets/images/numbers-personal-icon.png'

export default function PersonalNumber(props) {
    const { darkTheme } = useContext(GlobalContext);
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [checked, setChecked] = React.useState(true);

    const [phoneValue, setPhoneValue] = React.useState('');
    const [phoneValidity, setPhoneValidity] = React.useState({});

function handlePhoneChange(e) {

    let inputValue = e.target.value.replace(/\D/g, '')
    let formattedInputValue = '';
    if (!inputValue) {
      setPhoneValue('')
      setPhoneValidity({
        errorMassage: 'Можно вводить только цифры',
        validState: false
      })
    }
    else {
      if (['7', '8', '9'].indexOf(inputValue[0]) > -1) {
        setPhoneValidity({
          errorMassage: '',
          validState: false
        })
        if (inputValue[0] === '9') inputValue = '7' + inputValue;

        let firstSimbols = (inputValue[0] === '8') ? '8' : '+7';
        formattedInputValue = firstSimbols + ' '

        if (inputValue.length > 1) {
          formattedInputValue += '(' + inputValue.substring(1, 4)
        }
        if (inputValue.length >= 5) {
          formattedInputValue += ') ' + inputValue.substring(4, 7)
        }
        if (inputValue.length >= 8) {
          formattedInputValue += '-' + inputValue.substring(7, 9)
        }
        if (inputValue.length >= 10) {
          formattedInputValue += '-' + inputValue.substring(9, 11)
        }
        if (inputValue.length >= 11) {
          setPhoneValidity({
            errorMassage: '',
            validState: true
          });
        } else {
          setPhoneValidity({
            errorMassage: '',
            validState: false
          });
        }
      } else {
        formattedInputValue = '+' + inputValue.substring(0, 16)
        if (inputValue.length >= 11) {
          setPhoneValidity({
            errorMassage: '',
            validState: true
          });
        } else {
          setPhoneValidity({
            errorMassage: '',
            validState: false
          });
        }
      }

      setPhoneValue(formattedInputValue)
    }




  }


  function handlePhoneDelite(e) {
    if (e.keyCode === 8 && e.target.value.replace(/\D/g, '').length === 1) {
      setPhoneValue('')
    }
    if (e.keyCode === 8 && e.target.value.replace(/\D/g, '').length < 11) {
      setPhoneValidity({
        errorMassage: '',
        validState: false
      });
    }

  }
  const [contctPhoneValue, setContctPhoneValue] = React.useState('');
  const [contctPhoneValidity, setContctPhoneValidity] = React.useState({});

function handleContctPhoneChange(e) {

  let inputValue = e.target.value.replace(/\D/g, '')
  let formattedInputValue = '';
  if (!inputValue) {
    setContctPhoneValue('')
    setContctPhoneValidity({
      errorMassage: 'Можно вводить только цифры',
      validState: false
    })
  }
  else {
    if (['7', '8', '9'].indexOf(inputValue[0]) > -1) {
      setContctPhoneValidity({
        errorMassage: '',
        validState: false
      })
      if (inputValue[0] === '9') inputValue = '7' + inputValue;

      let firstSimbols = (inputValue[0] === '8') ? '8' : '+7';
      formattedInputValue = firstSimbols + ' '

      if (inputValue.length > 1) {
        formattedInputValue += '(' + inputValue.substring(1, 4)
      }
      if (inputValue.length >= 5) {
        formattedInputValue += ') ' + inputValue.substring(4, 7)
      }
      if (inputValue.length >= 8) {
        formattedInputValue += '-' + inputValue.substring(7, 9)
      }
      if (inputValue.length >= 10) {
        formattedInputValue += '-' + inputValue.substring(9, 11)
      }
      if (inputValue.length >= 11) {
        setContctPhoneValidity({
          errorMassage: '',
          validState: true
        });
      } else {
        setContctPhoneValidity({
          errorMassage: '',
          validState: false
        });
      }
    } else {
      formattedInputValue = '+' + inputValue.substring(0, 16)
      if (inputValue.length >= 11) {
        setContctPhoneValidity({
          errorMassage: '',
          validState: true
        });
      } else {
        setContctPhoneValidity({
          errorMassage: '',
          validState: false
        });
      }
    }

    setContctPhoneValue(formattedInputValue)
  }




}


function handleContctPhoneDelite(e) {
  if (e.keyCode === 8 && e.target.value.replace(/\D/g, '').length === 1) {
    setContctPhoneValue('')
  }
  if (e.keyCode === 8 && e.target.value.replace(/\D/g, '').length < 11) {
    setContctPhoneValidity({
      errorMassage: '',
      validState: false
    });
  }

}

    function handleDateChange(e) {
        console.log(moment(e).format('DD/MM/YYYY'))
        if (e) {
            setSelectedDate(moment(e))
        }

    }
    function disabledDate(current) {
        return current && current < moment().subtract(1, "days").endOf('day');
    }
    function handleSubmit() {
        if (checked) {
            props.transferNumber({
                date: `${moment(selectedDate).format('DD/MM/YYYY')}`,
                transferredNumber: phoneValue,
                contactNumber: phoneValue,
            })
        } else {
            props.transferNumber({
                date: `${moment(selectedDate).format('DD/MM/YYYY')}`,
                transferredNumber: phoneValue,
                contactNumber: contctPhoneValue,
            })
        }
    }
    return (
        <section className={`personal-number`}>
            <div className={`personal-number__containers `}>
                <div className={`personal-number__container personal-number__container_with-img`}>
                    <img className={`personal-number__container-img`} alt='Телефон' src={personalIcon} />
                    <p className={`personal-number__container-text`}>
                        Сохраняйте привычный номер для своих родных и друзей.
                        <br />
                        Ни одна цифра в номере не поменяется
                        <br /><br />
                        Все останется как раньше:
                        данные в аккаунте Гугла, в банке и рассылке любимого магазина
                    </p>
                </div>
                <div className={`personal-number__container`}>

                    <div>
                        <p className={`personal-number__container-head-text`}>
                            Получите бонус 300 ₽ на баланс
                        </p>
                        <div className={`personal-number__input-date-container`}>
                            <div className={`personal-number__input`}>
                                <DatePicker allowClear={false} onChange={handleDateChange} suffixIcon={<GoCalendar style={{
                                    color: "#0E5EF8", height: '24px',
                                    width: '21.4px'
                                }} />} placeholder="Дата переноса" disabledDate={disabledDate} className="personal-number__input-date" minDate={moment()} format={'DD/MM/YYYY'} />

                            </div>
                            <p className={`personal-number__date-text`}>{selectedDate ? `Ваш номер перенесётся ${moment(selectedDate).locale('ru').add(8, 'days').format('LL').split(' ')[0]} ${moment(selectedDate).locale('ru').add(8, 'days').format('LL').split(' ')[1].substring(0, 1).toUpperCase()}${moment(selectedDate).locale('ru').add(8, 'days').format('LL').split(' ')[1].substring(1)}` : 'Выберите дату'}</p>
                        </div>
                    </div>
                    <div className="personal-number__transfer-phone">
                        <label className={`personal-number__phone-input-title`}>Переносимый номер</label>
                        <div className="personal-number__input-and-button">
                            <input className="personal-number__phone-input"  value={phoneValue} onChange={(e) => handlePhoneChange(e)} type="tel" placeholder="+7 (000) 000-00-00" onKeyDown={(e)=>handlePhoneDelite(e)} />
                            {checked && props.screenWidth > 1020 &&
                                <button onClick={handleSubmit} className={`personal-number_submit-button ${checked ? phoneValidity.validState && selectedDate ? "personal-number_submit-button_active" : "personal-number_submit-button_disabled" : phoneValidity.validState && contctPhoneValidity.validState && selectedDate ? "personal-number_submit-button_active" : "personal-number_submit-button_disabled"} `} disabled={checked ? phoneValidity.validState && selectedDate ? false : true : phoneValidity.validState && contctPhoneValidity.validState && selectedDate ? false : true}>
                                    <p className={`personal-number_submit-button-text`}>Оставить заявку</p>
                                    <svg className={`personal-number_submit-button-arrow`} width="13" height="23" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5607 12.5607C13.1464 11.9749 13.1464 11.0251 12.5607 10.4393L3.01472 0.893396C2.42894 0.30761 1.47919 0.307609 0.893401 0.893396C0.307614 1.47918 0.307614 2.42893 0.893401 3.01472L9.37868 11.5L0.893396 19.9853C0.307609 20.5711 0.307609 21.5208 0.893396 22.1066C1.47918 22.6924 2.42893 22.6924 3.01472 22.1066L12.5607 12.5607ZM10.5 13L11.5 13L11.5 10L10.5 10L10.5 13Z" fill="white" />
                                    </svg>
                                </button>}
                        </div>

                        <label className="personal-number__check">

                            <input onChange={() => setChecked(val => !val)} checked={checked} type="checkbox" className="personal-number__check-input" />
                            <span className="personal-number__visible-checkbox"></span>
                            Совпадает с контактным</label>
                        {!checked && <>
                            <div className="personal-number__input-and-button">
                                <input  className="personal-number__phone-input" onChange={(e) => {
                                    if (e.target.value === phoneValue) {
                                        setChecked(true)
                                    }
                                    handleContctPhoneChange(e)
                                }} value={contctPhoneValue} type="tel" placeholder="+7 (000) 000-00-00"  onKeyDown={(e)=>handleContctPhoneDelite(e)}/>
                                {!checked && props.screenWidth > 1020 &&
                                    <button onClick={handleSubmit} className={`personal-number_submit-button ${checked ? phoneValidity.validState && selectedDate ? "personal-number_submit-button_active" : "personal-number_submit-button_disabled" : phoneValidity.validState && contctPhoneValidity.validState && selectedDate ? "personal-number_submit-button_active" : "personal-number_submit-button_disabled"} `} disabled={checked ? phoneValidity.validState && selectedDate ? false : true : phoneValidity.validState && contctPhoneValidity.validState && selectedDate ? false : true}>
                                        <p className={`personal-number_submit-button-text`}>Оставить заявку</p>
                                        <svg className={`personal-number_submit-button-arrow`} width="13" height="23" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5607 12.5607C13.1464 11.9749 13.1464 11.0251 12.5607 10.4393L3.01472 0.893396C2.42894 0.30761 1.47919 0.307609 0.893401 0.893396C0.307614 1.47918 0.307614 2.42893 0.893401 3.01472L9.37868 11.5L0.893396 19.9853C0.307609 20.5711 0.307609 21.5208 0.893396 22.1066C1.47918 22.6924 2.42893 22.6924 3.01472 22.1066L12.5607 12.5607ZM10.5 13L11.5 13L11.5 10L10.5 10L10.5 13Z" fill="white" />
                                        </svg>
                                    </button>}
                            </div>

                        </>}
                    </div>
                    {props.screenWidth <= 1020 &&
                        <button onClick={handleSubmit} className={`personal-number_submit-button ${checked ? phoneValidity.validState && selectedDate ? "personal-number_submit-button_active" : "personal-number_submit-button_disabled" : phoneValidity.validState && contctPhoneValidity.validState && selectedDate ? "personal-number_submit-button_active" : "personal-number_submit-button_disabled"} `} disabled={checked ? phoneValidity.validState && selectedDate ? false : true : phoneValidity.validState && contctPhoneValidity.validState && selectedDate ? false : true}>
                            <p className={`personal-number_submit-button-text`}>Оставить заявку</p>
                            <svg className={`personal-number_submit-button-arrow`} width="13" height="23" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5607 12.5607C13.1464 11.9749 13.1464 11.0251 12.5607 10.4393L3.01472 0.893396C2.42894 0.30761 1.47919 0.307609 0.893401 0.893396C0.307614 1.47918 0.307614 2.42893 0.893401 3.01472L9.37868 11.5L0.893396 19.9853C0.307609 20.5711 0.307609 21.5208 0.893396 22.1066C1.47918 22.6924 2.42893 22.6924 3.01472 22.1066L12.5607 12.5607ZM10.5 13L11.5 13L11.5 10L10.5 10L10.5 13Z" fill="white" />
                            </svg>
                        </button>}

                </div>
            </div>
            <div className={`personal-number_сonditions`}>
                <h2 className={`personal-number_сonditions-title ${darkTheme?'personal-number_сonditions-title_dark' :''}`}>Какие условия переноса своего номера в Boom Telecom?</h2>
                <p className={`personal-number_сonditions-subtitle ${darkTheme?'personal-number_сonditions-subtitle_dark' :''}`}>Если все 6 условий соблюдаются, мы перенесем Ваш номер в нашу<br/>сеть и пришлем 300₽ на баланс</p>
                <div className={`personal-number_сondition-cards`}>
                    <div className={`personal-number_сondition-card ${darkTheme?'personal-number_сondition-card_dark' :''}`}>
                        <img className={`personal-number_сondition-card-number $`} alt="1" src={oneIcon} />
                        <p className={`personal-number_сondition-card-text ${darkTheme?'personal-number_сondition-card-text_dark' :''}`}>SIM-карта с переносимым номером должна быть из региона обращения</p>
                    </div>
                    <div className={`personal-number_сondition-card ${darkTheme?'personal-number_сondition-card_dark' :''}`}>
                        <img className={`personal-number_сondition-card-number`} alt="2" src={twoIcon} />
                        <p className={`personal-number_сondition-card-text ${darkTheme?'personal-number_сondition-card-text_dark' :''}`}>Если Вы раньше переносили номер, то с момента прошлого переноса должно пройти 60 дней</p>
                    </div>
                    <div className={`personal-number_сondition-card ${darkTheme?'personal-number_сondition-card_dark' :''}`}>
                        <img className={`personal-number_сondition-card-number`} alt="3" src={threeIcon} />
                        <p className={`personal-number_сondition-card-text ${darkTheme?'personal-number_сondition-card-text_dark' :''}`}>У текущего оператора должны быть Ваши актуальные паспортные данные</p>
                    </div>
                    <div className={`personal-number_сondition-card ${darkTheme?'personal-number_сondition-card_dark' :''}`}>
                        <img className={`personal-number_сondition-card-number`} alt="4" src={fourIcon} />
                        <p className={`personal-number_сondition-card-text ${darkTheme?'personal-number_сondition-card-text_dark' :''}`}>На номере не должно<br />быть долга за связь</p>
                    </div>
                    <div className={`personal-number_сondition-card ${darkTheme?'personal-number_сondition-card_dark' :''}`}>
                        <img className={`personal-number_сondition-card-number`} alt="5" src={fiveIcon} />
                        <p className={`personal-number_сondition-card-text ${darkTheme?'personal-number_сondition-card-text_dark' :''}`}>Номер не должен быть<br />заблокирован</p>
                    </div>
                    <div className={`personal-number_сondition-card ${darkTheme?'personal-number_сondition-card_dark' :''}`}>
                        <img className={`personal-number_сondition-card-number`} alt="6" src={sixIcon} />
                        <p className={`personal-number_сondition-card-text ${darkTheme?'personal-number_сondition-card-text_dark' :''}`}>Номер должен быть<br />оформлен на Вас</p>
                    </div>

                </div>
                <div className={`personal-number_important-card ${darkTheme?'personal-number_сondition-card_dark' :''}`}>
                    <div className={`personal-number_important-title-container`}>
                        <h2 className={`personal-number_important-title ${darkTheme?'personal-number_сondition-card-text_dark' :''}`}>Важно</h2>
                        <img className={`personal-number_important-exclamation`} alt="!" src={exclamationMark} />
                    </div>
                        <p className={`personal-number_important-text ${darkTheme?'personal-number_сondition-card-text_dark' :''}`}>Деньги с Вашего баланса не перенесутся в Boom Telecom.  Для их возврата обратитесь к прежнему оператору.</p>
                </div>

            </div>

        </section>
    )

}
