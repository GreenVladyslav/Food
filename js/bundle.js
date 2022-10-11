/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    const result = document.querySelector('.calculating__result span');
    let sex,
        height, weight, age,
        ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '___';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function getStaticInforamtion(parentSelector, activeClass) {
        const elements = document.querySelectorAll(parentSelector);

        elements.forEach(elem => {
            elem.addEventListener('click', (event) => {
                if (event.target.getAttribute('data-ratio')) {
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
                } else {
                    sex = event.target.getAttribute('id');
                    localStorage.setItem('sex', event.target.getAttribute('id'));
                }
                // console.log(ratio, sex);

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                event.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }

    getStaticInforamtion('#gender div', 'calculating__choose-item_active');
    getStaticInforamtion('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/ig)) {
                input.style.border = '1px solid #ff0000';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/calcScroll.js":
/*!**********************************!*\
  !*** ./js/modules/calcScroll.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calcScroll() {
    const div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.append(div);

    let scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();

    return scrollWidth;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calcScroll);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    class MenuCard {
        constructor(src, alt, subtitle, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 40;
            this.changeToUAH();
        }
        changeToUAH() {
            this.price = +this.price * this.transfer;
        }
        render() {
            const card = document.createElement('div');

            if (this.classes.length === 0) { /* переденанное количество классов */
                this.classes = 'menu__item'; /*this.classes это пустой массив так как ...rest передает массив и мы ему ставим параметры по умолчанию */
                card.classList.add(this.classes);
            } else {
                this.classes.forEach(className => card.classList.add(className)); /* все остальные классы добавлю card */
            }

            card.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

           this.parent.append(card);
        }
    }


    // const getResource = async (url) => {
    //     const res = await fetch(url);

    //     if (!res.ok) {
    //         throw new Error (`Could now fetch ${url}, status: ${res.status}`);
    //     }

    //     return res.json();
    // };

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard (img, altimg, title, descr, price, '.menu__field .container').render();
            });
        });





    // getResource('http://localhost:3000/menu')
    //     .then(data => menuCard(data, '.menu__field .container'));

    // function menuCard(data, parentSelector) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const card = document.createElement('div');
    //         card.classList.add('menu__item');

    //         card.innerHTML = `
    //                     <img src=${img} alt=${altimg}>
    //                     <h3 class="menu__item-subtitle">${title}</h3>
    //                     <div class="menu__item-descr">${descr}</div>
    //                     <div class="menu__item-divider"></div>
    //                     <div class="menu__item-price">
    //                         <div class="menu__item-cost">Цена:</div>
    //                         <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //                     </div>
    //                 `;
            
    //         document.querySelector(parentSelector).append(card);
    //     });
    // }

    // new MenuCard(
    //     "img/tabs/vegy.jpg", 'vegy', 
    //     'Меню "Фитнес"', 
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu__field .container',
    //     // 'menu__item'
    //     ).render();

    // new MenuCard("img/tabs/elite.jpg", 'elite', 
    //     'Меню “Премиум”', 
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
    //     14,
    //     '.menu__field .container',
    //     // 'menu__item'
    // ).render();
    
    // new MenuCard("img/tabs/post.jpg", 'post', 
    //     'Меню "Постное"', 
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     21,
    //     '.menu__field .container',
    //     // 'menu__item'
    // ).render();



    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         console.log(data);
    //         return data;
    //     }).then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
    //         });
    //     });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");



function form(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector),
          formInput = document.querySelectorAll('input');
    
    const messages = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(form => {
        bindPostData(form);
    });

    // function clearInput() {
    //     formInput.forEach(item => {
    //         item.value = '';
    //     });
    // }

    // const postData = async (url, data) => {
    //     const res = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: data
    //     });

    //     return await res.json();
    // };


    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); /* в AJAX запросах всегда первая */

            const statusMessage = document.createElement('img');
            // statusMessage.classList.add('status'); /* status - нет в верстке */
            statusMessage.src = messages.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage); /* спиннер после формы вставил */

            const formData = new FormData(form);

            // const object = {};
            // formData.forEach((key, value) => {
            //     object[key] = value;
            // });

            // const json = JSON.stringify(object);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postData)('http://localhost:3000/requests', json)
            .then(res => {
                console.log(res);
                showThanksModal(messages.success);
                statusMessage.remove();
            }).catch(() => {
                console.error('Empty');
                showThanksModal(messages.failure);
            }).finally(() => {
                form.reset();
            });

        });
    }



    function showThanksModal(messages) {
        const prevModalDialog  = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${messages}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_1__.closeModal)('.modal');
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
/* harmony import */ var _calcScroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calcScroll */ "./js/modules/calcScroll.js");


