function timer() {
    const deadline = '2022.10.31';
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
}

module.exports = timer;