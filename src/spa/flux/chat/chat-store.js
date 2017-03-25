import {BaseStore} from '../base-store';
import {chatActionTypes} from './chat-action-types';
import {defaultStore} from '../default/default-store';
import {LocalCache} from '../../utils/local-cache';
import {LocalCacheKeys} from '../../utils/local-cache-keys';
import {ApiUrls} from '../../utils/api-urls';
import {SecureAjaxRequest} from '../../utils/ajax-request';


class ChatStore extends BaseStore {

	constructor() {
		super('chat-store-change');
		const modifier = new StateModifier(this.state);
		this.setup(modifier, ActionHandler.handleAction);

	}
}

class ActionHandler {
	static handleAction(action, modiier, emitChange) {
		switch (action.type) {

			default:
				break;
		}
	}
}

class StateModifier {
	constructor(state) {
		this._state = state;
		this.initializeState();
		
	}

	initializeState() {
		this._state.chats = [];
	}
}

const chatStore = new ChatStore();

export {chatStore}