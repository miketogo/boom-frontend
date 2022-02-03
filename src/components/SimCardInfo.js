import moment from 'moment';
import { DatePicker, TimePicker } from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import styled from "styled-components/macro";
import { GoCalendar } from 'react-icons/go';
import Preloader from '../globals/Loader/index'
import { HiOutlineLocationMarker } from 'react-icons/hi';
import _ from 'lodash';
import { OrderTariffCheckCode, OrderTariffGetNewCode, BuyNumbersCheckCode, BuyNumbersGetNewCode, sendMetriс } from '../globals/utils';
import PopupCheckBox from './PopupCheckBox/PopupCheckBox';
const { RangePicker } = TimePicker;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: ${({ service }) => service || "36px"};
    gap: 52px;
    font-family: Circe;
    & small {
        font-size: 14px;
        color: rgba(1, 1, 1, 0.68);
        margin-top: 7px;
        font-weight: normal;
    }
    & .popup__phone-error {
        color: #FF0202
        
    }
    & .popup__code-error{
        color: #FF0202
        
    }
    & .Способ_получения {
        display: flex;
        flex-direction: column;
        font-size: 24px;
        @media(max-width: 1060px) {
            font-size: 18px;
        }
        @media(max-width: 736px) {
            width: 100%;
        }
        .options {
            margin-top: 12px;
        }
        .timePickers {
            border: 2px solid rgba(1, 1, 1, 0.16);
            border-radius: 13px;
            width: 300px;
            height: 50px;
            font-size: 20px;
            margin-top: 12px;
            @media(max-width: 736px) {
                width: 100%;
            }
            input {
                font-size: 17px;
            }
            
        }
        .timePickers:focus, timePickers:focus {
            border-color: #0E5EF8;
        }
        .address {
            width: 300px;
            height: 50px;
            border: 2px solid rgba(1, 1, 1, 0.16);
            border-radius: 13px;
            padding: 0px 15px;
            outline: none;
            font-size: 19px;
            margin-top: 12px;
            @media(max-width: 736px) {
                width: 100%;
            }
        }
        .address:focus, .address:active{
            border-color: #0E5EF8;
        }
    }
    .orderDates {
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 100%;
        flex-wrap: wrap;
    }
    & .input {
        width: 300px;
        height: 60px;
        border-radius: 13px;
        padding: 0 15px;
        outline: none;
        border: 2px solid rgba(1, 1, 1, 0.16);
        transition: border-color 0.3s ease-in-out;
        @media(max-width: 736px) {
            width: 100%;
        }
    }
    & .input:active, .input:focus {
        border-color: #0E5EF8;
        transition: border-color 0.3s ease-in-out;
    }
    .Переносимый_номер {
        display: flex;
        flex-direction:column;
        input[type=checkbox] {
            width: 24px;
            height: 24px;
        }
        label.checker {
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 12px 0 30px;
        }
    }
