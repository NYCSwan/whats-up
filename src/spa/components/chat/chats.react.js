import React from 'react';
import {chatStore} from '../../flux/chat/chat-store';

import ChatsList from './chats-list.react';
import ChatsHeader from './chats-header.react';
import AddContactButton from './add-contact-button.react'

import chats from './chats.scss'

class Chats extends React.Component {

	constructor(props) {
		super();
		this.state = this._getState();
		this._handleStoreChange = this._handleStoreChange.bind(this);
	}

	render() {
		return (
			<div className="chats">
				<ChatsHeader />
				{this._renderContents()}
			</div>

		)
	}

	_getState() {
		return {
			chats: chatStore.chats
		};
	}

	_renderContents() {
		if(this.state.chats.length > 0) {
			return <ChatsList />
		} else {
			return (
                <div className="zero-state">
                    <div className="placeholder">
                        <span>No contacts yet, click below to start adding contacts.</span>
                    </div>
                    <AddContactButton />
                </div>
            )
		}

	}

	componentDidMount() {
		chatStore.addChangeListener(this._handleStoreChange);
    }

    componentWillUnmount() {
        chatStore.removeChangeListener(this._handleStoreChange);
    }

    _handleStoreChange() {
        this.setState(this._getState());
	}
}

export default Chats;