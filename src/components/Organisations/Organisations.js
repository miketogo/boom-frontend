import React, { useContext } from 'react';
import MetaTags from 'react-meta-tags';
import { useDispatch } from "react-redux"
import { SHOW_MODAL, sendMetriс } from "../../globals/utils"
import { GlobalContext } from '../../App';
import { useParams, useHistory } from 'react-router-dom';
import './Organisations.css';
import logo from '../../assets/images/logo.png'
import box from '../../assets/images/box.png'
import beeline from '../../assets/images/beeline-org.png'
import bucket from '../../assets/images/bucket.png'
import anchor from '../../assets/images/anchor.png'
import link from '../../assets/images/link.png'
import car from '../../assets/images/car.png'
import globe_icon from '../../assets/images/globe_icon.png'
import folder from '../../assets/images/folder.png'
import blub from '../../assets/images/blub.png'
import computer from '../../assets/images/computer.png'
import floppy from '../../assets/images/Floppy.png'
import red_book from '../../assets/images/red-book.png'
import thermometer from '../../assets/images/Thermometer.png'
import magic_hat from '../../assets/images/Magic-hat.png'
import clapperboard from '../../assets/images/clapperboard.png'
import pcFace from '../../assets/images/pc-face.png'

const cardsMalBiz = [
    {
        ymForm:{type:'reachGoal', value:'mix-forma'},
        ymClickBtn:{type:'reachGoal', value:'mix-click'},
        img: box,
        title: 'Яркий микс',
        text: `Высокоскоростной интернет в офисе со скидкой, корпоративная мобильная связь и облачная АТС бесплатно`
    },
    {
        ymForm:{type:'reachGoal', value:'mobil_predpriyatie-forma'},
        ymClickBtn:{type:'reachGoal', value:'mobil_predpriyatie-click'},
        img: pcFace,
        title: 'Мобильное предприятие',
        text: `CRM-система со встроенной облачной
        телефонией для ведения клиентской базы,
        контроля продаж и управления проектами`
    },
    {
        ymForm:{type:'reachGoal', value:'ip_samozaniyatie-forma'},
        ymClickBtn:{type:'reachGoal', value:'ip_samozaniyatie-click'},
        img: bucket,
        title: 'Для ИП и самозанятых',
        text: `Облачная телефония, статистика эффективности рекламы, CRM-система и SMS-рассылки`
    }
    ,
    {
        ymForm:{type:'reachGoal', value:'8800-forma'},
        ymClickBtn:{type:'reachGoal', value:'8800-click'},
        img: anchor,
        title: 'Номер 8800',
        text: `Звонки по всей России и бесплатное подключение`
    }
    ,
    {
        ymForm:{type:'reachGoal', value:'biznes_internet-forma'},
        ymClickBtn:{type:'reachGoal', value:'biznes_internet-click'},
        img: link,
        title: 'Интернет для бизнеса',
        text: `Скорость до 100 Мбит/с. При подключении Вы получаете техподдержку, бесплатный домен, почтовые ящики и доступ к статическим и динамическим IP-адресам`
    }
    ,
    {
        ymForm:{type:'reachGoal', value:'ofd_beeline-forma'},
        ymClickBtn:{type:'reachGoal', value:'ofd_beeline-click'},
        img: beeline,
        title: 'ОФД “Билайн”',
        text: `Касса + ФН + ОФД + Интернет + Настройка кассы — с рассрочкой на 12 месяцев`
    }
]

const cardsBigBiz = [
    {
        ymForm:{type:'reachGoal', value:'boom_geoanalitika-forma'},
        ymClickBtn:{type:'reachGoal', value:'boom_geoanalitika-click'},
        img: globe_icon,
        title: 'BOOM геоаналитика',
        text: `Исследование аудитории пользователей Ваших сервисов. Отчеты по потенциальновый выручке. Сезонные исследования за 2 недели`
    },
    {
        ymForm:{type:'reachGoal', value:'boom_cloud-forma'},
        ymClickBtn:{type:'reachGoal', value:'boom_cloud-click'},
        img: folder,
        title: 'BOOM CLOUD (цифровое решение)',
        text: `Универсальная облачная платформа 
        для цифровой устойчивости Вашего бизнеса`
    },
    {
        ymForm:{type:'reachGoal', value:'boom_smart-forma'},
        ymClickBtn:{type:'reachGoal', value:'boom_smart-click'},
        img: blub,
        title: 'BOOM SMART',
        text: `Комплексное решение для прокачки 
        всех отделов бизнеса (Маркетинг, IT,  Продажи, 
        Обслуживание, Логистика, Финансы и т.д.)`
    },
    {
        ymForm:{type:'reachGoal', value:'udalennaya_rabota-forma'},
        ymClickBtn:{type:'reachGoal', value:'udalennaya_rabota-click'},
        img: computer,
        title: 'Решения для удаленной работы',
        text: `Все необходимые инструменты для 
        управления бизнесом и обслуживания 
        клиентов при удаленной работе`
    },
    {
        ymForm:{type:'reachGoal', value:'integratsyia-forma'},
        ymClickBtn:{type:'reachGoal', value:'integratsyia-click'},
        img: floppy,
        title: 'Системная интеграция (цифровизация бизнеса)',
        text: `Применение комплексных IT-решений 
        для внедрения новых технологий, сокращения 
        расходов и создания сервисов`
    },

]

