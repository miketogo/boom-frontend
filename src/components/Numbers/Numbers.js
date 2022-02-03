import React, { useContext } from 'react';
import MetaTags from 'react-meta-tags';
import { GlobalContext } from '../../App';
import { useParams, useHistory } from 'react-router-dom';
import './Numbers.css';

import PersonalNumber from './PersonalNumber/PersonalNumber';
import NumbersTablePages from "./NumbersTablePages";
import NumbersMobile from "./NumbersMobile";
import searchIcon from '../../assets/images/search.svg'
import searchIcon_black from '../../assets/images/search-black.svg'
import numbersIcon from '../../assets/images/numbers.png'
import Esim from './Esim/Esim';

import { GetNumbers } from '../../globals/utils'
import Loader from '../../globals/Loader/index'


export default function Numbers(props) {
    const history = useHistory();
    let { button } = useParams();
    const [allNumbers, setAllNumbers] = React.useState(null);
    const [numbers, setNumbers] = React.useState(null);

    const [selectedNumbers, setSelectedNumbers] = React.useState([]);
    const [preloaderVisible, setPreloaderVisible] = React.useState(true);
    const [apiError, setApiError] = React.useState('');
    const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
    const { darkTheme } = useContext(GlobalContext);
    const [inputValue, setInputValue] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('Все');
    const [selectedCategoryID, setSelectedCategoryID] = React.useState('all');
    const [isInputFocused, setInputFocused] = React.useState(false);
    const [filteredNumbers, setFilteredNumbers] = React.useState(null);


    const [page, setPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(0);




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
    React.useEffect(() => {

        GetNumbers().then((res) => {

            if (res.result.length > 0) {
                let numbers = res.result.filter((item) => {
                    if (item.ctn) {
                        if (item.category && (item.category === 1 || item.category === 2 || item.category === 3 || item.category === 4 || item.category === 5 || item.category === 6 || item.category === 9)) {
                            return true
                        }
                        return false
                    }
                    return false


                })

                // throw new Error()
                setScreenWidth(window.innerWidth)
                setAllNumbers(numbers)
                setPreloaderVisible(false)
            }

        }).catch((err) => {
            setPreloaderVisible(false)
            setApiError('Что то пошло не так')
            console.log(err)
        })

    }, [])

    React.useEffect(() => {
        if (inputValue !== '') {
            setFilteredNumbers(allNumbers.filter((item) => {
                if (item.ctn) {
                    if (item.ctn.includes(inputValue)) {
                        return true
                    }
                    return false
                }
                return false


            }))

        }
        if (screenWidth >= 2046 && allNumbers) {

            setItemsPerPage(20)

            if (inputValue !== '' && selectedCategoryID === 'all') {
                let filterd = allNumbers.filter((item) => {
                    if (item.ctn) {
                        if (item.ctn.includes(inputValue)) {
                            return true
                        }
                        return false
                    }
                    return false


                })

                setNumbers(filterd.slice(0, 20))

            } else if (selectedCategoryID !== 'all' && inputValue !== '') {
                if (selectedCategoryID === 3) {
                    let filterd = allNumbers.filter((item) => {
                        if (item.ctn) {
                            if (item.ctn.includes(inputValue) && (item.category === 3 || item.category === 4 || item.category === 5)) {
                                return true
                            }
                            return false
                        }
                        return false


                    })
                    setFilteredNumbers(filterd)
                    setNumbers(filterd.slice(0, 20))

                } else {

                    let filterd = allNumbers.filter((item) => {
                        if (item.ctn) {
                            if (item.ctn.includes(inputValue) && item.category === Number(selectedCategoryID)) {
                                return true
                            }
                            return false
                        }
                        return false


                    })
                    setFilteredNumbers(filterd)
                    setNumbers(filterd.slice(0, 20))

                }

            }
            else if (selectedCategoryID !== 'all' && inputValue === '') {
                if (selectedCategoryID === 3) {
                    let filterd = allNumbers.filter((item) => {
                        if (item.ctn) {
                            if (item.category === 3 || item.category === 4 || item.category === 5) {
                                return true
                            }
                            return false
                        }
                        return false


                    })
                    setFilteredNumbers(filterd)
                    setNumbers(filterd.slice(0, 20))

                } else {
                    let filterd = allNumbers.filter((item) => {
                        if (item.ctn) {
                            if (item.category === Number(selectedCategoryID)) {
                                return true
                            }
                            return false
                        }
                        return false


                    })
                    setFilteredNumbers(filterd)
                    setNumbers(filterd.slice(0, 20))

                }

            }
            else if (selectedCategoryID === 'all' && inputValue === '') {


                setNumbers(allNumbers.slice(0, 20))

            }


        }

        else if (screenWidth >= 1350 && window.innerWidth < 2046 && allNumbers) {

            setItemsPerPage(12)

            if (inputValue !== '' && selectedCategoryID === 'all') {
                let filterd = allNumbers.filter((item) => {
                    if (item.ctn) {
                        if (item.ctn.includes(inputValue)) {
                            return true
                        }
                        return false
                    }
                    return false


                })

                setNumbers(filterd.slice(0, 12))

            } else if (selectedCategoryID !== 'all' && inputValue !== '') {
                if (selectedCategoryID === 3) {
                    let filterd = allNumbers.filter((item) => {
                        if (item.ctn) {
                            if (item.ctn.includes(inputValue) && (item.category === 3 || item.category === 4 || item.category === 5)) {
                                return true
                            }
                            return false
                        }
                        return false


                    })
                    setFilteredNumbers(filterd)
                    setNumbers(filterd.slice(0, 12))

                } else {

                    let filterd = allNumbers.filter((item) => {
                        if (item.ctn) {
                            if (item.ctn.includes(inputValue) && item.category === Number(selectedCategoryID)) {
                                return true
                            }
                            return false
                        }
                        return false


                    })
                    setFilteredNumbers(filterd)
                    setNumbers(filterd.slice(0, 12))

                }

            }
            else if (selectedCategoryID !== 'all' && inputValue === '') {
                if (selectedCategoryID === 3) {
                    let filterd = allNumbers.filter((item) => {
                        if (item.ctn) {
                            if (item.category === 3 || item.category === 4 || item.category === 5) {
                                return true
                            }
                            return false
                        }
                        return false


                    })
                    setFilteredNumbers(filterd)
                    setNumbers(filterd.slice(0, 12))

                } else {
                    let filterd = allNumbers.filter((item) => {
                        if (item.ctn) {
                            if (item.category === Number(selectedCategoryID)) {
                                return true
                            }
                            return false
                        }
                        return false


                    })
                    setFilteredNumbers(filterd)
                    setNumbers(filterd.slice(0, 12))

                }

            }
            else if (selectedCategoryID === 'all' && inputValue === '') {


                setNumbers(allNumbers.slice(0, 12))

            }


        }

        else
            if (screenWidth >= 1060 && window.innerWidth < 1350 && allNumbers) {

                setItemsPerPage(12)

                if (inputValue !== '' && selectedCategoryID === 'all') {
                    let filterd = allNumbers.filter((item) => {
                        if (item.ctn) {
                            if (item.ctn.includes(inputValue)) {
                                return true
                            }
                            return false
                        }
                        return false


                    })

                    setNumbers(filterd.slice(0, 12))

                } else if (selectedCategoryID !== 'all' && inputValue !== '') {
                    if (selectedCategoryID === 3) {
                        let filterd = allNumbers.filter((item) => {
                            if (item.ctn) {
                                if (item.ctn.includes(inputValue) && (item.category === 3 || item.category === 4 || item.category === 5)) {
                                    return true
                                }
                                return false
                            }
                            return false


                        })
                        setFilteredNumbers(filterd)
                        setNumbers(filterd.slice(0, 12))

                    } else {

                        let filterd = allNumbers.filter((item) => {
                            if (item.ctn) {
                                if (item.ctn.includes(inputValue) && item.category === Number(selectedCategoryID)) {
                                    return true
                                }
                                return false
                            }
                            return false


                        })
                        setFilteredNumbers(filterd)
                        setNumbers(filterd.slice(0, 12))

                    }

                }
                else if (selectedCategoryID !== 'all' && inputValue === '') {
                    if (selectedCategoryID === 3) {
                        let filterd = allNumbers.filter((item) => {
                            if (item.ctn) {
                                if (item.category === 3 || item.category === 4 || item.category === 5) {
                                    return true
                                }
                                return false
                            }
                            return false


                        })
                        setFilteredNumbers(filterd)
                        setNumbers(filterd.slice(0, 12))

                    } else {
                        let filterd = allNumbers.filter((item) => {
                            if (item.ctn) {
                                if (item.category === Number(selectedCategoryID)) {
                                    return true
                                }
                                return false
                            }
                            return false


                        })
                        setFilteredNumbers(filterd)
                        setNumbers(filterd.slice(0, 12))

                    }

                }
                else if (selectedCategoryID === 'all' && inputValue === '') {


                    setNumbers(allNumbers.slice(0, 12))

                }


            }
            else
                if (screenWidth >= 500 && window.innerWidth < 1060 && allNumbers) {
                    setItemsPerPage(12)
                    if (inputValue !== '' && selectedCategoryID === 'all') {
                        let filterd = allNumbers.filter((item) => {
                            if (item.ctn) {
                                if (item.ctn.includes(inputValue)) {
                                    return true
                                }
                                return false
                            }
                            return false


                        })

                        setNumbers(filterd.slice(0, 12))

                    } else if (selectedCategoryID !== 'all' && inputValue !== '') {
                        if (selectedCategoryID === 3) {
                            let filterd = allNumbers.filter((item) => {
                                if (item.ctn) {
                                    if (item.ctn.includes(inputValue) && (item.category === 3 || item.category === 4 || item.category === 5)) {
                                        return true
                                    }
                                    return false
                                }
                                return false


                            })
                            setFilteredNumbers(filterd)
                            setNumbers(filterd.slice(0, 12))

                        } else {
                            let filterd = allNumbers.filter((item) => {
                                if (item.ctn) {
                                    if (item.ctn.includes(inputValue) && item.category === Number(selectedCategoryID)) {
                                        return true
                                    }
                                    return false
                                }
                                return false


                            })
                            setFilteredNumbers(filterd)
                            setNumbers(filterd.slice(0, 12))

                        }

                    }
                    else if (selectedCategoryID !== 'all' && inputValue === '') {
                        if (selectedCategoryID === 3) {
                            let filterd = allNumbers.filter((item) => {
                                if (item.ctn) {
                                    if (item.category === 3 || item.category === 4 || item.category === 5) {
                                        return true
                                    }
                                    return false
                                }
                                return false


                            })
                            setFilteredNumbers(filterd)
                            setNumbers(filterd.slice(0, 12))

                        } else {
                            let filterd = allNumbers.filter((item) => {
                                if (item.ctn) {
                                    if (item.category === Number(selectedCategoryID)) {
                                        return true
                                    }
                                    return false
                                }
                                return false


                            })
                            setFilteredNumbers(filterd)
                            setNumbers(filterd.slice(0, 12))

                        }

                    }
                    else if (selectedCategoryID === 'all' && inputValue === '') {


                        setNumbers(allNumbers.slice(0, 12))

                    }


                } else
                    if (screenWidth < 500 && allNumbers) {
                        setItemsPerPage(8)
                        if (inputValue !== '' && selectedCategoryID === 'all') {
                            let filterd = allNumbers.filter((item) => {
                                if (item.ctn) {
                                    if (item.ctn.includes(inputValue)) {
                                        return true
                                    }
                                    return false
                                }
                                return false


                            })

                            setNumbers(filterd.slice(0, 8))

                        } else if (selectedCategoryID !== 'all' && inputValue !== '') {
                            if (selectedCategoryID === 3) {
                                let filterd = allNumbers.filter((item) => {
                                    if (item.ctn) {
                                        if (item.ctn.includes(inputValue) && (item.category === 3 || item.category === 4 || item.category === 5)) {
                                            return true
                                        }
                                        return false
                                    }
                                    return false


                                })
                                setFilteredNumbers(filterd)
                                setNumbers(filterd.slice(0, 8))

                            } else {
                                let filterd = allNumbers.filter((item) => {
                                    if (item.ctn) {
                                        if (item.ctn.includes(inputValue) && item.category === Number(selectedCategoryID)) {
                                            return true
                                        }
                                        return false
                                    }
                                    return false


                                })
                                setFilteredNumbers(filterd)
                                setNumbers(filterd.slice(0, 8))

                            }
                        }
                        else if (selectedCategoryID !== 'all' && inputValue === '') {
                            if (selectedCategoryID === 3) {
                                let filterd = allNumbers.filter((item) => {
                                    if (item.ctn) {
                                        if (item.category === 3 || item.category === 4 || item.category === 5) {
                                            return true
                                        }
                                        return false
                                    }
                                    return false


                                })
                                setFilteredNumbers(filterd)
                                setNumbers(filterd.slice(0, 8))

                            } else {
                                let filterd = allNumbers.filter((item) => {
                                    if (item.ctn) {
                                        if (item.category === Number(selectedCategoryID)) {
                                            return true
                                        }
                                        return false
                                    }
                                    return false


                                })
                                setFilteredNumbers(filterd)
                                setNumbers(filterd.slice(0, 8))

                            }
                        }
                        else if (selectedCategoryID === 'all' && inputValue === '') {


                            setNumbers(allNumbers.slice(0, 8))

                        }

                    } else if (!allNumbers) {

                        setNumbers([])

                    } else {


                        setNumbers(allNumbers.slice(0, 12))
                    }
    }, [allNumbers, screenWidth, inputValue, selectedCategoryID])

    // const [bronzPage, setBronzPage] = React.useState(1);
    // const [silverPage, setSilverPage] = React.useState(1);
    // const [goldPage, setGoldPage] = React.useState(1);
    // const [platinaPage, setPlatinaPage] = React.useState(1);
    // const [briliantPage, setBriliantPage] = React.useState(1);

    const [selectedNumbersOpen, setSelectedNumbersOpen] = React.useState(false);
    function handleInputChange(e) {
        setPage(1)
        // setBronzPage(1)
        // setSilverPage(1)
        // setGoldPage(1)
        // setPlatinaPage(1)
        // setBriliantPage(1)
        let inputValue = e.target.value.replace(/\D/g, '')
        if (inputValue.length > 10) {
            setInputValue(inputValue);
        }
        else {

            setInputValue(inputValue);
        }



    }
    function handleCategoryChange(category) {
        setSelectedNumbersOpen(false)
        setPage(1)
        if (category === selectedCategory) {
            return
        }
        if (category === 'Все') {

            setSelectedCategoryID('all')



        }
        if (category === 'Бриллиантовый') {

            setSelectedCategoryID(9)


        }
        if (category === 'Платиновый') {

            setSelectedCategoryID(6)


        }
        if (category === 'Золотой') {

            setSelectedCategoryID(3)


        }
        if (category === 'Серебряный') {

            setSelectedCategoryID(2)


        }
        if (category === 'Бронзовый') {

            setSelectedCategoryID(1)


        }

        setSelectedCategory(category)

    }
    const [maxLengthError, setMaxLengthError] = React.useState(false);

    function handleCtnClick(item) {

        if (selectedNumbers && selectedNumbers.length === 5) {
            if (selectedNumbers.filter((itm) => {
                if (itm === item) return true
                return false
            }).length === 0) {

                setMaxLengthError(true)

                setTimeout(setMaxLengthError, 300, false)
            } else {

            }
        }
        if (selectedNumbers && selectedNumbers.length <= 4 && selectedNumbers.filter((itm) => {
            if (itm.ctn !== null && item.ctn === itm.ctn) {
                return item
            } return false
        }).length === 0) {
            setSelectedNumbers([...selectedNumbers, item])
        } else if (selectedNumbers && selectedNumbers.length > 0 && selectedNumbers.filter((itm) => {
            if (itm.ctn !== null && item.ctn === itm.ctn) {
                return item
            } return false
        }).length !== 0) {
            setSelectedNumbers(selectedNumbers.filter((itm) => {
                if (itm.ctn !== null && item.ctn === itm.ctn) {
                    return false
                } return item
            }))
        }



    }

    function handleSubmit(e) {
        e.preventDefault();
        // dispatch({ type: BUY_NUMBER, number: selectedNumber })
        // console.log(selectedNumbers)
        props.buyNumbers(selectedNumbers)
        setSelectedNumbers([])
    }
    function handleFocus(e) {
        if (isInputFocused) {
            setInputFocused(false)
        } else {
            setSelectedNumbersOpen(false)
            setInputFocused(true)
        }

    }
    const [fullPrice, setFullPrice] = React.useState(0);
    React.useEffect(() => {
        if (selectedNumbers.length === 0) {
            setSelectedNumbersOpen(false)
        } else {
            let firstPrice = 0
            let secondPrice = 0
            let thirdPrice = 0
            let fourthPrice = 0
            let fifthPrice = 0
            if (selectedNumbers[0] && selectedNumbers[0].category === 1) firstPrice = 0
            if (selectedNumbers[0] && selectedNumbers[0].category === 2) firstPrice = 300
            if (selectedNumbers[0] && (selectedNumbers[0].category === 3 || selectedNumbers[0].category === 4 || selectedNumbers[0].category === 5)) firstPrice = 500
            if (selectedNumbers[0] && selectedNumbers[0].category === 6) firstPrice = 1000
            if (selectedNumbers[0] && selectedNumbers[0].category === 9) firstPrice = 1500

            if (selectedNumbers[1] && selectedNumbers[1].category === 1) secondPrice = 0
            if (selectedNumbers[1] && selectedNumbers[1].category === 2) secondPrice = 300
            if (selectedNumbers[1] && (selectedNumbers[1].category === 3 || selectedNumbers[1].category === 4 || selectedNumbers[1].category === 5)) secondPrice = 500
            if (selectedNumbers[1] && selectedNumbers[1].category === 6) secondPrice = 1000
            if (selectedNumbers[1] && selectedNumbers[1].category === 9) secondPrice = 1500

            if (selectedNumbers[2] && selectedNumbers[2].category === 1) thirdPrice = 0
            if (selectedNumbers[2] && selectedNumbers[2].category === 2) thirdPrice = 300
            if (selectedNumbers[2] && (selectedNumbers[2].category === 3 || selectedNumbers[2].category === 4 || selectedNumbers[2].category === 5)) thirdPrice = 500
            if (selectedNumbers[2] && selectedNumbers[2].category === 6) thirdPrice = 1000
            if (selectedNumbers[2] && selectedNumbers[2].category === 9) thirdPrice = 1500

            if (selectedNumbers[3] && selectedNumbers[3].category === 1) fourthPrice = 0
            if (selectedNumbers[3] && selectedNumbers[3].category === 2) fourthPrice = 300
            if (selectedNumbers[3] && (selectedNumbers[3].category === 3 || selectedNumbers[3].category === 4 || selectedNumbers[3].category === 5)) fourthPrice = 500
            if (selectedNumbers[3] && selectedNumbers[3].category === 6) fourthPrice = 1000
            if (selectedNumbers[3] && selectedNumbers[3].category === 9) fourthPrice = 1500

            if (selectedNumbers[4] && selectedNumbers[4].category === 1) fifthPrice = 0
            if (selectedNumbers[4] && selectedNumbers[4].category === 2) fifthPrice = 300
            if (selectedNumbers[4] && (selectedNumbers[4].category === 3 || selectedNumbers[4].category === 4 || selectedNumbers[4].category === 5)) fifthPrice = 500
            if (selectedNumbers[4] && selectedNumbers[4].category === 6) fifthPrice = 1000
            if (selectedNumbers[4] && selectedNumbers[4].category === 9) fifthPrice = 1500

            setFullPrice(firstPrice + secondPrice + thirdPrice + fourthPrice + fifthPrice)
        }
    }, [selectedNumbers]);
    const [selectedButton, setSelectedButton] = React.useState(`${button && (button === ':все' || button === ':перенести' || button === ':esim') ? button.split(':')[1] : 'все'}`);
    React.useEffect(() => {
        setSelectedButton(`${button && (button === ':все' || button === ':перенести' || button === ':esim') ? button.split(':')[1] : 'все'}`)
    }, [button])
    const [isSelectCategoryOpen, setSelectCategoryOpen] = React.useState(false);
    function handeleCategoryOpen() {
        if (isSelectCategoryOpen) {
            setSelectCategoryOpen(false)
        } else {
            setSelectCategoryOpen(true)
        }
    }
    const [hoveredNumber, setHoveredNumber] = React.useState(null);
    function handleItemDelite(item) {
        setSelectedNumbers(selectedNumbers.filter((itm) => {
            if (itm.ctn !== null && item.ctn === itm.ctn) {
                return false
            } return item
        }))

    }

    // /numbers/:все //
    // /numbers/:перенести //
    // /numbers/:esim //
    return (

        <>
            <MetaTags>
                <title>{selectedButton === "все" ? 'Все номера': ''}{selectedButton === "перенести" ? 'Перенести свой': ''}{selectedButton === "esim" ? 'Подключить eSIM': ''}</title>
                <meta property="og:title" content={`Boom - ${selectedButton === "все" ? 'Все номера': ''}${selectedButton === "перенести" ? 'Перенести свой': ''}${selectedButton === "esim" ? 'Подключить eSIM': ''}`} />
            </MetaTags>
            <div className={`numbers__headtitle`}>
                <img className={`numbers__headtitle-icon`} src={numbersIcon} alt="Телефон" />
                <h2 className={`numbers__headtitle-text ${darkTheme ? 'numbers__headtitle-text_dark' : ''}`}>Выберите<br />номер</h2>
            </div>
            <div className={`numbers__head-buttons`}>
                <button onClick={() => {
                    history.push(':все')
                    setSelectedButton('все')
                }} className={`numbers__head-button ${selectedButton === "все" ? "numbers__head-button_active" : ''} `}>
                    <p className={`numbers__head-button-text ${darkTheme ? 'numbers__head-button-text_dark' : ''} ${selectedButton === "все" ? "numbers__head-button-text_active" : ''} `}>Все номера</p>
                </button>
                <button onClick={() => {
                    history.push(':перенести')
                    setSelectedButton('перенести')
                }} className={`numbers__head-button ${selectedButton === "перенести" ? "numbers__head-button_active" : ''} `}>
                    <p className={`numbers__head-button-text ${darkTheme ? 'numbers__head-button-text_dark' : ''} ${selectedButton === "перенести" ? "numbers__head-button-text_active" : ''} `}>Перенести свой</p>
                </button>
                <button onClick={() => {
                    history.push(':esim')
                    setSelectedButton('esim')
                }} className={`numbers__head-button ${selectedButton === "esim" ? "numbers__head-button_active" : ''} `}>
                    <p className={`numbers__head-button-text  ${darkTheme ? 'numbers__head-button-text_dark' : ''} ${selectedButton === "esim" ? "numbers__head-button-text_active" : ''}`}>Подключить eSIM</p>
                </button>
            </div>
            {selectedButton === "перенести" ?
                <PersonalNumber transferNumber={props.transferNumber} screenWidth={screenWidth} />
                :
                <>
                </>}
            {selectedButton === "esim" ?
                <Esim screenWidth={screenWidth} buyEsim={props.buyEsim} />
                :
                <>
                </>}
            {screenWidth > 930 ?
                selectedButton === "все" &&
                <>

                    <form autoComplete="off" onSubmit={handleSubmit} className={`numbers ${darkTheme ? 'numbers_dark' : ''}`}>
                        <h2 className={`numbers__title ${darkTheme ? 'numbers__title_dark' : ''}`}>Выберите до пяти номеров или<br /><span onClick={() => {
                    history.push(':перенести')
                    setSelectedButton('перенести')
                }} className='numbers__title_link'>переходите со своим</span></h2>
                        <p onClick={() => { if (selectedNumbers && selectedNumbers.length > 0) setSelectedNumbersOpen(!selectedNumbersOpen) }} className={`numbers__selected-numbers-button ${darkTheme ? 'numbers__selected-numbers-button_dark' : ''}`}>{selectedNumbers && selectedNumbers.length === 0 ? 'Ничего не выбрано' : selectedNumbersOpen ? 'Вернуться к поиску' : 'Посмотреть выбраные номера'}</p>

                        <div className='numbers__controllers'>
                            <div className={`numbers__input-container ${isInputFocused ? "numbers__input-container_focused" : ''}`}>
                                <img className="numbers__input-search-icon" src={searchIcon} alt="Иконка поиска" />

                                <input onBlur={handleFocus} onFocus={handleFocus} className="numbers__input" name="number" type="text" value={inputValue} onChange={handleInputChange} placeholder='Поиск номера' maxLength="10"></input>

                            </div>
                            <div className="numbers__categories">
                                <button type='button' className={`numbers__category ${darkTheme ? 'numbers__category_dark' : ''}  ${selectedNumbersOpen ? '' : selectedCategory === 'Все' ? 'numbers__category_active' : ''}`} onClick={() => handleCategoryChange('Все')}>Все</button>
                                <div className="numbers__category-container">
                                    <button type='button' className={`numbers__category numbers__category_with-name ${darkTheme ? 'numbers__category_dark' : ''}  ${selectedNumbersOpen ? '' : selectedCategory === 'Бронзовый' ? ' numbers__category_bronze_active' : ''}`} onClick={() => handleCategoryChange('Бронзовый')} >
                                        <p className={`numbers__category-name ${darkTheme ? 'numbers__category-name_dark' : ''} ${selectedNumbersOpen ? '' : selectedCategory === 'Бронзовый' ? ' numbers__category-name_active' : ''}`}>Бронзовый</p>
                                    </button>
                                    {
                                        selectedNumbersOpen ? '' : selectedCategory === 'Бронзовый' ?
                                            <p className={`numbers__category-price ${darkTheme ? 'numbers__category-price_dark' : ''}`}><span className="numbers__category-lastprice">1 000 ₽</span> Бесплатно</p>
                                            : <></>

                                    }

                                </div>
                                <div className="numbers__category-container">
                                    <button type='button' className={`numbers__category numbers__category_with-name ${darkTheme ? 'numbers__category_dark' : ''}  ${selectedNumbersOpen ? '' : selectedCategory === 'Серебряный' ? ' numbers__category_selver_active' : ''}`} onClick={() => handleCategoryChange('Серебряный')} >
                                        <p className={`numbers__category-name ${darkTheme ? 'numbers__category-name_dark' : ''} ${selectedNumbersOpen ? '' : selectedCategory === 'Серебряный' ? ' numbers__category-name_active' : ''}`}>Серебряный</p>
                                    </button>
                                    {
                                        selectedNumbersOpen ? '' : selectedCategory === 'Серебряный' ?
                                            <p className={`numbers__category-price ${darkTheme ? 'numbers__category-price_dark' : ''}`}><span className="numbers__category-lastprice">5 000 ₽</span> 300 ₽/мес</p>
                                            : <></>

                                    }

                                </div>
                                <div className="numbers__category-container">
                                    <button type='button' className={`numbers__category numbers__category_with-name ${darkTheme ? 'numbers__category_dark' : ''} ${selectedNumbersOpen ? '' : selectedCategory === 'Золотой' ? ' numbers__category_gold_active' : ''}`} onClick={() => handleCategoryChange('Золотой')} >
                                        <p className={`numbers__category-name ${darkTheme ? 'numbers__category-name_dark' : ''} ${selectedNumbersOpen ? '' : selectedCategory === 'Золотой' ? ' numbers__category-name_active' : ''}`}>Золотой</p>
                                    </button>
                                    {
                                        selectedNumbersOpen ? '' : selectedCategory === 'Золотой' ?
                                            <p className={`numbers__category-price ${darkTheme ? 'numbers__category-price_dark' : ''}`}><span className="numbers__category-lastprice">35 000 ₽</span> 500 ₽/мес</p>
                                            : <></>

                                    }

                                </div>
                                <div className="numbers__category-container">
                                    <button type='button' className={`numbers__category numbers__category_with-name ${darkTheme ? 'numbers__category_dark' : ''}  ${selectedNumbersOpen ? '' : selectedCategory === 'Платиновый' ? ' numbers__category_platina_active' : ''}`} onClick={() => handleCategoryChange('Платиновый')} >
                                        <p className={`numbers__category-name ${darkTheme ? 'numbers__category-name_dark' : ''} ${selectedNumbersOpen ? '' : selectedCategory === 'Платиновый' ? ' numbers__category-name_active' : ''}`}>Платиновый</p>
                                    </button>
                                    {
                                        selectedNumbersOpen ? '' : selectedCategory === 'Платиновый' ?
                                            <p className={`numbers__category-price ${darkTheme ? 'numbers__category-price_dark' : ''}`}><span className="numbers__category-lastprice">200 000 ₽</span> 1 000 ₽/мес</p>
                                            : <></>

                                    }

                                </div>
                                <div className="numbers__category-container">
                                    <button type='button' className={`numbers__category numbers__category_with-name ${darkTheme ? 'numbers__category_dark' : ''}  ${selectedNumbersOpen ? '' : selectedCategory === 'Бриллиантовый' ? ' numbers__category_briliant_active' : ''}`} onClick={() => handleCategoryChange('Бриллиантовый')} >
                                        <p className={`numbers__category-name ${darkTheme ? 'numbers__category-name_dark' : ''} ${selectedNumbersOpen ? '' : selectedCategory === 'Бриллиантовый' ? ' numbers__category-name_active' : ''}`}>Бриллиантовый</p>
                                    </button>
                                    {
                                        selectedNumbersOpen ? '' : selectedCategory === 'Бриллиантовый' ?
                                            <p className={`numbers__category-price ${darkTheme ? 'numbers__category-price_dark' : ''}`}><span className="numbers__category-lastprice">500 000 ₽</span> 1 500 ₽/мес</p>
                                            : <></>

                                    }

                                </div>
                            </div>
                            {selectedNumbersOpen ? <></> :
                                <div className="numbers__page-buttons">
                                    {page > 1 ?
                                        <button onClick={() => {
                                            if (page > 1) {
                                                setPage(page - 1)
                                            }
                                        }} type='button' className={`numbers__page-button ${darkTheme ? 'numbers__page-button_dark' : ''}`}>

                                            <svg className={`numbers__arrow-icon`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                            </svg>

                                        </button>
                                        :
                                        <button type='button' className={`numbers__page-button numbers__page-button_inactive ${darkTheme ? 'numbers__page-button_dark' : ''}`}>

                                            <svg className={`numbers__arrow-icon`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                            </svg>

                                        </button>
                                    }
                                    {inputValue === '' && allNumbers && allNumbers.length > 0 && selectedCategoryID === 'all' && page < Math.ceil(allNumbers.length / itemsPerPage) ?
                                        <button onClick={() => {
                                            if (inputValue === '' && allNumbers && allNumbers.length > 0 && selectedCategoryID === 'all' && page < Math.ceil(allNumbers.length / itemsPerPage)) {
                                                setPage(page + 1)
                                            }
                                        }} type='button' className={`numbers__page-button ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                            <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                            </svg>
                                        </button>
                                        : inputValue === '' && selectedCategoryID === 'all' && <button type='button' className={`numbers__page-button numbers__page-button_inactive ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                            <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                            </svg>
                                        </button>
                                    }
                                    {inputValue !== '' && filteredNumbers && filteredNumbers.length > 0 && selectedCategoryID === 'all' && page < Math.ceil(filteredNumbers.length / itemsPerPage) ?
                                        <button onClick={() => {
                                            if (inputValue !== '' && filteredNumbers && filteredNumbers.length > 0 && selectedCategoryID === 'all' && page < Math.ceil(filteredNumbers.length / itemsPerPage)) {
                                                setPage(page + 1)
                                            }
                                        }} type='button' className={`numbers__page-button ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                            <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                            </svg>
                                        </button>
                                        : inputValue !== '' && selectedCategoryID === 'all' && <button type='button' className={`numbers__page-button numbers__page-button_inactive ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                            <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                            </svg>
                                        </button>
                                    }
                                    {inputValue !== '' && filteredNumbers && filteredNumbers.length > 0 && selectedCategoryID !== 'all' && page < Math.ceil(filteredNumbers.length / itemsPerPage) ?
                                        <button onClick={() => {
                                            if (inputValue !== '' && filteredNumbers && filteredNumbers.length > 0 && selectedCategoryID !== 'all' && page < Math.ceil(filteredNumbers.length / itemsPerPage)) {
                                                setPage(page + 1)
                                            }
                                        }} type='button' className={`numbers__page-button ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                            <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                            </svg>
                                        </button>
                                        : inputValue !== '' && selectedCategoryID !== 'all' && <button type='button' className={`numbers__page-button numbers__page-button_inactive ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                            <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                            </svg>
                                        </button>
                                    }
                                    {inputValue === '' && filteredNumbers && selectedCategoryID !== 'all' && page < Math.ceil(filteredNumbers.length / itemsPerPage) ?
                                        <button onClick={() => {
                                            if (inputValue === '' && filteredNumbers && filteredNumbers.length > 0 && selectedCategoryID !== 'all' && page < Math.ceil(filteredNumbers.length / itemsPerPage)) {
                                                setPage(page + 1)
                                            }
                                        }} type='button' className={`numbers__page-button ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                            <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                            </svg>
                                        </button>
                                        : inputValue === '' && selectedCategoryID !== 'all' && <button type='button' className={`numbers__page-button numbers__page-button_inactive ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                            <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                            </svg>
                                        </button>
                                    }

                                </div>
                            }


                        </div>
                        {
                            selectedNumbersOpen ?
                                <>
                                    <div className='numbers__selected'>
                                        {selectedNumbers && selectedNumbers.length > 0 ? selectedNumbers.map((item, i) => (
                                            <div key={item.ctn + 'selected-pc'} className={`numbers__selected-number`}>
                                                <p className={`numbers__selected-number-text ${(item.category === 1) ? 'numbers__selected-number-text_bronz' : ''} ${(item.category === 2) ? 'numbers__selected-number-text_silver' : ''} ${(item.category === 3 || item.category === 4 || item.category === 5) ? 'numbers__selected-number-text_gold' : ''} ${(item.category === 6) ? 'numbers__selected-number-text_platina' : ''} ${(item.category === 9) ? 'numbers__selected-number-text_briliant' : ''}`}>{`${item && item.ctn && item.ctn.substring(0, 3)} ${item && item.ctn && item.ctn.substring(3, 6)} `}{`${item && item.ctn && item.ctn.substring(6, 8)} ${item && item.ctn && item.ctn.substring(8, 10)}`}</p>
                                                <div className={`numbers__selected-number-prices`}>
                                                    <p className={`numbers__selected-number-lastprice`}>{`${(item.category === 1) ? '1 000 ₽' : ''} ${(item.category === 2) ? '5 000 ₽' : ''} ${(item.category === 3 || item.category === 4 || item.category === 5) ? '35 000 ₽' : ''} ${(item.category === 6) ? '200 000 ₽' : ''} ${(item.category === 9) ? '500 000 ₽' : ''}`}</p>
                                                    <p className={`numbers__selected-number-price ${darkTheme ? 'numbers__selected-price_dark' : ''}`}>{`${(item.category === 1) ? 'Бесплатно' : ''} ${(item.category === 2) ? '300 ₽/мес' : ''} ${(item.category === 3 || item.category === 4 || item.category === 5) ? '500 ₽/мес' : ''} ${(item.category === 6) ? '1000 ₽/мес' : ''} ${(item.category === 9) ? '1500 ₽/мес' : ''}`}</p>
                                                </div>
                                                <div onClick={() => handleItemDelite(item)} className={`numbers__selected-number-trash`}>
                                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clipPath="url(#clip0)">
                                                            <path d="M20.7257 7.29688C21.2218 7.29688 21.5659 6.79527 21.3798 6.33528C20.7192 4.70211 19.1169 3.54688 17.2497 3.54688H16.3866C16.0647 1.84658 14.5739 0.5 12.7497 0.5H11.2497C9.42669 0.5 7.93494 1.84569 7.61286 3.54688H6.74971C4.88249 3.54688 3.28021 4.70211 2.6196 6.33528C2.43355 6.79527 2.77757 7.29688 3.27374 7.29688H20.7257ZM11.2497 1.90625H12.7497C13.7763 1.90625 14.6477 2.59691 14.941 3.54688H9.05839C9.35174 2.59691 10.2231 1.90625 11.2497 1.90625Z" fill="#FF0202" />
                                                            <path d="M5.20513 22.5404C5.28337 23.6393 6.2076 24.5 7.30916 24.5H16.6898C17.7914 24.5 18.7156 23.6393 18.7939 22.5404L19.7793 8.70312H4.21973L5.20513 22.5404ZM13.9223 12.4649C13.9417 12.077 14.2724 11.7779 14.6596 11.7978C15.0475 11.8172 15.3462 12.1473 15.3268 12.5351L14.9518 20.0351C14.933 20.411 14.6223 20.7031 14.2501 20.7031C13.8452 20.7031 13.5273 20.3645 13.5472 19.9649L13.9223 12.4649ZM9.33941 11.7978C9.72674 11.7783 10.0574 12.0771 10.0768 12.4649L10.4518 19.9649C10.4717 20.3647 10.1535 20.7031 9.74891 20.7031C9.37673 20.7031 9.06604 20.411 9.04724 20.0351L8.67224 12.5351C8.65288 12.1473 8.95157 11.8172 9.33941 11.7978Z" fill="#FF0202" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0">
                                                                <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>

                                                </div>
                                            </div>

                                        )) : <></>}

                                    </div>

                                    <p className={`numbers__selected-fullprice ${darkTheme ? 'numbers__selected-price_dark' : ''}`}>Итого: {fullPrice} ₽</p>


                                </>
                                :
                                <div className='numbers__contacts'>
                                    {preloaderVisible ? <Loader /> : apiError ? <p className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''}`}>{apiError}</p> :

                                        <NumbersTablePages
                                            darkTheme={darkTheme}
                                            page={page}
                                            preloaderVisible={preloaderVisible}
                                            inputValue={inputValue}
                                            allNumbers={allNumbers}
                                            selectedCategoryID={selectedCategoryID}
                                            filteredNumbers={filteredNumbers}
                                            numbers={numbers}
                                            itemsPerPage={itemsPerPage}
                                            handleCtnClick={handleCtnClick}
                                            setHoveredNumber={setHoveredNumber}
                                            hoveredNumber={hoveredNumber}
                                            selectedNumbers={selectedNumbers} />
                                    }

                                </div>
                        }

                        <button onClick={handleSubmit} type="button" className={`numbers__submit-button  ${selectedNumbers && selectedNumbers.length > 0 ? "numbers__submit-button_active" : "numbers__submit-button_disabled"} `} disabled={selectedNumbers && selectedNumbers.length > 0 ? false : true}>{selectedNumbers.length > 0 ? `Оформить номера ${selectedNumbers.length}/5` : 'Выберите номера'}</button>
                    </form>
                </>

                : selectedButton === "все" &&
                <div className="numbers-for-mobile">
                    <h2 className={`numbers__title ${darkTheme ? 'numbers__title_dark' : ''}`}>Выберите до пяти номеров<br />или <span onClick={() => {
                    history.push(':перенести')
                    setSelectedButton('перенести')
                }} className='numbers__title_link'>переходите со своим</span></h2>
                    <p onClick={() => { if (selectedNumbers && selectedNumbers.length > 0) setSelectedNumbersOpen(!selectedNumbersOpen) }} className={`numbers__selected-numbers-button ${darkTheme ? 'numbers__selected-numbers-button_dark' : ''}`}>{selectedNumbers && selectedNumbers.length === 0 ? 'Ничего не выбрано' : selectedNumbersOpen ? 'Вернуться к поиску' : 'Посмотреть выбраные номера'}</p>
                    <div className="numbers-for-mobile__inputs">
                        <div className={`numbers__input-container ${isInputFocused ? "numbers__input-container_focused" : ''}`}>
                            <img className="numbers__input-search-icon" src={searchIcon_black} alt="Иконка поиска" />

                            <input onBlur={handleFocus} onFocus={handleFocus} className="numbers__input" name="number" type="text" value={inputValue} onChange={handleInputChange} placeholder='Поиск номера' maxLength="10"></input>

                        </div>
                        <div onClick={handeleCategoryOpen} className={`numbers-for-mobile__select-button`}>
                            {selectedCategory === "Все" ? <h2 className={`numbers-for-mobile__select-button-category`}>Все</h2> : <></>}
                            {selectedCategory === "Бронзовый" ? <h2 className={`numbers-for-mobile__select-button-category numbers-for-mobile__select-button-category_bronz`}>Бронзовый</h2> : <></>}
                            {selectedCategory === "Серебряный" ? <h2 className={`numbers-for-mobile__select-button-category numbers-for-mobile__select-button-category_silver`}>Серебряный</h2> : <></>}
                            {selectedCategory === "Золотой" ? <h2 className={`numbers-for-mobile__select-button-category numbers-for-mobile__select-button-category_gold`}>Золотой</h2> : <></>}
                            {selectedCategory === "Платиновый" ? <h2 className={`numbers-for-mobile__select-button-category numbers-for-mobile__select-button-category_platina`}>Платиновый</h2> : <></>}
                            {selectedCategory === "Бриллиантовый" ? <h2 className={`numbers-for-mobile__select-button-category numbers-for-mobile__select-button-category_briliant`}>Бриллиантовый</h2> : <></>}
                            <svg className={`numbers-for-mobile__select-button-tick ${isSelectCategoryOpen ? 'numbers-for-mobile__select-button-tick_rotated' : ''}`} width="21" height="12" viewBox="0 0 21 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 7V8H9V7H7Z" fill={darkTheme ? '#fff' : '#010101'} />
                            </svg>
                            <div className={`numbers-for-mobile__select-items ${isSelectCategoryOpen ? 'numbers-for-mobile__select-items_visible' : ''} ${darkTheme ? 'numbers-for-mobile__select-items_dark' : ''}`}>
                                {selectedCategory === 'Все' ? <></> : <p onClick={() => handleCategoryChange('Все')} className={`numbers-for-mobile__select-item ${darkTheme ? 'numbers-for-mobile__select-item_dark' : ''}`}>Все</p>}
                                {selectedCategory === 'Бронзовый' ? <></> : <p onClick={() => handleCategoryChange('Бронзовый')} className={`numbers-for-mobile__select-item numbers-for-mobile__select-button-category_bronz ${darkTheme ? 'numbers-for-mobile__select-item_dark' : ''}`}>Бронзовый</p>}
                                {selectedCategory === 'Серебряный' ? <></> : <p onClick={() => handleCategoryChange('Серебряный')} className={`numbers-for-mobile__select-item numbers-for-mobile__select-button-category_silver ${darkTheme ? 'numbers-for-mobile__select-item_dark' : ''}`}>Серебряный</p>}
                                {selectedCategory === 'Золотой' ? <></> : <p onClick={() => handleCategoryChange('Золотой')} className={`numbers-for-mobile__select-item numbers-for-mobile__select-button-category_gold ${darkTheme ? 'numbers-for-mobile__select-item_dark' : ''}`}>Золотой</p>}
                                {selectedCategory === 'Платиновый' ? <></> : <p onClick={() => handleCategoryChange('Платиновый')} className={`numbers-for-mobile__select-item numbers-for-mobile__select-button-category_platina ${darkTheme ? 'numbers-for-mobile__select-item_dark' : ''}`}>Платиновый</p>}
                                {selectedCategory === 'Бриллиантовый' ? <></> : <p onClick={() => handleCategoryChange('Бриллиантовый')} className={`numbers-for-mobile__select-item numbers-for-mobile__select-button-category_briliant${darkTheme ? 'numbers-for-mobile__select-item_dark' : ''}`}>Бриллиантовый</p>}

                            </div>
                        </div>
                    </div>
                    {selectedNumbersOpen ? <></> : <button onClick={handleSubmit} type="button" className={`numbers__submit-button  ${maxLengthError ? 'numbers__contact_error' : ''} ${selectedNumbers && selectedNumbers.length > 0 ? "numbers__submit-button_active" : "numbers__submit-button_disabled"} `} disabled={selectedNumbers && selectedNumbers.length > 0 ? false : true}>{selectedNumbers.length > 0 ? `Оформить номера ${selectedNumbers.length}/5` : 'Выберите номера'}</button>}
                    {selectedNumbersOpen ?
                        <>
                            <div className='numbers__selected'>
                                {selectedNumbers && selectedNumbers.length > 0 ? selectedNumbers.map((item, i) => (
                                    <div key={item.ctn + 'selected-mobile'} className={`numbers__selected-number`}>
                                        <p className={`numbers__selected-number-text ${(item.category === 1) ? 'numbers__selected-number-text_bronz' : ''} ${(item.category === 2) ? 'numbers__selected-number-text_silver' : ''} ${(item.category === 3 || item.category === 4 || item.category === 5) ? 'numbers__selected-number-text_gold' : ''} ${(item.category === 6) ? 'numbers__selected-number-text_platina' : ''} ${(item.category === 9) ? 'numbers__selected-number-text_briliant' : ''}`}>{`${item && item.ctn && item.ctn.substring(0, 3)} ${item && item.ctn && item.ctn.substring(3, 6)} `}{`${item && item.ctn && item.ctn.substring(6, 8)} ${item && item.ctn && item.ctn.substring(8, 10)}`}</p>
                                        <div className={`numbers__selected-number-prices`}>
                                            <p className={`numbers__selected-number-lastprice`}>{`${(item.category === 1) ? '1 000 ₽' : ''} ${(item.category === 2) ? '5 000 ₽' : ''} ${(item.category === 3 || item.category === 4 || item.category === 5) ? '35 000 ₽' : ''} ${(item.category === 6) ? '200 000 ₽' : ''} ${(item.category === 9) ? '500 000 ₽' : ''}`}</p>
                                            <p className={`numbers__selected-number-price ${darkTheme ? 'numbers__selected-price_dark' : ''}`}>{`${(item.category === 1) ? 'Бесплатно' : ''} ${(item.category === 2) ? '300 ₽/мес' : ''} ${(item.category === 3 || item.category === 4 || item.category === 5) ? '500 ₽/мес' : ''} ${(item.category === 6) ? '1000 ₽/мес' : ''} ${(item.category === 9) ? '1500 ₽/мес' : ''}`}</p>
                                        </div>
                                        <div onClick={() => handleItemDelite(item)} className={`numbers__selected-number-trash`}>
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0)">
                                                    <path d="M20.7257 7.29688C21.2218 7.29688 21.5659 6.79527 21.3798 6.33528C20.7192 4.70211 19.1169 3.54688 17.2497 3.54688H16.3866C16.0647 1.84658 14.5739 0.5 12.7497 0.5H11.2497C9.42669 0.5 7.93494 1.84569 7.61286 3.54688H6.74971C4.88249 3.54688 3.28021 4.70211 2.6196 6.33528C2.43355 6.79527 2.77757 7.29688 3.27374 7.29688H20.7257ZM11.2497 1.90625H12.7497C13.7763 1.90625 14.6477 2.59691 14.941 3.54688H9.05839C9.35174 2.59691 10.2231 1.90625 11.2497 1.90625Z" fill="#FF0202" />
                                                    <path d="M5.20513 22.5404C5.28337 23.6393 6.2076 24.5 7.30916 24.5H16.6898C17.7914 24.5 18.7156 23.6393 18.7939 22.5404L19.7793 8.70312H4.21973L5.20513 22.5404ZM13.9223 12.4649C13.9417 12.077 14.2724 11.7779 14.6596 11.7978C15.0475 11.8172 15.3462 12.1473 15.3268 12.5351L14.9518 20.0351C14.933 20.411 14.6223 20.7031 14.2501 20.7031C13.8452 20.7031 13.5273 20.3645 13.5472 19.9649L13.9223 12.4649ZM9.33941 11.7978C9.72674 11.7783 10.0574 12.0771 10.0768 12.4649L10.4518 19.9649C10.4717 20.3647 10.1535 20.7031 9.74891 20.7031C9.37673 20.7031 9.06604 20.411 9.04724 20.0351L8.67224 12.5351C8.65288 12.1473 8.95157 11.8172 9.33941 11.7978Z" fill="#FF0202" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0">
                                                        <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                        </div>
                                    </div>

                                )) : <></>}

                            </div>

                            <p className={`numbers__selected-fullprice  ${darkTheme ? 'numbers__selected-price_dark' : ''}`}>Итого: {fullPrice} ₽</p>
                            <button onClick={handleSubmit} type="button" className={`numbers__submit-button-inselect  ${selectedNumbers && selectedNumbers.length > 0 ? "numbers__submit-button_active" : "numbers__submit-button_disabled"} `} disabled={selectedNumbers && selectedNumbers.length > 0 ? false : true}>{selectedNumbers.length > 0 ? `Оформить номера ${selectedNumbers.length}/5` : 'Выберите номера'}</button>

                        </> :
                        <NumbersMobile
                            selectedCategoryID={selectedCategoryID}
                            inputValue={inputValue}
                            selectedNumbers={selectedNumbers}
                            handleCtnClick={handleCtnClick}

                        />

                    }
                </div>}
        </>
    )
}
