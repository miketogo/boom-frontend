import duck from "../assets/images/duck.png";
import light from "../assets/images/light.png";
import star from "../assets/images/star.png";
import briefcase from "../assets/images/briefcase.png";
import goblet from "../assets/images/goblet.png";
import box from "../assets/images/services/box.png"
import coin from "../assets/images/services/Coin.png"
import Speaker from "../assets/images/services/Speaker.png"
import family from "../assets/images/services/family.png"
import mailbox from "../assets/images/services/mailbox.png"
import radio from "../assets/images/services/radio.png"
import shield from "../assets/images/services/shield.png"
import lock from "../assets/images/services/lock.png"
import firework from "../assets/images/services/firework.png"
import robot from "../assets/images/services/robot 1 blue head.png"
import drum from "../assets/images/services/drum.png"
import umbrella from "../assets/images/services/umbrella.png"
import telescope from "../assets/images/services/telescope.png"
import wifi from "../assets/images/services/wifi.png"
import telephone from "../assets/images/services/telephone.png"
import { spacer } from "../components/BuyNumberModal";
import mtc from '../assets/images/mtc.png';
import beeline from "../assets/images/beeline.png"
import { decode } from "js-base64";


export const BASE_URL = "https://binom.itcmobile.ru/api/json.php";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const GET_PASSWORD = "GET_PASSWORD";
export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";
export const BUY_NUMBER = "BUY_NUMBER";
export const USER = "USER";
export const CREATE_AUTH = "CREATE_AUTH";
export const DELETE_AUTH = "DELETE_AUTH";
export const RESET_ACCESSTOKEN = "RESET_ACCESSTOKEN"

export const CATEGORIES = {
    1: { name: "Бронзовый", bg: "#CD7F32", price: 0, prevPrice: "1000", exclude: 0 },
    2: { name: "Серебряный", bg: "#C0C0C0", price: 300, prevPrice: "5000", exclude: 1 },
    3: { name: "Золотой", bg: "#FFD700", price: 500, prevPrice: "35 000", exclude: 2 },
    4: { name: "Золотой", bg: "#FFD700", price: 500, prevPrice: "35 000", exclude: 2 },
    5: { name: "Золотой", bg: "#FFD700", price: 500, prevPrice: "35 000", exclude: 2 },
    6: { name: "Платиновый", bg: "#e5e4e2", price: 1000, prevPrice: "200 000", exclude: 3 },
    9: { name: "Бриллиантовый", bg: "#D6F7FF", price: 1500, prevPrice: "500 000", exclude: 4 }
}

const getAuth = (accessToken) => {
    if (accessToken) return {
        "Authorization": `Bearer ${accessToken}`
    }
    else return {}
}
export async function Fetcher(body, options = {}) {
    const { accessToken, errorDispatch } = options;
    return fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Client-Id": "7f543b97f8029e1ab7674232318c5bbf",
            ...getAuth(accessToken)
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                if (errorDispatch) {
                    errorDispatch(data.error.message)
                } else {
                    throw data.error
                }
            } else return data.result
        })
        .catch(err => console.warn(err))
}

export const replacePoints = (text) => text.toString().replace(".", ",");
export const percentage = (current, initial) => (current * 100) / initial;

export async function GetNumbers() {
    return fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Client-Id": "7f543b97f8029e1ab7674232318c5bbf",
        },
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "method": "getCtnsForSale",
            "id": 1
        }
        )
    })
        .then(res => res.json())
}

export async function OrderService({ serviceName, userPhone, fromMosсow, utm, userIP }) {
    return fetch('https://boomtele.com/api/order-service/', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "serviceName": serviceName,
            "userPhone": userPhone,
            "fromMosсow": fromMosсow,
            "utm": utm,
            "userIP": userIP,
        }
        )
    })
        .then(res => res.json())
}

export async function TransferNumber({
    transferDate,
    transferredNumber,
    userPhone,
    userIP,
    fromMosсow, utm }) {

    return fetch('https://boomtele.com/api/transfer-number/', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            transferDate,
            transferredNumber,
            userPhone,
            userIP,
            fromMosсow,
            "utm": utm
        }
        )
    })
        .then(res => res.json())
}

export async function OrderTariff({ tariffName,
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
    utm }) {
    return fetch('https://boomtele.com/api/order-tariff/', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
            userIP,
            fromMosсow,
            "utm": utm
        }
        )
    })
        .then(res => res.json())
}

export async function OrderTariffCheckCode({
    code,
    order_id,
}) {
    return fetch('https://boomtele.com/api/order-tariff/check-code', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code,
            order_id,
        }
        )
    })
        .then(res => res.json())
}