const cardsGosSector = [
    {
        ymForm:{type:'reachGoal', value:'transport-forma'},
        ymClickBtn:{type:'reachGoal', value:'transport-click'},
        img: car,
        title: 'Управление общественным транспортом и городским трафиком',
        text: `Единая интеллектуальная транспортная
        система`
    },
    {
        ymForm:{type:'reachGoal', value:'obucheniye-forma'},
        ymClickBtn:{type:'reachGoal', value:'obucheniye-click'},
        img: red_book,
        title: 'Цифровизация образовательных учреждений',
        text: `РОББО Классы — занятия по робототехнике, VR/AR обучение, интерактивные классы`
    },
    {
        ymForm:{type:'reachGoal', value:'medicina-forma'},
        ymClickBtn:{type:'reachGoal', value:'medicina-click'},
        img: thermometer,
        title: 'Решения для автоматизации процессов в медицинских учреждениях',
        text: `Сервисы ЕГИСЗ, Электронная медицинская карта, Сервис персонифицированного учета медпомощи`
    },
    {
        ymForm:{type:'reachGoal', value:'kommunalnie-forma'},
        ymClickBtn:{type:'reachGoal', value:'kommunalnie-click'},
        img: magic_hat,
        title: 'Технологичные инструменты для городских коммунальных служб и горуправления',
        text: `Умное ЖКХ, энергоэффективное городское освещение`
    },
    {
        ymForm:{type:'reachGoal', value:'instrument_upravleniya-forma'},
        ymClickBtn:{type:'reachGoal', value:'instrument_upravleniya-click'},
        img: clapperboard,
        title: 'Инструменты для принятия решений и эффективного управления',
        text: `Планирование социальной инфраструктуры, оптимизация транспортной инфраструктуры`
    },


]

