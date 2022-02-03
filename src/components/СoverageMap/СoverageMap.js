import React from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import './СoverageMap.css';


export default function СoverageMap() {
    const [addressValue, setAddressValue] = React.useState('');
    const [isAddressFocused, setAddressFocused] = React.useState(false);
    const [twoGChecked, setTwoGChecked] = React.useState(false)
    const [threeGChecked, setThreeGChecked] = React.useState(false)
    const [fourGChecked, setFourGChecked] = React.useState(false)

    function handleAddressChange(e) {
        setAddressValue(e.target.value)
    }
    function handleAddressFocus(e) {
        if (isAddressFocused) {
            setAddressFocused(false)
        } else {
            setAddressFocused(true)
        }

    }

    return (
        <div className="coverage-map">
            <div className="coverage-map__controllers">
                <h2 className="coverage-map__controllers-title">Карта покрытия</h2>

                <div className="coverage-map__handlers">
                    <div className={`coverage-map__input-container ${isAddressFocused ? "coverage-map__input-container_focused" : ""}`}>
                        <input onBlur={handleAddressFocus} onFocus={handleAddressFocus} className="coverage-map__input" name="number" type="text" value={addressValue} onChange={handleAddressChange} placeholder='Введите город или адрес' maxLength="40"></input>
                    </div>
                    <div onClick={() => setTwoGChecked(twoGChecked => !twoGChecked)} className={`coverage-map__switch  ${twoGChecked ? 'coverage-map__switch_active' : ''}`}>
                        <div className={`coverage-map__switch-item ${twoGChecked ? 'coverage-map__switch-item_active' : ''}`}>
                            <p className={`coverage-map__switch-text ${twoGChecked ? 'coverage-map__switch-text_active' : ''}`}>2G</p>
                        </div>

                    </div>
                    <div onClick={() => setThreeGChecked(threeGChecked => !threeGChecked)} className={`coverage-map__switch  ${threeGChecked ? 'coverage-map__switch_active' : ''}`}>
                        <div className={`coverage-map__switch-item ${threeGChecked ? 'coverage-map__switch-item_active' : ''}`}>
                            <p className={`coverage-map__switch-text ${threeGChecked ? 'coverage-map__switch-text_active' : ''}`}>3G</p>
                        </div>

                    </div>
                    <div onClick={() => setFourGChecked(fourGChecked => !fourGChecked)} className={`coverage-map__switch  ${fourGChecked ? 'coverage-map__switch_active' : ''}`}>
                        <div className={`coverage-map__switch-item ${fourGChecked ? 'coverage-map__switch-item_active' : ''}`}>
                            <p className={`coverage-map__switch-text ${fourGChecked ? 'coverage-map__switch-text_active' : ''}`}>4G</p>
                        </div>

                    </div>
                </div>


            </div>
            <div className="coverage-map__map-controllers">
                <div className="coverage-map__map-controller">
                    <p className="coverage-map__map-controller-text">+</p>
                </div>
                <div className="coverage-map__map-controller">
                    <p className="coverage-map__map-controller-text">-</p>
                </div>
                <div className="coverage-map__map-controller">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0)">
                            <rect width="24" height="24" fill="white" />
                            <path d="M23.5273 0.090813C23.2856 -0.030271 23.001 -0.030271 22.7594 0.090813L0.474429 11.2333C0.0511122 11.4452 -0.120294 11.9601 0.0915405 12.3834C0.212122 12.6243 0.439023 12.7946 0.704092 12.843L9.54865 14.4518L11.1574 23.2963C11.2233 23.6589 11.5136 23.9388 11.8783 23.9914C11.9186 23.9973 11.9593 24.0001 12 24C12.3248 24.0002 12.6219 23.8167 12.7671 23.526L23.9096 1.24104C24.1217 0.81782 23.9505 0.302848 23.5273 0.090813ZM12.3832 20.4592L11.1283 13.5612C11.0634 13.2128 10.7909 12.9403 10.4426 12.8755L3.54121 11.6173L21.226 2.77445L12.3832 20.4592Z" fill="#121212" />
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>

            </div>
            <YMaps>
                <div>
                    <Map className="coverage-map__map" defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
                </div>
            </YMaps>
        </div>
    )

}
