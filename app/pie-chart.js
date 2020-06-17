import React from 'react';
import { Pie, PieChart, Tooltip } from 'recharts';

import { randomColor } from './utils';

export const InsightsPieChart = props => (
	<div className="chart">
		<h2>{props.title}</h2>

		<PieChart width={730} height={250}>
			<Pie
				cx="50%"
				cy="50%"
				data={props.data}
				fill={randomColor()}
				label
				dataKey="count"
				nameKey={props.name}
				outerRadius={100}
			/>

			<Tooltip />
		</PieChart>
	</div>
);
