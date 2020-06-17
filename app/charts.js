import React from 'react';

import { InsightsBarChart } from './bar-chart';
import { InsightsPieChart } from './pie-chart';

export const Charts = props => (
	<div className="charts">
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

		<InsightsBarChart name="views" data={props.data.views} title="Views" dataKey="timestamp" />

		<InsightsBarChart name="views" data={props.data.forks} title="Forks" dataKey="timestamp" />

		<InsightsBarChart name="clones" data={props.data.clones} title="Clones" dataKey="timestamp" />

		<InsightsPieChart name="referrer" data={props.data.referrers} title="Referrers" dataKey="timestamp" />

		<InsightsPieChart
			name="author"
			data={props.data.contributors.map(item => ({
				count: item.total,
				author: item.author.login
			}))}
			title="Contributors"
		/>
	</div>
);
