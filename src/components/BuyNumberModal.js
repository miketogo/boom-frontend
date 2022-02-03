import { useContext, useEffect, useMemo, useState} from 'react'
import { CgClose, CgInfinity } from 'react-icons/cg'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { BsArrowLeft } from 'react-icons/bs'
import { FaCheckCircle } from 'react-icons/fa'
import styled from 'styled-components/macro'
import ReactDOM from 'react-dom'
import { GlobalContext } from '../App'
import SimCardInfo from './SimCardInfo'
import { motion } from 'framer-motion'
import { memo } from 'react'
import { useEscapeKey } from '../hooks'
import { useDispatch } from 'react-redux'
import { CATEGORIES, HIDE_MODAL, tariffTypesArray } from '../globals/utils';
import { FourGSwitch, switchTypes } from '../globals/TariffCard'
// import Cleave from 'cleave.js/react';
import NumbersMobile from './Numbers/NumbersMobile'
import searchIcon_black from '../assets/images/search-black.svg'
import { OrderService, OrderTariff, OrderTariffAddPD, BuyNumbersAddPD, BuyNumbers, sendMetriс } from '../globals/utils'
import Preloader from '../globals/Loader/index'
import PasportData from './PasportData/PasportData'

const Wrapper = styled(motion.div)`
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    min-height: 100vh;
    z-index: 20;
    display: flex;
    align-items: ${({ submit, service }) => (submit || service) && "center"};
    justify-content: center;
    overflow-y: scroll;
    
    &::-webkit-scrollbar {
        width: 0;
    }
`
const Centered = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 20px;

`
const Close = styled.span`
    position: absolute;
    top: 28px;
    right: 40px;
    cursor: pointer;
    @media(max-width: 960px) {
        top: 12px;
        right: 12px;
    }
`
const Modal = styled.div`
    background-color: white;
    position: relative;
    width: 800px;
    max-width: 100%;
    height: fit-content;
    padding: 28px 40px 32px;
    font-size: 24px;
    border-radius: 32px;
    margin: 20px;
    @media(max-width: 601px) {
        padding: 16px 16px 100px 16px;
    }
    @media(max-width: 736px) {
        margin: 10px;
    }
    & h1 {
        font-family: Circe, Arial, sans-serif;
        font-weight: bold;
        font-size: 32px;
        @media(max-width: 601px) {
            margin-top: 40px;
            font-size: 28px;
        }
    }
    & .options {
        display: flex;
        align-items: center;
        gap: 12px;
        @media(max-width: 960px) {
            font-size: 16px;
        }
        @media(max-width: 601px) {
            flex-wrap: wrap;
        }
    }
    & .options.first {
        @media(max-width: 601px) {
            flex-direction: column;
            align-items: flex-start;
        }
    }
    section {
        margin-bottom: 44px;
        p {
            font-family: Circe, Arial, sans-serif;
            font-size: 20px;
            margin-bottom: 15px; 
            color: inherit;
        }
        :nth-of-type(2n){
            margin-bottom: 64px;
        }
    }
    .выберете_номер {
        font-size: 20px;
    }
    .popup-tarif__hint{
        font-family: Circe,Arial,sans-serif;
font-size: 20px;
margin-bottom: 15px;
color: inherit;
    }
    .выберете_номер .input {
        width: 300px;
        height: 50px;
        border-radius: 13px;
        padding: 0 15px;
        margin-right: 16px;
        outline: none;
        transition:  border-color 0.3s ease-in-out;
        border: 2px solid rgba(1, 1, 1, 0.16);
        font-weight: 500;
        font-family: Circe;
        :active, :focus {
            border-color: #0E5EF8;
        }
        @media(max-width: 736px) {
            width: 100%;
        }
        @media(max-width: 601px) {
            margin-bottom: 16px;
        }
    }
    .выберете_номер button {
        height: 50px;
        width: 176px;
        border-radius: 13px;
        border: none;
        cursor: pointer;
        background: #0E5EF8;
        color: #fff;
        font-weight: 500;
        @media(max-width: 736px) {
            width: 100%;
        }
    }
    .ModalNumbers {
        display: flex;
        flex-direction: column;
        gap: 12px;
        .buyNumbersDropdown {
            display: flex;
            gap: 8px;
            align-items: center;
        }
        .buyNumbersDropdown.alignTop {
            align-items: flex-start;
            & > svg {
                margin-top: 24px;
            }
        }
    }
    .goBack {
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        font-weight: 500;
        font-size: 24px;
    }
    .showNumbers-top {
        width: fit-content;
        margin: 10px auto;
    }
    .servicesModal {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        span {
            font-family: Circe, Arial, sans-serif;
            font-size: 20px;
            color: #010101AD;
        }
        h2 {
            font-family: Circe, Arial, sans-serif;
            margin-bottom: 24px;
            font-size: 32px;
            font-weight: bold;

            @media(max-width: 601px) {
                font-size: 28px;
            }
        }
    }
`

const Option = styled.span`
    padding: 19.5px 16px;
    border: 3px solid ${({ selected, idx }) => selected === idx ? "#0E5EF8" : "rgba(1, 1, 1, 0.16)"};
    border-radius: 12px;
    cursor: pointer;
    &.first {
        @media(max-width: 736px) {
            width: 100%;
            text-align: center;
            font-family: Circe, Arial, sans-serif;
            font-size: 16px;
        }
        
    }
