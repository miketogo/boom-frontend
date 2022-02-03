import { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components/macro";
import { GlobalContext } from "../../App";
import Aside from "../../components/Aside";
import { Progress } from 'antd'
import { HiDownload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {CREATE_AUTH, Fetcher, parseCols, parseDetailsFile, percentage, replacePoints, RESET_ACCESSTOKEN, SHOW_MODAL, USER } from "../../globals/utils";
import { spacer } from "../../components/BuyNumberModal";
import { RiFileCopyLine } from "react-icons/ri";
import { useEscapeKey } from "../../hooks";
import { decode } from 'js-base64';
import { Close } from "../../globals/LoginForm";
import { CgClose } from "react-icons/cg";
import { GiHazardSign } from "react-icons/gi";
import { Link } from "react-router-dom";
import sub from 'date-fns/sub'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import docDefinition from "./docDefinition";
import Preloader from "../../globals/Preloader/Preloader";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Wrapper = styled.div`
    padding-top: 50px;
    display: flex;
    gap: 0px 100px;
    width: 100%;
    @media(max-width: 1400px) {
        gap: 0px;
    }
`;
const MainSection = styled.div`
    padding-right: 100px;
    width: 100%;
    row-gap: 20px;
    display: flex;
    height: fit-content;
    flex-direction: column;
    @media(max-width: 1400px) {
        padding: 0 2vw;
    }
`;
const Button = styled.button`
    color: ${({color}) => color ? color : "#121212"};
    background: ${({background}) => background};
    font-size: ${({fontSize}) => fontSize};
    font-weight: 500;
    width: ${({width}) => width};
    height: ${({height}) => height};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${({round, height}) => round && height};
    border: ${({border}) => border ? border : "none"};
    cursor: pointer;
    line-height: ${({fontSize}) => fontSize};
    gap: ${({gap}) => gap};
    max-width: 100%;
    max-height: fit-content;
    padding: 20px 16px;
    outline: none;
    @media(max-width: 900px) {
        font-size: 16px;
        height: fit-content;
    }
    @media(max-width: 550px) { 
        order: 2;
    }
`;

const Small = styled.small`
    font-size: 16px;
    line-height: 50%;
    font-weight: 700;
    @media(max-width: 900px) and (min-width: 550px) {
        font-size: 12px;
    }
    @media(max-width: 550px) {
        font-size: 17px;
    }
`;
const Cards = styled.div`
    display: grid;
    gap: 12px 20px;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    font-family: Circe;
    @media(max-width: 550px) {
        grid-template-columns: 1fr;
    }
    #Абонентская_плата {
        font-size: 24px;
        height: 71px;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-radius: 71px;
        font-weight: 700;
        @media(max-width: 900px) and (min-width: 550px) {
            font-size: 16px;
        }
        @media(max-width: 550px) { 
            order: 2;
            font-size: 16px;
        }
    }
`
const TopCard = styled.div` 
    width: 100%;
    height: 123px;
   
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background: ${({darkTheme}) => darkTheme ? "rgba(255, 255, 255, 0.09)" : "#FFFFFF"};
    border-radius: 12px;
    padding: 20px;
    @media(max-width: 900px) and (min-width: 550px) {
        
        padding: 12px;
        :first-child {
            min-width: max-content;
        }
    }
    @media(max-width: 600px) {
        padding: 10px 12px;
        
    }
    .topCardTitle {
        font-size: 20px;
        color: ${({darkTheme}) => darkTheme ? "#FFFFFFAD" : "#010101AD"};
        @media(max-width: 963px) {
            font-size: 12px;
        }
    }
    .topCardBody {
        word-wrap: none;
        white-space: nowrap;
        font-size: 24px;
        color: ${({color}) => color};
        display: flex;
        align-items: center;
        gap: 11px;
        font-weight: bold;
        @media(max-width: 900px) and (min-width: 550px) {
            font-size: 16px;
        }
    }
`;
const SubCard = styled(TopCard)`
    align-items: center;
    margin: 0;
    padding: 24px;
    height: 266px;
    gap: 20px;
    @media(max-width: 900px) {
        height: fit-content;
    }
    @media(max-width: 550px) { 
        order: 3;
    }
`
const Span = styled.span`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${({theme}) => theme.textColor};
    gap: 4px;
`
const Ptitle = styled.span`
    font-size: 28px;
    font-weight: 700;
    @media(max-width: 900px) and (min-width: 550px) {
        font-size: 16px;
    }
`
const Psub = styled.span`
    font-size: 20px;
    color: ${({darkTheme}) => darkTheme ? "rgba(255, 255, 255, 0.6)" : 'rgba(18,18,18, 0.6)'};
    @media(max-width: 900px) and (min-width: 550px) {
        font-size: 12px;
    }
`
const ProgressText = ({title, sub}) => {
    const {darkTheme} = useContext(GlobalContext);
    return (
    <Span>
        <Ptitle>{title}</Ptitle>
        <Psub darkTheme={darkTheme}>{sub}</Psub>
    </Span>)
}
const Details = styled.section`
    display: flex;
    flex-direction: column;
    height: fit-content;
    color: ${({theme}) => theme.textColor};
    background: ${({darkTheme}) => darkTheme ? "rgba(255, 255, 255, 0.09)" : "#FFFFFF"};
    border-radius: 28px;
    padding: 25px 16px 16px;
    gap: 26px;
    #wrapTable {
        overflow: auto;
        max-height: 550px;
        z-index: 2;
        ::-webkit-scrollbar {
            width: 5px;
            height: 5px;
            z-index: 2;
        }
        ::-webkit-scrollbar-track {
            background-color: transparent;
        }

        ::-webkit-scrollbar-thumb {
            background-color: grey;
            border-radius: 5px;
            outline: none;
        }
    }
    @media(max-width: 900px) {
        padding: 25px 23px;
        padding-right: 0;
    }
    @media(max-width: 550px) {
        padding: 24px 0 24px 12px;
    }
`
const Dtitle = styled.span`
    display: flex;
    justify-content: space-between;
    font-size: 40px;
    line-height: 40px;
    font-weight: 650;
    gap: 20px;
    flex-wrap: wrap;
    @media(max-width: 900px) {
        padding-right: 23px;
    }
    @media(max-width: 550px) {
        font-size: 30px;
        padding-right: 10px;
    }
`
const DetailsTable = styled.table`
    width: 100%;
    min-width: 1000px;
    font-size: 24px;
    text-align: left;
    border-collapse: separate;
    border-spacing: 0px 12px;
    position: relative;
    padding: 0;
    z-index: 1;
    thead tr {
        font-size: 16px;
        line-height: 100%;
        font-weight: 550;
        & th {
            background: ${({theme}) => theme.darkTheme ? "rgb(24 24 24)" : "#FFFFFF"};
            position: sticky;
            top: 0;
            padding-left: 24px;
            padding-top: ${({$scrolling}) => $scrolling && "12px"};
            padding-bottom: ${({$scrolling}) => $scrolling && "12px"};
            @media(max-width: 500px) {
                top: 0;
            }
        }
    }

    tbody tr td:first-child span{
        margin: 0 5px 0 8px;
    }
    @media(max-width: 900px) {
        padding-right: 23px;
    }
    @media(max-width: 550px) {
        padding-right: 12px;
    }
`
const Trows = styled.tr`
    font-family: "Roboto Mono";
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    text-align: left;
    background: ${({darkTheme}) => darkTheme ? "#242424" : "#EBEBEB"};
    & td {
        padding: 28px 24px;
        line-height: 100%;
    }
    & td:first-child {
        border-radius: 18px 0 0 18px;
    }
    & td:last-child {
        border-radius: 0 18px 18px 0;
    }
    & img{
        width: 30px;
        margin: -10px 3px -7px 0;
    }
`
const Copier = styled(RiFileCopyLine)`
    cursor: pointer;
    &:hover {
        transform: scale(1.04);
    }
`

const DownloadBtn = styled.button`
    width: fit-content;
    height: 52px;
    max-width: 100%;
    max-height: fit-content;
    padding: 12px 24px 16px 24px;
    background: #4B75FC1F;
    color: #4B75FC;
    font-size: 24px;
    border: none;
    border-radius: 69px;
    line-height: 24px;
    cursor: pointer;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    text-align: center;
    font-family: "Jost", "Circe";
    svg {
        width: 20px;
        height: 20px;
    }
    @media(max-width: 720px) {
        padding: 10px 10px 16px 10px;
        font-size: 16px;
        line-height: 16px;
        width: fit-content;
        height: fit-content;
        
    }
    :disabled {
        cursor: not-allowed;
    }
`
const Name = styled.div`
    font-weight: 700;
    font-size: 44px;
    color: inherit;
    line-height: 100%;
    @media(max-width: 1280px) {
        font-size: 32px;
    }
    @media(max-width: 600px) {
        font-size: 20px;
    }
`
const AttentionModalStyles = styled.div`
    background: ${({theme}) => theme.darkTheme ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.7)"};
    width: 100%;
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #010101;
    .modal {
        width: 320px;
        height: 271px;
        max-width: 90vw;
        background: #fff;
        border-radius: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
        padding: 30px 12px 0;
    }
    .header {
        font-weight: 500;
        font-size: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        svg {
            color: #FF0202;
        }
    }

    .body {
        margin: 9px 0 20px;
        font-weight: 500;
        font-size: 20px;
        a {
            text-decoration: underline;
            color: #4B75FC;
        }
    }
    .bottom {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 21px;
        font-size: 20px;
        .left {
            color: #4B75FC;
        }
        .right {
            color: #FF0202;
            background: #FF02021F;
            padding: 5px 10px;
            border-radius: 35px;
        }
    }
`

const Info = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
`

const Blocked = styled.span`
    width: fit-content;
    padding: 8px 20px;
    color: #fff;
    background: ${({blocked}) => blocked ? "#FF0202" : "#32A43E"};
    border-radius: 50px;
    font-family: Circe;
    font-size: 28px;
    font-weight: 400;
    @media(max-width: 1400px) {
        font-size: 16px;
    }
    @media(max-width: 600px) {
        padding: 4px 12px;
        font-size: 12px;
        font-family: Circe;
        line-height: 18px;
    }
    @media(max-width: 400px) {
        font-size: 16px;
        line-height: 24px;
    }
`

const AttentionModal = ({setShowPopup}) => {
    useEscapeKey(setShowPopup);
    const dispatch = useDispatch();
    return (
        <AttentionModalStyles onClick={(e) => {e.stopPropagation(); setShowPopup(false)}}>
            <div onClick={(e) => e.stopPropagation()} className="modal">
                <Close onClick={()=>setShowPopup(false)}><CgClose strokeWidth={1.5} size={29} /></Close>
                <span className="header">
                    <GiHazardSign />
                    Внимание
                </span>
                <span className="body">
                    только при наличии 
                    неиспользованной пластиковой 
                    сим-карты или <Link to="/numbers/:esim">eSIM</Link>
                </span>

                <span className="bottom">
                    <span onClick={()=>{
                        setShowPopup(false); 
                        dispatch({type: SHOW_MODAL, payload: {toSubmit: true}})
                    }} className="left">Хорошо</span>
                    <span onClick={()=>setShowPopup(false)} className="right">Отмена</span>
                </span>
            </div>
        </AttentionModalStyles>
    )
}


const getDetailsFile = (idToSearch, accessToken) => {
    const d = new Date();
    const requestArray = [];
    for(let i = 0; i <= 6; i++) {
        const date = sub(d, {months: i});
        const year = date.getFullYear();
        let month = 1+date.getMonth();
        month = month < 10 ? "0"+month : month;
        requestArray.push(
            Fetcher({method: "getDetailsFile", params:{idToSearch, period: `${year}M${month}`, encoding: "utf-8",}, id:null}, {accessToken})
        )
    }

    return Promise.all(requestArray)
    .then(list => list.reduce((total, detailsFile) => [
            ...total, 
            ...parseDetailsFile(decode(detailsFile.file))
        ], [])
    )
}

const getDashboard = (ctn, accessToken, dispatch) => { 
    Promise.all([
        Fetcher({method: "getCtnInfo", params:{ctn}, id:null}),
        Fetcher({method: "getCustomerData", params:{id: ctn}, id:null}, {accessToken}),
    ])
    .then(([userInfo, userData]) => dispatch({type: USER, user: {userInfo, userData}}))
}


export default function Dashboard() {
    const {darkTheme, setLoginForm, ctn} = useContext(GlobalContext);
    const {userInfo, userData, details} = useSelector(store => store.auth.user);
    const {accessToken, refreshToken} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [copied, setCopied] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [blocked, setBlocked] = useState();
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [tScrolling, setTScrolling] = useState(false);
    
    useEffect(() => {
        userInfo && setBlocked( !(userInfo.unblockable || new Date(userInfo.blockDate) > new Date()) );
    }, [userInfo, setBlocked])

    useEffect(() => {
        const watcher = () => setInnerWidth(window.innerWidth);
        window.addEventListener("resize", watcher)
        return () => window.removeEventListener("resize", watcher)
    }, [])
    
    useEffect(() => {
        if (accessToken) {
            getDashboard(ctn, accessToken, dispatch)
            getDetailsFile(ctn, accessToken).then(details =>  dispatch({type: USER, user: {details}}))
        } 
        else if(refreshToken) {
            Fetcher({method: "refreshToken", params:{username: ctn, refreshToken}, id:null})
                .then(result => {
                    const {accessToken, refreshToken} = result;
                    dispatch({type: CREATE_AUTH, payload: {accessToken, refreshToken}})
                    setTimeout(() => dispatch({type: RESET_ACCESSTOKEN}), 600000);
                })
        } 
        else setLoginForm(true)
    }, [accessToken, refreshToken, dispatch, setLoginForm, ctn]);

    const handleDownload = () => {
        pdfMake.createPdf(docDefinition(details)).open();
    }
    
    const handleCopy = () => {
        navigator.clipboard.writeText("+7"+userInfo.ctn).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
        });
    }

    const width = useMemo(() => innerWidth >= 550 && innerWidth <= 900 ? 0.266*innerWidth - 48 : 181, [innerWidth]);
    const rests = useMemo(() => userInfo && userInfo.rests, [userInfo])
    
    return (
            <>
            {!userInfo ? <Preloader /> : 
            <Wrapper id="Мой тариф">
                <Aside />
                <MainSection>
                    <Info>
                        <Name>{userData.owner}</Name>
                        {blocked === undefined || <Blocked  blocked={blocked}>{blocked ? "Заблокирован" : "Активен"}</Blocked>}
                    </Info>
                    <Cards>
                        <TopCard darkTheme={darkTheme}>
                            <span className="topCardTitle">Номер:</span>
                            <span className="topCardBody">
                                {"+7 "+spacer(userInfo.ctn)}
                                {innerWidth >= 900 && <Copier onClick={handleCopy} color={copied ? "#4B75FC" : darkTheme ? "#fff" : "#010101AD"} size={23} />}
                            </span>
                        </TopCard>
                        <TopCard color="#4B75FC" darkTheme={darkTheme}>
                            <span className="topCardTitle">Тариф:</span>
                            <span className="topCardBody">
                                {userInfo.plan + " ₽"}
                            </span>
                        </TopCard>
                        <TopCard color={userInfo.balance <= 0 ? "#FF0202" : "#32A43E"} darkTheme={darkTheme}>
                            <span className="topCardTitle">Баланс:</span>
                            <span className="topCardBody">
                                {replacePoints(userInfo.balance)+ " ₽"}
                            </span>
                        </TopCard>

                        <SubCard darkTheme={darkTheme}>
                            <Small>Минуты</Small>
                            <Progress strokeColor="#4B75FC" strokeWidth={7} width={width} type="dashboard" percent={percentage(rests.VOICE.current, rests.VOICE.initial)} format={() => <ProgressText title={`${rests.VOICE.current} мин`} sub={`из ${rests.VOICE.initial}`} /> } gapDegree={60} />
                        </SubCard>
                        <SubCard darkTheme={darkTheme}>
                            <Small>Интернет</Small>
                            <Progress strokeColor="#4B75FC" strokeWidth={7} width={width} type="dashboard" percent={percentage(rests.INTERNET.current, rests.INTERNET.initial)} format={() => <ProgressText title={`${replacePoints(rests.INTERNET.current)} гб.`} sub={`из ${rests.INTERNET.initial}`} /> } gapDegree={60} />
                        </SubCard>
                        <SubCard darkTheme={darkTheme}>
                            <Small>Сообщения</Small>
                            <Progress strokeColor="#4B75FC" strokeWidth={7} width={width} type="dashboard" percent={percentage(rests.SMS_MMS.current, rests.SMS_MMS.initial)} format={() => <ProgressText title={`${rests.SMS_MMS.current} SMS`} sub={`из ${rests.SMS_MMS.initial}`} /> } gapDegree={60} />
                        </SubCard>
                        <Button onClick={() => setShowPopup(true)} fontSize="24px" color="#4B75FC" background="#4B75FC29" height="71px" width="100%" round>
                            Изменить номер
                            {showPopup && <AttentionModal setShowPopup={setShowPopup} />}
                        </Button>
                        <Button fontSize="24px" color="white" background="#4B75FC" height="71px" width="100%" round>Сменить тариф</Button>
                        {/* <span id="Абонентская_плата">Абонентская плата в месяц: </span> */}
                    </Cards>
                    <Details id="Детализация" darkTheme={darkTheme}>
                        <Dtitle>
                            Детализация
                            <DownloadBtn disabled={!details} onClick={handleDownload}> <HiDownload /> получите полную детализацию</DownloadBtn>
                        </Dtitle>

                        <div onScroll={({target}) => setTScrolling(target.scrollTop > 0)} id="wrapTable">
                            {!details ? <Preloader /> :
                             <DetailsTable $scrolling={tScrolling}>
                                <thead>
                                    <tr>
                                        <th>Дата</th>
                                        <th>Действие</th>
                                        <th>Оператор</th>
                                        <th>Длительность</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details.slice(0, 2000).filter(detail => detail["Продолжительность звонка"]).map((detail, index) => (
                                        <Trows key={index} darkTheme={darkTheme}>
                                            <td>{detail["Дата звонка"]} <span>/</span> {detail["Время звонка"]}</td>
                                            {parseCols(detail)}
                                            <td>{detail["Продолжительность звонка"]}</td>
                                        </Trows>
                                    ))}
                                </tbody>
                            </DetailsTable>}
                        </div>
                    </Details>
                </MainSection>
            </Wrapper>}
            </>
    )
}
