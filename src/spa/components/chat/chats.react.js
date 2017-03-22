import React from 'react';
import ChatsList from './chats-list';
import ChatStore from '../../chats/chat-store';

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
                    <h4>AddContactButton </h4>
                </div>
            )
		}

	}
}

export default Chats;