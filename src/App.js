import React, { createContext, useEffect, useState, Suspense, useMemo } from "react";
import styled, { ThemeProvider } from "styled-components/macro";
import 'cleave.js/dist/addons/cleave-phone.ru';
import { useSelector } from "react-redux";
import { Switch, Route, Redirect, withRouter, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import urlUtmParams from 'url-utm-params'
import publicIp from "public-ip";

import { useLocalStorage, usePrevious } from "./hooks";

import Preloader from "./globals/Preloader/Preloader"
import LoginForm from "./globals/LoginForm";
import Nav from "./globals/Nav";
import Main from "./pages/Main";
import BuyNumberModal from "./components/BuyNumberModal";
import Footer from "./globals/Footer/Footer";
import Scrollbar from 'smooth-scrollbar';
import ScrollToTop from "./globals/ScrollToTop";


const TariffPage = React.lazy(() => import('./pages/TariffPage/TariffPage'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const NumbersPage = React.lazy(() => import('./pages/NumbersPage/NumbersPage'));
const AboutCompany = React.lazy(() => import('./pages/AboutCompany/AboutCompany'));
const OrganisationsPage = React.lazy(() => import('./pages/OrganisationsPage/OrganisationsPage'));
const TariffePage = React.lazy(() => import('./pages/TariffePage/TariffePage'));
const PageNotFound = React.lazy(() => import('./components/PageNotFound/PageNotFound'));
const Services = React.lazy(() => import('./pages/Services/Services'));



export const GlobalContext = createContext();

const Wrapper = styled.div`
font-family: Circe, Arial, sans-serif;
  position: relative;
  width: 100%;
  min-height:100vh;
  max-width: 2560px;
  margin: 0 auto;
  height: fit-content;
  background: ${props => props.theme.background};
  color:  ${props => props.theme.textColor};
  padding: 48px 80px 0 80px;
  @media(max-width: 1500px) {
    padding: 48px 40px 0 40px;
  }
  @media(max-width: 720px) {
    padding: 5vw 5vw 0 5vw;
  }
  @media(max-width: 550px) {
      /* padding: ${props => props.pathname === "/dashboard" && '5vw 8px 0 8px'}; */
  }
`;

export default withRouter(function App({ location }) {
  const [darkTheme, setDarkTheme] = useLocalStorage("darkTheme");


  darkTheme === null && setDarkTheme(false)
  const [loginForm, setLoginForm] = useState(false);
  const [userIP, setUserIP] = useState('Не определен');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1100);
  const [isPhone, setIsPhone] = useState(window.innerWidth <= 600);
  const [scrollY, setScrollY] = useState(0);
  const buyNumberModal = useSelector(store => store.buyNumberModal);
  const [ctn, saveCtn] = useLocalStorage("ctn");
  const [showMobileNav, setShowMobileNav] = useState(false);

  const whichTheme = (darkTheme) => {
    if (darkTheme) {
      return {
        background: "#010101",
        textColor: "#ffffff",
        darkTheme
      }
    } else {
      return {
        background: "#F8F8F8",
        textColor: "#121212",
        darkTheme
      }
    }
  }

  useEffect(() => {

    let utmParams = urlUtmParams.utm(window.location.href)

    if (Object.keys(utmParams).length > 0) {
      let utm = {}

      if (utmParams.utm_source) {
        utm.utm_source = decodeURI(utmParams.utm_source)
      }
      if (utmParams.utm_medium) {
        utm.utm_medium = decodeURI(utmParams.utm_medium)
      }
      if (utmParams.utm_campaign) {
        utm.utm_campaign = decodeURI(utmParams.utm_campaign)
      }
      if (utmParams.utm_term) {
        utm.utm_term = decodeURI(utmParams.utm_term)
      }
      if (utmParams.utm_content) {
        utm.utm_content = decodeURI(utmParams.utm_content)

      }
      localStorage.setItem('utm', JSON.stringify(utm));

    }

  }, [location])

  useEffect(() => {
    (async () => {
      setUserIP(await publicIp.v4());

    })();
    const watcher = () => {
      setIsMobile(window.innerWidth < 1100);
      setIsPhone(window.innerWidth <= 600);
    };
    const watcher2 = () => setScrollY(window.scrollY)
    window.addEventListener("resize", watcher);
    window.addEventListener("scroll", watcher2);
    return () => {
      window.removeEventListener("resize", watcher);
      window.removeEventListener("scroll", watcher2);
    };
  }, [])
  

  const { pathname } = useLocation();
  const prevPath = usePrevious(pathname);

  const scrollbar = useMemo(() => {
    if (isPhone && (pathname === "/" || pathname.startsWith("/tariffs")) && !(buyNumberModal.show || loginForm || showMobileNav)) {
      return Scrollbar.init(document.body, { damping: 0.1 })
    }
  }, [buyNumberModal.show, isPhone, loginForm, pathname, showMobileNav])

  useEffect(() => {
    if (scrollbar) {
      const listener = ({ offset }) => setScrollY(offset.y);
      scrollbar.addListener(listener);
      return () => {
        scrollbar.removeListener(listener)
      }
    }
  }, [scrollbar])


  useEffect(() => {
    if (buyNumberModal.show || loginForm || showMobileNav || !isPhone || !(pathname === "/" || pathname.startsWith("/tariffs"))) {
      Scrollbar.destroy(document.body)
      if (showMobileNav) {
        window.scrollTo(0, 0)
      }
    } 

  }, [buyNumberModal.show, isPhone, loginForm, scrollY, scrollbar, pathname, prevPath, showMobileNav])



  return (
    <>
      <ScrollToTop scrollbar={scrollbar} />
      <GlobalContext.Provider value={{ darkTheme, setDarkTheme, setLoginForm, isMobile, isPhone, ctn, saveCtn, showMobileNav, setShowMobileNav, scrollbar }}>
        <ThemeProvider theme={whichTheme(darkTheme)}>
          <div className={`app ${darkTheme ? 'app_dark' : ''}`}>
            <Wrapper pathname={pathname}>
              <Nav />
              <Switch>
                <Route exact path="/" component={Main} />

                <Route path="/tariffs/:type">
                  <Suspense fallback={<div className='app__preloader'><Preloader /></div>}>
                    <TariffPage />
                  </Suspense>
                </Route>

                <Route path="/tariffs">
                  <Redirect to="/tariffs/:all" />
                </Route>

                <Route path="/dashboard">
                  <Suspense fallback={<div className='app__preloader'><Preloader /></div>}>
                    <Dashboard />
                  </Suspense>
                </Route>

                <Route path="/d" >
                  <Redirect to="/dashboard" />
                </Route>

                <Route path="/numbers/:button">
                  <Suspense fallback={<div className='app__preloader'><Preloader /></div>}>
                    <NumbersPage userIP={userIP} />
                  </Suspense>
                </Route>

                <Route path="/numbers">
                  <Redirect to="/numbers/:все" />
                </Route>

                <Route path="/services/:type">
                  <Suspense fallback={<div className='app__preloader'><Preloader /></div>}>
                    <Services />
                  </Suspense>
                </Route>

                <Route path="/services">
                  <Redirect to="/services/:paid" />
                </Route>

                <Route path="/organisations/:type">
                  <Suspense fallback={<div className='app__preloader'><Preloader /></div>}>
                    <OrganisationsPage />
                  </Suspense>
                </Route>

                <Route path="/organisations">
                  <Redirect to="/organisations/:small-biz" />
                </Route>

                <Route path="/tariff-info/:tariff">
                  <Suspense fallback={<div className='app__preloader'><Preloader /></div>}>
                    <TariffePage />
                  </Suspense>
                </Route>

                <Route path="/support/about-us" >
                  <Suspense fallback={<div className='app__preloader'><Preloader /></div>}>
                    <AboutCompany />
                  </Suspense>
                </Route>

                <Route path="/support">
                  <Redirect to="/support/about-us" />
                </Route>

                <Route path="*">
                  <Suspense fallback={<div className='app__preloader'><Preloader /></div>}>
                    <PageNotFound />
                  </Suspense>
                </Route>
              </Switch>
              <Footer />
            </Wrapper>
            <AnimatePresence>
              {loginForm && <LoginForm />}
              {buyNumberModal.show && <BuyNumberModal userIP={userIP} buy={buyNumberModal.buy} numbers={buyNumberModal.numbers} payload={buyNumberModal.payload} />}
            </AnimatePresence>
          </div>

        </ThemeProvider>
      </GlobalContext.Provider>
    </>
  )

})
