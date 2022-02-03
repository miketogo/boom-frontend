import React from 'react';
import './MainCards.css';
import firstBg from '../../assets/images/main-cards/first-bg.png'
import rightBg from '../../assets/images/main-cards/right-bg.png'
import headphones from '../../assets/images/main-cards/headphones.png'
import blurCylinder from '../../assets/images/main-cards/blur-cylinder.png'
import wave from '../../assets/images/main-cards/wave.png'
import map from '../../assets/images/main-cards/map.png'
import blurTriangle from '../../assets/images/main-cards/blur-triangle.png'
import planes from '../../assets/images/main-cards/planes.png'
import clock from '../../assets/images/main-cards/clock.png'
import cylinder from '../../assets/images/main-cards/cylinder.png'
import sphere from '../../assets/images/main-cards/sphere.png'
import blurBigTriangle from '../../assets/images/main-cards/blur-big-triangle.png'
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    overflow: hidden;
    margin: 0 -80px;
    @media(max-width: 1500px) {
        margin: 0 -40px;
    }
    @media(max-width: 720px) {
        margin: 0 -5vw;
    }
`

export default function MainCards() {
    const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
    function handleResize() {
        setScreenWidth(window.innerWidth)
        window.removeEventListener('resize', handleResize);
    }
    React.useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
    return (
        <Wrapper>
        <section className={`main__cards`}>
            {screenWidth > 703 ? <>
                <div className={`main__left-cards`}>
                    <div className={`main__card`}>
                        <p className={`main__card-text`}>
                            Запись и прослушивание своих разговоров
                        </p>
                        <img className={`main__card-bg`} src={firstBg} alt="1" />
                        <img className={`main__card-blur-cylinder`} src={blurCylinder} alt="1" />
                        <img className={`main__card-wave`} src={wave} alt="1" />
                        <img className={`main__card-headphones`} src={headphones} alt="наушники" />
                        <div className={`main__card-bg-shadow`}></div>

                    </div>
                    <div className={`main__card`}>
                        <p className={`main__card-text`}>
                            Безлимитный интернет 4G по всей России
                        </p>
                        <img className={`main__card-bg`} src={firstBg} alt="1" />

                        <img className={`main__card-map`} src={map} alt="1" />
                        <img className={`main__card-blur-triangle`} src={blurTriangle} alt="наушники" />
                        <div className={`main__card-bg-shadow`}></div>


                    </div>
                </div>
                <div className={`main__right-cards`}>
                    <div className={`main__card`}>
                        <p className={`main__card-text_left`}>
                            Моментальная смена номера
                        </p>
                        <p className={`main__card-subtext_left`}>Только для eSIM</p>
                        <img className={`main__card-bg`} src={rightBg} alt="1" />
                        <img className={`main__card-clock`} src={clock} alt="1" />
                        <img className={`main__card-cylinder`} src={cylinder} alt="1" />
                        <img className={`main__card-sphere`} src={sphere} alt="1" />
                        <div className={`main__card-bg-shadow`}></div>

                    </div>
                    <div className={`main__card`}>
                        <p className={`main__card-text_left`}>
                            Большой список красивых номеров
                        </p>
                        <img className={`main__card-bg`} src={rightBg} alt="1" />
                        <img className={`main__card-blur-big-triangle`} src={blurBigTriangle} alt="1" />
                        <img className={`main__card-planes`} src={planes} alt="1" />
                        <div className={`main__card-bg-shadow`}></div>


                    </div>
                </div></>
                : <>
                    <div className={`main__left-cards`}>
                        <div className={`main__card`}>
                            <p className={`main__card-text`}>
                                Запись и прослушивание своих разговоров
                            </p>
                            <img className={`main__card-bg`} src={firstBg} alt="1" />
                            <img className={`main__card-blur-cylinder`} src={blurCylinder} alt="1" />
                            <img className={`main__card-wave`} src={wave} alt="1" />
                            <img className={`main__card-headphones`} src={headphones} alt="наушники" />
                            <div className={`main__card-bg-shadow`}></div>

                        </div>

                        <div className={`main__card`}>
                            <p className={`main__card-text_left`}>
                                Моментальная смена номера
                            </p>
                            <p className={`main__card-subtext_left`}>Только для eSIM</p>
                            <img className={`main__card-bg`} src={rightBg} alt="1" />
                            <img className={`main__card-clock`} src={clock} alt="1" />
                            <img className={`main__card-cylinder`} src={cylinder} alt="1" />
                            <img className={`main__card-sphere`} src={sphere} alt="1" />
                            <div className={`main__card-bg-shadow`}></div>

                        </div>
                    </div>
                    <div className={`main__right-cards`}>
                        <div className={`main__card`}>
                            <p className={`main__card-text`}>
                                Безлимитный интернет 4G по всей России
                            </p>
                            <img className={`main__card-bg`} src={firstBg} alt="1" />

                            <img className={`main__card-map`} src={map} alt="1" />
                            <img className={`main__card-blur-triangle`} src={blurTriangle} alt="наушники" />
                            <div className={`main__card-bg-shadow`}></div>


                        </div>
                        <div className={`main__card`}>
                            <p className={`main__card-text_left`}>
                                Большой список красивых номеров
                            </p>
                            <img className={`main__card-bg`} src={rightBg} alt="1" />
                            <img className={`main__card-blur-big-triangle`} src={blurBigTriangle} alt="1" />
                            <img className={`main__card-planes`} src={planes} alt="1" />
                            <div className={`main__card-bg-shadow`}></div>


                        </div>
                    </div></>}
        </section>
        </Wrapper>
    )

}
