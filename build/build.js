(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _config = require('./config/');

var _config2 = _interopRequireDefault(_config);

var _Calendar = require('./components/Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _List = require('./components/List');

var _List2 = _interopRequireDefault(_List);

var _Storage = require('./storage/Storage');

var _Storage2 = _interopRequireDefault(_Storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by PhpStorm.
 * Author: 1
 * Project: TodoListChromeApp
 * Date:  28.09.2016
 * Time: 0:06
 */

'use strict';

(function () {

    // Init DOM elements
    var appRootDOM = document.querySelector('.js-app-root');
    var appDateDOM = appRootDOM.querySelector('.js-app-date');
    var appListDOM = appRootDOM.querySelector('.js-app-list');
    var appAddDOM = appRootDOM.querySelector('.js-app-add');
    var appCreateFieldDOM = appAddDOM.querySelector('.js-add-field');

    // Init important components
    var calendar = new _Calendar2.default(appDateDOM);
    var list = null;

    startApp();

    // Add task
    appAddDOM.addEventListener('submit', function (event) {
        event.preventDefault();
        list.addItem({
            title: appCreateFieldDOM.value,
            isDone: false
        });
        appCreateFieldDOM.value = '';
    });

    // Change date
    document.addEventListener('change-date', function () {
        startApp();
    });

    /**
     *
     */
    function startApp() {
        window[_config2.default.currentDate] = calendar.createKeyForStorage();
        calendar.render();
        _Storage2.default.createStructure();

        appAddDOM.style.display = _Calendar2.default.checkPossibilityActions() == true ? 'block' : 'none';

        appListDOM.innerHTML = '';
        list = new _List2.default(appListDOM);
        list.fillList();
    }
})();

},{"./components/Calendar":2,"./components/List":3,"./config/":5,"./storage/Storage":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by PhpStorm.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Author: 1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Project: TodoListChromeApp
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Date:  28.09.2016
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Time: 0:07
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _config = require('./../config');

var _config2 = _interopRequireDefault(_config);

var _Utils = require('./../libs/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

'use strict';

var Calendar = function () {

    /**
     *
     * @param root
     */
    function Calendar(root) {
        _classCallCheck(this, Calendar);

        this.rootDOM = root;

        this._date = new Date();

        this._weekdayDOM = null;
        this._dateDOM = null;
        this._created = false;

        if (this.rootDOM) {
            this._createDOMElements();
        }
    }

    /**
     *
     */


    _createClass(Calendar, [{
        key: 'render',
        value: function render() {
            if (this._created) {
                var _Calendar$getObjectDa = Calendar.getObjectDate(this._date);

                var day = _Calendar$getObjectDa.day;
                var month = _Calendar$getObjectDa.month;
                var year = _Calendar$getObjectDa.year;

                this._weekdayDOM.innerHTML = this.getWeekdays();
                this._dateDOM.innerHTML = day + '.' + month + '.' + year;
            }

            return this;
        }
    }, {
        key: 'getWeekdays',
        value: function getWeekdays() {
            var weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            var wday = this._date.getDay();
            if (wday === 0) {
                wday = 7;
            }
            return weekdays[wday - 1];
        }

        /**
         *
         * @param action
         */

    }, {
        key: 'change',
        value: function change(action) {
            switch (action) {
                case 'prev':
                    this._date.setDate(this._date.getDate() - 1);
                    break;
                case 'next':
                    this._date.setDate(this._date.getDate() + 1);
                    break;
                default:
                    console.warn(action + ' not support!');
            }

            //noinspection JSUnresolvedVariable
            var event = _Utils2.default.factoryCustomEvents('change-date');
            this.rootDOM.dispatchEvent(event);

            return this;
        }

        /**
         *
         * @returns {string}
         */

    }, {
        key: 'createKeyForStorage',
        value: function createKeyForStorage() {
            return Calendar.getStringDate(Calendar.getObjectDate(this._date));
        }

        /**
         *
         * @private
         */

    }, {
        key: '_createDOMElements',
        value: function _createDOMElements() {
            var _this = this;

            // Weekday
            var weekdayDOM = document.createElement('div');
            weekdayDOM.classList.add('b-weekday');
            this.rootDOM.appendChild(weekdayDOM);
            this._weekdayDOM = weekdayDOM;

            // Date
            var dateDOM = document.createElement('div');
            dateDOM.classList.add('b-date');
            this.rootDOM.appendChild(dateDOM);
            this._dateDOM = dateDOM;

            // Controls
            var controlsDOM = document.createElement('div');
            controlsDOM.classList.add('container-calendar-controls');

            var controlPrevDOM = document.createElement('i');
            controlPrevDOM.className = 'b-calendar-control is-prev icon angle left';
            controlPrevDOM.addEventListener('click', function (event) {
                event.preventDefault();
                _this.change('prev');
            });
            controlsDOM.appendChild(controlPrevDOM);

            var controlNextDOM = document.createElement('i');
            controlNextDOM.className = 'b-calendar-control is-next icon angle right';
            controlNextDOM.addEventListener('click', function (event) {
                event.preventDefault();
                _this.change('next');
            });
            controlsDOM.appendChild(controlNextDOM);
            this.rootDOM.appendChild(controlsDOM);

            this._created = true;
        }

        /**
         *
         * @param object
         * @returns {string}
         */

    }], [{
        key: 'getStringDate',
        value: function getStringDate(object) {
            var day = object.day;
            var month = object.month;
            var year = object.year;

            return month + '.' + day + '.' + year;
        }

        /**
         *
         * @param date
         * @returns {{day: number, month: number, year: number}}
         */

    }, {
        key: 'getObjectDate',
        value: function getObjectDate(date) {
            var day = date.getDate();
            if (day < 10) {
                day = '0' + day;
            }

            var month = date.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }

            var year = date.getFullYear();

            return { day: day, month: month, year: year };
        }

        /**
         *
         * @returns {boolean}
         */

    }, {
        key: 'checkPossibilityActions',
        value: function checkPossibilityActions() {
            var date = new Date();
            date.setHours(0, 0, 0, 0);
            return Number(new Date(window[_config2.default.currentDate])) >= Number(date);
        }
    }]);

    return Calendar;
}();

exports.default = Calendar;

},{"./../config":5,"./../libs/Utils":6}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by PhpStorm.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Author: 1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Project: TodoListChromeApp
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Date:  28.09.2016
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Time: 0:07
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _Storage = require('./../storage/Storage');

var _Storage2 = _interopRequireDefault(_Storage);

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _Task = require('./Task');

var _Task2 = _interopRequireDefault(_Task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

'use strict';

var List = function () {

    /**
     *
     * @param root
     */
    function List(root) {
        _classCallCheck(this, List);

        this.rootDOM = root;

        this._listDOM = null;
        this._emptyMessageDOM = null;
        this._statsDOM = null;

        this._allTasks = 0;
        this._doneTasks = 0;

        this._createDOMComponents();
    }

    /**
     *
     * @returns {List}
     */


    _createClass(List, [{
        key: 'fillList',
        value: function fillList() {
            var _this = this;

            _Storage2.default.getItems(function (items) {
                if (items != null && Object.keys(items).length > 0) {
                    for (var id in items) {
                        if (items.hasOwnProperty(id)) {
                            var item = items[id];
                            _this._createItem(id, item);
                            if (item.isDone) {
                                _this._doneTasks++;
                            }
                        }
                    }
                }

                _this._renderStats();
                _this._toggleVisibleEmptyMessage();
            });

            return this;
        }

        /**
         *
         * @param object
         * @returns {List}
         */

    }, {
        key: 'addItem',
        value: function addItem(object) {
            var _this2 = this;

            _Storage2.default.createItem(object, function (id) {
                _this2._createItem(id, object);
                _this2._renderStats();
                _this2._toggleVisibleEmptyMessage();
                _this2._listDOM.scrollTop = _this2._listDOM.scrollHeight;
            });

            return this;
        }

        /**
         *
         * @param id
         * @param data
         * @private
         */

    }, {
        key: '_createItem',
        value: function _createItem(id, data) {
            var task = this._factoryTask();
            var taskDOM = task.create(id, data);
            this._listDOM.appendChild(taskDOM);
            this._allTasks++;
        }

        /**
         *
         * @returns {Task}
         * @private
         */

    }, {
        key: '_factoryTask',
        value: function _factoryTask() {
            var self = this;

            return new _Task2.default({
                onChange: function onChange(isDone) {
                    isDone ? self._doneTasks++ : self._doneTasks--;
                    self._renderStats();
                },
                onDelete: function onDelete(isDone) {
                    self._allTasks--;
                    if (isDone) {
                        self._doneTasks--;
                    }
                    self._renderStats();
                    self._toggleVisibleEmptyMessage();
                }
            }, _Calendar2.default.checkPossibilityActions());
        }

        /**
         *
         * @private
         */

    }, {
        key: '_createDOMComponents',
        value: function _createDOMComponents() {
            // Stats
            var containerStats = document.createElement('div');
            containerStats.className = 'container-app-stats';
            containerStats.innerHTML = 'progress: ';
            this._statsDOM = document.createElement('div');
            this._statsDOM.className = 'b-stats';
            containerStats.appendChild(this._statsDOM);
            this.rootDOM.appendChild(containerStats);

            // Inner Area
            this._listDOM = document.createElement('div');
            this._listDOM.className = 'container-app-list-inner';
            this.rootDOM.appendChild(this._listDOM);

            // Empty Message
            this._emptyMessageDOM = document.createElement('div');
            this._emptyMessageDOM.className = 'b-empty-message';
            this._emptyMessageDOM.innerHTML = 'You have not created a tasks on this day';
            this._listDOM.appendChild(this._emptyMessageDOM);
        }

        /**
         *
         * @private
         */

    }, {
        key: '_renderStats',
        value: function _renderStats() {
            this._statsDOM.innerHTML = this._doneTasks + ' out of ' + this._allTasks;
        }

        /**
         *
         * @private
         */

    }, {
        key: '_toggleVisibleEmptyMessage',
        value: function _toggleVisibleEmptyMessage() {
            this._emptyMessageDOM.style.display = this._allTasks === 0 ? 'block' : 'none';
        }
    }]);

    return List;
}();

exports.default = List;

},{"./../storage/Storage":7,"./Calendar":2,"./Task":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by PhpStorm.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Author: 1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Project: TodoListChromeApp
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Date:  28.09.2016
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Time: 0:07
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _Storage = require('./../storage/Storage');

var _Storage2 = _interopRequireDefault(_Storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

'use strict';

var Task = function () {

    /**
     *
     * @param parentHandlers
     * @param possibilityActions
     */
    function Task(parentHandlers, possibilityActions) {
        _classCallCheck(this, Task);

        this._id = null;
        this._task = null;
        this._data = null;

        this.parentHandlers = parentHandlers;
        this._possibilityActions = possibilityActions;
    }

    _createClass(Task, [{
        key: 'create',


        /**
         *
         * @param id
         * @param data
         * @returns {Element|*|null}
         */
        value: function create(id, data) {
            this._id = id;
            this._data = data;
            this._createItem();
            return this._task;
        }
    }, {
        key: 'delete',


        /**
         *
         */
        value: function _delete() {
            this.parentHandlers.onDelete(this._data.isDone);
            this._task.parentNode.removeChild(this._task);
            _Storage2.default.deleteById(this._id);
            return this;
        }
    }, {
        key: '_createItem',


        /**
         *
         * @private
         */
        value: function _createItem() {
            var _this = this;

            var _data = this._data;
            var title = _data.title;
            var isDone = _data.isDone;

            this._task = document.createElement('div');
            this._task.classList.add('b-task');

            // TITLE
            var titleDOM = document.createElement('div');
            titleDOM.innerHTML = title;
            titleDOM.classList.add('task__title');
            this._task.appendChild(titleDOM);

            // ICON
            var icon = document.createElement('i');
            icon.className = 'task__icon icon';
            this._task.appendChild(icon);

            if (isDone) {
                this._task.classList.add('is-done');
            } else if (!this._possibilityActions) {
                this._task.classList.add('is-not-done');
            }

            // SET EVENTS
            if (this._possibilityActions) {
                this._task.addEventListener('click', function (event) {
                    _this._changeState(event.target);
                });
                this._createButtonDelete();
            }
        }
    }, {
        key: '_createButtonDelete',


        /**
         *
         * @private
         */
        value: function _createButtonDelete() {
            var _this2 = this;

            var buttonDelete = document.createElement('span');
            buttonDelete.className = 'task__delete';
            buttonDelete.innerHTML = 'delete';
            this._task.appendChild(buttonDelete);

            buttonDelete.addEventListener('click', function (event) {
                event.preventDefault();
                _this2.delete(_this2._task);
            });
        }
    }, {
        key: '_changeState',


        /**
         *
         * @param target
         * @private
         */
        value: function _changeState(target) {
            var _this3 = this;

            if (target.classList.contains('task__delete')) {
                return;
            }
            this._task.classList.toggle('is-done');

            _Storage2.default.getById(this._id, function (item) {
                item.isDone = !item.isDone;
                _this3._data.isDone = item.isDone;
                _Storage2.default.updateById(_this3._id, item);
                _this3.parentHandlers.onChange(item.isDone);
            });
        }
    }]);

    return Task;
}();

exports.default = Task;

},{"./../storage/Storage":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by PhpStorm.
 * Author: 1
 * Project: TodoListChromeApp
 * Date:  29.09.2016
 * Time: 1:43
 */

var config = {
  currentDate: 'currentDate'
};

exports.default = config;

},{}],6:[function(require,module,exports){
/**
 * Created by PhpStorm.
 * Author: 1
 * Project: TodoListChromeApp
 * Date:  28.09.2016
 * Time: 0:07
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
        key: 'factoryCustomEvents',


        /**
         *
         * @param eventName
         * @param detail
         * @returns {CustomEvent}
         */
        value: function factoryCustomEvents(eventName) {
            var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return new CustomEvent(eventName, {
                bubbles: true,
                detail: detail
            });
        }

        /**
         *
         * @param target
         * @param objects
         * @returns {*}
         */

    }, {
        key: 'extend',
        value: function extend(target, objects) {

            for (var object in objects) {
                if (objects.hasOwnProperty(object)) {
                    recursiveMerge(target, objects[object]);
                }
            }

            function recursiveMerge(target, object) {
                for (var property in object) {
                    if (object.hasOwnProperty(property)) {
                        var current = object[property];
                        if (Utils.getConstructor(current) === 'Object') {
                            if (!target[property]) {
                                target[property] = {};
                            }
                            recursiveMerge(target[property], current);
                        } else {
                            target[property] = current;
                        }
                    }
                }
            }

            return target;
        }

        /**
         *
         * @param object
         * @returns {string}
         */

    }, {
        key: 'getConstructor',
        value: function getConstructor(object) {
            return Object.prototype.toString.call(object).slice(8, -1);
        }
    }]);

    return Utils;
}();

