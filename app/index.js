// @ts-nocheck

import 'scriptex-socials';
import React from 'react';
import ReactDOM from 'react-dom';

import { Form } from './form';
import { Charts } from './charts';

const App = () => {
	const [data, setData] = React.useState();
	const [error, setError] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [repository, setRepository] = React.useState('');

	const onSubmit = event => {
		event.preventDefault();

		setLoading(true);

		fetch('/insights', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: 'repository=' + repository
		})
			.then(async res => {
				const [response] = await res.json();
				const errors = Object.values(response)
					.map(value => value.status)
					.filter(Boolean).length;

				if (errors > 0) {
					setError(`Repository ${repository} does not exist.`);
				} else {
					setData(response);
					setError('');
				}
			})
			.catch(_ => setError('Something went wrong. Please try again later.'))
			.finally(() => {
				setLoading(false);
			});
	};

	return loading ? (
		<div className="loading">... fetching data for {repository}</div>
	) : (
		<div className={`insights${data ? ' insights--fetched' : ''}`}>
			{error && <div className="error">{error}</div>}

			<Form onSubmit={onSubmit} onChange={e => setRepository(e.target.value)} repository={repository} />

			{data && <Charts data={data} />}

			<social-links></social-links>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('app'));
