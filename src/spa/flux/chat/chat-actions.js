import {dispatcher} from '../dispatcher';
import {chatActionTypes} from './chat-action-types';

class ChatActions {
    static processFact(fact) {
        const action = {
            type: chatActionTypes.processFact,
            data: {
            	fact
            }
        };
        dispatcher.dispatch(action);
    }
}

export {ChatActions}