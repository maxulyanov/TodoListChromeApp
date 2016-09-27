/**
 * Created by PhpStorm.
 * Author: 1
 * Project: todo list
 * Date:  28.09.2016
 * Time: 0:07
 */


'use strict';


(() => {

	class Utils {


		/**
		 *
		 * @param eventName
		 * @param detail
		 * @returns {CustomEvent}
		 */
		static factoryCustomEvents(eventName, detail = {}) {
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
		static extend(target, objects) {

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
						}
						else {
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
		static getConstructor(object) {
			return Object.prototype.toString.call(object).slice(8, -1);
		}


	}


	exportEnum(Utils, 'Utils');


})();