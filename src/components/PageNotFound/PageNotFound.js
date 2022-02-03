import React, { useContext } from 'react';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../App';
import './PageNotFound.css';

function PageNotFound() {
  const { darkTheme } = useContext(GlobalContext);
  return (
    <div className="not-found">
      <MetaTags>
        <title>404 - Страница не найдена</title>
      </MetaTags>
      <h3 className={`not-found__title ${darkTheme ? 'not-found__text_dark' : ''}`}>
        404
      </h3>
      <p className={`not-found__text ${darkTheme ? 'not-found__text_dark' : ''}`}>
        Страница не найдена
      </p>
      <Link className="not-found__link-to-main" to="/">Назад</Link>
    </div>
  )
}

export default PageNotFound;
