/**
 * Created by PhpStorm.
 * Author: 1
 * Project: TodoListChromeApp
 * Date:  28.09.2016
 * Time: 0:07
 */


'use strict';


import StorageDriver from './StorageDriver';
import config from './../config';


export default class Storage {


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
        StorageDriver.get('days', (data) => {
            if (Object.keys(data).length === 0) {
                StorageDriver.set('days', {
                    [window[config.currentDate]]: {}
                })
            }
            else if (!data[window[config.currentDate]]) {
                data[window[config.currentDate]] = {};
                StorageDriver.set('days', data);
            }
        });
    }


    /**
     *
     * @param callback
     */
    static getItems(callback) {
        StorageDriver.get('days', (data) => {
            if (data) {
                callback(data[window[config.currentDate]]);
            }
        });
    }


    /**
     *
     * @param object
     * @param callback
     */
    static createItem(object, callback) {
        StorageDriver.get('days', (data) => {
            let id = Storage.generateId();
            data[window[config.currentDate]][id] = object;
            StorageDriver.set('days', data);
            callback(id);
        })
    }


    /**
     *
     * @param id
     */
    static deleteById(id) {
        StorageDriver.get('days', (data) => {
            delete data[window[config.currentDate]][id];
            StorageDriver.set('days', data);
        })
    }


    /**
     *
     * @param id
     * @param object
     */
    static updateById(id, object) {
        StorageDriver.get('days', (data) => {
            data[window[config.currentDate]][id] = object;
            StorageDriver.set('days', data);
        })
    }


    /**
     *
     * @param id
     * @param callback
     */
    static getById(id, callback) {
        StorageDriver.get('days', (data) => {
            let item = data[window[config.currentDate]][id];
            callback(item);
        })
    }


}
