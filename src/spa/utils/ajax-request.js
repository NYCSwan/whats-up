import $ from 'jquery';
import {LocalCache} from './local-cache';
import {LocalCacheKeys} from './local-cache-keys';

class AjaxRequest {

	get(options) {
		this._requestGet(options.url, options.success, options.error);
	}

	post(options) {
		this._requestPost(options.url, options.data, options.success, options.error);
	}

	_requestGet(url, success, err) {
		$.ajax({
			url,
			method: 'GET',
			beforeSend: this._setHeaders,
			success,
			err

		});
	}

	_requestPost(url, requestData, success, err) {
		$.ajax({
			url,
			method: 'POST',
			beforeSend: this._setHeaders,
			dataType: 'json',
			contentType: 'application/json',
			jsonp: false,
			data: JSON.stringify(requestData),
			success,
			err
		});

	}

	_setHeaders(request) {}
}

class StandardAjaxRequest extends AjaxRequest {
    _setHeaders(request) {
        super._setHeaders(request);
        request.setRequestHeader('Cache-Control', 'no-cache');
        request.setRequestHeader('Pragma', 'no-cache');
    }
}

class SecureAjaxRequest extends StandardAjaxRequest {
    _setHeaders(request) {
        super._setHeaders(request);
        const authToken = LocalCache.getString(LocalCacheKeys.authToken());
        if (authToken) {
            request.setRequestHeader('Authorization: ', authToken);
        }
        else {
            throw new Error('auth token missing');
        }
    }
}

export {StandardAjaxRequest, SecureAjaxRequest}