function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    const scroll = (0,_calcScroll__WEBPACK_IMPORTED_MODULE_0__["default"])();

    modal.classList.add('show', 'fade');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    /* допустим вариант с toggle только нужно добавить класс show = modal*/
    
    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }

    document.body.style.marginRight = `${scroll}px`;

}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide', 'fade');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    document.body.style.marginRight = '0px';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);
        //   scroll = calcScroll();
    


    // function openModal() {
    //     modal.classList.add('show', 'fade');
    //     modal.classList.remove('hide');
    //     document.body.style.overflow = 'hidden';
    //     /* допустим вариант с toggle только нужно добавить класс show = modal*/
    //     clearInterval(modalTimerId);

    //     document.body.style.marginRight = `${scroll}px`;

    //     btnPressedModalTrigger = true;
    // }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    // function closeModal() {
    //     modal.classList.add('hide', 'fade');
    //     modal.classList.remove('show');
    //     document.body.style.overflow = '';
    //     document.body.style.marginRight = '0px';
    // }


    modal.addEventListener('click', (event) => {
        const target = event.target;

        if (target === modal || target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
        // if (target && target.classList.contains('modal')) {
        //     closeModal();
        // }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
        /* modal.classList.contains('show') проверим дабы лишний раз не работала команда  */
    });

    function showModalByScroll() {
        let scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight
        );

        if (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight -1) {
                if (modalTimerId) {
                    window.removeEventListener('scroll', showModalByScroll);
                } else {
                    openModal(modalSelector, modalTimerId);
                }
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // const modalTimerId = setTimeout(() => {
    //     openModal();
    //     window.removeEventListener('scroll', showModalByScroll);
    // }, 50000);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, prevArrow, nextArrow, totalCounter, currentCounter, wrapper, field,
    autoplay = false}) {
    const slider = document.querySelector(container),
          slides = document.querySelectorAll(slide),
          prevSlide = document.querySelector(prevArrow),
          nextSlide = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          wrapperSlider = document.querySelector(wrapper),
          sliderField = document.querySelector(field),
          width = getComputedStyle(wrapperSlider).width;

    let slideIndex = 1;
    let offset = 0;
    const dots = [];
    // let autoplay = false;

    function getZero(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    if (slides.length < 10 || slideIndex == 1) {
        total.textContent = getZero(slides.length);
        current.textContent = getZero(slideIndex);
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    function currentSlider() {
        if (slideIndex < 10) {
            current.textContent = getZero(slideIndex);
        } else {
            current.textContent = slideIndex;
        }
    }

    sliderField.style.width = 100 * slides.length + '%';
    sliderField.style.display = 'flex';
    sliderField.style.transition = '0.5s all';

    wrapperSlider.style.overflow = 'hidden';
    
    slides.forEach(item => item.style.width = width);

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    function dotActive() {
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = '1';
    }

    function deleteNoDigits(str) {
        return +str.replace(/\D/g, '');
    }

    nextSlide.addEventListener('click', () => {
        if (offset == deleteNoDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNoDigits(width);
        }

        sliderField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        currentSlider();
        dotActive();
    });

    prevSlide.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNoDigits(width) * (slides.length - 1);
        } else {
            offset += deleteNoDigits(width);
        }

        sliderField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        currentSlider();
        dotActive();
    });
    

    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');

            slideIndex = slideTo;

            offset = deleteNoDigits(width) * (slideTo - 1);

            sliderField.style.transform = `translateX(-${offset}px)`;

            currentSlider();
            dotActive();
        });
    });

    function autoPlayGo() {
        autoplay = setInterval(() => {
            nextSlide.click();
        }, 4000);

    }
    autoPlayGo();

    slides[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(autoplay);
    });

    nextSlide.addEventListener('mouseenter', () => {
        clearInterval(autoplay);
    });

    prevSlide.addEventListener('mouseenter', () => {
        clearInterval(autoplay);
    });

    slides[0].parentNode.addEventListener('mouseleave', () => {
        autoPlayGo();
    });

    nextSlide.addEventListener('mouseleave', () => {
        autoPlayGo();
    });

    prevSlide.addEventListener('mouseleave', () => {
        autoPlayGo();
    });