exports.default = Utils;

},{}],7:[function(require,module,exports){
/**
 * Created by PhpStorm.
 * Author: 1
 * Project: TodoListChromeApp
 * Date:  28.09.2016
 * Time: 0:07
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _StorageDriver = require('./StorageDriver');

var _StorageDriver2 = _interopRequireDefault(_StorageDriver);

var _config = require('./../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = function () {
    function Storage() {
        _classCallCheck(this, Storage);
    }

    _createClass(Storage, null, [{
        key: 'generateId',


        /**
         *
         * @returns {number}
         */
        value: function generateId() {
            return Number(new Date());
            // return '_' + Math.random().toString(36).substr(2, 15);
        }

        /**
         *
         */

    }, {
        key: 'createStructure',
        value: function createStructure() {
            _StorageDriver2.default.get('days', function (data) {
                if (Object.keys(data).length === 0) {
                    _StorageDriver2.default.set('days', _defineProperty({}, window[_config2.default.currentDate], {}));
                } else if (!data[window[_config2.default.currentDate]]) {
                    data[window[_config2.default.currentDate]] = {};
                    _StorageDriver2.default.set('days', data);
                }
            });
        }

        /**
         *
         * @param callback
         */

    }, {
        key: 'getItems',
        value: function getItems(callback) {
            _StorageDriver2.default.get('days', function (data) {
                if (data) {
                    callback(data[window[_config2.default.currentDate]]);
                }
            });
        }

        /**
         *
         * @param object
         * @param callback
         */

    }, {
        key: 'createItem',
        value: function createItem(object, callback) {
            _StorageDriver2.default.get('days', function (data) {
                var id = Storage.generateId();
                data[window[_config2.default.currentDate]][id] = object;
                _StorageDriver2.default.set('days', data);
                callback(id);
            });
        }

        /**
         *
         * @param id
         */

    }, {
        key: 'deleteById',
        value: function deleteById(id) {
            _StorageDriver2.default.get('days', function (data) {
                delete data[window[_config2.default.currentDate]][id];
                _StorageDriver2.default.set('days', data);
            });
        }

        /**
         *
         * @param id
         * @param object
         */

    }, {
        key: 'updateById',
        value: function updateById(id, object) {
            _StorageDriver2.default.get('days', function (data) {
                data[window[_config2.default.currentDate]][id] = object;
                _StorageDriver2.default.set('days', data);
            });
        }

        /**
         *
         * @param id
         * @param callback
         */

    }, {
        key: 'getById',
        value: function getById(id, callback) {
            _StorageDriver2.default.get('days', function (data) {
                var item = data[window[_config2.default.currentDate]][id];
                callback(item);
            });
        }
    }]);

    return Storage;
}();

