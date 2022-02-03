import { combineReducers } from "redux"
import { LOGIN_FAILED, GET_PASSWORD, USER, SHOW_MODAL, HIDE_MODAL, BUY_NUMBER, CREATE_AUTH, DELETE_AUTH, RESET_ACCESSTOKEN } from "../../globals/utils"

const initialNumber = {show: false, numbers: [], buy: false, payload: {}}
const BuyNumberReducer = (store = initialNumber, action) => {
    switch(action.type) {
        case SHOW_MODAL:
            const {payload} = action;
            return {...store, show: true, payload}
        case BUY_NUMBER:
            const {numbers} = action;
            return {...store, show: true, numbers, buy: true}
        case HIDE_MODAL:
            return {...store, ...initialNumber}
        default:
            return store
    }
}



const FormReducer = (store = {status: null}, action) => {
    switch(action.type) {
        case LOGIN_FAILED:
            return {...store, status: -1, err_message: action.err_message}
        case GET_PASSWORD:
            return {...store, status: store.status === -2 ? null : -2}
        default:
            return store
    }
}




const cookieValue = (name) => {
    const row = document.cookie.split('; ').find(row => row.startsWith(`${name}=`))
    return row ? row.split('=')[1] : ""
}
const setCookieValue = (name, value, maxAge) => {
    if(typeof value === "function") {
        value = value(cookieValue(name))
    }
    document.cookie = `${name}=${value}; max-age=${maxAge}; SameSite=Strict; Secure`
}

const initialAuth = {accessToken: cookieValue("accessToken"), refreshToken: cookieValue("refreshToken"), user: {}}
const AuthReducer = (store = initialAuth, action) => {
    switch(action.type) {
        case USER:
            const {user} = action;
            return {...store, user: {...store.user, ...user}}
        case CREATE_AUTH:
            const {accessToken, refreshToken} = action.payload;
            setCookieValue("accessToken", accessToken, 600)
            setCookieValue("refreshToken", refreshToken, 2592000)
            return {...store, accessToken, refreshToken}
        case DELETE_AUTH:
            setCookieValue("accessToken", "", 0)
            setCookieValue("refreshToken", "", 0)
            return {...store, accessToken: "", refreshToken: "", user: {}}
        case RESET_ACCESSTOKEN: 
            return {...store, accessToken: ""}
        default:
            return store
    }
}

export default combineReducers({login: FormReducer, auth: AuthReducer, buyNumberModal: BuyNumberReducer});