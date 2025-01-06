import React from 'react';

import { InsightsBarChart } from './bar-chart';
import { InsightsPieChart } from './pie-chart';

export const Chart = props => {
	if (!props.data || props.data.length === 0) {
		return null;
	}

	return props.children;
};

export const Charts = props => (
	<div className="charts">
		<Chart data={props.data.paths}>
			<InsightsBarChart
				name="paths"
				data={props.data.paths.reduce(
					(result, path) => {
						result.count = (result.count || 0) + path.count;
						result.uniques = (result.uniques || 0) + path.uniques;

						return result;
					},
					{
						paths: props.data.paths
					}
				)}
				title="Paths"
				dataKey="path"
			/>
		</Chart>

		<Chart data={props.data.views}>
			<InsightsBarChart name="views" data={props.data.views} title="Views" dataKey="timestamp" />
		</Chart>

		<Chart data={props.data.forks}>
			<InsightsBarChart name="views" data={props.data.forks} title="Forks" dataKey="timestamp" />
		</Chart>

		<Chart data={props.data.clones}>
			<InsightsBarChart name="clones" data={props.data.clones} title="Clones" dataKey="timestamp" />
		</Chart>

		<Chart data={props.data.referrers}>
			<InsightsPieChart name="referrer" data={props.data.referrers} title="Referrers" dataKey="timestamp" />
		</Chart>
	</div>
);
