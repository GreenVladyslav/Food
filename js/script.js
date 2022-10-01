'use strict';

window.addEventListener('DOMContentLoaded', () => {
    /* tabs */
    const tabsContent = document.querySelectorAll('.tabcontent'),
          tabs = document.querySelectorAll('.tabheader__item'),
          tabsParent = document.querySelector('.tabheader__items');


    function hideTabsContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            // item.classList.remove('show', 'fade');
            item.classList.remove('animate__animated', 'animate__slideInDown');

        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabsContent(i = 0) {
        tabsContent[i].classList.remove('hide');
        // tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.add('animate__animated', 'animate__slideInDown');

        tabs[i].classList.add('tabheader__item_active');
        
    }

    hideTabsContent();
    showTabsContent();

    tabsParent.addEventListener('click', (event) => {
        let target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, index) => {
                if(target == item) {
                    hideTabsContent();
                    showTabsContent(index);
                }
            });
        }
    });

    /* timer */
    const deadline = '2022.09.30';
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
    setClock('.timer', deadline);

/* modal */

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          scroll = calcScroll();
    let btnPressedModalTrigger;


    function openModal() {
        modal.classList.add('show', 'fade');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        /* допустим вариант с toggle только нужно добавить класс show = modal*/
        clearInterval(modalTimerId);

        document.body.style.marginRight = `${scroll}px`;

        btnPressedModalTrigger = true;
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
            modal.classList.add('hide', 'fade');
            modal.classList.remove('show');
            document.body.style.overflow = '';
            document.body.style.marginRight = '0px';

    }


    modal.addEventListener('click', (event) => {
        const target = event.target;

        if (target === modal || target.getAttribute('data-close') == '') {
            closeModal();
        }
        // if (target && target.classList.contains('modal')) {
        //     closeModal();
        // }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
        /* modal.classList.contains('show') проверим дабы лишний раз не работала команда  */
    });

    function showModalByScroll() {
        let scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight
        );

        if (!btnPressedModalTrigger && window.pageYOffset + document.documentElement.clientHeight >= scrollHeight -1) {
                openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    const modalTimerId = setTimeout(() => {
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
    }, 50000);

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

/* classes */

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


    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error (`Could now fetch ${url}, status: ${res.status}`);
        }

        return res.json();
    };

    getResource('http://localhost:3000/menu')
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
  
/* form */

    const forms = document.querySelectorAll('form'),
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

            postData('http://localhost:3000/requests', json)
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
        openModal();

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
            closeModal();
        }, 4000);
    }













    // const forms = document.querySelectorAll('form'),
    // formInput = document.querySelectorAll('input');

    // const messages = {
    //     loading: 'img/form/spinner.svg',
    //     success: 'Спасибо мы с вами свяжемся',
    //     failure: 'Что-то пошло не так...'
    // };

    // forms.forEach(form => {
    //     bindPostData(form);
    // });

    // function clearInput() {
    //     formInput.forEach(item => {
    //         item.value = '';
    //     });
    // }

    // const postData = async (url, data) => {
    //     const res = await fetch(url, {
    //         method: "POST",
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: data
    //     });

    //     return await res.json(); 
    // };

    // function bindPostData(form) {
    //     form.addEventListener('submit', (event) => {
    //         event.preventDefault(); /* в AJAX запросах всегда первая */

    //         const statusMessage = document.createElement('img');
    //         // statusMessage.classList.add('status'); /* status - нет в верстке */
    //         statusMessage.setAttribute('src', messages.loading);
    //         statusMessage.style.cssText = `
    //             display: block;
    //             margin: 0 auto;
    //         `;
    //         form.insertAdjacentElement('afterend', statusMessage);

    //         const formData = new FormData(form);
    //         const json = JSON.stringify(Object.fromEntries(formData.entries()));

    //         // const object = {};
    //         // formData.forEach((key, value) => {
    //         //     object[key] = value;
    //         // });


    //         postData('http://localhost:3000/requests', json)
    //         .then(data => {
    //             console.log(data);
    //             showThanksModal(messages.success);
    //             statusMessage.remove();
    //         }).catch(() => {
    //             showThanksModal(messages.failure);
    //         }).finally(() => {
    //             form.reset();
    //         });
    //     });
    // }


    // function showThanksModal(messages) {
    //     const prevModalDialog = document.querySelector('.modal__dialog');
    //     prevModalDialog.classList.add('hide');
    //     openModal();

    //     const thanksModal = document.createElement('div');
    //     thanksModal.classList.add('modal__dialog');
    //     thanksModal.innerHTML = `
    //         <div class="modal__content">
    //             <div data-close class="modal__close">&times;</div>
    //             <div class="modal__title">${messages}</div>
    //         </div>
    //     `;

    //     document.querySelector('.modal').append(thanksModal);

    //     setTimeout(() => {
    //         thanksModal.remove();
    //         prevModalDialog.classList.add('show');
    //         prevModalDialog.classList.remove('hide');
    //         closeModal();
    //     }, 4000);
    // }

    // const getResource = async (url) => {
    //     const res = await fetch (url);

    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }

    //     return await res.json();
    // };

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
    //         });
    //     });



    // slider

    
});