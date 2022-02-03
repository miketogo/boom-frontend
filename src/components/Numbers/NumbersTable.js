import React, { useContext } from 'react';
import { GlobalContext } from '../../App';
import numbers_cart from '../../assets/images/numbers-cart.svg'
import numbers_tick from '../../assets/images/numbers-tick.svg'
import './Numbers.css';


export default function NumbersTable(props) {
    const { darkTheme } = useContext(GlobalContext);
    const [maxLengthError, setMaxLengthError] = React.useState(false);
    return (
        <div onClick={() => {
            if (props.selectedNumbers && props.selectedNumbers.length === 5){
                if (props.selectedNumbers.filter((itm)=>{
                    if (itm === props.item) return true
                    return false
                }).length > 0){
                    props.handleCtnClick(props.item)
                } else {
                    setMaxLengthError(true)
                    
                    setTimeout(setMaxLengthError, 300, false)
                }
                
                
            } else {
                props.handleCtnClick(props.item)
            }
            
        }} onMouseEnter={() => props.setHoveredNumber(props.item)} onMouseLeave={() => props.setHoveredNumber(null)} className='numbers-for-main__number-container'>
            <p key={props.i} className={`numbers__contact ${maxLengthError ? 'numbers__contact_error' : ''} ${darkTheme ? 'numbers__contact_dark' : ''}`}>{`${props.item && props.item.ctn && props.item.ctn.substring(0, 3)} ${props.item && props.item.ctn && props.item.ctn.substring(3, 6)} `}{`${props.item && props.item.ctn && props.item.ctn.substring(6, 8)} ${props.item && props.item.ctn && props.item.ctn.substring(8, 10)}`}</p>
            <div className={`numbers__cart-bg ${darkTheme ? 'numbers__cart-bg_dark' : ''} ${(props.hoveredNumber && props.hoveredNumber.ctn && props.item.ctn === props.hoveredNumber.ctn) ?  props.selectedNumbers && props.selectedNumbers.length === 5 ? '' : 'numbers__cart-bg_hoverd' : ''} ${props.selectedNumbers && props.selectedNumbers.length > 0 &&  props.selectedNumbers.filter((itm) => {
                if (itm.ctn !== null &&  props.item.ctn === itm.ctn) {
                    return itm
                } return false
            }).length !== 0 ? 'numbers__cart-bg_selected' : ''}`}>
                <img className={`numbers__cart ${ darkTheme ? 'numbers__cart_dark' : ''} ${( props.hoveredNumber &&  props.hoveredNumber.ctn &&  props.item.ctn ===  props.hoveredNumber.ctn) ? 'numbers__cart_hoverd' : ''} ${ props.selectedNumbers &&  props.selectedNumbers.length > 0 &&  props.selectedNumbers.filter((itm) => {
                    if (itm.ctn !== null &&  props.item.ctn === itm.ctn) {
                        return itm
                    } return false
                }).length !== 0 ? 'numbers__cart_selected' : ''}`} src={ props.selectedNumbers &&  props.selectedNumbers.length > 0 &&  props.selectedNumbers.filter((itm) => {
                    if (itm.ctn !== null &&  props.item.ctn === itm.ctn) {
                        return itm
                    } return false
                }).length !== 0 ?  numbers_tick :  numbers_cart} alt="Купить" />
            </div>

        </div>
    )

}
