class LocalCacheKeys {
	
	static authToken() {
		return 'auth-token|v13';  //switched from v6 to v13 why? what does this mean?
	}

	static user() {
		return 'user|v2';
	}

	static facts() {
		return 'fact|v0';
	}
}

export {LocalCacheKeys}