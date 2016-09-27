/**
 * Created by PhpStorm.
 * Author: 1
 * Project: todo list
 * Date:  28.09.2016
 * Time: 0:07
 */


'use strict';


(() => {


	class Task {


		constructor(parentHandlers) {
			this.parentHandlers = parentHandlers;

			this._id = null;
			this._task = null;
			this._data  = null;
		};


        /**
         *
         * @param id
         * @param data
         * @returns {Element|*|null}
         */
		create(id, data) {
			this._id = id;
			this._data = data;
			this._createItem();
			return this._task;
		};


        /**
         *
         */
        delete() {
            App.Storage.deleteById(this._id);
            this._task.parentNode.removeChild(this._task);
            this.parentHandlers.onDelete(this._data.isDone);

        };


        /**
         *
         * @private
         */
        _createItem() {
			let {title, isDone} = this._data;
			this._task = document.createElement('div');
			this._task.classList.add('b-task');

			// TITLE
			let titleDOM =  document.createElement('div');
			titleDOM.innerHTML = title;
			titleDOM.classList.add('task__title')
			this._task.appendChild(titleDOM);

			// ICON
			let icon =  document.createElement('i');
			icon.className = 'task__icon icon';
			this._task.appendChild(icon);

			if(isDone) {
				this._task.classList.add('is-done');
			}

			this._task.addEventListener('click', (event) => {
				this._changeState(event.target);
			});

			this._createButtonDelete();

		};


        /**
         *
         * @private
         */
		_createButtonDelete() {
			let buttonDelete = document.createElement('span');
			buttonDelete.className = 'task__delete';
			buttonDelete.innerHTML = 'delete';
			this._task.appendChild(buttonDelete);

			buttonDelete.addEventListener('click', (event) => {
				this.delete(this._task);
			});
		};


        /**
         *
         * @param target
         * @private
         */
		_changeState(target) {
			if(target.classList.contains('task__delete')) {
				return;
			}
			this._task.classList.toggle('is-done');

			App.Storage.getById(this._id, (item)=> {
				item.isDone = !item.isDone;
				App.Storage.updateById(this._id, item);
				this.parentHandlers.onChange(item.isDone);
			});

		};


	}


	exportEnum(Task, 'Task');


})();

