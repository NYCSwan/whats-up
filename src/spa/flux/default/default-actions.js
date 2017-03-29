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
			type: defaultAction.setMainView,
			data: {
				view: mainViews.chat,
				initialData: {
					handle 
				}
			}
		};
		dispatcher.dispatch(action);
	}
	
	static processProfile(user, token) {
		const action = {
			type: defaultActionTypes.processProfile,
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
			type: defaultActionTypes.closeModal
		};
		dispatcher.dispatch(action);
	}
}

export {DefaultActions};