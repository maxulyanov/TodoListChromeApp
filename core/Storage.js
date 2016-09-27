/**
 * Created by PhpStorm.
 * Author: 1
 * Project: todo list
 * Date:  28.09.2016
 * Time: 0:07
 */


'use strict';


(() => {


    const nameKeyCurrentDay = 'appKeyCurrentDate';


    class Storage {


        /**
         *
         * @returns {string}
         */
        static generateId() {
            return '_' + Math.random().toString(36).substr(2, 15);
        }


        /**
         *
         */
        static createStructure() {
            App.StorageDriver.get('days', (data) => {
                if (Object.keys(data).length === 0) {
                    App.StorageDriver.set('days', {
                        [window[nameKeyCurrentDay]]: {}
                    })
                }
                else if (!data[window[nameKeyCurrentDay]]) {
                    data[window[nameKeyCurrentDay]] = {};
                    App.StorageDriver.set('days', data);
                }
            });
        }


        /**
         *
         * @param callback
         */
        static getItems(callback) {
            App.StorageDriver.get('days', (data) => {
                if (data) {
                    callback(data[window[nameKeyCurrentDay]]);
                }
            });
        }


        /**
         *
         * @param object
         * @param callback
         */
        static createItem(object, callback) {
            App.StorageDriver.get('days', (data) => {
                let id = Storage.generateId();
                data[window[nameKeyCurrentDay]][id] = object;
                App.StorageDriver.set('days', data);
                callback(id);
            })
        }


        /**
         *
         * @param id
         */
        static deleteById(id) {
            App.StorageDriver.get('days', (data) => {
                delete data[window[nameKeyCurrentDay]][id];
                App.StorageDriver.set('days', data);
            })
        }


        /**
         *
         * @param id
         * @param object
         */
        static updateById(id, object) {
            App.StorageDriver.get('days', (data) => {
                data[window[nameKeyCurrentDay]][id] = object;
                App.StorageDriver.set('days', data);
            })
        }


        /**
         *
         * @param id
         * @param callback
         */
        static getById(id, callback) {
            App.StorageDriver.get('days', (data) => {
                let item = data[window[nameKeyCurrentDay]][id];
                callback(item);
            })
        }


    }


    exportEnum(Storage, 'Storage');


})();

