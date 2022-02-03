import React, { useContext } from 'react';
import { GlobalContext } from '../../App';
import Loader from '../../globals/Loader/index'
import { GetNumbers } from '../../globals/utils'
import numbers_cart from '../../assets/images/numbers-cart.svg'
import numbers_tick from '../../assets/images/numbers-tick.svg'
import './Numbers.css';


export default function NumbersMobile(props) {
    let { darkTheme } = useContext(GlobalContext);
    darkTheme =  props.darkTheme ? props.darkTheme.val : darkTheme;
    const [preloaderVisible, setPreloaderVisible] = React.useState(true);
    const [apiError, setApiError] = React.useState('');
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


                for (let i = 0; i < numbers.length - 1; i++) {

                    if (numbers[i].category === 1 && numbers.filter((item) => {
                        if (item.ctn) {
                            if (item.category === 1) {
                                return true
                            }
                            return false
                        }
                        return false
                    }).length > 0) {

                        // numbersByCategories.category_bronz 
                        setNumbersByCategories(numbersByCategories => ({
                            ...numbersByCategories,
                            category_bronz: [...numbersByCategories.category_bronz, numbers[i]]
                        }))

                    }
                    if (numbers[i].category === 2 && numbers.filter((item) => {
                        if (item.ctn) {
                            if (item.category === 2) {
                                return true
                            }
                            return false
                        }
                        return false
                    }).length > 0) {

                        // numbersByCategories.category_bronz 
                        setNumbersByCategories(numbersByCategories => ({
                            ...numbersByCategories,
                            category_silver: [...numbersByCategories.category_silver, numbers[i]]
                        }))

                    }
                    if ((numbers[i].category === 3 || numbers[i].category === 4 || numbers[i].category === 5) && numbers.filter((item) => {
                        if (item.ctn) {
                            if ((numbers[i].category === 3 || numbers[i].category === 4 || numbers[i].category === 5)) {
                                return true
                            }
                            return false
                        }
                        return false
                    }).length > 0) {

                        // numbersByCategories.category_bronz 
                        setNumbersByCategories(numbersByCategories => ({
                            ...numbersByCategories,
                            category_gold: [...numbersByCategories.category_gold, numbers[i]]
                        }))

                    }
                    if (numbers[i].category === 6 && numbers.filter((item) => {
                        if (item.ctn) {
                            if (numbers[i].category === 6) {
                                return true
                            }
                            return false
                        }
                        return false
                    }).length > 0) {

                        // numbersByCategories.category_bronz 
                        setNumbersByCategories(numbersByCategories => ({
                            ...numbersByCategories,
                            category_plat: [...numbersByCategories.category_plat, numbers[i]]
                        }))

                    }
                    if (numbers[i].category === 9 && numbers.filter((item) => {
                        if (item.ctn) {
                            if (numbers[i].category === 9) {
                                return true
                            }
                            return false
                        }
                        return false
                    }).length > 0) {

                        // numbersByCategories.category_bronz 
                        setNumbersByCategories(numbersByCategories => ({
                            ...numbersByCategories,
                            category_briliant: [...numbersByCategories.category_briliant, numbers[i]]
                        }))

                    }
                }

                setPreloaderVisible(false)
            }

        }).catch((err) => {
            setPreloaderVisible(false)
            setApiError('Что то пошло не так')
            console.log(err)
        })

    }, [])
    const [bronzPage, setBronzPage] = React.useState(1);
    const [silverPage, setSilverPage] = React.useState(1);
    const [goldPage, setGoldPage] = React.useState(1);
    const [platinaPage, setPlatinaPage] = React.useState(1);
    const [briliantPage, setBriliantPage] = React.useState(1);
    React.useEffect(() => {
        setBriliantPage(1)
        setPlatinaPage(1)
        setGoldPage(1)
        setSilverPage(1)
        setBronzPage(1)
    }, [props.inputValue])

    const [numbersByCategories, setNumbersByCategories] = React.useState({
        category_bronz: [],
        category_silver: [],
        category_gold: [],
        category_plat: [],
        category_briliant: []

    });

    return (
        <>
            {preloaderVisible ?
                <div className={`loader`}>
                    <Loader />
                </div>

                : apiError ? <p className={`numbers__contact ${darkTheme ? 'numbers__contact_dark' : ''}`}>{apiError}</p> :
                    <>
                        {props.selectedCategoryID === 'all' || props.selectedCategoryID === 1 ?
                            <div className={`numbers__table-mobile`}>
                                <div className={`numbers__table-mobile-titles`}>
                                    <h2 className={`numbers__table-mobile-name numbers__table-mobile-name_bronz`}>Бронзовый</h2>
                                    <div className={`numbers__table-mobile-prices`}>
                                        <p className={`numbers__table-mobile-lastprice`}>1 000 ₽</p>
                                        <p className={`numbers__table-mobile-price ${darkTheme? 'numbers__table-mobile-price_dark': ''}`}>Бесплатно</p>
                                    </div>
                                </div>
                                {numbersByCategories && numbersByCategories.category_bronz.length !== 0 && numbersByCategories.category_bronz.filter((item) => {
                                    if (item.ctn.includes(props.inputValue)) return true

                                    return false
                                }).length !== 0 ? numbersByCategories.category_bronz.filter((item) => {
                                    if (item.ctn.includes(props.inputValue)) return true

                                    return false
                                }).slice((bronzPage - 1) * 5, bronzPage * 5).map((item, i) => (
                                    <div key={item.ctn + 'mobile'} onClick={() =>  props.handleCtnClick(item)} className={`numbers__table-mobile-number`}>
                                        <p className={`numbers__table-mobile-number_text ${darkTheme? 'numbers__table-mobile-number_text_dark': ''}`}>{`${item && item.ctn && item.ctn.substring(0, 3)} ${item && item.ctn && item.ctn.substring(3, 6)} `}{`${item && item.ctn && item.ctn.substring(6, 8)} ${item && item.ctn && item.ctn.substring(8, 10)}`}</p>
                                        <div className={`numbers__table-mobile-cart ${props.selectedNumbers && props.selectedNumbers.length > 0 && props.selectedNumbers.filter((itm) => {
                                            if (itm.ctn !== null && item.ctn === itm.ctn) {
                                                return itm
                                            } return false
                                        }).length !== 0 ? 'numbers__table-mobile-cart_selected' : ''}`}>
                                            <img className={`numbers__table-mobile-cart-icon`} src={props.selectedNumbers && props.selectedNumbers.length > 0 && props.selectedNumbers.filter((itm) => {
                                                if (itm.ctn !== null && item.ctn === itm.ctn) {
                                                    return itm
                                                } return false
                                            }).length !== 0 ? numbers_tick : numbers_cart} alt="Купить"></img>
                                        </div>
                                    </div>

                                ))

                                    : <p className={`numbers__table-mobile-number_error ${darkTheme? 'numbers__table-mobile-number_text_dark': ''}`}>{numbersByCategories.category_bronz.length === 0 ? 'Нет в наличии' : numbersByCategories.category_bronz.filter((item) => {
                                        if (item.ctn.includes(props.inputValue)) return true

                                        return false
                                    }).length === 0 ? 'Ничего не найдено' : ''}</p>}
                                <div className={`numbers__table-mobile-page-btns`}>
                                    {bronzPage > 1 ?
                                        <button onClick={() => setBronzPage(bronzPage - 1)} type='button' className={`numbers__page-button ${darkTheme ? 'numbers__page-button_dark' : ''}`}>

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

                                        </button>}


                                    {numbersByCategories && numbersByCategories.category_bronz && numbersByCategories.category_bronz.length !== 0 ?
                                        numbersByCategories.category_bronz.filter((item) => {
                                            if (item.ctn.includes(props.inputValue)) return item
                                            return false
                                        }).slice((bronzPage - 1) * 5).length <= 5 ?

                                            <button type='button' className={`numbers__page-button numbers__page-button_inactive ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                                <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                </svg>
                                            </button>
                                            :
                                            <button onClick={() => setBronzPage(bronzPage + 1)} type='button' className={`numbers__page-button ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                                <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                </svg>
                                            </button>
                                        : <button type='button' className={`numbers__page-button numbers__page-button_inactive ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                            <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                            </svg>
                                        </button>}

                                </div>
                            </div>
                            : <></>}


                        {props.selectedCategoryID === 'all' || props.selectedCategoryID === 2 ?
                            <div className={`numbers__table-mobile`}>
                                <div className={`numbers__table-mobile-titles`}>
                                    <h2 className={`numbers__table-mobile-name numbers__table-mobile-name_silver`}>Серебряный</h2>
                                    <div className={`numbers__table-mobile-prices`}>
                                        <p className={`numbers__table-mobile-lastprice`}>5 000 ₽</p>
                                        <p className={`numbers__table-mobile-price ${darkTheme? 'numbers__table-mobile-price_dark': ''}`}>300 ₽/мес</p>
                                    </div>
                                </div>
                                {numbersByCategories && numbersByCategories.category_silver.length !== 0 && numbersByCategories.category_silver.filter((item) => {
                                    if (item.ctn.includes(props.inputValue)) return true

                                    return false
                                }).length !== 0 ? numbersByCategories.category_silver.filter((item) => {
                                    if (item.ctn.includes(props.inputValue)) return true

                                    return false
                                }).slice((silverPage - 1) * 5, silverPage * 5).map((item, i) => (
                                    <div key={item.ctn + 'mobile'} onClick={() =>  props.handleCtnClick(item)} className={`numbers__table-mobile-number`}>
                                        <p className={`numbers__table-mobile-number_text ${darkTheme? 'numbers__table-mobile-number_text_dark': ''}`}>{`${item && item.ctn && item.ctn.substring(0, 3)} ${item && item.ctn && item.ctn.substring(3, 6)} `}{`${item && item.ctn && item.ctn.substring(6, 8)} ${item && item.ctn && item.ctn.substring(8, 10)}`}</p>
                                        <div className={`numbers__table-mobile-cart ${props.selectedNumbers && props.selectedNumbers.length > 0 && props.selectedNumbers.filter((itm) => {
                                            if (itm.ctn !== null && item.ctn === itm.ctn) {
                                                return itm
                                            } return false
                                        }).length !== 0 ? 'numbers__table-mobile-cart_selected' : ''}`}>
                                            <img className={`numbers__table-mobile-cart-icon`} src={props.selectedNumbers && props.selectedNumbers.length > 0 && props.selectedNumbers.filter((itm) => {
                                                if (itm.ctn !== null && item.ctn === itm.ctn) {
                                                    return itm
                                                } return false
                                            }).length !== 0 ? numbers_tick : numbers_cart} alt="Купить"></img>
                                        </div>
                                    </div>

                                ))

                                    : <p className={`numbers__table-mobile-number_error ${darkTheme? 'numbers__table-mobile-number_text_dark': ''}`}>{numbersByCategories.category_silver.length === 0 ? 'Нет в наличии' : numbersByCategories.category_silver.filter((item) => {
                                        if (item.ctn.includes(props.inputValue)) return true

                                        return false
                                    }).length === 0 ? 'Ничего не найдено' : ''}</p>}
                                <div className={`numbers__table-mobile-page-btns`}>
                                    {silverPage > 1 ?
                                        <button onClick={() => setSilverPage(silverPage - 1)} type='button' className={`numbers__page-button ${darkTheme ? 'numbers__page-button_dark' : ''}`}>

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

                                        </button>}


                                    {numbersByCategories && numbersByCategories.category_silver && numbersByCategories.category_silver.length !== 0 ?
                                        numbersByCategories.category_silver.filter((item) => {
                                            if (item.ctn.includes(props.inputValue)) return item
                                            return false
                                        }).slice((silverPage - 1) * 5).length <= 5 ?

                                            <button type='button' className={`numbers__page-button numbers__page-button_inactive ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                                <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                </svg>
                                            </button>
                                            :
                                            <button onClick={() => setSilverPage(silverPage + 1)} type='button' className={`numbers__page-button ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                                <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                </svg>
                                            </button>
                                        : <button type='button' className={`numbers__page-button numbers__page-button_inactive ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                            <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                            </svg>
                                        </button>}

                                </div>
                            </div>
                            : <></>}

                        {props.selectedCategoryID === 'all' || props.selectedCategoryID === 3 ?
                            <div className={`numbers__table-mobile`}>
                                <div className={`numbers__table-mobile-titles`}>
                                    <h2 className={`numbers__table-mobile-name numbers__table-mobile-name_gold`}>Золотой</h2>
                                    <div className={`numbers__table-mobile-prices`}>
                                        <p className={`numbers__table-mobile-lastprice`}>35 000 ₽</p>
                                        <p className={`numbers__table-mobile-price ${darkTheme? 'numbers__table-mobile-price_dark': ''}`}>500 ₽/мес</p>
                                    </div>
                                </div>
                                {numbersByCategories && numbersByCategories.category_gold.length !== 0 && numbersByCategories.category_gold.filter((item) => {
                                    if (item.ctn.includes(props.inputValue)) return true

                                    return false
                                }).length !== 0 ? numbersByCategories.category_gold.filter((item) => {
                                    if (item.ctn.includes(props.inputValue)) return true

                                    return false
                                }).slice((goldPage - 1) * 5, goldPage * 5).map((item, i) => (
                                    <div key={item.ctn + 'mobile'} onClick={() =>  props.handleCtnClick(item)} className={`numbers__table-mobile-number`}>
                                        <p className={`numbers__table-mobile-number_text ${darkTheme? 'numbers__table-mobile-number_text_dark': ''}`}>{`${item && item.ctn && item.ctn.substring(0, 3)} ${item && item.ctn && item.ctn.substring(3, 6)} `}{`${item && item.ctn && item.ctn.substring(6, 8)} ${item && item.ctn && item.ctn.substring(8, 10)}`}</p>
                                        <div className={`numbers__table-mobile-cart ${props.selectedNumbers && props.selectedNumbers.length > 0 && props.selectedNumbers.filter((itm) => {
                                            if (itm.ctn !== null && item.ctn === itm.ctn) {
                                                return itm
                                            } return false
                                        }).length !== 0 ? 'numbers__table-mobile-cart_selected' : ''}`}>
                                            <img className={`numbers__table-mobile-cart-icon`} src={props.selectedNumbers && props.selectedNumbers.length > 0 && props.selectedNumbers.filter((itm) => {
                                                if (itm.ctn !== null && item.ctn === itm.ctn) {
                                                    return itm
                                                } return false
                                            }).length !== 0 ? numbers_tick : numbers_cart} alt="Купить"></img>
                                        </div>
                                    </div>

                                ))

                                    : <p className={`numbers__table-mobile-number_error ${darkTheme? 'numbers__table-mobile-number_text_dark': ''}`}>{numbersByCategories.category_gold.length === 0 ? 'Нет в наличии' : numbersByCategories.category_gold.filter((item) => {
                                        if (item.ctn.includes(props.inputValue)) return true

                                        return false
                                    }).length === 0 ? 'Ничего не найдено' : ''}</p>}
                                <div className={`numbers__table-mobile-page-btns`}>
                                    {goldPage > 1 ?
                                        <button onClick={() => setGoldPage(goldPage - 1)} type='button' className={`numbers__page-button ${darkTheme ? 'numbers__page-button_dark' : ''}`}>

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

                                        </button>}


                                    {numbersByCategories && numbersByCategories.category_gold && numbersByCategories.category_gold.length !== 0 ?
                                        numbersByCategories.category_gold.filter((item) => {
                                            if (item.ctn.includes(props.inputValue)) return item
                                            return false
                                        }).slice((goldPage - 1) * 5).length <= 5 ?

                                            <button type='button' className={`numbers__page-button numbers__page-button_inactive ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                                <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                </svg>
                                            </button>
                                            :
                                            <button onClick={() => setGoldPage(goldPage + 1)} type='button' className={`numbers__page-button ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                                <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                </svg>
                                            </button>
                                        : <button type='button' className={`numbers__page-button numbers__page-button_inactive ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                            <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                            </svg>
                                        </button>}

                                </div>
                            </div>
                            : <></>}

                        {props.selectedCategoryID === 'all' || props.selectedCategoryID === 6 ?
                            <div className={`numbers__table-mobile`}>
                                <div className={`numbers__table-mobile-titles`}>
                                    <h2 className={`numbers__table-mobile-name numbers__table-mobile-name_platina`}>Платиновый</h2>
                                    <div className={`numbers__table-mobile-prices`}>
                                        <p className={`numbers__table-mobile-lastprice`}>200 000 ₽</p>
                                        <p className={`numbers__table-mobile-price ${darkTheme? 'numbers__table-mobile-price_dark': ''}`}>1000 ₽/мес</p>
                                    </div>
                                </div>
                                {numbersByCategories && numbersByCategories.category_plat.length !== 0 && numbersByCategories.category_plat.filter((item) => {
                                    if (item.ctn.includes(props.inputValue)) return true

                                    return false
                                }).length !== 0 ? numbersByCategories.category_plat.filter((item) => {
                                    if (item.ctn.includes(props.inputValue)) return true

                                    return false
                                }).slice((platinaPage - 1) * 5, platinaPage * 5).map((item, i) => (
                                    <div key={item.ctn + 'mobile'} onClick={() =>  props.handleCtnClick(item)} className={`numbers__table-mobile-number`}>
                                        <p className={`numbers__table-mobile-number_text ${darkTheme? 'numbers__table-mobile-number_text_dark': ''}`}>{`${item && item.ctn && item.ctn.substring(0, 3)} ${item && item.ctn && item.ctn.substring(3, 6)} `}{`${item && item.ctn && item.ctn.substring(6, 8)} ${item && item.ctn && item.ctn.substring(8, 10)}`}</p>
                                        <div className={`numbers__table-mobile-cart ${props.selectedNumbers && props.selectedNumbers.length > 0 && props.selectedNumbers.filter((itm) => {
                                            if (itm.ctn !== null && item.ctn === itm.ctn) {
                                                return itm
                                            } return false
                                        }).length !== 0 ? 'numbers__table-mobile-cart_selected' : ''}`}>
                                            <img className={`numbers__table-mobile-cart-icon`} src={props.selectedNumbers && props.selectedNumbers.length > 0 && props.selectedNumbers.filter((itm) => {
                                                if (itm.ctn !== null && item.ctn === itm.ctn) {
                                                    return itm
                                                } return false
                                            }).length !== 0 ? numbers_tick : numbers_cart} alt="Купить"></img>
                                        </div>
                                    </div>

                                ))

                                    : <p className={`numbers__table-mobile-number_error ${darkTheme? 'numbers__table-mobile-number_text_dark': ''}`}>{numbersByCategories.category_plat.length === 0 ? 'Нет в наличии' : numbersByCategories.category_plat.filter((item) => {
                                        if (item.ctn.includes(props.inputValue)) return true

                                        return false
                                    }).length === 0 ? 'Ничего не найдено' : ''}</p>}
                                <div className={`numbers__table-mobile-page-btns`}>
                                    {platinaPage > 1 ?
                                        <button onClick={() => setPlatinaPage(platinaPage - 1)} type='button' className={`numbers__page-button ${darkTheme ? 'numbers__page-button_dark' : ''}`}>

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

                                        </button>}


                                    {numbersByCategories && numbersByCategories.category_plat && numbersByCategories.category_plat.length !== 0 ?
                                        numbersByCategories.category_plat.filter((item) => {
                                            if (item.ctn.includes(props.inputValue)) return item
                                            return false
                                        }).slice((platinaPage - 1) * 5).length <= 5 ?

                                            <button type='button' className={`numbers__page-button numbers__page-button_inactive ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                                <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                </svg>
                                            </button>
                                            :
                                            <button onClick={() => setPlatinaPage(platinaPage + 1)} type='button' className={`numbers__page-button ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                                <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                </svg>
                                            </button>
                                        : <button type='button' className={`numbers__page-button numbers__page-button_inactive ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                            <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                            </svg>
                                        </button>}

                                </div>
                            </div>
                            : <></>}

                        {props.selectedCategoryID === 'all' || props.selectedCategoryID === 9 ?
                            <div className={`numbers__table-mobile`}>
                                <div className={`numbers__table-mobile-titles`}>
                                    <h2 className={`numbers__table-mobile-name numbers__table-mobile-name_briliant`}>Бриллиантовый</h2>
                                    <div className={`numbers__table-mobile-prices`}>
                                        <p className={`numbers__table-mobile-lastprice`}>500 000 ₽</p>
                                        <p className={`numbers__table-mobile-price ${darkTheme? 'numbers__table-mobile-price_dark': ''}`}>1500 ₽/мес</p>
                                    </div>
                                </div>
                                {numbersByCategories && numbersByCategories.category_briliant.length !== 0 && numbersByCategories.category_briliant.filter((item) => {
                                    if (item.ctn.includes(props.inputValue)) return true

                                    return false
                                }).length !== 0 ? numbersByCategories.category_briliant.filter((item) => {
                                    if (item.ctn.includes(props.inputValue)) return true

                                    return false
                                }).slice((briliantPage - 1) * 5, briliantPage * 5).map((item, i) => (
                                    <div key={item.ctn + 'mobile'} onClick={() =>  props.handleCtnClick(item)} className={`numbers__table-mobile-number`}>
                                        <p className={`numbers__table-mobile-number_text ${darkTheme? 'numbers__table-mobile-number_text_dark': ''}`}>{`${item && item.ctn && item.ctn.substring(0, 3)} ${item && item.ctn && item.ctn.substring(3, 6)} `}{`${item && item.ctn && item.ctn.substring(6, 8)} ${item && item.ctn && item.ctn.substring(8, 10)}`}</p>
                                        <div className={`numbers__table-mobile-cart ${props.selectedNumbers && props.selectedNumbers.length > 0 && props.selectedNumbers.filter((itm) => {
                                            if (itm.ctn !== null && item.ctn === itm.ctn) {
                                                return itm
                                            } return false
                                        }).length !== 0 ? 'numbers__table-mobile-cart_selected' : ''}`}>
                                            <img className={`numbers__table-mobile-cart-icon`} src={props.selectedNumbers && props.selectedNumbers.length > 0 && props.selectedNumbers.filter((itm) => {
                                                if (itm.ctn !== null && item.ctn === itm.ctn) {
                                                    return itm
                                                } return false
                                            }).length !== 0 ? numbers_tick : numbers_cart} alt="Купить"></img>
                                        </div>
                                    </div>

                                ))

                                    : <p className={`numbers__table-mobile-number_error ${darkTheme? 'numbers__table-mobile-number_text_dark': ''}`}>{numbersByCategories.category_briliant.length === 0 ? 'Нет в наличии' : numbersByCategories.category_briliant.filter((item) => {
                                        if (item.ctn.includes(props.inputValue)) return true

                                        return false
                                    }).length === 0 ? 'Ничего не найдено' : ''}</p>}
                                <div className={`numbers__table-mobile-page-btns`}>
                                    {briliantPage > 1 ?
                                        <button onClick={() => setBriliantPage(briliantPage - 1)} type='button' className={`numbers__page-button ${darkTheme ? 'numbers__page-button_dark' : ''}`}>

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

                                        </button>}


                                    {numbersByCategories && numbersByCategories.category_briliant && numbersByCategories.category_briliant.length !== 0 ?
                                        numbersByCategories.category_briliant.filter((item) => {
                                            if (item.ctn.includes(props.inputValue)) return item
                                            return false
                                        }).slice((briliantPage - 1) * 5).length <= 5 ?

                                            <button type='button' className={`numbers__page-button numbers__page-button_inactive ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                                <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                </svg>
                                            </button>
                                            :
                                            <button onClick={() => setBriliantPage(briliantPage + 1)} type='button' className={`numbers__page-button ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                                <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                </svg>
                                            </button>
                                        : <button type='button' className={`numbers__page-button numbers__page-button_inactive ${darkTheme ? 'numbers__page-button_dark' : ''}`}>
                                            <svg width="24" height="24" className={`numbers__arrow-icon numbers__arrow-icon_right`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.61852 12L11.5544 18.7297L10.2452 20L2 12L10.2452 4L11.5545 5.27033L4.61852 12Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.26773 12.8981H22V11.1016H3.26773V12.8981Z" fill={`${darkTheme ? '#FFF' : '#1F1F1F'}`} />
                                            </svg>
                                        </button>}

                                </div>
                            </div>
                            : <></>}
                    </>}
        </>
    )

}
