import {defaultActionTypes} from './default-action-types';
import {mainViews} from '../../enums/main-views';
import {dispatcher} from '../dispatcher';
import {modalKeys} from '../../enums/modal-keys';

class DefaultActions {

	static showChats() {
		const action = {
			type: defaultActionTypes.setMainView,
			data: {
				view: mainViews.chats

			}
		};
		dispatcher.dispatch(action);
	}

	static showChat(handle) {
		const action = {
			type: defaultAction
		}
	}
	
	static proccessProfile(user, token) {
		const action = {
			type: defaultActionTypes.proccessProfile,
			data: {
				user,
				token
			}
		};
		dispatcher.dispatch(action);
	}	

	static openAddContactModal() {
		const action = {
			type: defaultActionTypes.setModalKey,
			data: {
				modalKey: modalKeys.addContact
			}
		};
		dispatcher.dispatch(action);
	}

	static closeModal() {
		const action = {
			type: defaultActionTypes.setModalKey,
		};
		dispatcher.dispatch(action);
	}
}

export {DefaultActions};