`
const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    & > span {

        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 16px;
        @media(max-width: 736px) {
            justify-content:center;
        }
        
    }
    & button {
        background: ${({ enableButton }) => enableButton ? "#010101" : "rgba(1, 1, 1, 0.7)"};
        transition: background-color 0.3s ease-in-out;
        width: 300px;
        height: 60px;
        border-radius: 60px;
        border: none;
        color: white;
        cursor: ${({ enableButton }) => enableButton ? "pointer" : "not-allowed"};
        svg {
            transform: rotate(-90deg)
        }
        @media(max-width: 736px) {
            width: 100%;
        }
    }
    & div {
        display: flex;
        flex-direction: column;
    }
    div.first {
        font-size: 32px;
        font-weight: bold;
        color: #121212;
        margin-bottom: 10px;
        small {
            color: #121212;
            font-weight: bold;
        }
    }
    div.last {
        font-family: Circe;
        margin-top: 20px;
        font-size: 16px;
        font-weight: bold;
        small {
            margin-top: 15px;
        }
    }
    small.свой_номер {
        margin: 0 0 4px;
        font-family: Circe;
        font-size: 16px;
        font-weight: 500;
        display: inline;
    }
    small.last-small {
        font-family: Circe;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 100%;
        color: rgba(1, 1, 1, 0.68);
    }
    p.send-code-agian{
        font-family: Circe;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 100%;
        color: rgba(1, 1, 1, 0.68);
        margin: 4px 0 0;
        border-bottom: 1px rgba(1, 1, 1, 0) solid;
        cursor: no-drop;
        width: fit-content;
        transition: border-color ease-in-out 0.2s, color ease-in-out 0.2s;

    }
    p.send-code-agian_active{
        border-bottom: 1px rgba(1, 1, 1, 0.68) solid;
        cursor: pointer;
    
    }
    p.send-code-agian_active:hover{
        color: rgba(1, 1, 1, 1);
        border-bottom: 1px rgba(1, 1, 1, 1) solid;
        cursor: pointer;
    
    }
    .omo {
        width: 300px;
        height: 60px;
        border-radius: 13px;
        padding: 0 15px;
        outline: none;
        border: 2px solid rgba(1, 1, 1, 0.16);
        transition: border-color 0.3s ease-in-out;
        @media(max-width: 736px) {
            width: 100%;
        }
    }
    .omo:focus, .omo:active {
        border-color: ${({ service }) => service && service.eSim ? "#010101" : "#0E5EF8"};
    }
    .input_type_red{
        border: 2px solid  #FF0202 !important;
    }
    .input_type_green{
        border: 2px solid #32A43E !important;
    }
`

const Centered = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 20px;

`

const Pickup = styled.div`
    display: flex;
    flex-direction: column;
    background: #F8F8F8;
    border-radius: 12px;
    padding: 18px;
    gap: 5px;
    font-size: 24px;
    width: fit-content;
    @media(max-width: 1060px) {
        font-size: 18px;
    }
    span {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #4B75FC;
        a {
            color: inherit;
            text-decoration: underline;
            line-height: 27px;
        }
    }
