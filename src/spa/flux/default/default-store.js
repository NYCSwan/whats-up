import {BaseStore} from '../base-store';
import {mainViews} from '../../enums/main-views';
import {LocalCache} from '../../utils/local-cache';
import {LocalCacheKeys} from '../../utils/local-cache-keys';
import {defaultActionTypes} from "./default-action-types";
import {connectToUserSocket} from '../../utils/sockets';


class DefaultStore extends BaseStore {
	constructor() {
		super('default-store-change'); //where does default-store-change come from? from the baseStore changeEvent
		const modifier = new StateModifier(this.state); // actually sets the state in the new store
		this.setup(modifier, ActionHandler.handleAction); //basestore fn
	}

}

// helper method; doesn't have state 
class ActionHandler {
	static handleAction(action, modifier, emitChange) {
		switch (action.type) {

			case defaultActionTypes.setMainView:
				modifier.setMainView(action.data.view, action.data.initialData);
				emitChange();
				break;

			case defaultActionTypes.processProfile:
				modifier.processProfile(action.data.user, action.data.token);
				emitChange();
				break;

			case defaultActionTypes.setModalKey:
				modifier.setModalKey(action.data.modalKey);
				emitChange();
				break;

			case defaultActionTypes.closeModal:
				modifier.closeModal();
				emitChange();
				break;

			default:
				break;
		}
	}
}

// helper method
class StateModifier {
	constructor(state) {
		this._state = state; // why no super? cuz it's a helper method..
		this.initializeState();
		this._checkUserSocketConnection();
		
	}

	initializeState() {
		this._state.mainView = this._getInitialMainView();
		this._state.mainViewInitialData = null;
		this._state.modalKey = null;
		this._state.user = LocalCache.getObject(LocalCacheKeys.user());
	}

	_getInitialMainView() {
		const token = LocalCache.getString(LocalCacheKeys.authToken());
		console.log('token:', token);

		console.log(this._state.user);

		if(token) {
			console.log('token exists');
            return mainViews.chats;
        }
        else {
            console.log('token not found');
            return mainViews.setupProfile;
		}
	}

	_checkUserSocketConnection() {
		if (this._state.user && this._state.user.handle) {
			console.log('user:', this._state.user);
			global.setTimeout(() => {
				connectToUserSocket(this._state.user.handle);
			}, 0);
		}
	}

	processProfile(user, token) {
		LocalCache.setString(LocalCacheKeys.authToken(), token);
		LocalCache.setObject(LocalCacheKeys.user(), user);

		this._state.user = user;

		connectToUserSocket(this._state.user.handle);
		this.setMainView(mainViews.chats);
	}

	setMainView(view, initialData) {
		this._state.mainView = view;
		this._state.mainViewInitialData = initialData;
	}

	setModalKey(key) {
		console.log('state: ', this._state);
		this._state.modalKey = key;
	}

	closeModal() {
		this._state.modalKey = null;
	}

}

const defaultStore = new DefaultStore(); //why at bottom? 

export {defaultStore} // exposes the helper meths too