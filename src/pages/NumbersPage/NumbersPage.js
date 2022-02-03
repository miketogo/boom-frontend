import Numbers from '../../components/Numbers/Numbers'
import { BUY_NUMBER, SHOW_MODAL } from '../../globals/utils'
import { useDispatch } from 'react-redux';
import './NumbersPage.css';
import { TransferNumber, sendMetriс } from '../../globals/utils'


export default function NumbersPage({userIP}) {
    const dispatch = useDispatch();
    function buyNumbers(numbers) {
        sendMetriс('reachGoal','nomer-click')
        dispatch({ type: BUY_NUMBER, numbers })
    }
    
    function transferNumber({ date, transferredNumber, contactNumber }) {
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
        const inMoscow = localStorage.getItem('InMoscow');
        let fromMosсow
        if (inMoscow !== "false") {
            if (inMoscow === null) fromMosсow = "не указано"
            else fromMosсow = "из Москвы"
        } else {
            fromMosсow = "не из Москвы"

        }
        sendMetriс('reachGoal','perenesti_svoy-forma')
        TransferNumber({
                transferDate: date,
                transferredNumber,
                userPhone: contactNumber,
                fromMosсow,
                userIP,
                utm: JSON.stringify(utmMarks)
            }).then((res)=>{
            dispatch({ type: SHOW_MODAL, payload: { toSubmit: true } })
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }
    function buyEsim() {
        sendMetriс('reachGoal','esim-click')
        dispatch({ type: SHOW_MODAL, payload: { service: { eSim: true}, ym:{type:'reachGoal', value:'esim-forma'} } })
    }
    return (
        <>
            <Numbers buyNumbers={buyNumbers} transferNumber={transferNumber} buyEsim={buyEsim} />
        </>
    )
}
