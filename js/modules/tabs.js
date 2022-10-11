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

export default tabs;