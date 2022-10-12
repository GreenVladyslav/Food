import calcScroll from './calcScroll';

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    const scroll = calcScroll();

    modal.classList.add('show', 'fade');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    
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
    
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

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

}

export default modal;
export {openModal};
export {closeModal};