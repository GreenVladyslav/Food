import {getResource} from '../services/services';

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
}

export default cards;