exports.default = Storage;

},{"./../config":5,"./StorageDriver":8}],8:[function(require,module,exports){
/**
 * Created by PhpStorm.
 * Author: 1
 * Project: TodoListChromeApp
 * Date:  28.09.2016
 * Time: 0:07
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StorageDriver = function () {
    function StorageDriver() {
        _classCallCheck(this, StorageDriver);
    }

    _createClass(StorageDriver, null, [{
        key: 'set',


        /**
         *
         * @param key
         * @param value
         */
        value: function set(key, value) {
            if (!value) {
                StorageDriver.log('I can not save! Value empty!', 'error');
                return;
            }
            StorageDriver.storage.set(_defineProperty({}, key, value), function () {
                StorageDriver.log('Saved!', 'info');
            });
        }

        /**
         *
         * @param key
         * @param callback
         */

    }, {
        key: 'get',
        value: function get(key, callback) {
            StorageDriver.storage.get(key, function (data) {
                if (data[key]) {
                    StorageDriver.log('Get success', 'info');
                    callback(data[key]);
                } else {
                    callback({});
                }
            });
        }

        /**
         *
         * @param key
         */

    }, {
        key: 'remove',
        value: function remove(key) {
            StorageDriver.storage.remove(key, function () {
                StorageDriver.log('Remove', 'info');
            });
        }

        /**
         *
         * @param message
         * @param type
         */

    }, {
        key: 'log',
        value: function log(message, type) {
            console[type](message);
        }
    }]);

    return StorageDriver;
}();

exports.default = StorageDriver;


StorageDriver.storage = chrome.storage.local;

},{}]},{},[1]);
