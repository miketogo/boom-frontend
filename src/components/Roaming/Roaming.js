import React, { useContext, useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_lang_RU from "@amcharts/amcharts4-geodata/lang/RU";

import { GlobalContext } from '../../App';

import './Roaming.css';
import { roamingData, allCountrues } from './roamingData'



am4core.useTheme(am4themes_animated);

export default function Roaming() {
    const { darkTheme } = useContext(GlobalContext);
    const [isSelectTariffOpen, setSelectTariffOpen] = React.useState(false);
    const [selectedTariff, setSelectedTariff] = React.useState('Базовый');
    const [inputValue, setInputValue] = React.useState('');
    const [isSuggestionsOpen, setSuggestionsOpen] = React.useState(false);
    const [suggestionsValue, setSuggestionsValue] = React.useState(null);
    const [polygon, setPolygon] = React.useState(null);
    const [countryValue, setCountryValue] = React.useState('');

    useEffect(() => {
        const chart = am4core.create("chartdiv", am4maps.MapChart);
        chart.preloader.disabled = true;
        // var interfaceColors = new am4core.InterfaceColorSet();

        // Set map definition
        try {
            chart.geodata = am4geodata_worldLow;
        }
        catch (e) {
            chart.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
        }


        // Set projection
        chart.preloader.disabled = true;

        chart.projection = new am4maps.projections.Orthographic();
        chart.panBehavior = "rotateLong";
        chart.seriesContainer.draggable = false;
        chart.seriesContainer.resizable = true;
        chart.maxZoomLevel = 1;
        chart.geodataNames = am4geodata_lang_RU;

        // chart.seriesContainer.cursorOverStyle = am4core.MouseCursorStyle.grab;
        // chart.seriesContainer.cursorDownStyle = am4core.MouseCursorStyle.grabbing;

        // Add zoom control

        if (!darkTheme){
            chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#ffffff");
            chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
        } else{
            chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#121212");
            chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
        }
       

        let graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());

        graticuleSeries.mapLines.template.stroke = am4core.color("#4565FE");

        graticuleSeries.mapLines.template.strokeOpacity = 1;
        graticuleSeries.mapLines.template.strokeDasharray = "6,3";
        graticuleSeries.mapLines.template.strokeWidth = 1;


        graticuleSeries.fitExtent = false;


        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        setPolygon(polygonSeries)
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.fill = am4core.color("#74B266");
        // Create hover state and set alternative fill color
        polygonSeries.mapPolygons.template.events.on("hit", function (ev) {
            setCountryValue('')
            setInputValue('')
            setInputValue(ev.target.dataItem.dataContext.name)
            if (allCountrues.sort().filter((itm) => {
                if (ev.target.dataItem.dataContext.name.toLowerCase() === '') {
                    return false
                }
                if (itm.toLowerCase().startsWith(ev.target.dataItem.dataContext.name.toLowerCase())) {
                    return true
                }
                return false
            }).length === 1) {
                console.log(ev.target.dataItem.dataContext.multiPolygon)
                let cordsArray = []
                for (let index = 0; index < ev.target.dataItem.dataContext.multiPolygon.length; index++) {
                    cordsArray = [...cordsArray, ev.target.dataItem.dataContext.multiPolygon[index][0][0][0]]
                }
                let sum = cordsArray.reduce((a, b) => a + b, 0);
                if(ev.target.dataItem.dataContext.name === "США"){
                    chart.animate({
                        property: "deltaLongitude",
                        to: 100
                    }, 1000);
                } else {
                    chart.animate({
                        property: "deltaLongitude",
                        to: (-1 * sum/cordsArray.length)
                    }, 1000);
                }
                // let country = polygonSeries.getPolygonById(ev.target.dataItem.dataContext.id);
                // chart.zoomToMapObject(country)
                // Pre-zoom

                // Set active state

                setCountryValue(ev.target.dataItem.dataContext.name.toLowerCase())
            }



        });
        let as = polygonTemplate.states.create("active");
        as.properties.fill = am4core.color("#3C4FFF");
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#3C4FFF");
        polygonSeries.useGeodata = true;
        polygonSeries.mapPolygons.template.nonScalingStroke = true;
        polygonSeries.calculateVisualCenter = true;
        polygonSeries.mapPolygons.template.fill = am4core.color("#4B75FC");
        polygonSeries.mapPolygons.template.stroke = am4core.color("#4B75FC");

        


        chart.deltaLongitude = -160;
        return () => {
            chart.dispose();
        };
    }, [darkTheme]);

    useEffect(() => {
        if (polygon && polygon.mapPolygons && polygon.mapPolygons.template )
        console.log(polygon.mapPolygons.template)
    }, [polygon]);
  

    function handleTariffSelect(tariff) {
        setSelectedTariff(tariff)
        setSelectTariffOpen(false)
    }
    function handleTariffOpen() {
        if (isSelectTariffOpen) {
            setSelectTariffOpen(false)
        } else {
            setSelectTariffOpen(true)
            setSuggestionsOpen(false)
        }
    }

    function handleInputChange(e) {
        let input = e.target.value
        setCountryValue('')
        let suggestions = allCountrues.sort().filter((item) => {
            if (input === '') {
                return false
            }
            if (item.toLowerCase().startsWith(input.toLowerCase())) {
                return true
            }
            return false
        })
        if (suggestions.length === 1 && suggestions.toString().length === input.length) {
            setCountryValue(suggestions.toString())
        }
        setSuggestionsValue(suggestions.slice(0, 3))
        setInputValue(input)

    }
    function handleSuggestionsFocus() {
        if (isSuggestionsOpen) {
            // setSuggestionsOpen(false)
            setTimeout(setSuggestionsOpen, 200, false)
        } else {
            setSuggestionsOpen(true)
            setSelectTariffOpen(false)
        }
    }
    function handleSuggestionClick(item) {

        let formatedItem = item && item.split(' ').length >= 2 ? item.split(' ').map((itm, i) => (itm && itm.length > 1 ? `${['остров', 'острова'].includes(itm) ? `${itm.toLowerCase()}` : `${itm.substring(0, 1).toUpperCase()}${itm.substring(1, itm.length).toLowerCase()}`} ` : `${itm.toLowerCase()} `)) : `${['сша'].includes(item) ? `${item.toUpperCase()}` : `${item.substring(0, 1).toUpperCase()}${item.substring(1, item.length).toLowerCase()}`}`
        let result = Array.isArray(formatedItem) ? formatedItem.join('').trim() : formatedItem
        setInputValue(result)
        let suggestions = allCountrues.sort().filter((itm) => {
            if (item === '') {
                return false
            }
            if (itm.toLowerCase().startsWith(item.toLowerCase())) {
                return true
            }
            return false
        })
        setSuggestionsValue(suggestions.slice(0, 3))
        if (countryValue) {
            console.log(selectedTariff, item)
        }
        setCountryValue(item)
    }

    const [zoneValue, setZoneValue] = React.useState(null);
    React.useEffect(() => {
        if (selectedTariff && countryValue) {
            if (roamingData.zone1.countries.includes(countryValue)) {
                console.log('zone1')
                setZoneValue(1)
            }
            if (roamingData.zone2.countries.includes(countryValue)) {
                console.log('zone2')
                setZoneValue(2)
            }
        } else {
            setZoneValue(null)
            setCountryValue('')

        }



    }, [selectedTariff, countryValue])
    return (
        <div className={`roaming `}>

            {/* <h2 className={`roaming__title ${darkTheme ? 'roaming__title_dark' : ''}`}>Роуминг</h2> */}
            <p className={`roaming__info-text ${darkTheme ? 'roaming__info-text_dark' : ''}`}>Выберите страну, в которую собираетесь поехать, и Ваш тариф</p>
            <form onSubmit={(e) => {
                e.preventDefault()
                if (countryValue) {
                    console.log(selectedTariff, countryValue)
                }

            }} autoComplete="off" className={`roaming__controllers`}>
                <div className={`roaming__input-container`}>
                    <input onBlur={handleSuggestionsFocus} onFocus={handleSuggestionsFocus} onChange={handleInputChange} value={inputValue} className={`roaming__input ${darkTheme ? 'roaming__input_dark' : ''}`} name="zcountry" type="text" placeholder='Страна' maxLength="100"></input>
                    <div className={`roaming__input-suggestions  ${isSuggestionsOpen ? 'roaming__input-suggestions_visible' : ''} ${darkTheme ? 'roaming__input-suggestions_dark' : ''}`}>
                        {isSuggestionsOpen && suggestionsValue ? suggestionsValue.map((item, i) => (
                            // <p className={`roaming__suggestion-text`}key={i}>{item.substring(0,1).toUpperCase()}{item.substring(1,item.length).toLowerCase()}</p>
                            <p onClick={() => handleSuggestionClick(item)} className={`roaming__suggestion-text ${darkTheme ? 'roaming__suggestion-text_dark' : ''}`} key={i}>{item && item.split(' ').length >= 2 ? item.split(' ').map((itm, i) => (itm && itm.length > 1 ? `${['остров', 'острова'].includes(itm) ? `${itm.toLowerCase()}` : `${itm.substring(0, 1).toUpperCase()}${itm.substring(1, itm.length).toLowerCase()}`} ` : `${itm.toLowerCase()} `)) : `${['сша'].includes(item) ? `${item.toUpperCase()}` : `${item.substring(0, 1).toUpperCase()}${item.substring(1, item.length).toLowerCase()}`}`}</p>
                        )) : <></>}
                        {isSuggestionsOpen && (suggestionsValue === null || (suggestionsValue && suggestionsValue.length === 0)) && <p className={`roaming__suggestion-text ${darkTheme ? 'roaming__suggestion-text_dark' : ''}`}>{inputValue !== '' ? 'Ничего не найдено' : 'Введите название страны'}</p>}
                        {/* <div onClick={handleSuggestionsFocus} className="background-click"></div> */}
                    </div>
                </div>
                <button onClick={handleTariffOpen} className={`roaming__select-button ${darkTheme ? 'roaming__select-button_dark' : ''}`} type="button">
                    <div className={`roaming__select-button-items`}>
                        <p className={`roaming__select-button-text ${darkTheme ? 'roaming__select-button-text_dark' : ''}`}>{selectedTariff}</p>
                        <svg className={`roaming__select-button-tick ${isSelectTariffOpen ? 'roaming__select-button-tick_rotated' : ''}`} width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 7V8H9V7H7Z" fill={darkTheme ? '#fff' : '#010101'} />
                        </svg>

                    </div>
                    <div className={`roaming__select-items ${isSelectTariffOpen ? 'roaming__select-items_visible' : ''} ${darkTheme ? 'roaming__select-items_dark' : ''}`}>
                        {selectedTariff === 'Базовый' ? <></> : <p onClick={() => handleTariffSelect('Базовый')} className={`roaming__select-item ${darkTheme ? 'roaming__select-item_dark' : ''}`}>Базовый</p>}
                        {selectedTariff === 'Яркий' ? <></> : <p onClick={() => handleTariffSelect('Яркий')} className={`roaming__select-item ${darkTheme ? 'roaming__select-item_dark' : ''}`}>Яркий</p>}
                        {selectedTariff === 'Расширенный' ? <></> : <p onClick={() => handleTariffSelect('Расширенный')} className={`roaming__select-item ${darkTheme ? 'roaming__select-item_dark' : ''}`}>Расширенный</p>}
                        {selectedTariff === 'Бизнес' ? <></> : <p onClick={() => handleTariffSelect('Бизнес')} className={`roaming__select-item ${darkTheme ? 'roaming__select-item_dark' : ''}`}>Бизнес</p>}
                        {selectedTariff === 'VIP' ? <></> : <p onClick={() => handleTariffSelect('VIP')} className={`roaming__select-item ${darkTheme ? 'roaming__select-item_dark' : ''}`}>VIP</p>}
                        {/* <div onClick={handleTariffOpen} className="background-click"></div> */}
                    </div>
                </button>
            </form>
            <div className={`roaming__popular`}>
                <p className={`roaming__popular-text ${darkTheme ? 'roaming__popular-text_dark' : ''}`}>Популярные:</p>
                <div className={`roaming__popular-items`}>
                    <div onClick={() => handleSuggestionClick('египет')} className={`roaming__popular-item ${darkTheme ? 'roaming__popular-item_dark' : ''}`}>

                        <svg className={`roaming__popular-item-flag`} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0)">
                                <path d="M0 6.21643C0 5.66414 0.447715 5.21643 1 5.21643H27C27.5523 5.21643 28 5.66415 28 6.21643V11.0722H0V6.21643Z" fill="#FF0000" />
                                <rect y="11.0739" width="28" height="5.85577" fill="white" />
                                <path d="M0 16.9263H28V21.782C28 22.3343 27.5523 22.782 27 22.782H1C0.447715 22.782 0 22.3343 0 21.782V16.9263Z" fill="#1C120F" />
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="28" height="28" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <p className={`roaming__popular-item-text ${darkTheme ? 'roaming__popular-item-text_dark' : ''}`}>Египет</p>
                    </div>
                    <div onClick={() => handleSuggestionClick('турция')} className={`roaming__popular-item`}>
                        <svg className={`roaming__popular-item-flag`} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 6.25C0 5.69772 0.447715 5.25 1 5.25H27C27.5523 5.25 28 5.69772 28 6.25V21.75C28 22.3023 27.5523 22.75 27 22.75H1C0.447715 22.75 0 22.3023 0 21.75V6.25Z" fill="#D60A2E" />
                            <path d="M10.7416 18.0774C10.15 18.0775 9.56571 17.9445 9.03068 17.6878C8.49564 17.4311 8.02311 17.0572 7.64699 16.5928C7.27087 16.1284 7.00049 15.5852 6.85525 15.002C6.71001 14.4188 6.69351 13.8101 6.80693 13.2196C6.92036 12.6292 7.16089 12.0716 7.51128 11.5868C7.86167 11.1021 8.31322 10.7023 8.83354 10.416C9.35385 10.1297 9.93003 9.96412 10.5207 9.93109C11.1114 9.89805 11.702 9.9984 12.25 10.2249C11.5212 9.50862 10.6012 9.02634 9.6047 8.8382C8.6082 8.65006 7.57928 8.7644 6.64624 9.16694C5.7132 9.56949 4.91732 10.2424 4.35783 11.1019C3.79834 11.9613 3.5 12.9693 3.5 14C3.5 15.0307 3.79834 16.0387 4.35783 16.8981C4.91732 17.7576 5.7132 18.4305 6.64624 18.8331C7.57928 19.2356 8.6082 19.3499 9.6047 19.1618C10.6012 18.9737 11.5212 18.4914 12.25 17.7751C11.7712 17.9743 11.2589 18.077 10.7416 18.0774V18.0774Z" fill="#F0F0F0" />
                            <path d="M17.3084 13.0761L15.3643 13.8596L14.0638 12.25L14.2293 14.2879L12.25 14.9841L14.301 15.4938L14.3737 17.5L15.5119 15.8535L17.5 16.3209L16.1532 14.7951L17.3084 13.0761Z" fill="#F0F0F0" />
                        </svg>
                        <p className={`roaming__popular-item-text ${darkTheme ? 'roaming__popular-item-text_dark' : ''}`}>Турция</p>
                    </div>
                    <div onClick={() => handleSuggestionClick('греция')} className={`roaming__popular-item`}>
                        <svg className={`roaming__popular-item-flag`} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0)">
                                <path d="M0 6.25C0 5.69772 0.447715 5.25 1 5.25H27C27.5523 5.25 28 5.69772 28 6.25V21.75C28 22.3023 27.5523 22.75 27 22.75H1C0.447715 22.75 0 22.3023 0 21.75V6.25Z" fill="#0B55B1" />
                                <rect x="4.375" y="5.25" width="1.75" height="10.5" fill="#F0F0F0" />
                                <rect x="10.5" y="9.96094" width="1.75" height="10.5" transform="rotate(90 10.5 9.96094)" fill="#F0F0F0" />
                                <rect x="28" y="8.20996" width="1.75" height="17.5" transform="rotate(90 28 8.20996)" fill="#F0F0F0" />
                                <rect x="28" y="15.75" width="1.75" height="28" transform="rotate(90 28 15.75)" fill="#F0F0F0" />
                                <rect x="28" y="11.71" width="1.78281" height="17.5" transform="rotate(90 28 11.71)" fill="#F0F0F0" />
                                <rect x="28" y="19.25" width="1.75" height="28" transform="rotate(90 28 19.25)" fill="#F0F0F0" />
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="28" height="28" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <p className={`roaming__popular-item-text ${darkTheme ? 'roaming__popular-item-text_dark' : ''}`}>Греция</p>
                    </div>
                </div>

            </div>
            <div id="chartdiv" className={`roaming__globe`} ></div>
            {selectedTariff && countryValue ?
                <div className={`roaming__info`}>
                    <div className={`roaming__internet-container ${darkTheme ? 'roaming__internet-container_dark' : ''}`}>
                        <h3 className={`roaming__internet-title ${darkTheme ? 'roaming__internet-title_dark' : ''}`}>Интернет</h3>
                        {zoneValue && zoneValue === 1 ?
                            <>
                                <p className={`roaming__internet-text ${darkTheme ? 'roaming__internet-text_dark' : ''}`}>Пакет 50 Мб на день <span className={`roaming__internet-text_bold ${darkTheme ? 'roaming__internet-text_bold_dark' : ''}`}>&#183;</span> <span className={`roaming__internet-text_bold ${darkTheme ? 'roaming__internet-text_bold_dark' : ''}`}>{roamingData.zone1.internet.package} р</span></p>
                                <p className={`roaming__internet-text ${darkTheme ? 'roaming__internet-text_dark' : ''}`}>1 Мб после исчерпания 50 Мб <span className={`roaming__internet-text_bold ${darkTheme ? 'roaming__internet-text_bold_dark' : ''}`}>&#183;</span> <span className={`roaming__internet-text_bold ${darkTheme ? 'roaming__internet-text_bold_dark' : ''}`}>{roamingData.zone1.internet.perOne} р</span></p>
                            </>
                            : <></>}
                        {zoneValue && zoneValue === 2 ?
                            <>
                                <p className={`roaming__internet-text ${darkTheme ? 'roaming__internet-text_dark' : ''}`}>1 Мб <span className={`roaming__internet-text_bold ${darkTheme ? 'roaming__internet-text_bold_dark' : ''}`}>&#183;</span> <span className={`roaming__internet-text_bold ${darkTheme ? 'roaming__internet-text_bold_dark' : ''}`}>{roamingData.zone2.internet.perOne} р</span></p>
                            </>
                            : <></>}

                    </div>
                    <div className="break"> </div>
                    <div className={`roaming__call-container ${darkTheme ? 'roaming__call-container_dark' : ''}`}>
                        <h3 className={`roaming__call-title ${darkTheme ? 'roaming__call-title_dark' : ''}`}>Звонки</h3>
                        {zoneValue && zoneValue === 1 ?
                            <>
                                <p className={`roaming__call-text ${darkTheme ? 'roaming__call-text_dark' : ''}`}>Входящие вызовы <span className={`roaming__call-text_bold ${darkTheme ? 'roaming__call-text_bold_dark' : ''}`}>&#183;</span> <span className={`roaming__call-text_bold ${darkTheme ? 'roaming__call-text_bold_dark' : ''}`}>{roamingData.zone1.incomeVoice} р за минуту</span></p>
                                <p className={`roaming__call-text ${darkTheme ? 'roaming__call-text_dark' : ''}`}>Исходящие вызовы в РФ <span className={`roaming__call-text_bold ${darkTheme ? 'roaming__call-text_bold_dark' : ''}`}>&#183;</span> <span className={`roaming__call-text_bold ${darkTheme ? 'roaming__call-text_bold_dark' : ''}`}>{roamingData.zone1.outcomeVoiceRU} р за минуту</span></p>
                                <p className={`roaming__call-text ${darkTheme ? 'roaming__call-text_dark' : ''}`}>Исходящие внутри страны пребывания <span className={`roaming__call-text_bold ${darkTheme ? 'roaming__call-text_bold_dark' : ''}`}>&#183;</span> <span className={`roaming__call-text_bold ${darkTheme ? 'roaming__call-text_bold_dark' : ''}`}>{roamingData.zone1.outcomeVoiceAll} р за минуту</span></p>
                            </>
                            : <></>}
                        {zoneValue && zoneValue === 2 ?
                            <>
                                <p className={`roaming__call-text ${darkTheme ? 'roaming__call-text_dark' : ''}`}>Входящие вызовы <span className={`roaming__call-text_bold ${darkTheme ? 'roaming__call-text_bold_dark' : ''}`}>&#183;</span> <span className={`roaming__call-text_bold ${darkTheme ? 'roaming__call-text_bold_dark' : ''}`}>{roamingData.zone2.incomeVoice} р за минуту</span></p>
                                <p className={`roaming__call-text ${darkTheme ? 'roaming__call-text_dark' : ''}`}>Исходящие вызовы в РФ <span className={`roaming__call-text_bold ${darkTheme ? 'roaming__call-text_bold_dark' : ''}`}>&#183;</span> <span className={`roaming__call-text_bold ${darkTheme ? 'roaming__call-text_bold_dark' : ''}`}>{roamingData.zone2.outcomeVoiceRU} р за минуту</span></p>
                                <p className={`roaming__call-text ${darkTheme ? 'roaming__call-text_dark' : ''}`}>Исходящие внутри страны пребывания <span className={`roaming__call-text_bold ${darkTheme ? 'roaming__call-text_bold_dark' : ''}`}>&#183;</span> <span className={`roaming__call-text_bold ${darkTheme ? 'roaming__call-text_bold_dark' : ''}`}>{roamingData.zone2.outcomeVoiceAll} р за минуту</span></p>
                            </>
                            : <></>}

                    </div>
                    <div className="break"> </div>
                    <div className={`roaming__sms-container ${darkTheme ? 'roaming__sms-container_dark' : ''}`}>
                        <h3 className={`roaming__sms-title ${darkTheme ? 'roaming__sms-title_dark' : ''}`}>Сообщения</h3>
                        {zoneValue && zoneValue === 1 ?
                            <>
                                <p className={`roaming__sms-text  ${darkTheme ? 'roaming__sms-text_dark' : ''}`}>Исходящие SMS сообщение <span className={`roaming__sms-text_bold ${darkTheme ? 'roaming__sms-text_bold_dark' : ''}`}>&#183;</span> <span className={`roaming__sms-text_bold ${darkTheme ? 'roaming__sms-text_bold_dark' : ''}`}>{roamingData.zone1.outcomeSms} р за SMS</span></p>
                            </>
                            : <></>}
                        {zoneValue && zoneValue === 2 ?
                            <>
                                <p className={`roaming__sms-text ${darkTheme ? 'roaming__sms-text_dark' : ''}`}>Исходящие SMS сообщение <span className={`roaming__sms-text_bold ${darkTheme ? 'roaming__sms-text_bold_dark' : ''}`}>&#183;</span> <span className={`roaming__sms-text_bold ${darkTheme ? 'roaming__sms-text_bold_dark' : ''}`}> {roamingData.zone2.outcomeSms} р за SMS</span></p>
                            </>
                            : <></>}

                    </div>

                </div>
                :
                <>

                    <div className="roaming__plug"></div>
                </>

            }



        </div>
    )
}
