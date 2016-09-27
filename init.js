/**
 * Created by PhpStorm.
 * Author: 1
 * Project: todo list
 * Date:  28.09.2016
 * Time: 0:06
 */


'use strict';


(() => {


    // Init DOM elements
    let appRootDOM = document.querySelector('.js-app-root');
    let appDateDOM = appRootDOM.querySelector('.js-app-date');
    let appListDOM = appRootDOM.querySelector('.js-app-list');
    let appAddDOM = appRootDOM.querySelector('.js-app-add');
    let appCreateFieldDOM = appAddDOM.querySelector('.js-add-field');


    // Init important components
    let calendar = window['calendar'] = new App.Calendar(appDateDOM);
    let list = null;
    const nameKeyCurrentDay = 'appKeyCurrentDate';


    startApp();


    // Add task
    appAddDOM.addEventListener('submit', (event) => {
        event.preventDefault();
        list.addItem({
            title: appCreateFieldDOM.value
        });
        appCreateFieldDOM.value = '';
    })



    // Change date
    document.addEventListener('change-date', function() {
        startApp();
    });



    /**
     *
     */
    function startApp() {
        window[nameKeyCurrentDay] = calendar.createKeyForStorage();
        calendar.render();
        App.Storage.createStructure();

        appListDOM.innerHTML = '';
        list = new App.List(appListDOM);
        list.fillList();
    }


})();