export async function OrderTariffGetNewCode({
    order_id,
}) {
    return fetch('https://boomtele.com/api/order-tariff/get-new-code', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            order_id,
        }
        )
    })
        .then(res => res.json())
}

export async function OrderTariffAddPD({
    order_id,
    lastName,
    firstName,
    patronymic,
    dateOfBirth,
    placeOfBirth,
    citizenship,
    divisionCode,
    dateOfIssue,
    passportSeries,
    passportNumber,
    whoIssuedPassport,
    registrationAddress,
    formatedRegistrationAddress,
    dateOfRegistration,
}) {
    return fetch('https://boomtele.com/api/order-tariff/add-passport-data', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            order_id,
            lastName,
            firstName,
            patronymic,
            dateOfBirth,
            placeOfBirth,
            citizenship,
            divisionCode,
            dateOfIssue,
            passportSeries,
            passportNumber,
            whoIssuedPassport,
            registrationAddress,
            formatedRegistrationAddress,
            dateOfRegistration,
        }
        )
    })
        .then(res => res.json())
}


export const parseDetailsFile = (file) => {
    file = file.split("\n").map(line => line.split("\t"));
    const headers = file[0];
    const body = file.slice(1);
    return body.reverse().map(line => line.reduce((obj, col, index) => ({ ...obj, [index === 9 ? "Интернет МБ" : headers[index]]: col }), {}))
}

export async function BuyNumbers({ deliveryDate,
    deliveryTime,
    deliveryAddress,
    deliveryMethod,
    numbersArray,
    userPhone,
    fromMosсow,
    userIP,
    utm }) {
    return fetch('https://boomtele.com/api/buy-numbers/', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            deliveryDate,
            deliveryTime,
            deliveryAddress,
            deliveryMethod,
            numbersArray,
            userPhone,
            userIP,
            fromMosсow,
            "utm": utm
        }
        )
    })
        .then(res => res.json())
}

export async function BuyNumbersCheckCode({
    code,
    order_id,
}) {
    return fetch('https://boomtele.com/api/buy-numbers/check-code', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code,
            order_id,
        }
        )
    })
        .then(res => res.json())
}

export async function BuyNumbersGetNewCode({
    order_id,
}) {
    return fetch('https://boomtele.com/api/buy-numbers/get-new-code', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            order_id,
        }
        )
    })
        .then(res => res.json())
}

export async function BuyNumbersAddPD({
    order_id,
    lastName,
    firstName,
    patronymic,
    dateOfBirth,
    placeOfBirth,
    citizenship,
    divisionCode,
    dateOfIssue,
    passportSeries,
    passportNumber,
    whoIssuedPassport,
    registrationAddress,
    formatedRegistrationAddress,
    dateOfRegistration,
}) {
    return fetch('https://boomtele.com/api/buy-numbers/add-passport-data', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            order_id,
            lastName,
            firstName,
            patronymic,
            dateOfBirth,
            placeOfBirth,
            citizenship,
            divisionCode,
            dateOfIssue,
            passportSeries,
            passportNumber,
            whoIssuedPassport,
            registrationAddress,
            formatedRegistrationAddress,
            dateOfRegistration,
        }
        )
    })
        .then(res => res.json())
}