`

const Switches = styled.span`
    display: flex;
    align-items: stretch;
    font-size: 20px;
    line-height: 29px;
    font-family: Circe, Arial, sans-serif;
    width: 70%;
    @media(max-width: 736px) {
        font-size: 16px;
        width: 100%;
    }
`

const DownArrow = ({ classname }) => (<svg className={classname} width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 7V8H9V7H7Z" fill='#010101' />
</svg>);

export const spacer = (number) => `${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 8)} ${number.slice(8, 10)}`

const NumbersDropDown = memo(({ setShowNumbers, inputNumber, setInputNumber, selectedCategoryID, setSelectedCategoryID }) => {
    const [isSelectCategoryOpen, setIsSelectCategoryOpen] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);
    function handleCategoryChange(e, category) {
        e.stopPropagation();
        setIsSelectCategoryOpen(false);
        setSelectedCategoryID(category);
    }
    return (
        <div className="showNumbers-top">
            <div onClick={() => setShowNumbers(false)} className="goBack"><BsArrowLeft /> Назад</div>
            <div className="numbers-for-mobile__inputs modal">
                <div className={`numbers__input-container ${isInputFocused ? "numbers__input-container_focused" : ''}`}>
                    <img className="numbers__input-search-icon" src={searchIcon_black} alt="Иконка поиска" />
                    <input onBlur={() => setIsInputFocused(false)} onFocus={() => setIsInputFocused(true)} className="numbers__input" name="number" type="text" value={inputNumber} onChange={({ target }) => setInputNumber(target.value)} placeholder='Поиск номера' maxLength="10"></input>
                </div>
                <div onClick={() => setIsSelectCategoryOpen(val => !val)} className={`numbers-for-mobile__select-button`}>
                    {selectedCategoryID === "all" ? <h2 className={`numbers-for-mobile__select-button-category`}>Все</h2> : <></>}
                    {selectedCategoryID === 1 ? <h2 className={`numbers-for-mobile__select-button-category numbers-for-mobile__select-button-category_bronz`}>Бронзовый</h2> : <></>}
                    {selectedCategoryID === 2 ? <h2 className={`numbers-for-mobile__select-button-category numbers-for-mobile__select-button-category_silver`}>Серебряный</h2> : <></>}
                    {selectedCategoryID === 3 ? <h2 className={`numbers-for-mobile__select-button-category numbers-for-mobile__select-button-category_gold`}>Золотой</h2> : <></>}
                    {selectedCategoryID === 6 ? <h2 className={`numbers-for-mobile__select-button-category numbers-for-mobile__select-button-category_platina`}>Платиновый</h2> : <></>}
                    {selectedCategoryID === 9 ? <h2 className={`numbers-for-mobile__select-button-category numbers-for-mobile__select-button-category_briliant`}>Бриллиантовый</h2> : <></>}
                    <svg className={`numbers-for-mobile__select-button-tick ${isSelectCategoryOpen ? 'numbers-for-mobile__select-button-tick_rotated' : ''}`} width="21" height="12" viewBox="0 0 21 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 7V8H9V7H7Z" />
                    </svg>
                    {selectedCategoryID === 'all' ? <></> : <p onClick={(e) => handleCategoryChange(e, 'all')} className={`numbers-for-mobile__select-item`}>Все</p>}
                    {<div className={`numbers-for-mobile__select-items ${isSelectCategoryOpen ? 'numbers-for-mobile__select-items_visible' : ''}`}>
                        {selectedCategoryID === 1 ? <></> : <p onClick={(e) => handleCategoryChange(e, 1)} className={`numbers-for-mobile__select-item numbers-for-mobile__select-button-category_bronz`}>Бронзовый</p>}
                        {selectedCategoryID === 2 ? <></> : <p onClick={(e) => handleCategoryChange(e, 2)} className={`numbers-for-mobile__select-item numbers-for-mobile__select-button-category_silver`}>Серебряный</p>}
                        {selectedCategoryID === 3 ? <></> : <p onClick={(e) => handleCategoryChange(e, 3)} className={`numbers-for-mobile__select-item numbers-for-mobile__select-button-category_gold`}>Золотой</p>}
                        {selectedCategoryID === 6 ? <></> : <p onClick={(e) => handleCategoryChange(e, 6)} className={`numbers-for-mobile__select-item numbers-for-mobile__select-button-category_platina`}>Платиновый</p>}
                        {selectedCategoryID === 9 ? <></> : <p onClick={(e) => handleCategoryChange(e, 9)} className={`numbers-for-mobile__select-item numbers-for-mobile__select-button-category_brilian`}>Бриллиантовый</p>}
                    </div>}
                </div>
            </div>
        </div>
    )
})

const Thanks = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .thanksTop {
        margin-top: 24px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 12px;
        .thanksTitle{
            margin: 0;
            font-family: Circe;
            font-style: normal;
            font-weight: bold;
            font-size: 32px;
            line-height: 130%;
            color: #010101;
            @media(max-width: 736px) {
                font-size: 27px;
            }
        }
    }
    .thanksBody {
        font-family: Circe;
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        line-height: 130%;
        margin-bottom: 24px;
        color: rgba(1, 1, 1, 0.68);
        @media(max-width: 736px) {
            font-size: 16px;
        }
    }
    button {
        background: #010101;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 300px;
        height: 60px;
        border-radius: 60px;
        border: none;
        color: white;
        cursor: pointer;
        @media(max-width: 736px) {
            width: 100%;
        }
    }
`
const ThankYouModal = () => {
    const dispatch = useDispatch();
    return (
        <Thanks>
            <div className="thanksTop">
                <h2 className="thanksTitle">Спасибо за заявку</h2>
                <FaCheckCircle size={32} color="#79FFD7" />
            </div>
            <span className="thanksBody">Мы с вами свяжемся в ближайшее время</span>
            <button onClick={() => dispatch({ type: HIDE_MODAL })}>Хорошо</button>
        </Thanks>
    )
}