export default function Organisations() {
    const history = useHistory();
    let { type } = useParams();
    const { darkTheme } = useContext(GlobalContext);
    const [selectedCategory, setSelectedCategory] = React.useState(`${type && (type === ':small-biz' || type === ':big-biz' || type === ':gos-sector') ? type.split(':')[1] : 'small-biz'}`);
    React.useEffect(() => {
        setSelectedCategory(`${type && (type === ':small-biz' || type === ':big-biz' || type === ':gos-sector') ? type.split(':')[1] : 'small-biz'}`)
    }, [type])
    function handleCategoryChange(category) {
        console.log(category)
        setSelectedCategory(category)
    }

    const dispatch = useDispatch();
    function handleSubmit(service) {
        
        if (!service.title) {
            service.title = service.text 
        }
        service.desc = service.text 
        service.type = "organisations"
        console.log(service)
        if (service.ymClickBtn && service.ymForm) {
            sendMetriс(service.ymClickBtn.type, service.ymClickBtn.value)
            dispatch({ type: SHOW_MODAL, payload: { service, ym: { type: service.ymForm.type, value: service.ymForm.value } } })
        }
        else {
            dispatch({ type: SHOW_MODAL, payload: { service, ym: { type: 'reachGoal', value: 'free-service-forma' } } })
        }
    }
    
    return (
        <section className={`organisations`}>
            <MetaTags>
                <title>{selectedCategory === 'small-biz' ? 'Малый бизнес' : ''}{selectedCategory === 'big-biz' ? 'Крупный бизнес' : ''}{selectedCategory === 'gos-sector' ? 'Госсектор' : ''}</title>
                <meta property="og:title" content={`Boom - ${selectedCategory === 'small-biz' ? 'Малый бизнес' : ''}${selectedCategory === 'big-biz' ? 'Крупный бизнес' : ''}${selectedCategory === 'gos-sector' ? 'Госсектор' : ''}`} />
            </MetaTags>
            <div className={`organisations__head-container`}>
                <img className={`organisations__head-logo`} src={logo} alt="Услуги" />
                <h2 className={`organisations__head-title ${darkTheme ? 'organisations__text_dark' : ''}`}>Решения для<br />организаций</h2>
            </div>
            <div className={`organisations__head-buttons`}>
                <button onClick={() => {
                    history.push(':small-biz')
                    handleCategoryChange('small-biz')
                }} className={`organisations__head-button ${selectedCategory === "small-biz" ? "organisations__head-button_active" : ''} `}>
                    <p className={`organisations__head-button-text ${darkTheme ? 'organisations__head-button-text_dark' : ''} ${selectedCategory === "small-biz" ? "organisations__head-button-text_active" : ''} `}>Малый бизнес</p>
                </button>
                <button onClick={() => {
                    history.push(':big-biz')
                    handleCategoryChange('big-biz')
                }} className={`organisations__head-button ${selectedCategory === "big-biz" ? "organisations__head-button_active" : ''} `}>
                    <p className={`organisations__head-button-text  ${darkTheme ? 'organisations__head-button-text_dark' : ''} ${selectedCategory === "big-biz" ? "organisations__head-button-text_active" : ''}`}>Крупный бизнес</p>
                </button>
                <button onClick={() => {
                    history.push(':gos-sector')
                    handleCategoryChange('gos-sector')
                }} className={`organisations__head-button ${selectedCategory === "gos-sector" ? "organisations__head-button_active" : ''} `}>
                    <p className={`organisations__head-button-text ${darkTheme ? 'organisations__head-button-text_dark' : ''} ${selectedCategory === "gos-sector" ? "organisations__head-button-text_active" : ''} `}>Госсектор</p>
                </button>
            </div>
            <div className="base-container content-style">
                <div className="organisations-wrap">
                    <div className="block-pr">
                        <div className="row">
                            {
                                selectedCategory === 'small-biz' ?
                                    cardsMalBiz.map((item, i) => (
                                        <div className="col" key={i + Math.random() + item.title}>
                                            <div className={`block-pr__wrap ${darkTheme ? 'block-pr__wrap_dark' : ''}`}>
                                                <div className={`img-w `}>
                                                    <img src={item.img} alt="" />
                                                </div>
                                                <h3 className={`card-title ${darkTheme ? 'card-title_dark' : ''}`}>{item.title}</h3>
                                                <p className={`card-text ${darkTheme ? 'card-text_dark' : ''}`}>{item.text}</p>
                                                <div className="more" onClick={() => {
                                                    handleSubmit(item)
                                                }}>Подключить</div>
                                            </div>
                                        </div>
                                    ))
                                    : <></>}
                            {
                                selectedCategory === 'big-biz' ?
                                    cardsBigBiz.map((item, i) => (
                                        <div className="col" key={i + Math.random() + item.title}>
                                            <div className={`block-pr__wrap ${darkTheme ? 'block-pr__wrap_dark' : ''}`}>
                                                <div className="img-w">
                                                    <img src={item.img} alt="" />
                                                </div>
                                                <h3 className={`card-title ${darkTheme ? 'card-title_dark' : ''}`}>{item.title}</h3>
                                                <p className={`card-text ${darkTheme ? 'card-text_dark' : ''}`}>{item.text}</p>
                                                <div className="more" onClick={() => {
                                                    handleSubmit(item)
                                                }}>Подключить</div>
                                            </div>
                                        </div>
                                    ))
                                    : <></>}

                            {
                                selectedCategory === 'gos-sector' ?
                                    cardsGosSector.map((item, i) => (
                                        <div className="col" key={i + Math.random() + item.title}>
                                            <div className={`block-pr__wrap ${darkTheme ? 'block-pr__wrap_dark' : ''}`}>
                                                <div className="img-w">
                                                    <img src={item.img} alt="" />
                                                </div>
                                                <h3 className={`card-title ${darkTheme ? 'card-title_dark' : ''}`}>{item.title}</h3>
                                                <p className={`card-text ${darkTheme ? 'card-text_dark' : ''}`}>{item.text}</p>
                                                <div className="more" onClick={() => {
                                                    handleSubmit(item)
                                                }}>Подключить</div>
                                            </div>
                                        </div>
                                    ))
                                    : <></>}


                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
