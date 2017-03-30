import urlJoin from 'url-join';

const apiUrl = global.__apiUrl__;
// concating apiurls for each extention

class ApiUrls {
	static user() {
		return urlJoin(apiUrl, 'user');
	}

	static contact() {
		return urlJoin(apiUrl, 'contact');
	}

	static message() {
		return urlJoin(apiUrl, 'message');
	}

	static acknowledge() {
		return urlJoin(apiUrl, 'acknowledge');
	}
}

export {ApiUrls}

