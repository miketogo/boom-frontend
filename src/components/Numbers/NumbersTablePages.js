import React from 'react';
import NumbersTable from "./NumbersTable";

import './Numbers.css';


export default function NumbersTablePages(props) {


    return (
        <>
        {props.page === 1 && props.numbers && props.numbers.length > 0 ? props.numbers.map((item, i) => (
            <NumbersTable  key={item.ctn + 'comp'} handleCtnClick={props.handleCtnClick} item={item} setHoveredNumber={props.setHoveredNumber} i={i}  hoveredNumber={props.hoveredNumber} selectedNumbers={props.selectedNumbers}    />
        )) : props.page === 1 && !props.preloaderVisible && < p className={`numbers__contact ${props.darkTheme ? 'numbers__contact_dark' : ''}`}>Ничего не найдено</p>}

        {props.inputValue === '' && props.page > 1 && props.allNumbers && props.allNumbers.length > 0 && props.selectedCategoryID === 'all' ? props.allNumbers.slice((props.page - 1) * props.itemsPerPage, props.page * props.itemsPerPage).map((item, i) => (
           <NumbersTable key={item.ctn + 'comp'} handleCtnClick={props.handleCtnClick} item={item} setHoveredNumber={props.setHoveredNumber} i={i}  hoveredNumber={props.hoveredNumber} selectedNumbers={props.selectedNumbers}    />
        )) : !props.preloaderVisible && props.inputValue === '' && props.page > 1 && props.selectedCategoryID === 'all' && < p className={`numbers__contact ${props.darkTheme ? 'numbers__contact_dark' : ''}`}>Ничего не найдено</p>}

        {props.inputValue !== '' && props.page > 1 && props.filteredNumbers && props.filteredNumbers.length > 0 && props.selectedCategoryID === 'all' ? props.filteredNumbers.slice((props.page - 1) * props.itemsPerPage, props.page * props.itemsPerPage).map((item, i) => (
            <NumbersTable key={item.ctn + 'comp'} handleCtnClick={props.handleCtnClick} item={item} setHoveredNumber={props.setHoveredNumber} i={i}  hoveredNumber={props.hoveredNumber} selectedNumbers={props.selectedNumbers}    />
        )) : !props.preloaderVisible && props.inputValue !== '' && props.page > 1 && props.selectedCategoryID === 'all' && < p className={`numbers__contact ${props.darkTheme ? 'numbers__contact_dark' : ''}`}>Ничего не найдено</p>}

        {props.inputValue !== '' && props.page > 1 && props.filteredNumbers && props.filteredNumbers.length > 0 && props.selectedCategoryID !== 'all' ? props.filteredNumbers.slice((props.page - 1) * props.itemsPerPage, props.page * props.itemsPerPage).map((item, i) => (
            <NumbersTable key={item.ctn + 'comp'} handleCtnClick={props.handleCtnClick} item={item} setHoveredNumber={props.setHoveredNumber} i={i}  hoveredNumber={props.hoveredNumber} selectedNumbers={props.selectedNumbers}    />
        )) : !props.preloaderVisible && props.inputValue !== '' && props.page > 1 && props.selectedCategoryID !== 'all' && < p className={`numbers__contact ${props.darkTheme ? 'numbers__contact_dark' : ''}`}>Ничего не найдено</p>}

        {props.inputValue === '' && props.page > 1 && props.filteredNumbers && props.filteredNumbers.length > 0 && props.selectedCategoryID !== 'all' ? props.filteredNumbers.slice((props.page - 1) * props.itemsPerPage, props.page * props.itemsPerPage).map((item, i) => (
            <NumbersTable key={item.ctn + 'comp'} handleCtnClick={props.handleCtnClick} item={item} setHoveredNumber={props.setHoveredNumber} i={i}  hoveredNumber={props.hoveredNumber} selectedNumbers={props.selectedNumbers}    />
        )) : !props.preloaderVisible && props.inputValue === '' && props.page > 1 && props.selectedCategoryID !== 'all' && < p className={`numbers__contact ${props.darkTheme ? 'numbers__contact_dark' : ''}`}>Ничего не найдено</p>}
        </>
    )

}
