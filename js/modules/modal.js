function modal() {
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
}

module.exports = modal;