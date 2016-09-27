/**
 * Created by PhpStorm.
 * Author: 1
 * Project: todo list
 * Date:  28.09.2016
 * Time: 0:07
 */


'use strict';


(() => {


	const storage = chrome.storage.local;


	class StorageDriver {


		/**
		 *
		 * @param key
		 * @param value
		 */
		static set(key, value) {
			if(!value) {
				StorageDriver.log('I can not save! Value empty!', 'error');
				return;
			}
			storage.set({[key]: value}, ()=> {
				StorageDriver.log('Saved!', 'info');
			});
		}


		/**
		 *
		 * @param key
		 * @param callback
		 */
		static get(key, callback) {
			storage.get(key, function(data) {
				if (data[key]) {
					StorageDriver.log('Get success', 'info');
					callback(data[key]);
				}
				else {
					callback({});
				}
			});
		}


		/**
		 *
		 * @param key
		 */
		static remove(key) {
			storage.remove(key, function() {
				StorageDriver.log('Remove', 'info');
			});
		}


		/**
		 *
		 * @param message
		 * @param type
		 */
		static log(message, type) {
			console[type](message);
		}


	}


	exportEnum(StorageDriver, 'StorageDriver');


})();