const ErrorModal = () => {
    const dispatch = useDispatch();
    return (
        <Thanks>
            <div className="thanksTop">
                <h2 className="thanksTitle">Что-то пошло не так</h2>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM7.29289 7.29289C7.68342 6.90237 8.31658 6.90237 8.70711 7.29289L16 14.5858L23.2929 7.29289C23.6834 6.90237 24.3166 6.90237 24.7071 7.29289C25.0976 7.68342 25.0976 8.31658 24.7071 8.70711L17.4142 16L24.7071 23.2929C25.0976 23.6834 25.0976 24.3166 24.7071 24.7071C24.3166 25.0976 23.6834 25.0976 23.2929 24.7071L16 17.4142L8.70711 24.7071C8.31658 25.0976 7.68342 25.0976 7.29289 24.7071C6.90237 24.3166 6.90237 23.6834 7.29289 23.2929L14.5858 16L7.29289 8.70711C6.90237 8.31658 6.90237 7.68342 7.29289 7.29289Z" fill="#FF0202" />
                </svg>

            </div>
            <span className="thanksBody">Попробуйте оставить заявку снова</span>
            <button onClick={() => dispatch({ type: HIDE_MODAL })}>Хорошо</button>
        </Thanks>
    )
}

const GarbageCan = styled(RiDeleteBin6Fill)`
    cursor: pointer;
    min-width: 24px;
    min-height: 24px;
    &:hover {
        color: #FF0202;
    }
`;
const Dropdown = styled.div`    
    border: ${({ selected }) => selected && "2px solid #4B75FC"};
    background: #fff;
    border-radius: 14px;
    height: fit-content;
    width: ${({ buy }) => buy ? "100%" : "300px"};
    max-width: 100%;
    margin-bottom: ${({ buy }) => buy || "44px"};
    padding: 12px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 10px;
    @media(max-width: 736px) {
        width: 100%;
    }
    img.tariffIcon {
        width: 24px;
        height: 24px;
    }
    .top {
        display: flex;
        gap: 10px;
        align-items: flex-end;
        font-size: 20px;
        font-weight: bold;
        svg.tariffsDropIcon {
            margin-bottom: 9px;
            transform: ${({ drop }) => drop && "rotate(180deg)"};
            transition: ease 0.3s;
            position: static;
        }
    }
    .bottom {
        font-size: 20px;
        color: black;
        @media(max-width: 450px) {
            font-size: 17px;
        }
    }
    .bottom.first {
        color: ${({ selected }) => selected ? "#4B75FC" : "#010101AD"};
    }
    .dropdown {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        width: 100%;
        .bottom {
            padding-bottom: 20px;
        }
        .dropDownSwitches {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 7px;
            width: 100%;
        }
    }
`
const BuyNumbersDropdownStyles = styled.div`
    width: 600px;
    padding: 10px;
    border: 3px solid ${({ selectedTariff }) => (typeof selectedTariff === "number") ? "#4B75FC" : "#FF0202"};
    border-radius: 12px;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    background: #F8F8F8;
    position: relative;
    padding: 16px 12px;
    cursor: pointer;
    img.tariffIcon {
        width: 24px;
        height: 24px;
    }
    svg.dropIcon {
        position: absolute;
        transform: ${({ toggleOpen }) => toggleOpen && "rotate(180deg)"};
        transition: ease 0.3s;
        top: 16px;
        right: 12px;
    }
    .top {
        display: flex;
        align-items: center;
        gap: 13px 8px;
        flex-wrap: wrap;
        .ctn {
            margin-right: 5px;
        }
        .badge {
            background: ${({ bg }) => bg};
            padding: 8px;
            font-size: 12px;
            line-height: 14px;
            font-weight: 400;
            border-radius: 30px;
            font-weight: bold;
            height: fit-content;
        }
        .prices {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            font-weight: 700;
            font-size: 14px;
            del {
                color: #FF0202;
                font-weight: normal;
            }
        }
    }
    .body {
        margin-top: 13px;
        display: grid;
        grid-gap: 13px;
        grid-template-columns: 1fr 1fr;
        @media(max-width: 450px) {
            grid-template-columns: 1fr;
        }
    }
    @media(max-width: 800px) {
        width: 100%;
    }
`

