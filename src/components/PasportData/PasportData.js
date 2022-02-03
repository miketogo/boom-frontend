

import Geocode from "react-geocode";

import { useEffect, useState } from "react";
import './PasportData.css';

import { citizenships } from '../../globals/utils'

Geocode.setApiKey("AIzaSyBS5PPkcm00Z0ewN-UBBpr-_EGR9fTTz70");
Geocode.setLanguage("ru");

const Arrow = () => <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 7V8H9V7H7Z" fill="#F8F8F8" />
</svg>;



function PasportData({ addPD }) {
    const [isButtonActive, setButtonActive] = useState(false);
    const [lastNameValue, setLastNameValue] = useState("");
    const [lastNameValidity, setLastNameValidity] = useState({});



    function handleLastNameChange(e) {
        let inputValue = e.target.value
        setLastNameValue(inputValue)
        if (inputValue.length > 0) {
            setLastNameValidity({
                errorMassage: '',
                validState: true
            })
        } else {
            setLastNameValidity({
                errorMassage: 'Минимальная длина 1 символ',
                validState: false
            })
        }
    }

    const [firstNameValue, setFirstNameValue] = useState("");
    const [firstNameValidity, setFirstNameValidity] = useState({});

    function handleFirstNameChange(e) {
        let inputValue = e.target.value
        setFirstNameValue(inputValue)
        if (inputValue.length > 0) {
            setFirstNameValidity({
                errorMassage: '',
                validState: true
            })
        } else {
            setFirstNameValidity({
                errorMassage: 'Минимальная длина 1 символ',
                validState: false
            })
        }
    }

    const [patronymicValue, setPatronymicValue] = useState("");
    const [patronymicValidity, setPatronymicValidity] = useState({
        errorMassage: '',
        validState: true
    });

    function handlePatronymicChange(e) {
        let inputValue = e.target.value
        setPatronymicValue(inputValue)
    }

    const [dateOfBirthValue, setDateOfBirthValue] = useState("");
    const [dateOfBirthValidity, setDateOfBirthValidity] = useState({});

    function handleDateOfBirthChange(e) {
        let inputValue = e.target.value.replace(/\D/g, '')
        let formattedInputValue = '';
        if (inputValue.length > 0) {
            setDateOfBirthValidity({
                errorMassage: '',
                validState: false
            })
            if (inputValue.length > 0) {
                formattedInputValue += inputValue.substring(0, 2)
            }
            if (inputValue.length > 2) {
                formattedInputValue += '.' + inputValue.substring(2, 4)
            }
            if (inputValue.length > 4) {
                formattedInputValue += '.' + inputValue.substring(4, 6)
                // if (inputValue.length === 6 && Number(inputValue.substring(4, 6)) > 12) {
                //     formattedInputValue += '.' + inputValue.substring(4, 5)
                // }
            }
            if (inputValue.length > 6) {
                formattedInputValue += inputValue.substring(6, 8)
            }
            if (inputValue.length >= 8) {
                setDateOfBirthValidity({
                    errorMassage: '',
                    validState: true
                })
            }
        } else {
            setDateOfBirthValidity({
                errorMassage: 'Обязательное поле',
                validState: false
            })
        }


        setDateOfBirthValue(formattedInputValue)
    }

    const [placeOfBirthValue, setPlaceOfBirthValue] = useState("");
    const [placeOfBirthValidity, setPlaceOfBirthValidity] = useState({});

    function handlePlaceOfBirthChange(e) {
        let inputValue = e.target.value
        setPlaceOfBirthValue(inputValue)
        if (inputValue.length > 0) {
            setPlaceOfBirthValidity({
                errorMassage: '',
                validState: true
            })
        } else {
            setPlaceOfBirthValidity({
                errorMassage: 'Минимальная длина 1 символ',
                validState: false
            })
        }
    }

    const [divisionCodeValue, setDivisionCodeValue] = useState("");
    const [divisionCodeValidity, setDivisionCodeValidity] = useState({});

    function handleDivisionCodeChange(e) {
        let inputValue = e.target.value.replace(/\D/g, '')
        let formattedInputValue = '';
        if (inputValue.length > 0) {
            setDivisionCodeValidity({
                errorMassage: '',
                validState: false
            })
            if (inputValue.length > 0) {

                formattedInputValue += inputValue.substring(0, 3)
            }
            if (inputValue.length > 3) {
                formattedInputValue += ' - ' + inputValue.substring(3, 6)
            }

            if (inputValue.length >= 6) {
                setDivisionCodeValidity({
                    errorMassage: '',
                    validState: true
                })
            }
        } else {
            setDivisionCodeValidity({
                errorMassage: 'Обязательное поле',
                validState: false
            })
        }

        setDivisionCodeValue(formattedInputValue)
    }

    const [dateOfIssueValue, setDateOfIssueValue] = useState("");
    const [dateOfIssueValidity, setDateOfIssueValidity] = useState({});

    function handleDateOfIssueChange(e) {
        let inputValue = e.target.value.replace(/\D/g, '')
        let formattedInputValue = '';
        if (inputValue.length > 0) {
            setDateOfIssueValidity({
                errorMassage: '',
                validState: false
            })
            if (inputValue.length > 0) {
                formattedInputValue += inputValue.substring(0, 2)
            }
            if (inputValue.length > 2) {
                formattedInputValue += '.' + inputValue.substring(2, 4)
            }
            if (inputValue.length > 4) {
                formattedInputValue += '.' + inputValue.substring(4, 6)
                // if (inputValue.length === 6 && Number(inputValue.substring(4, 6)) > 12) {
                //     formattedInputValue += '.' + inputValue.substring(4, 5)
                // }
            }
            if (inputValue.length > 6) {
                formattedInputValue += inputValue.substring(6, 8)
            }
            if (inputValue.length >= 8) {
                setDateOfIssueValidity({
                    errorMassage: '',
                    validState: true
                })
            }
        } else {
            setDateOfIssueValidity({
                errorMassage: 'Обязательное поле',
                validState: false
            })
        }

        setDateOfIssueValue(formattedInputValue)
    }

    const [passportSeriesAndNumberValue, setPassportSeriesAndNumberValue] = useState("");
    const [passportSeriesAndNumberValidity, setPassportSeriesAndNumberValidity] = useState({});
    const [passportSeriesValue, setPassportSeriesValue] = useState("");
    const [passportNumberValue, setPassportNumberValue] = useState("");

    function handlePassportSeriesAndNumberChange(e) {
        let inputValue = e.target.value.replace(/\D/g, '')
        let formattedInputValue = '';
        if (inputValue.length > 0) {
            setPassportSeriesAndNumberValidity({
                errorMassage: '',
                validState: false
            })
            if (inputValue.length > 0) {
                formattedInputValue += inputValue.substring(0, 4)
            }
            if (inputValue.length === 4) {
                setPassportSeriesValue(inputValue.substring(0, 4))
            }
            if (inputValue.length > 4) {
                formattedInputValue += '  ' + inputValue.substring(4, 10)
            }
            if (inputValue.length === 10) {
                setPassportNumberValue(inputValue.substring(4, 10))
            }
            if (inputValue.length >= 10) {
                setPassportSeriesAndNumberValidity({
                    errorMassage: '',
                    validState: true
                })
            }
        } else {
            setPassportSeriesAndNumberValidity({
                errorMassage: 'Обязательное поле',
                validState: false
            })
        }

        setPassportSeriesAndNumberValue(formattedInputValue)
    }


    const [whoIssuedPassportValue, setWhoIssuedPassportValue] = useState("");
    const [whoIssuedPassportValidity, setWhoIssuedPassportValidity] = useState({});

    function handleWhoIssuedPassportChange(e) {
        let inputValue = e.target.value
        setWhoIssuedPassportValue(inputValue)
        if (inputValue.length > 0) {
            setWhoIssuedPassportValidity({
                errorMassage: '',
                validState: true
            })
        } else {
            setWhoIssuedPassportValidity({
                errorMassage: 'Минимальная длина 1 символ',
                validState: false
            })
        }
    }

    const [registrationAddressValue, setRegistrationAddressValue] = useState("");
    const [registrationAddressValidity, setRegistrationAddressValidity] = useState({});

    function handleRegistrationAddressChange(e) {
        let inputValue = e.target.value
        setRegistrationAddressValue(inputValue)
        if (inputValue.length > 0) {
            setRegistrationAddressValidity({
                errorMassage: '',
                validState: true
            })
        } else {
            setRegistrationAddressValidity({
                errorMassage: 'Минимальная длина 1 символ',
                validState: false
            })
        }
    }
    const [registrationFlatValue, setRegistrationFlatValue] = useState("");
    const [registrationFlatValidity, setRegistrationFlatValidity] = useState({});

    function handleRegistrationFlatChange(e) {
        let inputValue = e.target.value.replace(/\D/g, '')
        setRegistrationFlatValue(inputValue)
        if (inputValue.length > 0) {
            setRegistrationFlatValidity({
                errorMassage: '',
                validState: true
            })
        } else {
            setRegistrationFlatValidity({
                errorMassage: 'Обязательное поле',
                validState: false
            })
        }
    }
    const [fullRegistrationAddressValue, setFullRegistrationAddressValue] = useState("");
    const [fullFormatedRegistrationAddressValue, setFullFormatedRegistrationAddressValue] = useState("");

    useEffect(() => {
        if (registrationFlatValue !== '' && registrationAddressValue !== '') {
            // console.log(registrationAddressValue + ', кв. ' + registrationFlatValue)
            setFullRegistrationAddressValue(registrationAddressValue + ', кв. ' + registrationFlatValue)


        }
    }, [registrationAddressValue, registrationFlatValue])

    const [dateOfRegistrationValue, setDateOfRegistrationValue] = useState("");
    const [dateOfRegistrationValidity, setDateOfRegistrationValidity] = useState({});

    function handleDateOfRegistrationChange(e) {
        let inputValue = e.target.value.replace(/\D/g, '')
        let formattedInputValue = '';

        if (inputValue.length > 0) {
            setDateOfRegistrationValidity({
                errorMassage: '',
                validState: false
            })
            if (inputValue.length > 0) {
                formattedInputValue += inputValue.substring(0, 2)
            }
            if (inputValue.length > 2) {
                formattedInputValue += '.' + inputValue.substring(2, 4)
            }
            if (inputValue.length > 4) {
                formattedInputValue += '.' + inputValue.substring(4, 6)
                // if (inputValue.length === 6 && Number(inputValue.substring(4, 6)) > 12) {
                //     formattedInputValue += '.' + inputValue.substring(4, 5)
                // }
            }
            if (inputValue.length > 6) {
                formattedInputValue += inputValue.substring(6, 8)
            }
            if (inputValue.length >= 8) {
                setDateOfRegistrationValidity({
                    errorMassage: '',
                    validState: true
                })
            }
        } else {
            setDateOfRegistrationValidity({
                errorMassage: 'Обязательное поле',
                validState: false
            })
        }

        setDateOfRegistrationValue(formattedInputValue)
    }

    const [citizenshipSelectorValue, setCitizenshipSelectorValue] = useState(0);
    const [citizenshipValue, setCitizenshipValue] = useState('Российская Федерация');
    const [citizenshipHintsFiltered, setCitizenshipHintsFiltered] = useState([]);
    const [citizenshipHintsVisible, setCitizenshipHintsVisible] = useState(false);
    const [citizenshipHintSelectorValue, setCitizenshipHintSelectorValue] = useState('');
    const [citizenshipValidity, setCitizenshipValidity] = useState({
        errorMassage: '',
        validState: true
    });
    function handleCitizenshipChange(e) {
        let inputValue = e.target.value
        setCitizenshipValidity({
            errorMassage: '',
            validState: false
        })
        setCitizenshipValue(inputValue)
        if (inputValue.length > 0) {
            if (inputValue.toLowerCase().trim() === 'Российская Федерация'.toLowerCase() || inputValue.toLowerCase().trim() === 'РФ'.toLowerCase() || inputValue.toLowerCase().trim() === 'Россия'.toLowerCase() || inputValue.toLowerCase().trim() === 'Росия'.toLowerCase()) {
                setCitizenshipHintsFiltered([])
                setCitizenshipHintsVisible(false)
                setCitizenshipSelectorValue(0)
                setCitizenshipValue('Российская Федерация')
                setCitizenshipValidity({
                    errorMassage: '',
                    validState: true
                })
            } else {
                let filtered = citizenships.filter((item) => {
                    if (item.toLowerCase().trim().startsWith(inputValue.toLowerCase().trim())) return true
                    else return false
                }).slice(0, 3)
                // if (filtered.length === 1){
                //     setCitizenshipHintSelectorValue(filtered[0])
                //     setCitizenshipValue(filtered[0])
                //     setCitizenshipHintsVisible(false)
                //     setCitizenshipValidity({
                //         errorMassage: '',
                //         validState: true
                //     })
                // } else {
                //     console.log(filtered)
                //     setCitizenshipHintsFiltered(filtered)
                //     setCitizenshipHintsVisible(true)
                // }
                if (filtered.length === 1 && filtered[0].toLowerCase().trim() === inputValue.toLowerCase().trim()) {
                    setCitizenshipHintSelectorValue(filtered[0])
                    setCitizenshipValue(filtered[0])
                    setCitizenshipHintsVisible(false)
                    setCitizenshipValidity({
                        errorMassage: '',
                        validState: true
                    })

                }
                else {
                    // console.log(filtered)
                    setCitizenshipHintsFiltered(filtered)
                    setCitizenshipHintsVisible(true)
                }


                // setCitizenshipValidity({
                //     errorMassage: '',
                //     validState: true
                // })
            }
        } else {
            setCitizenshipHintsFiltered([])
            setCitizenshipHintsVisible(false)
            setCitizenshipValidity({
                errorMassage: 'Обязательное поле',
                validState: false
            })
        }
    }
    // lastName,
    // firstName,
    // patronymic,
    // dateOfBirth,
    // placeOfBirth,
    // citizenship,
    // divisionCode,
    // dateOfIssue,
    // passportSeries,
    // passportNumber,
    // whoIssuedPassport,
    // registrationAddress,
    // dateOfRegistration,

    function handleSubmit() {

        if (isButtonActive) {
            let patronymic
            if (patronymicValue === '') {
                patronymic = 'Нет отчества'
            } else {
                patronymic = patronymicValue
            }
            Geocode.fromAddress(fullRegistrationAddressValue).then(
                (response) => {
                    // console.log(response.results[0].formatted_address)
                    setFullFormatedRegistrationAddressValue(response.results[0].formatted_address)
                    //   const { lat, lng } = response.results[0].geometry.location;
                    //   console.log(lat, lng);
                    addPD({
                        lastNameValue,
                        firstNameValue,
                        patronymic,
                        dateOfBirthValue,
                        placeOfBirthValue,
                        divisionCodeValue,
                        dateOfIssueValue,
                        passportSeriesValue,
                        passportNumberValue,
                        passportSeriesAndNumberValue,
                        whoIssuedPassportValue,
                        fullRegistrationAddressValue,
                        fullFormatedRegistrationAddressValue: response.results[0].formatted_address,
                        dateOfRegistrationValue,
                        citizenshipValue,
                    })
                },
                (error) => {
                    console.error(error);
                    setFullFormatedRegistrationAddressValue('Ошибка')
                    addPD({
                        lastNameValue,
                        firstNameValue,
                        patronymic,
                        dateOfBirthValue,
                        placeOfBirthValue,
                        divisionCodeValue,
                        dateOfIssueValue,
                        passportSeriesValue,
                        passportNumberValue,
                        passportSeriesAndNumberValue,
                        whoIssuedPassportValue,
                        fullRegistrationAddressValue,
                        fullFormatedRegistrationAddressValue: 'Ошибка',
                        dateOfRegistrationValue,
                        citizenshipValue,
                    })
                }
            );


        }
    }

    useEffect(() => {

        if (citizenshipSelectorValue === 0) {
            if (
                lastNameValidity.validState &&
                firstNameValidity.validState &&
                patronymicValidity.validState &&
                dateOfBirthValidity.validState &&
                placeOfBirthValidity.validState &&
                divisionCodeValidity.validState &&
                dateOfIssueValidity.validState &&
                passportSeriesAndNumberValidity.validState &&
                whoIssuedPassportValidity.validState &&
                registrationAddressValidity.validState &&
                registrationFlatValidity.validState &&
                dateOfRegistrationValidity.validState &&
                citizenshipValidity.validState
            ) {
                setButtonActive(true)
            }

            else {
                setButtonActive(false)
            }
        } else {
            if (
                lastNameValidity.validState &&
                firstNameValidity.validState &&
                patronymicValidity.validState &&
                dateOfBirthValidity.validState &&
                placeOfBirthValidity.validState &&
                citizenshipValidity.validState
            ) {
                setButtonActive(true)
            }

            else {
                setButtonActive(false)
            }
        }

    }, [
        lastNameValidity.validState,
        firstNameValidity.validState,
        patronymicValidity.validState,
        dateOfBirthValidity.validState,
        placeOfBirthValidity.validState,
        divisionCodeValidity.validState,
        dateOfIssueValidity.validState,
        passportSeriesAndNumberValidity.validState,
        whoIssuedPassportValidity.validState,
        registrationAddressValidity.validState,
        registrationFlatValidity.validState,
        dateOfRegistrationValidity.validState,
        citizenshipValidity.validState,
        citizenshipSelectorValue,
    ])
   

    function handleEnter(e) {
        if (e.keyCode === 13) {
          const form = e.target.form;
          const index = Array.prototype.indexOf.call(form, e.target);
          form.elements[index + 1].focus();
          e.preventDefault();
        }
      }
      function handleFormEnter(e) {
        if (e.keyCode === 13) {
          e.preventDefault();
        }
      }

    // className={`pasport__input ${firstNameValidity.errorMassage ? 'pasport__input_error' : ''} ${firstNameValidity.validState ? 'pasport__input_valid' : ''}`}
    return (
        <form onKeyDown={handleFormEnter}>
            <h2 className='pasport__title'>Для оформления потребуются<br/>ваши <span className='pasport__title_span'>паспортные данные</span></h2>
            <div className='pasport__main-data'>
                <div className="pasport__input-box">
                    <p className="pasport__input-title">Фамилия</p>
                    {lastNameValidity.errorMassage ? <p className="pasport__input-error">{lastNameValidity.errorMassage ? lastNameValidity.errorMassage : ''}</p> : <></>}
                    <div className="pasport__input-container">
                        <input onKeyDown={(e)=>{
                            if (lastNameValidity.validState){
                                handleEnter(e)
                            }
                            }} className={`pasport__input ${lastNameValidity.errorMassage ? 'pasport__input_error' : ''} ${lastNameValidity.validState ? 'pasport__input_valid' : lastNameValue ? 'pasport__input_invalid' : ''}`} value={lastNameValue} onChange={(e) => handleLastNameChange(e)} type="text" placeholder="Ваша фамилия" />

                    </div>
                </div>
                <div className="pasport__input-box">
                    <p className="pasport__input-title">Имя</p>
                    {firstNameValidity.errorMassage ? <p className="pasport__input-error">{firstNameValidity.errorMassage ? firstNameValidity.errorMassage : ''}</p> : <></>}
                    <div className="pasport__input-container">
                        <input onKeyDown={(e)=>{
                            if (firstNameValidity.validState){
                                handleEnter(e)
                            }
                            }} className={`pasport__input ${firstNameValidity.errorMassage ? 'pasport__input_error' : ''} ${firstNameValidity.validState ? 'pasport__input_valid' : firstNameValue ? 'pasport__input_invalid' : ''}`} value={firstNameValue} onChange={(e) => handleFirstNameChange(e)} type="text" placeholder="Ваше имя" />

                    </div>
                </div>
                <div className="pasport__input-box">
                    <p className="pasport__input-title">Отчество (если имеется, то является обязательным)</p>
                    <div className="pasport__input-container">
                        <input onKeyDown={(e)=>{
                            if (patronymicValidity.validState){
                                handleEnter(e)
                            }
                            }} className={`pasport__input  ${patronymicValidity.validState && patronymicValue ? 'pasport__input_valid' : ''}`} value={patronymicValue} onChange={(e) => handlePatronymicChange(e)} type="text" placeholder="Ваше отчество" />

                    </div>
                </div>
                <div className="pasport__input-box">
                    <p className="pasport__input-title">Дата рождения</p>
                    {dateOfBirthValidity.errorMassage ? <p className="pasport__input-error">{dateOfBirthValidity.errorMassage ? dateOfBirthValidity.errorMassage : ''}</p> : <></>}
                    <div className="pasport__input-container pasport__input-container_type_date">
                        <input onKeyDown={(e)=>{
                            if (dateOfBirthValidity.validState){
                                handleEnter(e)
                            }
                            }} className={`pasport__input ${dateOfBirthValidity.errorMassage ? 'pasport__input_error' : ''} ${dateOfBirthValidity.validState ? 'pasport__input_valid' : dateOfBirthValue ? 'pasport__input_invalid' : ''}`} value={dateOfBirthValue} onChange={(e) => handleDateOfBirthChange(e)} type="tel" placeholder="ДД.ММ.ГГГГ" />

                    </div>
                </div>
            </div>

            <div className='pasport__palce-of-birth'>
                <p className="pasport__input-title pasport__input-title_type_bold">Место рождения</p>
                {placeOfBirthValidity.errorMassage ? <p className="pasport__input-error">{placeOfBirthValidity.errorMassage ? placeOfBirthValidity.errorMassage : ''}</p> : <></>}
                <div className="pasport__input-container">
                    <input onKeyDown={(e)=>{
                            if (placeOfBirthValidity.validState){
                                handleEnter(e)
                            }
                            }} className={`pasport__input ${placeOfBirthValidity.errorMassage ? 'pasport__input_error' : ''} ${placeOfBirthValidity.validState ? 'pasport__input_valid' : placeOfBirthValue ? 'pasport__input_invalid' : ''}`} value={placeOfBirthValue} onChange={(e) => handlePlaceOfBirthChange(e)} type="text" placeholder="г. Москва" />

                </div>
            </div>

            <div className='pasport__citizenship'>
                <p className="pasport__input-title pasport__input-title_type_bold">Гражданство</p>
                <div className='pasport__citizenship-radios'>
                    <div onClick={() => {
                        if (citizenshipSelectorValue !== 0) {
                            setCitizenshipHintsFiltered([])
                            setCitizenshipHintsVisible(false)
                            setCitizenshipSelectorValue(0)
                            setCitizenshipValue('Российская Федерация')
                            setCitizenshipValidity({
                                errorMassage: '',
                                validState: true
                            })
                        }

                    }} className='pasport__citizenship-radio'>
                        <div className={`pasport__citizenship-radio-icon`}>
                            <div className={`pasport__citizenship-radio-selected ${citizenshipSelectorValue === 0 ? 'pasport__citizenship-radio-selected_active' : ''} `}>

                            </div>

                        </div>
                        <p className='pasport__citizenship-radio-text'>Российская Федерация</p>
                    </div>
                    <div onClick={() => {
                        if (citizenshipSelectorValue !== 1) {
                            setCitizenshipSelectorValue(1)
                            setCitizenshipValue('')
                            setCitizenshipValidity({
                                errorMassage: '',
                                validState: false
                            })
                        }

                    }} className='pasport__citizenship-radio'>
                        <div className={`pasport__citizenship-radio-icon`}>

                            <div className={`pasport__citizenship-radio-selected ${citizenshipSelectorValue === 1 ? 'pasport__citizenship-radio-selected_active' : ''} `}>

                            </div>

                        </div>
                        <p className='pasport__citizenship-radio-text'>Другое (other citizenship)</p>
                    </div>

                </div>
                {citizenshipSelectorValue === 1 ?


                    <div className="pasport__input-box pasport__input-box_type_citizenship">
                        <p className="pasport__input-title">Гражданство</p>
                        {/* {citizenshipValidity.errorMassage ? <p className="pasport__input-error">{citizenshipValidity.errorMassage ? citizenshipValidity.errorMassage : ''}</p> : <></>} */}
                        <div className="pasport__input-container pasport__input-container_type_citizenship">
                            <input className={`pasport__input ${citizenshipHintsVisible ? 'pasport__input_citizenship-hints' : ''} ${citizenshipValidity.errorMassage ? 'pasport__input_error' : ''} ${citizenshipValidity.validState ? 'pasport__input_valid' : citizenshipValue ? 'pasport__input_invalid' : ''}`} value={citizenshipValue} onChange={(e) => handleCitizenshipChange(e)} type="text" placeholder="Ваше гражданство" />
                            {citizenshipHintsVisible ?
                                <div className="pasport__citizenship-hints">
                                    <p className="pasport__input-title pasport__input-title_type_citizenship-hints">Выберите из списка</p>
                                    {citizenshipHintsFiltered && citizenshipHintsFiltered.length !== 0 ? citizenshipHintsFiltered.map((item, i) => (
                                        <div onClick={() => {
                                            if (item.toLowerCase().trim() === 'Российская Федерация'.toLowerCase()) {
                                                setCitizenshipHintsFiltered([])
                                                setCitizenshipHintsVisible(false)
                                                setCitizenshipSelectorValue(0)
                                                setCitizenshipValue('Российская Федерация')
                                                setCitizenshipValidity({
                                                    errorMassage: '',
                                                    validState: true
                                                })
                                            } else {
                                                setCitizenshipHintSelectorValue(item)
                                                setCitizenshipValue(item)
                                                setCitizenshipHintsVisible(false)
                                                setCitizenshipValidity({
                                                    errorMassage: '',
                                                    validState: true
                                                })
                                            }

                                        }} className='pasport__citizenship-radio'>

                                            <p className='pasport__citizenship-radio-text'>{item}</p>
                                        </div>
                                    )) : <p>Не найдено</p>}
                                </div> : <></>}
                        </div>
                    </div>
                    : <></>}

            </div>
            { citizenshipSelectorValue !== 0 ?
                <div className='pasport__about-passport'>
                    <p className="pasport__input-title">После оформления заявки оператор свяжется с Вами для уточнения деталей<br/><br/></p>
                    <p className="pasport__input-title">After completing the application, the operator will contact you to clarify the details</p>
                </div>

                :

                <>
                    <div className='pasport__about-passport'>

                        <div className='pasport__first-row'>
                            <div className="pasport__input-box pasport__input-box_type_row">
                                <p className="pasport__input-title">Код подразделения</p>

                                <div className="pasport__input-container pasport__input-container_type_division-code">
                                    <input onKeyDown={(e)=>{
                            if (divisionCodeValidity.validState){
                                handleEnter(e)
                            }
                            }} className={`pasport__input ${divisionCodeValidity.errorMassage ? 'pasport__input_error' : ''} ${divisionCodeValidity.validState ? 'pasport__input_valid' : divisionCodeValue ? 'pasport__input_invalid' : ''}`} value={divisionCodeValue} onChange={(e) => handleDivisionCodeChange(e)} type="tel" placeholder="000 - 000" />

                                </div>
                            </div>
                            <div className="pasport__input-box pasport__input-box_type_row">
                                <p className="pasport__input-title">Дата выдачи</p>
                                <div className="pasport__input-container pasport__input-container_type_date-of-issue">
                                    <input onKeyDown={(e)=>{
                            if (dateOfIssueValidity.validState){
                                handleEnter(e)
                            }
                            }} className={`pasport__input ${dateOfIssueValidity.errorMassage ? 'pasport__input_error' : ''} ${dateOfIssueValidity.validState ? 'pasport__input_valid' : dateOfIssueValue ? 'pasport__input_invalid' : ''}`} value={dateOfIssueValue} onChange={(e) => handleDateOfIssueChange(e)} type="tel" placeholder="ДД.ММ.ГГГГ" />

                                </div>
                            </div>
                            <div className="pasport__input-box pasport__input-box_type_row">
                                <p className="pasport__input-title">Серия и номер</p>
                                <div className="pasport__input-container pasport__input-container_type_series">
                                    <input onKeyDown={(e)=>{
                            if (passportSeriesAndNumberValidity.validState){
                                handleEnter(e)
                            }
                            }} className={`pasport__input ${passportSeriesAndNumberValidity.errorMassage ? 'pasport__input_error' : ''} ${passportSeriesAndNumberValidity.validState ? 'pasport__input_valid' : passportSeriesAndNumberValue ? 'pasport__input_invalid' : ''}`} value={passportSeriesAndNumberValue} onChange={(e) => handlePassportSeriesAndNumberChange(e)} type="tel" placeholder="0000  916689" />

                                </div>
                            </div>
                        </div>
                        <div className="pasport__input-box">
                            <p className="pasport__input-title">Кем выдан</p>
                            {whoIssuedPassportValidity.errorMassage ? <p className="pasport__input-error">{whoIssuedPassportValidity.errorMassage ? whoIssuedPassportValidity.errorMassage : ''}</p> : <></>}
                            <div className="pasport__input-container">
                                <input onKeyDown={(e)=>{
                            if (whoIssuedPassportValidity.validState){
                                handleEnter(e)
                            }
                            }} className={`pasport__input pasport__input_type_who-issued  ${whoIssuedPassportValidity.errorMassage ? 'pasport__input_error' : ''} ${whoIssuedPassportValidity.validState ? 'pasport__input_valid' : whoIssuedPassportValue ? 'pasport__input_invalid' : ''}`} value={whoIssuedPassportValue} onChange={(e) => handleWhoIssuedPassportChange(e)} type="text" placeholder="Кто выдал паспорт" />

                            </div>
                        </div>
                    </div>
                    <div className='pasport__registration-address'>
                        <p className="pasport__input-title pasport__input-title_type_bold">Адрес регистрации</p>
                        <div className='pasport__first-row'>
                            <div className="pasport__input-box pasport__input-box_type_row">
                                <p className="pasport__input-title">Адрес регистрации (город, улица, дом)</p>
                                <div className="pasport__input-container pasport__input-container_type_address">
                                    <input onKeyDown={(e)=>{
                            if (registrationAddressValidity.validState){
                                handleEnter(e)
                            }
                            }} className={`pasport__input ${registrationAddressValidity.errorMassage ? 'pasport__input_error' : ''} ${registrationAddressValidity.validState ? 'pasport__input_valid' : registrationAddressValue ? 'pasport__input_invalid' : ''}`} value={registrationAddressValue} onChange={(e) => handleRegistrationAddressChange(e)} type="text" placeholder="г. Москва, ул. Арбат, д 10" />

                                </div>

                            </div>
                            <div className="pasport__input-box pasport__input-box_type_row">
                                <p className="pasport__input-title">Квартира</p>
                                <div className="pasport__input-container pasport__input-container_type_flat">
                                    <input onKeyDown={(e)=>{
                            if (registrationFlatValidity.validState){
                                handleEnter(e)
                            }
                            }} className={`pasport__input ${registrationFlatValidity.errorMassage ? 'pasport__input_error' : ''} ${registrationFlatValidity.validState ? 'pasport__input_valid' : registrationFlatValue ? 'pasport__input_invalid' : ''}`} value={registrationFlatValue} onChange={(e) => handleRegistrationFlatChange(e)} type="tel" placeholder="10" />

                                </div>

                            </div>
                        </div>
                        <div className="pasport__input-box">
                            <p className="pasport__input-title">Дата регистрации</p>
                            {dateOfRegistrationValidity.errorMassage ? <p className="pasport__input-error">{dateOfRegistrationValidity.errorMassage ? dateOfRegistrationValidity.errorMassage : ''}</p> : <></>}
                            <div className="pasport__input-container pasport__input-container_type_date-of-registration">
                                <input onKeyDown={(e)=>{
                            if (dateOfRegistrationValidity.validState){
                                handleEnter(e)
                            }
                            }} className={`pasport__input ${dateOfRegistrationValidity.errorMassage ? 'pasport__input_error' : ''} ${dateOfRegistrationValidity.validState ? 'pasport__input_valid' : dateOfRegistrationValue ? 'pasport__input_invalid' : ''}`} value={dateOfRegistrationValue} onChange={(e) => handleDateOfRegistrationChange(e)} type="tel" placeholder="ДД.ММ.ГГГГ" />

                            </div>
                        </div>

                    </div>
                </>
            }



            <button type='button' className={`pasport__button ${isButtonActive ? 'pasport__button_active' : 'pasport__button_disabled'}`} disabled={!isButtonActive} onClick={() => handleSubmit()}>Оформить заказ <Arrow /></button>
        </form>
    )
}

export default PasportData