// @ts-nocheck

import fetch from 'node-fetch';

export class HttpException extends Error {
	constructor({ message, status, statusText, url }) {
		super(message);

		this.url = url;
		this.status = status;
		this.statusText = statusText;
	}
}

export class GitHubClient {
	constructor({ baseUri, token }, ...features) {
		this.baseUri = baseUri;
		this.credentials = token !== null && token.length > 0 ? 'token' + ' ' + token : null;
		this.headers = {
			'Content-Type': 'application/json',
			Accept: 'application/vnd.github.v3.full+json',
			Authorization: this.credentials
		};
		return Object.assign(this, ...features);
	}

	callGitHubAPI({ method, path, data }) {
		let _response = {};

		return fetch(this.baseUri + path, {
			method: method,
			headers: this.headers,
			body: data !== null ? JSON.stringify(data) : null
		})
			.then(response => {
				_response = response;
				// if response is ok transform response.text to json object
				// else throw error
				if (response.ok) {
					return response.json();
				} else {
					throw new HttpException({
						message: `HttpException[${method}]`,
						status: response.status,
						statusText: response.statusText,
						url: response.url
					});
				}
			})
			.then(jsonData => {
				_response.data = jsonData;
				return _response;
			});
	}

	get({ path }) {
		return this.callGitHubAPI({ method: 'GET', path, data: null });
	}

	delete({ path }) {
		return this.callGitHubAPI({ method: 'DELETE', path, data: null });
	}

	post({ path, data }) {
		return this.callGitHubAPI({ method: 'POST', path, data });
	}

	put({ path, data }) {
		return this.callGitHubAPI({ method: 'PUT', path, data });
	}
}
