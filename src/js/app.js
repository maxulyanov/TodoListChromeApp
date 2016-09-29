/**
 * Created by PhpStorm.
 * Author: 1
 * Project: TodoListChromeApp
 * Date:  28.09.2016
 * Time: 0:06
 */


import config from './config/';
import Calendar from './components/Calendar';
import List from './components/List';
import Storage from './storage/Storage';


'use strict';


(() => {


    // Init DOM elements
    let appRootDOM = document.querySelector('.js-app-root');
    let appDateDOM = appRootDOM.querySelector('.js-app-date');
    let appListDOM = appRootDOM.querySelector('.js-app-list');
    let appAddDOM = appRootDOM.querySelector('.js-app-add');
    let appCreateFieldDOM = appAddDOM.querySelector('.js-add-field');


    // Init important components
    let calendar = new Calendar(appDateDOM);
    let list = null;


    startApp();


    // Add task
    appAddDOM.addEventListener('submit', (event) => {
        event.preventDefault();
        list.addItem({
            title: appCreateFieldDOM.value
        });
        appCreateFieldDOM.value = '';
    });



    // Change date
    document.addEventListener('change-date', function() {
        startApp();
    });



    /**
     *
     */
    function startApp() {
        window[config.currentDate] = calendar.createKeyForStorage();
        calendar.render();
        Storage.createStructure();

        appListDOM.innerHTML = '';
        list = new List(appListDOM);
        list.fillList();
    }


})();
