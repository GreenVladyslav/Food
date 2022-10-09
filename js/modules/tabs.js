function tabs() {
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
}

module.exports = tabs;