`

const Arrow = () => <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 7V8H9V7H7Z" fill="#F8F8F8" />
</svg>;

const options = ["Самовывоз", "eSIM", "Доставка"]

function SimCardInfo({ codeValue, setCodeValue, codeValidity, setCodeValidity, setStage, orderId, stage, selected, Option, service, handleSubmit, totalPrice, buy, tariff, enableButton, boughtNumbers, chosenNumber, setEnableButton }) {
    const [selectedOption, setSelectedOption] = useState(0);


    const [deliveryDate, setDeliveryDate] = useState(moment().format("DD/MM/YYYY"));
    const [deliveryTime, setDeliveryTime] = useState(["10:00", "14:00"]);
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [checked, setChecked] = useState(true);

    const [phoneValue, setPhoneValue] = useState('');
    const [phoneValidity, setPhoneValidity] = useState({});



    function handleCodeChange(e) {
        let inputValue = e.target.value.replace(/\D/g, '')

        if (!inputValue) {
            setCodeValue('')
            setCodeValidity({
                errorMassage: '',
                validState: false
            })
        }
        else {
            setCodeValidity({
                errorMassage: '',
                validState: false
            });
            if (inputValue.length === 4) {
                if (tariff) {
                    OrderTariffCheckCode({
                        order_id: orderId,
                        code: inputValue,
                    })
                        .then((res) => {
                            // console.log(res)
                            if (res.isCodeCorrect) {
                                sendMetriс('reachGoal', 'oformit_tarif_step2')
                                setCodeValidity({
                                    errorMassage: '',
                                    validState: true
                                });
                                setTimeout(() => {
                                    setStage(2)
                                }, 3000);
                            }
                            if (res.message) {
                                setCodeValidity({
                                    errorMassage: res.message,
                                    validState: false
                                });
                            }

                        })
                        .catch((err) => {
                            setCodeValidity({
                                errorMassage: err.message,
                                validState: false
                            });
                            console.log(err.message)
                        })
                }
                else if (buy) {
                    BuyNumbersCheckCode({
                        order_id: orderId,
                        code: inputValue,
                    })
                        .then((res) => {
                            // console.log(res)
                            if (res.isCodeCorrect) {
                                sendMetriс('reachGoal', 'priobretenie_nomera_step2')
                                setCodeValidity({
                                    errorMassage: '',
                                    validState: true
                                });
                                setTimeout(() => {
                                    setStage(2)
                                }, 3000);
                            }
                            if (res.message) {
                                setCodeValidity({
                                    errorMassage: res.message,
                                    validState: false
                                });
                            }

                        })
                        .catch((err) => {
                            setCodeValidity({
                                errorMassage: err.message,
                                validState: false
                            });
                            console.log(err.message)
                        })
                }



            }
            if (inputValue.length <= 4) {
                setCodeValue(inputValue)


            }

        }
    }

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
                        errorMassage: 'Только номера РФ',
                        validState: false
                    });
                } else {
                    setPhoneValidity({
                        errorMassage: 'Только номера РФ',
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

    const [contactPhoneNumber, setContactPhoneNumber] = useState("");
    const [contactPhoneValidity, setContactPhoneValidity] = useState({});
    function handleContctPhoneChange(e) {

        let inputValue = e.target.value.replace(/\D/g, '')
        let formattedInputValue = '';
        if (!inputValue) {
            setContactPhoneNumber('')
            setContactPhoneValidity({
                errorMassage: 'Можно вводить только цифры',
                validState: false
            })
        }
        else {
            if (['7', '8', '9'].indexOf(inputValue[0]) > -1) {
                setContactPhoneValidity({
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
                    setContactPhoneValidity({
                        errorMassage: '',
                        validState: true
                    });
                } else {
                    setContactPhoneValidity({
                        errorMassage: '',
                        validState: false
                    });
                }
            } else {
                formattedInputValue = '+' + inputValue.substring(0, 16)
                if (inputValue.length >= 11) {
                    setContactPhoneValidity({
                        errorMassage: 'Только номера РФ',
                        validState: false
                    });
                } else {
                    setContactPhoneValidity({
                        errorMassage: '',
                        validState: false
                    });
                }
            }

            setContactPhoneNumber(formattedInputValue)
        }




    }


    function handleContctPhoneDelite(e) {
        if (e.keyCode === 8 && e.target.value.replace(/\D/g, '').length === 1) {
            setContactPhoneNumber('')
        }
        if (e.keyCode === 8 && e.target.value.replace(/\D/g, '').length < 11) {
            setContactPhoneValidity({
                errorMassage: '',
                validState: false
            });
        }

    }


    const contract = useMemo(() => {
        const local = { phoneValue }
        if (selected === 0) {
            if (selectedOption === 2) {
                return {
                    ...local, contactPhoneNumber: phoneValue,
                    deliveryDate,
                    deliveryTime,
                    deliveryMethod: options[selectedOption],
                    deliveryAddress,
                }
            } else if (selectedOption === 0 || selectedOption === 1) {
                return { ...local, deliveryMethod: options[selectedOption], contactPhoneNumber: phoneValue }
            }
        }
        else if (selected === 1) {
            if (checked) {

                return { ...local, contactPhoneNumber: phoneValue }
            }
            else return { ...local, contactPhoneNumber }
        }
    }, [deliveryDate, deliveryTime, deliveryAddress, phoneValue, selectedOption, checked, selected, contactPhoneNumber])

    // console.log(contract)
    useEffect(() => {
        if (phoneValue === contactPhoneNumber) {
            setChecked(true)
            setContactPhoneNumber('')
        }
    }, [phoneValue, contactPhoneNumber])

    useEffect(() => {
        if (stage === 1) {
            setEnableButton(false)
            setPhoneValue('')
        }
    }, [stage])

    const [isCheckBoxSelected, setheckBoxSelected] = useState(true);
    function handleSelectChange(value) {
        setheckBoxSelected(value)
        // console.log(value)
    }

    const timerDefValue = 60
    const [timerValue, setTimerValue] = useState(timerDefValue);
    const [sendCounter, setSendCounter] = useState(0);
    const [sendAgainAvailible, setSendAgainAvailible] = useState(false);


    useEffect(() => {

        if (stage === 1) {
            if (!sendAgainAvailible) {
                if (timerValue === 0) {
                    setSendAgainAvailible(true)
                    setTimerValue(timerDefValue)
                } else {
                    const timer = setInterval(() => {
                        setTimerValue(timerValue - 1)
                        clearInterval(timer)
                    }, 1000);
                }

            }

        }

    }, [stage, timerValue, sendAgainAvailible])

    function handleSendCodeAgain() {
        if (sendCounter < 2) {
            if (tariff) {
                OrderTariffGetNewCode({ order_id: orderId })
                    .then((res) => {
                        setSendCounter(sendCounter + 1)
                        // console.log(res)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else if (buy) {
                BuyNumbersGetNewCode({ order_id: orderId })
                .then((res) => {
                    setSendCounter(sendCounter + 1)
                    // console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }


    }


    useEffect(() => {

        if (stage === 0) {
            const truthy = Object.values(contract).every(item => item)
            if (buy) {

                setEnableButton(checked ? isCheckBoxSelected && phoneValidity.validState && !!_.size(boughtNumbers) && truthy : phoneValidity.validState && contactPhoneValidity.validState && !!_.size(boughtNumbers) && truthy)
            } else if (tariff) {
                if (selected === 0) setEnableButton(isCheckBoxSelected && phoneValidity.validState && !!_.size(chosenNumber) && truthy)
                else setEnableButton(checked ? isCheckBoxSelected && phoneValidity.validState && truthy : phoneValidity.validState && contactPhoneValidity.validState && truthy)
            } else if (service) setEnableButton(phoneValidity.validState)
        } else if (stage === 1) {
            if (codeValidity.validState) {
                setEnableButton(true)
            }
        }

    }, [buy, tariff, boughtNumbers, chosenNumber, setEnableButton, contract, checked, service, phoneValue, selected, phoneValidity, contactPhoneValidity.validState, codeValidity.validState, stage, isCheckBoxSelected])


    return (
        <Wrapper service={service}>
            {service ? null :
                <>
                    {selected === 0 ?
                        <>
                            <div className="Способ_получения">
                                Способ получения
                                <div className="options">
                                    {options.map((option, idx) => <Option key={option} selected={selectedOption} idx={idx} onClick={() => {
                                        if (option === "Доставка") return
                                        setSelectedOption(idx)
                                    }} className={`option ${option === "Доставка" ? 'option_disabled' : ''}`}>{option}</Option>)}
                                </div>
                                <small>Только Москва и МО</small>
                            </div>
                            {selectedOption === 2 &&
                                <><div className="orderDates">
                                    <div className="Способ_получения">
                                        Дата доставки
                                        <DatePicker onChange={(_, dateStr) => setDeliveryDate(dateStr)} disabledDate={(current) => current && current < moment().startOf('day')} allowClear={false} suffixIcon={<GoCalendar style={{ color: "#0E5EF8" }} />} placeholder="Дата доставки" className="timePickers" defaultValue={moment()} format={'DD/MM/YYYY'} />
                                    </div>
                                    <div className="Способ_получения">
                                        Время доставки
                                        <RangePicker onChange={(_, timeStr) => setDeliveryTime(timeStr)} placeholder={["с", "до"]} className="timePickers" defaultValue={[moment("10:00", 'HH:mm'), moment("14:00", 'HH:mm')]} picker="time" format={'HH:mm'} />
                                    </div>
                                </div>
                                    <div className="Способ_получения">
                                        Адрес доставки в городе Москва
                                        <input value={deliveryAddress} onChange={({ target }) => setDeliveryAddress(target.value)} className="address" type="text" />
                                        <small>Доставка 350 Р по МСК / <br /> За МКАД каждый 1 КМ - 50 Р</small>
                                    </div></>
                            }
                            {selectedOption === 0 &&
                                <Pickup>
                                    Вы можете получить свою сим-карту в любом офисе Beeline
                                    <span>
                                        <HiOutlineLocationMarker />
                                        <a target="_blank" href="https://www.google.com/maps/search/%D0%BE%D1%84%D0%B8%D1%81%D1%8B+beeline+%D0%B2+%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B5/@55.7112608,37.428036,11z/data=!3m1!4b1" rel="noreferrer" >Найти салон связи на карте</a>
                                    </span>
                                </Pickup>
                            }
                        </>
                        :
                        <div className="Переносимый_номер">
                            <label>Переносимый номер</label>
                            <input className="input" value={phoneValue} onChange={(e) => handlePhoneChange(e)} type="tel" placeholder="+7 (000) 000-00-00" onKeyDown={(e) => handlePhoneDelite(e)} />
                            <label className="checker"><input onChange={() => setChecked(val => !val)} checked={checked} type="checkbox" />Совпадает с контактным</label>
                            {checked ||
                                <>
                                    <label>Контактный номер</label>
                                    <input className="input" value={contactPhoneNumber} onChange={(e) => handleContctPhoneChange(e)} type="tel" placeholder="+7 (000) 000-00-00" onKeyDown={(e) => handleContctPhoneDelite(e)} />
                                </>}
                        </div>
                    }
                </>}
            <Bottom enableButton={enableButton} service={service}>
                {service ? null : <div className="first">
                    <small>Итоговая абонентская плата в месяц:</small>
                    {totalPrice} ₽ / мес
                </div>}
                {service ? <></> :

                    <>
                        <PopupCheckBox handleSelectChange={handleSelectChange} defaultState={isCheckBoxSelected} />
                    </>

                }

                <small className="свой_номер">{stage === 0 ? 'Введите свой номер телефона' : ''}{stage === 1 ? 'Введите 4-значный код' : ''}</small>
                <small className="popup__phone-error">{phoneValidity.errorMassage}</small>
                <small className="popup__code-error">{codeValidity.errorMassage}</small>
                <span>
                    {(selected === 0 || !!service) &&
                        <input className={`omo ${codeValidity.validState ? 'input_type_green' : ' '} ${codeValidity.errorMassage ? 'input_type_red' : ''}`} value={stage === 0 ? phoneValue : stage === 1 ? codeValue : ''} onChange={(e) => {
                            if (stage === 0) {
                                handlePhoneChange(e)
                            } else if (stage === 1) {
                                handleCodeChange(e)
                            }

                        }


                        } type="tel" placeholder={stage === 0 ? "+7 (000) 000-00-00" : stage === 1 ? '0000' : ''} onKeyDown={(e) => handlePhoneDelite(e)} />
                    }
                    <button disabled={!enableButton} onClick={() => handleSubmit(contract)}>{stage === 1 ? 'Продолжить' : ''}{stage === 0 ? service ? service.eSim ? "Оставить заявку" : "Подключить" : 'Подтвердить номер' : ''} <Arrow /></button>
                </span>
                {stage === 1 ?
                    <>

                        <p onClick={() => {
                            if (sendAgainAvailible) {
                                setSendAgainAvailible(false)
                                handleSendCodeAgain()
                            }
                        }} className={`send-code-agian ${sendAgainAvailible ? sendCounter === 2 ? '' : 'send-code-agian_active' : ''}`}>
                            {sendAgainAvailible ? sendCounter === 2 ? 'Новый код можно получить только 3 раза' :
                                'Выслать код повторно' : sendCounter === 2 ? 'Новый код можно получить только 3 раза' : `Выслать код повторно: ${timerValue}`
                            }</p>
                    </>
                    :
                    <></>}
                {service ?
                    <div className="last">
                        Перезвоним в ближайшее время или отправим SMS с подтверждением заказа.
                        <small className="last-small">Оставляя контактный номер, Вы подтверждаете, что ввели свой номер самостоятельно и соглашаетесь с передачей Ваших персональных данных.</small>
                    </div> :
                    <div className="last">
                        Перезвоним в ближайшее время или отправим SMS с подтверждением заказа.
                    </div>}

            </Bottom>
        </Wrapper>
    )
}

export default memo(SimCardInfo)