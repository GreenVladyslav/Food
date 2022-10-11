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

export default slider;