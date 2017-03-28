import React from 'react';
import RequestSubmitButton from '../common/request-submit-button.react';
import RequestMessage from '../common/request-message.react';
import {requestStates} from '../../enums/request-states';
import {SecureAjaxRequest} from '../../utils/ajax-request';
import {ApiUrls} from '../../utils/api-urls';
import {ChatActions} from '../../flux/chat/chat-actions';
import './add-contact.scss';

class AddContact extends React.Component{
	constructor(props) {
		super();
		this.state = {
			handle: '',
			requestState: requestStates.default
		};
		this._handleHandleChange = this._handleHandleChange.bind(this);
		this._submit = this._submit.bind(this);
	}


    render() {

        return (
            <div className="add-contact">
                <div className="header">
                    <span>Add Contact</span>
                </div>
                <div className="handle">
                    <label>Handle</label>
                    <input type="text" onChange={this._handleHandleChange} value={this.state.handle}/>
                </div>
                <RequestSubmitButton
                    requestState={this.state.requestState}
                    onSubmit={this._submit}/>
                <RequestMessage
                    requestState={this.state.requestState}/>
            </div>
        )
    }

	_handleHandleChange(event) {
		this.setState({
			handle: event.target.value
		});

		const request = new SecureAjaxRequest();
		const contact = {
			handle: this.state.handle
		};
	}
	
	_submit() {
		this.setState({
			requestState: requestStates.fetching
		});

		const request = new SecureAjaxRequest();
		const contact = {
			handle: this.state.handle,
		};

		request.post({
			url: ApiUrls.contact(),
			data: contact,
			success: (res) => {
				LocalCache.setString(LocalCacheKeys.authToken(), res.token)
				LocalCache.setObject(LocalCacheKeys.contact(), contact)

				this.setState({
					requestState: requestStates.success
				});

                DefaultActions.closeModal();
                ChatActions.processFact(res);
            },
            
            error: (err) => {
                console.log(err);
                this.setState({
                    requestState: requestStates.hasError
                });
			}
		});
	}
}

export default AddContact;