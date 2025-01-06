import 'scriptex-socials';
import React from 'react';
import { createRoot } from 'react-dom/client';
import styled, { createGlobalStyle } from 'styled-components';

import { Form } from './form';
import { Charts } from './charts';

const GlobalStyle = createGlobalStyle`
* {
	box-sizing: border-box
}

*:before,
*:after {
	box-sizing: inherit;
}

html,
body,
#app {
	height: 100%;
}

body {
	font-family: 'system-ui';
	margin: 0;
}
`;

const Insights = styled.div`
	height: ${props => (props.data ? 'auto' : '100%')};
	display: flex;
	flex-flow: column wrap;
	align-items: center;
	justify-content: center;
	align-content: center;
	padding: 2rem;
`;

const Error = styled.div`
	line-height: 1;
	color: #f00;
	position: absolute;
	top: 0;
	right: 0;
	padding: 1rem;
`;

const Loading = styled.div`
	height: 100%;
	display: flex;
	flex-flow: column wrap;
	align-items: center;
	justify-content: center;
	align-content: center;
`;

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

	return (
		<>
			<GlobalStyle />
			{loading ? (
				<Loading>... fetching data for {repository}</Loading>
			) : (
				<Insights data={data}>
					{error && <Error>{error}</Error>}

					<Form onSubmit={onSubmit} onChange={e => setRepository(e.target.value)} repository={repository} />

					{data && <Charts data={data} />}

					<social-links style={{ display: 'block', marginTop: 'auto' }}></social-links>
				</Insights>
			)}
		</>
	);
};

const root = createRoot(document.getElementById('app'));

root.render(<App />);
