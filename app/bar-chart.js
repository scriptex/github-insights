import React from 'react';
import format from 'date-fns/format';
import { Bar, XAxis, YAxis, Legend, Tooltip, BarChart, CartesianGrid } from 'recharts';

import { capitalize, randomColor } from './utils';

const formatter = t => format(new Date(t), 'MMM dd');
const labelFormatter = value => capitalize(value);

export const InsightsBarChart = props => (
	<div className="chart">
		<h2>{props.title}</h2>

		<p>Count: {props.data.count}</p>

		<p>Unique: {props.data.uniques}</p>

		<BarChart width={700} height={300} data={props.name ? props.data[props.name] : props.data}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey={props.dataKey} tickFormatter={props.dataKey === 'timestamp' ? formatter : () => ''} />
			<YAxis />
			<Tooltip labelFormatter={props.dataKey === 'timestamp' ? formatter : t => t} />
			<Legend formatter={labelFormatter} />
			<Bar dataKey="count" fill={randomColor()} />
			<Bar dataKey="uniques" fill={randomColor()} />
		</BarChart>
	</div>
);
