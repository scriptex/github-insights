import React from 'react';

export const Form = props => (
	<div className="form">
		<h1>Github Insights</h1>

		<p>Get insights for your repository</p>

		<form onSubmit={props.onSubmit}>
			<input
				type="text"
				value={props.repository}
				placeholder=":owner/:repository"
				required
				onChange={props.onChange}
			/>

			<input type="submit" value="Go" />
		</form>
	</div>
);
