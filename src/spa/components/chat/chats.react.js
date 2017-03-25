import React from 'react';
import {chatStore} from '../../flux/chat/chat-store';

import ChatsList from './chats-list.react';
import ChatsHeader from './chats-header.react';
import AddContactButton from './add-contact-button.react'

import chats from './chats.scss'

class Chats extends React.Component {

	constructor(props) {
		super();
		this.state = {
			chats: chatStore.chats
		};
	}

	render() {
		return (
			<div className="chats">
				<h3>Chat header</h3>
				{this._renderContents()}
			</div>

		)
	}

	_renderContents() {
		if(this.state.chats.length > 0) {
			return < ChatsList />
		} else {
			return (
                <div className="zero-state">
                    <div className="placeholder">
                        <span>No contacts yet, click below to start adding contacts.</span>
                    </div>
                    <h4>AddContactButton</h4>
                </div>
            )
		}

	}
}

export default Chats;