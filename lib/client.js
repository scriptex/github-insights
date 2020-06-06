// @ts-nocheck

const fetch = require('node-fetch');

class HttpException extends Error {
	constructor({ message, status, statusText, url }) {
		super(message);

		this.url = url;
		this.status = status;
		this.statusText = statusText;
	}
}

class GitHubClient {
	constructor({ baseUri, token }, ...features) {
		this.baseUri = baseUri;
		this.credentials = token ? `token ${token}` : null;
		this.headers = {
			'Content-Type': 'application/json',
			Accept: 'application/vnd.github.v3.full+json'
		};

		if (this.credentials) {
			this.headers.Authorization = this.credentials;
		}

		return Object.assign(this, ...features);
	}

	async call({ method, path, data }) {
		const response = await fetch(this.baseUri + path, {
			method,
			headers: this.headers,
			body: data !== null ? JSON.stringify(data) : null
		});

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
	}

	get({ path }) {
		return this.call({ method: 'GET', path, data: null });
	}

	delete({ path }) {
		return this.call({ method: 'DELETE', path, data: null });
	}

	post({ path, data }) {
		return this.call({ method: 'POST', path, data });
	}

	put({ path, data }) {
		return this.call({ method: 'PUT', path, data });
	}
}

module.exports = {
	GitHubClient
};
