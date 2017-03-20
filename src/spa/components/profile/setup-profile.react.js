import React from 'react';
import ProfileEditor from './profile-editor.react'
import SubmitButton from './submit-button.react'

import $ from 'jquery';
import urlJoin from 'url-join';

import setupProfile from './setup-profile.scss';
import {requestStates} from '../../core/request-states';

class SetupProfile extends React.Component {
	constructor(props) {
		super();
		this.state = {
			handle: '',
			name: '',
			requestState: requestStates.default
		}
		this._handleHandleChange = this._handleHandleChange.bind(this);
		this._handleNameChange = this._handleNameChange.bind(this);
		this._submitProfile = this._submitProfile.bind(this);
	}

	render() {

		return (
			<div className="setup-profile">
				<ProfileEditor
                    handle={this.state.handle}
                    name={this.state.name}
                    onHandleChange={this._handleHandleChange}
                    onNameChange={this._handleNameChange}
                />
                <RequestMessage
                    requestState={this.state.requestState}
                />
                <RequestSubmitButton
                    requestState={this.state.requestState}
                    onSubmit={this._submitProfile}
                />
			</div>
		)
	}

    _handleHandleChange(event) {
        this.setState({
            handle: event.target.value
        });
    }

    _handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    _submitProfile() {
        this.setState({
            requestState: requestStates.fetching
        });

        global.setTimeout(() => {
            $.ajax({
                url: urlJoin(global.__apiUrl__, 'user'),
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                type: 'POST',
                data: JSON.stringify({
                    handle: this.state.handle,
                    name: this.state.name
                }),
                success: (res) => {
                    localStorage.setItem('user-token', res.token);
                    this.setState({
                        requestState: requestStates.success
                    });
                },
                error: () => {
                    console.log(...arguments);
                    this.setState({
                        requestState: requestStates.hasError
                    });
                }
            });
        }, 3000);
    }
}

export default SetupProfile;