/* #1 slider */

    // const slides = document.querySelectorAll('.offer__slide'),
    //       sliderNext = document.querySelector('.offer__slider-next'),
    //       sliderPrev = document.querySelector('.offer__slider-prev'),
    //       current = document.querySelector('#current'),
    //       total = document.querySelector('#total'),
    //       slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    //       slidesField = document.querySelector('.offer__slider-inner'),
    //       width = window.getComputedStyle(slidesWrapper).width;
    //       console.log(width);

    // let slideIndex = 1;

    // showSlider(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = `${slides.length}`;
    // }

    // function showSlider(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(slide => slide.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block';

        // if (slideIndex < 10) {
        //     current.textContent = `0${slideIndex}`;
        // } else {
        //     current.textContent = `${slideIndex}`;
        // }
    // }

    // function plusSlider(n) {
    //     showSlider(slideIndex += n);
    // }

    // sliderNext.addEventListener('click', () => {
    //     plusSlider(1);
    // });

    // sliderPrev.addEventListener('click', () => {
    //     plusSlider(-1);
    // });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsContentSelector, tabsSelector, tabsPerentSelector, activeClass) {
    const tabsContent = document.querySelectorAll(tabsContentSelector),
          tabs = document.querySelectorAll(tabsSelector),
          tabsParent = document.querySelector(tabsPerentSelector);


    function hideTabsContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            // item.classList.remove('show', 'fade');
            item.classList.remove('animate__animated', 'animate__slideInDown');

        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabsContent(i = 0) {
        tabsContent[i].classList.remove('hide');
        // tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.add('animate__animated', 'animate__slideInDown');

        tabs[i].classList.add(activeClass);
        
    }

    hideTabsContent();
    showTabsContent();

    tabsParent.addEventListener('click', (event) => {
        let target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, index) => {
                if(target == item) {
                    hideTabsContent();
                    showTabsContent(index);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
    // const deadline = '2022.10.31';
    function getTimeRamaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());
        // const t = Date.parse(endtime) получим количество миллескунд которое будет в нашем конечном времни
        // Date.parse(new Date()); текущая дата  t - разница;
        // const t = new Date(endtime) - new Date(); одно и тоже как Date.parse(endtime) - Date.parse(new Date());
        if (t <= 0) { 
            days = 0; /* вместо этого блока можно сформировать окно,*/
            hours = 0;  /* сообщение о конце акции с помощью верстки и вставить  */
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)); /* в сутках (сколько суток осталось до конца) */
            hours = Math.floor((t / (1000 * 60 * 60)) % 24); /* (t / (1000 * 60 * 60)) - кол-во часов может быть и 150, а деля на 24 мы получии остаток не больше 24*/
            minutes = Math.floor((t / 1000 / 60) % 60); /* получим остаток минут при деление на 60 не больше 60 остаток будет */
            seconds = Math.floor((t / 1000) % 60); /* кол-во секунд не больше 60 */
        }


        // return {
        //     'total': t,
        //     'days': days,
        //     'hours': hours,
        //     'minutes': minutes,
        //     'seconds': seconds
        // };
        return {t, days, hours, minutes, seconds}; /* если одинаковые свойства и имя */
    }
    // getTimeRamaining(deadline); /* не обязательно тут вызывать так как мы вызываем в setClock */

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }


    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock(); /* запускаем чтобы таймер обновлялся сразу но и без запуска работает но не должным образом */

        function updateClock() {
            const t = getTimeRamaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};


const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error (`Could now fetch ${url}, status: ${res.status}`);
    }

    return res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");











window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => {
        (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalTimerId);
        // window.removeEventListener('scroll', showModalByScroll);
    }, 5000);
    
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabcontent', '.tabheader__item', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2022.10.31');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_form__WEBPACK_IMPORTED_MODULE_2__["default"])('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
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
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map