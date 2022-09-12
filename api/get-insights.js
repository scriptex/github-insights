const chalk = require('chalk');

const { info, separator, asyncForEach } = require('./helpers.js');

const getInsights = (client, repos) =>
	new Promise(async resolve => {
		const insights = [];

		await asyncForEach(repos, async (repo, index) => {
			if (index === 0) {
				separator();
			}

			const path = `/repos/${repo}`;

			const paths = await info(
				`Fetching paths data for ${chalk.yellow(repo)}`,
				async () => await client.get({ path: `${path}/traffic/popular/paths` })
			);

			const views = await info(
				`Fetching views data for ${chalk.yellow(repo)}`,
				async () => await client.get({ path: `${path}/traffic/views` })
			);

			const forks = await info(
				`Fetching forks data for ${chalk.yellow(repo)}`,
				async () => await client.get({ path: `${path}/traffic/views` })
			);

			const clones = await info(
				`Fetching clones data for ${chalk.yellow(repo)}`,
				async () => await client.get({ path: `${path}/traffic/clones` })
			);

			const commits = await info(
				`Fetching commits data for ${chalk.yellow(repo)}`,
				async () => await client.get({ path: `${path}/commits` })
			);

			const referrers = await info(
				`Fetching referrers data for ${chalk.yellow(repo)}`,
				async () => await client.get({ path: `${path}/traffic/popular/referrers` })
			);

			const contributors = await info(
				`Fetching contributors data for ${chalk.yellow(repo)}`,
				async () => await client.get({ path: `${path}/stats/contributors` })
			);

			insights.push({
				repo,
				paths,
				views,
				forks,
				clones,
				commits,
				referrers,
				contributors
			});

			separator();
		});

		resolve(insights);
	});

const getInsightsFromClient = (client, repos) =>
	new Promise(async resolve => {
		const insights = [];

		await asyncForEach(repos, async repo => {
			const path = `/repos/${repo}`;
			const paths = await client.get({ path: `${path}/traffic/popular/paths` });
			const views = await client.get({ path: `${path}/traffic/views` });
			const forks = await client.get({ path: `${path}/traffic/views` });
			const clones = await client.get({ path: `${path}/traffic/clones` });
			const commits = await client.get({ path: `${path}/commits` });
			const referrers = await client.get({ path: `${path}/traffic/popular/referrers` });
			const contributors = await client.get({ path: `${path}/stats/contributors` });

			insights.push({
				repo,
				paths,
				views,
				forks,
				clones,
				commits,
				referrers,
				contributors
			});
		});

		resolve(insights);
	});

module.exports = {
	getInsights,
	getInsightsFromClient
};
