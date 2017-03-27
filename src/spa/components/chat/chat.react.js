import React from 'react';
import {chatStore} from '../../flux/chat/chat-store';
import {defaultStore} from '../../flux/default/default-store';
import {SecureAjaxRequest} from '../../utils/ajax-request';
import {ApiUrls} from '../../utils/api-urls';
import {ChatActions} from '../../flux/chat/chat-actions';
import {DefaultActions} from '../../flux/default/default-actions';
import classnames from 'classnames';
// import './chat.scss';


class Chat extends React.Component {
	constructor(props) {
		super();
		this.state = this._getState(props);
		this._handleStoreChange = this._handleStoreChange.bind(this);
		this._handleNewMessage = this._handleNewMessage.bind(this);

	}	

	_getState(props) {
		return {
			messages: chatStore.getMessages(props.handle);
		}
	}

	_handleStoreChange() {
		this.setState(this._getState(this.props));
	}

	_handleNewMessage(event) {
		this.setState({
			newMessage: event.target.value
		});
	}
}