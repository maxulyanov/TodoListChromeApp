/**
 * Created by PhpStorm.
 * Author: 1
 * Project: todo list
 * Date:  28.09.2016
 * Time: 0:07
 */


'use strict';


(() => {


    const emptyMessageText = 'You have not created a tasks on this day';


    class List {


        /**
         *
         * @param root
         */
        constructor(root) {
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
        fillList() {
            App.Storage.getItems((items) => {
                if (items != null && Object.keys(items).length > 0) {
                    for (let id in items) {
                        if (items.hasOwnProperty(id)) {
                            let item = items[id];
                            this._createItem(id, item);
                            if (item.isDone) {
                                this._doneTasks++;
                            }
                        }
                    }
                }

                this._renderStats();
                this._toggleVisibleEmptyMessage();

            });

            return this;
        }


        /**
         *
         * @param object
         * @returns {List}
         */
        addItem(object) {
            App.Storage.createItem({
                title: object.title,
                isDone: false
            }, (id)=> {
                this._createItem(id, object);
                this._renderStats();
                this._listDOM.scrollTop = this._listDOM.scrollHeight;
            });

            return this;
        }


        /**
         *
         * @param id
         * @param data
         * @private
         */
        _createItem(id, data) {
            let task = this._factoryTask();
            let taskDOM = task.create(id, data);
            this._listDOM.appendChild(taskDOM);
            this._allTasks++;
        }


        /**
         *
         * @returns {App.Task}
         * @private
         */
        _factoryTask() {
            let self = this;
            return new App.Task({
                onChange(isDone) {
                    isDone ? self._doneTasks++ : self._doneTasks--;
                    self._renderStats();
                },
                onDelete(isDone) {
                    self._allTasks--;
                    if (isDone) {
                        self._doneTasks--;
                    }
                    self._renderStats();
                }
            });
        }


        /**
         *
         * @private
         */
        _createDOMComponents() {
            let containerStats = document.createElement('div');
            containerStats.className = 'container-app-stats'
            containerStats.innerHTML = 'progress: ';
            this._statsDOM = document.createElement('div');
            this._statsDOM.className = 'b-stats';
            containerStats.appendChild(this._statsDOM);
            this.rootDOM.appendChild(containerStats);

            this._listDOM = document.createElement('div');
            this._listDOM.className = 'container-app-list-inner';
            this.rootDOM.appendChild(this._listDOM);

            this._emptyMessageDOM = document.createElement('div');
            this._emptyMessageDOM.className = 'b-empty-message';
            this._emptyMessageDOM.innerHTML = emptyMessageText;
            this._listDOM.appendChild(this._emptyMessageDOM);

        }


        /**
         *
         * @private
         */
        _renderStats() {
            this._statsDOM.innerHTML = `${this._doneTasks} out of ${this._allTasks}`;
        }


        /**
         *
         * @private
         */
        _toggleVisibleEmptyMessage() {
            let style = this._allTasks === 0 ? 'block' : 'none'
            this._emptyMessageDOM.style.display = style;
        }


    }


    exportEnum(List, 'List');


})();