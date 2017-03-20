import urlJoin from 'url-join';

const apiUrl = global._apiUrl_;

class ApiUrl {
	static user() {
		return urlJoin(apiUrl, 'user');
	}

	static contact() {
		return urlJoin(apiUrl, 'contact');
	}
}

export {ApiUrl}