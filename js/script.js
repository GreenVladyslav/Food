'use strict';
require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';


import calc from './modules/calc';
import cards from './modules/cards';
import form from './modules/form';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModal} from './modules/modal';


window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => {
        openModal('.modal', modalTimerId);
    }, 5000);
    
    tabs('.tabcontent', '.tabheader__item', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2022.10.31');
    modal('[data-modal]', '.modal', modalTimerId);
    cards();
    calc();
    form('form', modalTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
    });


});