const TariffsDropDown = memo(({ setSelectedTariffOBJ, modalPosition, selected = true, setModalPosition, tariff, buy, handleOpen, setSelectedTariff, drop, number, setBoughtNumbers, dropDownPosition, setDropDownPosition, localSwitches, setLocalSwitches }) => {
    const handleChoose = (e, index) => {
       
        if (buy) {
            setSelectedTariffOBJ(tariff)
            setSelectedTariff()
            setDropDownPosition(index);
        } else { 
           
            setModalPosition(index) 
        
        }
    }

    // const prevSwitches = usePrevious(localSwitches);
    useEffect(() => {
        if (buy) {
            setLocalSwitches(obj => ({
                ...obj,
                "Безлимитный 4G": tariff.positions[dropDownPosition]["Безлимитный 4G"] ? false : obj["Безлимитный 4G"],
                "Раздача интернета": tariff.positions[dropDownPosition]["Раздача интернета"] ? false : obj["Раздача интернета"],
            }))
        }
    }, [dropDownPosition, setLocalSwitches, tariff.positions, buy])


    useEffect(() => {
        if (buy && selected) {
            const fourG = localSwitches["Безлимитный 4G"] ? 150 : 0;
            const modem = localSwitches["Раздача интернета"] ? 50 : 0;
            const price = tariff.price + CATEGORIES[number.category].price + fourG + modem;
            setBoughtNumbers(boughtNumbers => ({
                ...boughtNumbers,
                [number.ctn]: {
                    ...number,
                    tariffName: tariff.title,
                    tariffOptions: `${tariff.positions[dropDownPosition].min} мин, ${tariff.positions[dropDownPosition].gb === Infinity ? "Безлимит" : tariff.positions[dropDownPosition].gb} гб, ${tariff.positions[dropDownPosition].sms} смс`,
                    ...localSwitches,
                    price,
                }
            }))
        }
    }, [setBoughtNumbers, localSwitches, number, tariff, selected, buy, dropDownPosition])

    return (
        <Dropdown buy={buy} selected={selected} drop={drop} onClick={handleOpen}>
            <span className="top">
                <img className="tariffIcon" alt="tariffIcon" src={tariff.icon} />
                {tariff.title}
                <DownArrow classname="tariffsDropIcon" />
            </span>
            <span className="bottom first">
                <span>{tariff.positions[buy ? dropDownPosition : modalPosition].min}мин , </span>
                <span>{tariff.positions[buy ? dropDownPosition : modalPosition].gb === Infinity ? <CgInfinity /> : tariff.positions[buy ? dropDownPosition : modalPosition].gb}гб , </span>
                <span>{tariff.positions[buy ? dropDownPosition : modalPosition].sms}смс</span>
            </span>
            {drop &&
                <div className="dropdown">
                    {tariff.positions.map((position, index) => (
                        <span key={index} onClick={(e) => handleChoose(e, index)} className="bottom">
                            <span>{position.min}мин , </span>
                            <span>{position.gb === Infinity ? <CgInfinity /> : position.gb}гб , </span>
                            <span>{position.sms}смс</span>
                        </span>
                    ))}
                    {buy && <div className="dropDownSwitches">
                        {switchTypes.map(title => <FourGSwitch key={title} buy={buy} modal={true} checked={localSwitches[title]} setSwitches={setLocalSwitches} title={title} price={tariff.positions[dropDownPosition][title]} />)}
                    </div>}
                </div>}
        </Dropdown>
    )
})




const BuyNumbersDropdown = memo(({ toggleOpen, setToggleOpen, modalPosition, setModalPosition, number, buy, setBoughtNumbers, setDeletedNumbers }) => {
    const category = CATEGORIES[number.category]
    const [dropDownPosition, setDropDownPosition] = useState(
        tariffTypesArray.slice(category.exclude).reduce((total, tariff) => ({ ...total, [tariff.title]: 0 }), {})
    );
    const [localSwitches, setLocalSwitches] = useState({ "Безлимитный 4G": false, "Раздача интернета": false })

    const [clickedTariff, setClickedTariff] = useState(null);
    const [selectedTariff, setSelectedTariff] = useState(null);
    const [selectedTariffOBJ, setSelectedTariffOBJ] = useState(null);
    const handleOpen = (index) => {
        if (index === clickedTariff) setClickedTariff(null)
        else { setClickedTariff(index) }
    }

    // useEffect(() => {
    //     console.log(selectedTariffOBJ)
    // }, [selectedTariffOBJ])

    return (
        <div className={`buyNumbersDropdown ${toggleOpen ? 'alignTop' : ''}`} >
            <BuyNumbersDropdownStyles selectedTariff={selectedTariff} bg={category.bg} toggleOpen={toggleOpen} onClick={setToggleOpen}>
                <DownArrow classname="dropIcon" />
                <span className="top">
                    {(selectedTariffOBJ !== null) ? <img className="tariffIcon" alt="tariffIcon" src={selectedTariffOBJ.icon} /> : null}
                    <span className="ctn">{spacer(number.ctn)}</span>
                    <span className="badge">{category.name}</span>
                    <span className="prices">
                        <del>{category.prevPrice} ₽</del>
                        {category.price ? category.price + " ₽/мес" : "Бесплатно!"}
                    </span>
                </span>
                {toggleOpen && <div onClick={(e) => e.stopPropagation()} className="body">
                    {tariffTypesArray.slice(category.exclude).map((tariff, index) =>
                        <TariffsDropDown setSelectedTariffOBJ={setSelectedTariffOBJ} selected={selectedTariff === index} drop={clickedTariff === index} setSelectedTariff={() => setSelectedTariff(index)} handleOpen={() => handleOpen(index)} buy={buy} key={tariff.title} modalPosition={modalPosition} setModalPosition={setModalPosition} tariff={tariff} setBoughtNumbers={setBoughtNumbers} number={number} dropDownPosition={dropDownPosition[[tariff.title]]} setDropDownPosition={(position) => setDropDownPosition(values => ({ ...values, [tariff.title]: position }))} localSwitches={localSwitches} setLocalSwitches={setLocalSwitches} />
                    )}
                </div>}
            </BuyNumbersDropdownStyles>
            <GarbageCan onClick={() => setDeletedNumbers(numbers => [...numbers, number.ctn])} />
        </div>
    )
})

