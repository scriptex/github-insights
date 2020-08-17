import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.div`
	width: 100%;
	display: flex;
	flex-flow: column wrap;
	align-items: center;
	justify-content: center;
	flex: 1;
`;

const H1 = styled.h1`
	margin: 0 0 1rem;
`;

const P = styled.p`
	margin: 0 0 1rem;
`;

const Input = styled.input`
	font-size: 1rem;
	line-height: 1.25;
	width: 20rem;
	height: 2rem;
	display: inline-block;
	vertical-align: middle;
	padding: 0.25rem;
	border: 0.125rem solid;
	background: #fff;
	border-radius: 0;
	box-shadow: none;
`;

const Submit = styled.input`
	font-size: 1rem;
	line-height: 1.25;
	padding: 0.25rem;
	border: 0.125rem solid;
	background: #ccc;
	border-radius: 0;
	box-shadow: none;
	appearance: none;
	cursor: pointer;
`;

export const Form = props => (
	<StyledForm>
		<H1>Github Insights</H1>

		<P>Get insights for your repository</P>

		<form onSubmit={props.onSubmit}>
			<Input
				type="text"
				value={props.repository}
				placeholder=":owner/:repository"
				required
				onChange={props.onChange}
			/>

			<Submit type="submit" value="Go" />
		</form>
	</StyledForm>
);
