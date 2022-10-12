import {postData} from '../services/services';
import {openModal, closeModal} from './modal';

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
        openModal('.modal', modalTimerId);

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
            closeModal('.modal');
        }, 4000);
    }
}

export default form;