export const tariffBase = {
    title: 'Базовый',
    icon: duck,
    beeline: true,
    positions: [{
        min: 300,
        gb: 40,
        sms: 300,
        details: [true, false, false]
    }, {
        min: 400,
        gb: 30,
        sms: 300,
        details: [true, false, false]
    }, {
        min: 400,
        gb: 20,
        sms: 300,
        details: [true, true, false]
    }, {
        min: 500,
        gb: 10,
        sms: 100,
        details: [false, false, false]
    }],
    infinitInternet: 150,
    modem: 50,
    price: 350,
    background: "linear-gradient(99.98deg, #4B74FC 0%, #3039FF 98.9%)"
}
export const tariffBright = {
    title: 'Яркий',
    icon: light,
    beeline: true,
    positions: [{
        min: 600,
        gb: 50,
        sms: 500,
        details: [true, false, false]
    }, {
        min: 800,
        gb: 40,
        sms: 500,
        details: [true, false, false]
    }, {
        min: 800,
        gb: 30,
        sms: 500,
        details: [true, true, false]
    }, {
        min: 1000,
        gb: 25,
        sms: 500,
        details: [false, false, false]
    }],
    infinitInternet: 150,
    modem: 50,
    price: 500,
    background: " linear-gradient(99.98deg, #4B40FE 0%, #3039FF 98.9%, #4B1EFF 98.9%);",
    hit: true,
}
export const tariffAdvanced = {
    title: 'Расширенный',
    icon: star,
    beeline: true,
    positions: [{
        min: 1000,
        gb: Infinity,
        sms: 1000,
        "Безлимитный 4G": Infinity,
        details: [true, false, false]
    }, {
        min: 1500,
        gb: 50,
        sms: 1000,
        details: [true, false, false]
    }, {
        min: 1500,
        gb: 40,
        sms: 1000,
        details: [true, true, false]
    }, {
        min: 2000,
        gb: 35,
        sms: 1000,
        details: [false, false, false]
    }],
    infinitInternet: 'Включено в один из пакетов тарифа, для остальных пакетов 150 ₽',
    modem: 50,
    price: 800,
    background: " linear-gradient(99.98deg, #4B40FE 0%, #3039FF 98.9%, #4B1EFF 98.9%)"
}
export const tariffBiz = {
    title: 'Бизнес',
    icon: briefcase,
    positions: [{
        min: 2500,
        gb: Infinity,
        sms: 1000,
        "Безлимитный 4G": Infinity,
        details: [true, false, false]
    }, {
        min: 3000,
        gb: 60,
        sms: 1000,
        details: [true, false, false]
    }, {
        min: 3000,
        gb: 50,
        sms: 1000,
        details: [true, true, false]
    }, {
        min: 4000,
        gb: 50,
        sms: 1000,
        details: [false, false, false]
    }],
    infinitInternet: 'Включено в один из пакетов тарифа, для остальных пакетов 150 ₽',
    modem: 50,
    price: 1000,
    background: "radial-gradient(ellipse at center, #324E69 0%, #242424 100%)"
}
export const tariffVip = {
    title: 'VIP',
    icon: goblet,
    positions: [{
        min: 5000,
        gb: Infinity,
        sms: 1000,
        "Безлимитный 4G": Infinity,
        "Раздача интернета": Infinity,
        details: [true, true, true]
    }, {
        min: 7000,
        gb: 150,
        sms: 1000,
        "Раздача интернета": Infinity,
        details: [false, false, true]
    }],
    infinitInternet: 'Включено в тариф',
    modem: 'Включено в тариф',
    price: 1500,
    background: "radial-gradient(ellipse at center, #D79532 0%, #E1B470 50%, #1B240A 100%)"
}

export const tariffTypesArray = [tariffBase, tariffBright, tariffAdvanced, tariffBiz, tariffVip]