const options = ["Купить новую SIM", "Перенести номер в BOOM"]
export default memo(function BuyNumberModal({ numbers, buy, payload, userIP }) {
    const { darkTheme } = useContext(GlobalContext);
    const [selectedOption, setSelectedOption] = useState(0);
    const [stage, setStage] = useState(0);
    const [deletedNumbers, setDeletedNumbers] = useState([]);
    const [showPreloader, setShowPreloader] = useState(false);
    // const [showCodePreloader, setShowCodePreloader] = useState(false);
    const [showNumbers, setShowNumbers] = useState(false);
    const [chosenNumber, setChosenNumber] = useState({});
    const [inputNumber, setInputNumber] = useState("");
    const [orderId, setOrderId] = useState("");
    // const [userCode, setUserCode] = useState("");
    const { position, tariffId, service, switches, toSubmit, ym } = payload;
    const [submit, setSubmit] = useState(toSubmit);
    const [error, setError] = useState(false);
    const [selectedCategoryID, setSelectedCategoryID] = useState("all");
    const dispatch = useDispatch();
    const [modalSwitches, setModalSwitches] = useState(switches);
    const [modalPosition, setModalPosition] = useState(position || 0);
    useEscapeKey(() => dispatch({ type: HIDE_MODAL }));
    const [boughtNumbers, setBoughtNumbers] = useState({});
    const [tariffDropDown, setTariffDropDown] = useState(false);
    const tariff = (typeof tariffId === "number") && tariffTypesArray[tariffId];
    const [enableButton, setEnableButton] = useState(false);
    const [clickedNumber, setClickedNumber] = useState({});


    const openCloseNumbers = (number) => {
        if (number.ctn === clickedNumber.ctn) setClickedNumber({})
        else setClickedNumber(number)
    }

    useEffect(() => {
        setBoughtNumbers(numbers => {
            const rep = numbers;
            for (const ctn in rep) {
                deletedNumbers.includes(ctn) && delete rep[ctn]
            }
            return rep
        })
    }, [deletedNumbers])


    const handleServiceSubmit = (phoneValue) => {
        setShowPreloader(true)
        const inMoscow = localStorage.getItem('InMoscow');
        let utm = {}
        if (localStorage.getItem('utm')) utm = JSON.parse(localStorage.getItem('utm'));

        let utmMarks = {
            utm_content: 'Отсутствует',
            utm_medium: 'Отсутствует',
            utm_source: 'Отсутствует',
            utm_term: 'Отсутствует',
            utm_campaign: 'Отсутствует',
        }
        if (utm) {
            if (utm.utm_content) utmMarks.utm_content = utm.utm_content
            if (utm.utm_medium) utmMarks.utm_medium = utm.utm_medium
            if (utm.utm_source) utmMarks.utm_source = utm.utm_source
            if (utm.utm_term) utmMarks.utm_term = utm.utm_term
            if (utm.utm_campaign) utmMarks.utm_campaign = utm.utm_campaign
        }

        let serviceName = service.eSim ? "Подключение eSim" : service.title.replace(/\s+/g, ' ')
            .replace(/^\s/, '')
            .replace(/\s$/, '');
        let userPhone = phoneValue
        let fromMosсow
        if (inMoscow !== "false") {
            if (inMoscow === null) fromMosсow = "не указано"
            else fromMosсow = "из Москвы"
        } else {
            fromMosсow = "не из Москвы"

        }

        sendMetriс(ym.type, ym.value)
        if (fromMosсow && userPhone && serviceName) {

            OrderService({
                serviceName,
                userPhone,
                fromMosсow,
                userIP,
                utm: JSON.stringify(utmMarks)
            }).then(() => {
                setSubmit(true);
                setShowPreloader(false)
            })
                .catch((err) => {

                    setSubmit(true);
                    setError(true)
                    setShowPreloader(false)
                    console.log(err)
                })
        }

    }

    const handleTariffSubmit = ({
        tariffName,
        tariffOptions,
        unlimitedInternet,
        modem,
        productionMethod,
        selectedNumber,
        deliveryDate,
        deliveryTime,
        deliveryAddress,
        transferredNumber,
        deliveryMethod,
        userPhone
    }) => {
        let utm = {}
        if (localStorage.getItem('utm')) utm = JSON.parse(localStorage.getItem('utm'));

        let utmMarks = {
            utm_content: 'Отсутствует',
            utm_medium: 'Отсутствует',
            utm_source: 'Отсутствует',
            utm_term: 'Отсутствует',
            utm_campaign: 'Отсутствует',
        }
        if (utm) {
            if (utm.utm_content) utmMarks.utm_content = utm.utm_content
            if (utm.utm_medium) utmMarks.utm_medium = utm.utm_medium
            if (utm.utm_source) utmMarks.utm_source = utm.utm_source
            if (utm.utm_term) utmMarks.utm_term = utm.utm_term
            if (utm.utm_campaign) utmMarks.utm_campaign = utm.utm_campaign
        }
        // setShowPreloader(true)
        const inMoscow = localStorage.getItem('InMoscow');
        let fromMosсow
        if (inMoscow !== "false") {
            if (inMoscow === null) fromMosсow = "не указано"
            else fromMosсow = "из Москвы"
        } else {
            fromMosсow = "не из Москвы"

        }
        sendMetriс('reachGoal', 'oformit_tarif_step1')
        OrderTariff({
            tariffName,
            tariffOptions,
            unlimitedInternet,
            modem,
            productionMethod,
            selectedNumber,
            deliveryDate,
            deliveryTime,
            deliveryAddress,
            transferredNumber,
            deliveryMethod,
            userPhone,
            fromMosсow,
            userIP,
            utm: JSON.stringify(utmMarks)
        }).then((res) => {
            setStage(1)
            setShowPreloader(false)
         
            setOrderId(res.id)
            // setSubmit(true);
            // setShowPreloader(false)
        }).catch((err) => {

            setSubmit(true);
            setError(true)
            setShowPreloader(false)
            console.log(err)
        })
    }


    const handleBuySubmit = ({
        deliveryDate,
        deliveryTime,
        deliveryAddress,
        deliveryMethod,
        numbersArray,
        userPhone
    }) => {
        let utm = {}
        if (localStorage.getItem('utm')) utm = JSON.parse(localStorage.getItem('utm'));

        let utmMarks = {
            utm_content: 'Отсутствует',
            utm_medium: 'Отсутствует',
            utm_source: 'Отсутствует',
            utm_term: 'Отсутствует',
            utm_campaign: 'Отсутствует',
        }
        if (utm) {
            if (utm.utm_content) utmMarks.utm_content = utm.utm_content
            if (utm.utm_medium) utmMarks.utm_medium = utm.utm_medium
            if (utm.utm_source) utmMarks.utm_source = utm.utm_source
            if (utm.utm_term) utmMarks.utm_term = utm.utm_term
            if (utm.utm_campaign) utmMarks.utm_campaign = utm.utm_campaign
        }
        // setShowPreloader(true)
        const inMoscow = localStorage.getItem('InMoscow');
        let fromMosсow
        if (inMoscow !== "false") {
            if (inMoscow === null) fromMosсow = "не указано"
            else fromMosсow = "из Москвы"
        } else {
            fromMosсow = "не из Москвы"

        }
        sendMetriс('reachGoal', 'priobretenie_nomera_step1')
        BuyNumbers({
            deliveryDate,
            deliveryTime,
            deliveryAddress,
            deliveryMethod,
            numbersArray,
            userPhone,
            fromMosсow,
            userIP,
            utm: JSON.stringify(utmMarks)
        }).then((res) => {

            setStage(1)
            setShowPreloader(false)
          
            setOrderId(res.id)
        }).catch((err) => {
            setSubmit(true);
            setError(true)
            setShowPreloader(false)
            console.log(err)
        })
    }


    // useEffect(() => {
    //     chosenNumber.ctn && setInputNumber(chosenNumber.ctn)
    // }, [chosenNumber])

    const totalPrice = useMemo(() => {
        if (buy) {
            return Object.values(boughtNumbers).reduce((prev, currentNum) => prev + currentNum.price, 0)
        } else if (tariff) {
            const fourG = modalSwitches["Безлимитный 4G"] ? 150 : 0;
            const modem = modalSwitches["Раздача интернета"] ? 50 : 0;
            const basePrice = tariff.price + fourG + modem;
            return chosenNumber.category ? CATEGORIES[chosenNumber.category].price + basePrice : basePrice
        } else return 0
    }, [boughtNumbers, buy, tariff, chosenNumber, modalSwitches])

    const handleSubmit = (contract) => {
        if (stage === 0) {
            if (buy) {

                let numbersArray = []
                // eslint-disable-next-line no-unused-vars
                for (const [key, value] of Object.entries(boughtNumbers)) {

                    numbersArray = [...numbersArray, value]
                }
                contract = { ...contract, numbersArray }

                handleBuySubmit({
                    deliveryDate: contract.deliveryDate ? contract.deliveryDate : 'none',
                    deliveryTime: contract.deliveryTime ? `${contract.deliveryTime[0]}-${contract.deliveryTime[1]}` : 'none',
                    deliveryAddress: contract.deliveryAddress ? contract.deliveryAddress : 'none',
                    deliveryMethod: contract.deliveryMethod ? contract.deliveryMethod : 'none',
                    numbersArray: contract.numbersArray,
                    userPhone: contract.phoneValue
                })
            } else if (tariff) {


                const selectedNumber = { ...chosenNumber, price: totalPrice }
                contract = {
                    ...contract, tariff, selectedNumber,
                    tariffOptions: `${tariff.positions[modalPosition].min} мин, ${tariff.positions[modalPosition].gb === Infinity ? "Безлимит" : tariff.positions[modalPosition].gb} гб, ${tariff.positions[modalPosition].sms} смс`,
                    productionMethod: options[selectedOption],
                    ...modalSwitches
                }

                handleTariffSubmit({
                    tariffName: tariff.title,
                    tariffOptions: contract.tariffOptions,
                    unlimitedInternet: contract['Безлимитный 4G'],
                    modem: contract['Раздача интернета'],
                    productionMethod: contract.productionMethod,
                    selectedNumber: contract.selectedNumber ? contract.selectedNumber : {},
                    deliveryDate: contract.deliveryDate ? contract.deliveryDate : 'none',
                    deliveryTime: contract.deliveryTime ? `${contract.deliveryTime[0]}-${contract.deliveryTime[1]}` : 'none',
                    deliveryAddress: contract.deliveryAddress ? contract.deliveryAddress : 'none',
                    transferredNumber: contract.phoneValue,
                    deliveryMethod: contract.deliveryMethod ? contract.deliveryMethod : 'none',
                    userPhone: contract.contactPhoneNumber
                })
            } else if (service) {
                handleServiceSubmit(contract.phoneValue)
            }
        } else if (stage === 1) {
            setStage(2)
            // if (buy) {


            // } else if (tariff) {
            //     OrderTariffCheckCode({
            //         order_id: orderId,
            //         code: userCode,
            //     })
            // }
        }



    }

    function addPD({
        lastNameValue,
        firstNameValue,
        patronymic,
        dateOfBirthValue,
        placeOfBirthValue,
        divisionCodeValue = 'Не указано',
        dateOfIssueValue = 'Не указано',
        passportSeriesValue = 'Не указано',
        passportNumberValue = 'Не указано',
        passportSeriesAndNumberValue = 'Не указано',
        whoIssuedPassportValue = 'Не указано',
        fullRegistrationAddressValue = 'Не указано',
        fullFormatedRegistrationAddressValue = 'Не указано',
        dateOfRegistrationValue = 'Не указано',
        citizenshipValue,
    }) {
        let divisionCode
        if (divisionCodeValue === '') divisionCode = 'Не указано'
        else divisionCode = divisionCodeValue

        let dateOfIssue
        if (dateOfIssueValue === '') dateOfIssue = 'Не указано'
        else dateOfIssue = dateOfIssueValue

        let passportSeries
        if (passportSeriesValue === '') passportSeries = 'Не указано'
        else passportSeries = passportSeriesValue

        let passportNumber
        if (passportNumberValue === '') passportNumber = 'Не указано'
        else passportNumber = passportNumberValue

        let whoIssuedPassport
        if (whoIssuedPassportValue === '') whoIssuedPassport = 'Не указано'
        else whoIssuedPassport = whoIssuedPassportValue

        let fullRegistrationAddress
        if (fullRegistrationAddressValue === '') fullRegistrationAddress = 'Не указано'
        else fullRegistrationAddress = fullRegistrationAddressValue

        let fullFormatedRegistrationAddress
        if (fullFormatedRegistrationAddressValue === '') fullFormatedRegistrationAddress = 'Не указано'
        else fullFormatedRegistrationAddress = fullFormatedRegistrationAddressValue

        let dateOfRegistration
        if (dateOfRegistrationValue === '') dateOfRegistration = 'Не указано'
        else dateOfRegistration = dateOfRegistrationValue



        if (tariff) {
            sendMetriс('reachGoal', 'oformit_tarif_step3')
            OrderTariffAddPD({
                order_id: orderId,
                lastName: lastNameValue,
                firstName: firstNameValue,
                patronymic: patronymic,
                dateOfBirth: dateOfBirthValue,
                placeOfBirth: placeOfBirthValue,
                citizenship: citizenshipValue,
                divisionCode: divisionCode,
                dateOfIssue: dateOfIssue,
                passportSeries: passportSeries,
                passportNumber: passportNumber,
                whoIssuedPassport: whoIssuedPassport,
                registrationAddress: fullRegistrationAddress,
                formatedRegistrationAddress: fullFormatedRegistrationAddress,
                dateOfRegistration: dateOfRegistration,
            }).then((res) => {
                setSubmit(true);
               
            })
                .catch((err) => {
                    setError(true)
                    setSubmit(true);

                    console.log(err)
                })
        } else if (buy) {
            sendMetriс('reachGoal', 'priobretenie_nomera_step3')
            BuyNumbersAddPD({
                order_id: orderId,
                lastName: lastNameValue,
                firstName: firstNameValue,
                patronymic: patronymic,
                dateOfBirth: dateOfBirthValue,
                placeOfBirth: placeOfBirthValue,
                citizenship: citizenshipValue,
                divisionCode: divisionCode,
                dateOfIssue: dateOfIssue,
                passportSeries: passportSeries,
                passportNumber: passportNumber,
                whoIssuedPassport: whoIssuedPassport,
                registrationAddress: fullRegistrationAddress,
                formatedRegistrationAddress: fullFormatedRegistrationAddress,
                dateOfRegistration: dateOfRegistration,
            })
                .then((res) => {
                    setSubmit(true);
                   
                })
                .catch((err) => {
                    setError(true)
                    setSubmit(true);

                    console.log(err)
                })
        }
    }
    useEffect(() => {
        if (numbers && numbers.length > 0 && numbers.filter(number => !deletedNumbers.includes(number.ctn)).length === 0) {
            dispatch({ type: HIDE_MODAL })
        }
    }, [numbers, deletedNumbers, dispatch])

    const [codeValue, setCodeValue] = useState('');
    const [codeValidity, setCodeValidity] = useState({});

    function handlePopupClose() {
        setOrderId('')
        setStage(0)
        dispatch({ type: HIDE_MODAL })
    }


    useEffect(() => {
        // if (stage === 0) {
        //     setTimeout(() => {
        //         setStage(1)
        //     }, 3000);
        // }
        if (stage === 1) {
            setTimeout(() => {
                var list = document.getElementById("list");
                list.scrollTo({ top: list.offsetHeight, behavior: 'smooth' });


            }, 100);
        }
        if (stage === 2) {
            setTimeout(() => {
                var list = document.getElementById("list");
                list.scrollTo({ top: 0, behavior: 'smooth' });


            }, 100);

        }

    }, [stage])

    useEffect(() => {
        console.log(chosenNumber)

    }, [chosenNumber])

    useEffect(() => {
        if (showNumbers) {
            setTimeout(() => {
                var list = document.getElementById("list");
                list.scrollTo({ top: 0, behavior: 'smooth' });


            }, 100);
        }
        else if (chosenNumber.ctn) {
            setTimeout(() => {
                var list = document.getElementById("list");
                list.scrollTo({ top: list.offsetHeight / 2, behavior: 'smooth' });


            }, 100);
        }


    }, [showNumbers, chosenNumber.ctn])
    return ReactDOM.createPortal(
        <Wrapper
            id='list'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            submit={submit} service={service}
            onClick={() => handlePopupClose()} darkTheme={darkTheme}>
            <Modal onClick={(e) => { e.stopPropagation(); setClickedNumber({}) }}>
                {showPreloader ? <Centered>
                    <Preloader />
                </Centered> :

                    <>

                        <Close onClick={() => handlePopupClose()}><CgClose strokeWidth={1.5} size={29} /></Close>
                        {submit ?
                            error ? <ErrorModal /> : <ThankYouModal /> :
                            <>
                                {stage === 0 || stage === 1 ?
                                    <>
                                        {showNumbers ?
                                            <>
                                                <NumbersDropDown setShowNumbers={setShowNumbers} inputNumber={inputNumber} setInputNumber={setInputNumber} selectedCategoryID={selectedCategoryID} setSelectedCategoryID={setSelectedCategoryID} />
                                                <NumbersMobile
                                                    selectedCategoryID={selectedCategoryID}
                                                    inputValue={inputNumber}
                                                    selectedNumbers={[chosenNumber]}
                                                    handleCtnClick={(number) => { setChosenNumber(number); setShowNumbers(false) }}
                                                    darkTheme={{ val: false }}
                                                />
                                            </> :
                                            buy ?
                                                <>
                                                    <h1>Оформление заявки на приобретение {numbers.filter(number => !deletedNumbers.includes(number.ctn)).length > 1 ? 'номеров' : 'номера'}</h1>
                                                    <section>
                                                        <p>Выберите тариф и опции для{numbers.filter(number => !deletedNumbers.includes(number.ctn)).length > 1 ? ' каждого' : ''} номера</p>
                                                        <div className="ModalNumbers">
                                                            {numbers.filter(number => !deletedNumbers.includes(number.ctn)).map((number) => (
                                                                <BuyNumbersDropdown key={number.ctn} setBoughtNumbers={setBoughtNumbers} buy={buy} number={number} modalPosition={modalPosition} setModalPosition={setModalPosition} setDeletedNumbers={setDeletedNumbers} toggleOpen={number.ctn === clickedNumber.ctn} setToggleOpen={(e) => { e.stopPropagation(); openCloseNumbers(number) }} />
                                                            ))}
                                                        </div>
                                                    </section>
                                                </>
                                                :
                                                service ?
                                                    <>
                                                        <div className="servicesModal">
                                                            {(service.eSim || <span>Оформление заявки на подключение услуги</span>)}
                                                            <h2>{service.eSim ? "Подключение eSim" : service.title}</h2>
                                                        </div>
                                                    </> :
                                                    <>
                                                        <h1>Оформление заявки на подключение тарифа</h1>
                                                        <p className='popup-tarif__hint'>Выберите опции тарифа</p>
                                                        <TariffsDropDown drop={tariffDropDown} handleOpen={() => setTariffDropDown(val => !val)} setChosenNumber={setChosenNumber} modalPosition={modalPosition} setModalPosition={setModalPosition} tariff={tariff} />
                                                        <section>
                                                            <p>Дополнительные опции</p>
                                                            <Switches>
                                                                {switchTypes.map(title => <FourGSwitch key={title} modal={true} checked={modalSwitches[title]} setSwitches={setModalSwitches} title={title} price={tariff.positions[modalPosition][title]} />)}
                                                            </Switches>
                                                        </section>
                                                        <section>
                                                            <p>Способ подключения</p>
                                                            <div className="options first">
                                                                {options.map((option, idx) => <Option className={`first ${option === 'Перенести номер в BOOM' ? 'option_disabled' : ''}`} key={option} selected={selectedOption} idx={idx} onClick={() => {
                                                                    if (option === "Перенести номер в BOOM") return
                                                                    setSelectedOption(idx)
                                                                }}>{option}</Option>)}
                                                            </div>
                                                        </section>
                                                        {selectedOption === 0 && <section>
                                                            <p>{chosenNumber.ctn ? `Выбранный номер - ${chosenNumber.ctn}` : 'Выберите номер'}</p>
                                                            <div className="выберете_номер">
                                                                {/* {chosenNumber.ctn ? <p>{chosenNumber.ctn}</p> : <></>} */}
                                                                {/* <Cleave className="input" options={{
                                                                    phone: true,
                                                                    phoneRegionCode: 'RU'
                                                                }} type="tel" placeholder="Ваш новый номер" value={inputNumber} onChange={({ target }) => setInputNumber(target.value.replace(" ", ""))} /> */}
                                                                <button onClick={() => setShowNumbers(true)}>{chosenNumber.ctn ? 'Изменить' : 'Найти'}</button>
                                                            </div>
                                                        </section>}
                                                    </>
                                        }
                                        <SimCardInfo codeValue={codeValue} setCodeValue={setCodeValue} setCodeValidity={setCodeValidity} codeValidity={codeValidity} setStage={setStage} orderId={orderId} stage={stage} tariff={tariff} boughtNumbers={boughtNumbers} chosenNumber={chosenNumber} enableButton={enableButton} setEnableButton={setEnableButton} totalPrice={totalPrice} handleSubmit={handleSubmit} selected={buy ? 0 : selectedOption} Option={Option} buy={buy} service={service} />

                                    </>
                                    : <PasportData addPD={addPD} />
                                }

                            </>
                        }
                    </>}

            </Modal>
        </Wrapper>,
        document.getElementById("modal")
    )
})