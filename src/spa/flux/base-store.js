import {EventEmitter} from 'events';
import {dispatcher} from './dispatcher.js'; 				//why lowercase?

class BaseStore extends EventEmitter {

	constructor(changeEvent) {
		super();

		this._changeEvent = changeEvent;
		this._state = {};
		
	}
//  shared methods for all stores

	setup(modifier, handleAction) {
		Object.seal(this._state); 						//seal makes obj non-extensible, no new props And sets configurable attr: false, which in turn makes writable: true so the value and writable attr can be changed.
		
		for(let key of Object.keys(this._state)) {
			Object.defineProperty(this, key, { 
				get(){  								//dynamically adding getters to each object.
				return this._state[key];
				}
			});
		}
		this._modifier = modifier;
		this._handleAction = handleAction;

		this._dispatchToken = dispatcher.register(this._handleActionHelper.bind(this));
	}
	
	get state() { 										//setting a getter method for all states
		return this._state;
	}

	get dispatchToken() {
		return this._dispatchToken;
	}

	addChangeListener(callback) {
		this.on(this._changeEvent, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(this._changeEvent, callback);
	}

	_emitChange() {
		this.emit(this._changeEvent);
	}

	_handleActionHelper(action) {
		if (!action.type) {
			console.log('action: ', action);
			throw new Error(`Action payload is missing a type: ${action.type}`);
		}
		console.log('Handle action: ', action);
		this._handleAction(action, this._modifier, this._emitChange.bind(this), this);
	}
}

export {BaseStore}