export const services = {
    paid: [
        {
            ymForm: { type: 'reachGoal', value: 'paket_gb-forma' },
            ymClickBtn: { type: 'reachGoal', value: 'paket_gb-click' },
            desc: `Интернет закончился раньше, чем 
            Вы планировали? Докупите еще гигабайт 
            на максимальной скорости`,
            img: box,
            positions: [{ title: "Пакет 10 ГБ", price: "150 ₽" }, { title: "Пакет 20 ГБ", price: "250 ₽" }, { title: "Пакет 30 ГБ", price: "350 ₽" }, { title: "Пакет 40 ГБ", price: "550 ₽" }]
        },
        {
            ymForm: { type: 'reachGoal', value: 'bezlim-forma' },
            ymClickBtn: { type: 'reachGoal', value: 'bezlim-click' },
            title: `Пакет безлимитного 
            интернета в сети 4G`,
            desc: `Интернет никогда не закончится в сети 4G`,
            img: firework,
            price: "150 ₽ / месяц"
        },
        {
            ymForm: { type: 'reachGoal', value: 'avtootvet-forma' },
            ymClickBtn: { type: 'reachGoal', value: 'avtootvet-click' },
            title: `Автоответчик`,
            desc: `Включите Автоответчик, и Вы не пропустите ни одного звонка, даже если телефон будет выключен или окажется вне зоны обслуживания`,
            img: robot,
            price: "50 ₽ / месяц"
        },
        {
            ymForm: { type: 'reachGoal', value: 'privet-forma' },
            ymClickBtn: { type: 'reachGoal', value: 'privet-click' },
            title: `Привет`,
            desc: `Установите вместо скучных гудков
            музыку, шутки и приколы! Каталог мелодий 
            и управление услугой — 0770`,
            img: drum,
            price: "100 ₽ / месяц"
        },
        {
            ymForm: { type: 'reachGoal', value: 'antiopredelitel-forma' },
            ymClickBtn: { type: 'reachGoal', value: 'antiopredelitel-click' },
            title: `Антиопределитель номера`,
            desc: `Антиопределитель сохранит 
            Ваш номер в секрете во время разговора, даже если у собеседника подключён определитель номера`,
            img: umbrella,
            price: "200 ₽ / месяц"
        },
        {
            ymForm: { type: 'reachGoal', value: 'superopredelitel-forma' },
            ymClickBtn: { type: 'reachGoal', value: 'superopredelitel-click' },
            title: `Суперопределитель номера`,
            desc: `Чтобы всегда знать, кто вам звонит, даже если у них «Антиопределитель номера»`,
            img: telescope,
            price: "1800 ₽ / месяц"
        },
        {
            ymForm: { type: 'reachGoal', value: 'modem-forma' },
            ymClickBtn: { type: 'reachGoal', value: 'modem-click' },
            title: `Режим модема`,
            desc: `Раздача интернета с устройства в режиме модема`,
            img: wifi,
            price: "50 ₽ / месяц"
        },
        {
            ymForm: { type: 'reachGoal', value: '495-forma' },
            ymClickBtn: { type: 'reachGoal', value: '495-click' },
            title: `Городской номер (495)`,
            desc: `Приобретайте городской номер телефона в коде 495. Тарификация производится согласно местной телефонной связи. Все входящие звонки для абонента бесплатны`,
            img: telephone,
            price: "750 ₽ / месяц"
        },
    ],
    free: [
        {
            title: `Запрет мобильного интернета`,
            desc: `Отключайте и подключайте мобильный интернет. После отключения услуги необходимо перезагрузить телефон`,
            img: lock,
            price: "Бесплатно"
        },
        {
            title: `Запрет доступа ко всем
            SMS-сервисы провайдеров`,
            desc: `Услуга позволяет ограничивать получение и отправку нежелательных SMS-сообщений с коротких номеров контент-провайдеров`,
            img: shield,
            price: "Бесплатно"
        },
        {
            title: `Переадресация звонков `,
            desc: `Услуга “Переадресация звонков”
            позволит Вам получить звонок 
            именно там, где нужно, и в любое удобное для Вас время`,
            img: radio,
            price: "Бесплатно"
        },
        {
            title: `Будь в курсе`,
            desc: `Если телефон недоступен или Вы не отвечаете на звонок в течение 30 секунд, клиенты и партнеры могут оставить голосовое сообщение`,
            img: mailbox,
            price: "Бесплатно"
        },
        {
            title: `Ожидание вызова`,
            desc: `Вы не пропустите важный звонок, даже когда Ваш телефон занят`,
            img: Speaker,
            price: "Бесплатно"
        },
        {
            title: `Постоплатная система расчетов`,
            desc: `Возможно подключение только после 6 месяцев использования`,
            img: coin,
            price: "Бесплатно"
        },
        {
            title: `Моя семья`,
            desc: `Оплачивайте счета абонентов в группе одним платежом и просматривайте детализацию абонента в группе`,
            img: family,
            price: "Бесплатно"
        },
    ],
}

export const sendMetriс = (type, value) => {
    window.ym(85620877, type, value)
}

const operatorIcons = {
    МТС: mtc,
    Beeline: beeline,
    "\"Билайн\"": beeline
}
export const parseCols = (detail) => {
    if (detail["Тип звонка"] === "GPRS") {
        return (
            <>
                <td>Интернет ({detail["Интернет МБ"]} мб.)</td>
                <td><img alt="Оператор" src={beeline} />Beeline</td>
            </>
        )
    } else if (detail["Тип звонка"] === "SMS / MMS") {
        let operator = detail["Описание звонка"].split(" ");
        operator = operator[operator.length - 1];
        const icon = operatorIcons[operator];
        return (
            <>
                <td>SMS / MMS ({spacer(detail["Входящий номер"])})</td>
                <td>{icon && <img alt="Оператор" src={icon} />}{operator}</td>
            </>
        )

    } else if (detail["Тип звонка"] === "Местные звонки") {
        let operator = detail["Описание звонка"].split("\"");
        operator = operator[operator.length - 2];
        const icon = operatorIcons[operator];
        return (
            <>
                <td>Звонок ({"+7 " + spacer(detail["Входящий номер"])})</td>
                <td>{icon && <img alt="Оператор" src={icon} />}{operator}</td>
            </>
        )
    }

}

export const wrapPromise = (promise) => {
    let status = "pending";
    let result;
    let suspender = promise.then(res => {
        status = "success";
        result = res.reduce((total, detailsFile) => [...total, ...parseDetailsFile(decode(detailsFile.file))], [])
    }, err => {
        status = "error";
        result = err;
    })

    return {
        read: () => {
            if (status === "pending") {
                throw suspender
            }
            else if (status === "error") {
                throw result;
            }
            else if (status === "success") {
                return result;
            }
        }
    }
}

