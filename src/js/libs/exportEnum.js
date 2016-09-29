/**
 * Created by PhpStorm.
 * Author: 1
 * Project: TodoListChromeApp
 * Date:  28.09.2016
 * Time: 0:07
 */


'use strict';


/**
 *
 * @param en
 * @param name
 */
function exportEnum(en, name) {
    let App = window.App;
    if (App == null) {
        window.App = App = {};
    }

    App[name] = en;
}
