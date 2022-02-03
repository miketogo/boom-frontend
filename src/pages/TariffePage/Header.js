import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import LogoImg from "../TariffePage/img/logo.png"

export default function header(props) {

  return (
    <div className="wrap">
      <ul className={`crumbs ${props.darkTheme? 'crumbs_dark':''}`}>
        <li >
          <Link className={props.darkTheme? 'crumbs-first_dark':''} to="/tariffs">тарифы</Link>
        </li>
        <li>{props.tariff.title ? props.tariff.title : 'Неизвестный тариф'}</li>
      </ul>
      <div className={`box-logo d-flex ${props.darkTheme? 'logo_dark':''}`}>
        <img src={props.tariff.icon ? props.tariff.icon : LogoImg} alt='Иконка тарифа' />
        <h1 className={`tariff-page__tariff-name`}>{props.tariff.title ? props.tariff.title : 'Похоже такого тарифа нет'}</h1>
      </div>
      

    </div>
  );
}