export const citizenships = [
    'Афганистан',
    'Албания',
    'Алжир',
    'Андорра',
    'Ангола',
    'Антигуа и Деп',
    'Аргентина',
    'Армения',
    'Австралия',
    'Австрия',
    'Азербайджан',
    'Багамские острова',
    'Бахрейн',
    'Бангладеш',
    'Барбадос',
    'Беларусь',
    'Бельгия',
    'Белиз',
    'Бенин',
    'Бутан',
    'Боливия',
    'Босния Герцеговина',
    'Ботсвана',
    'Бразилия',
    'Бруней',
    'Болгария',
    'Буркина',
    'Бурунди',
    'Камбоджа',
    'Камерун',
    'Канада',
    'Кабо-Верде',
    'Центральноафриканская республика',
    'Чад',
    'Чили',
    'Китай',
    'Колумбия',
    'Коморские острова',
    'Конго',
    'Конго (Демократическая Республика)',
    'Коста-Рика',
    'Хорватия',
    'Куба',
    'Кипр',
    'Чешская Республика',
    'Дания',
    'Джибути',
    'Доминика',
    'Доминиканская Республика',
    'Восточный Тимор',
    'Эквадор',
    'Египет',
    'Сальвадор',
    'Экваториальная Гвинея',
    'Эритрея',
    'Эстония',
    'Эфиопия',
    'Фиджи',
    'Финляндия',
    'Франция',
    'Габон',
    'Гамбия',
    'Грузия',
    'Германия',
    'Гана',
    'Греция',
    'Гренада',
    'Гватемала',
    'Гвинея',
    'Гвинея-Бисау',
    'Гайана',
    'Гаити',
    'Гондурас',
    'Венгрия',
    'Исландия',
    'Индия',
    'Индонезия',
    'Иран',
    'Ирак',
    'Ирландия (Республика)',
    'Израиль',
    'Италия',
    'Берег Слоновой Кости',
    'Ямайка',
    'Япония',
    'Иордания',
    'Казахстан',
    'Кения',
    'Кирибати',
    'Корея Северная',
    'Корея Южная',
    'Косово',
    'Кувейт',
    'Кыргызстан',
    'Лаос',
    'Латвия',
    'Ливан',
    'Лесото',
    'Либерия',
    'Ливия',
    'Лихтенштейн',
    'Литва',
    'Люксембург',
    'Македония',
    'Мадагаскар',
    'Малави',
    'Малайзия',
    'Мальдивы',
    'Мали',
    'Мальта',
    'Маршалловы острова',
    'Мавритания',
    'Маврикий',
    'Мексика',
    'Микронезия',
    'Молдова',
    'Монако',
    'Монголия',
    'Черногория',
    'Марокко',
    'Мозамбик',
    'Мьянма, (Бирма)',
    'Намибия',
    'Науру',
    'Непал',
    'Нидерланды',
    'Новая Зеландия',
    'Никарагуа',
    'Нигер',
    'Нигерия',
    'Норвегия',
    'Оман',
    'Пакистан',
    'Палау',
    'Панама',
    'Папуа-Новая Гвинея',
    'Парагвай',
    'Перу',
    'Филиппины',
    'Польша',
    'Португалия',
    'Катар',
    'Румыния',
    'Российская Федерация',
    'Руанда',
    'Сент-Китс и Невис',
    'Сент-Люсия',
    'Сент-Винсент и Гренадины',
    'Самоа',
    'Сан-Марино',
    'Сан-Томе и Принсипи',
    'Саудовская Аравия',
    'Сенегал',
    'Сербия',
    'Сейшельские острова',
    'Сьерра-Леоне',
    'Сингапур',
    'Словакия',
    'Словения',
    'Соломоновы острова',
    'Сомали',
    'Южная Африка',
    'Южный Судан',
    'Испания',
    'Шри-Ланка',
    'Судан',
    'Суринам',
    'Свазиленд',
    'Швеция',
    'Швейцария',
    'Сирия',
    'Тайвань',
    'Таджикистан',
    'Танзания',
    'Таиланд',
    'Того',
    'Тонга',
    'Тринидад и Тобаго',
    'Тунис',
    'Турция',
    'Туркменистан',
    'Тувалу',
    'Уганда',
    'Украина',
    'Объединенные Арабские Эмираты',
    'Великобритания',
    'Соединенные Штаты',
    'Уругвай',
    'Узбекистан',
    'Вануату',
    'Ватикан',
    'Венесуэла',
    'Вьетнам',
    'Йемен',
    'Замбия',
    'Зимбабве'
]