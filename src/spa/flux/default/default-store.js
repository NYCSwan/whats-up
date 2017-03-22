import {BaseStore} from '../base-store';
import {mainViews} from '../../enums/main-views';
import {LocalCache} from '../../utils/local-cache';
import {LocalCacheKeys} from '../../utils/local-cache-keys';
import {defaultActionTypes} from "./default-action-types";


clss DefaultStore extends BaseStore {
	constructor() {
		super('default-store-change'); //where does default-store-change come from?
		const modifier = new StateModifier(this.state);
	}

}

class ActionHandler {
	static handleAction(action, modifier, emitChange) {
		switch (action.type) {
			case defaultActionTypes.setMainView:
				modifier.setMainView(action.data.view);
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

class StateModifier {
	constructor(state) {
		this._state = state; // why no super?
		this.initializeState();
	}

	initializeState() {
		this._state.mainView = this._getInitialMainView();
		this._state.modalkey = null;
	}

	_getInitialMainView() {
		const token = LocalCache.getString(LocalCacheKeys.authToken());
		const user = LocalCache.getObject(LocalCacheKeys.user());

		if(token) {
			console.log('token exists');
            console.log('user', user);
            return mainViews.chats;
        }
        else {
            console.log('token not found');
            return mainViews.setupProfile;
		}
	}

	setMainView(view) {
		this.set.mainView = view;
	}

	setModalKey(key) {
		this.set.modalKey = key;
	}

	closeModal() {
		this._state.modalKey = null;
	}
}

const defaultStore = new DefaultStore(); //why at bottom?

export {defaultStore}