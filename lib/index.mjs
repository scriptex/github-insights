// @ts-nocheck
import { writeFileSync } from 'fs';

import chalk from 'chalk';
import yargs from 'yargs';
import dotenv from 'dotenv';

import { GitHubClient } from './client.mjs';
import { info, error, empty, separator, asyncForEach, getRepos, getReposNames } from './helpers.mjs';

dotenv.config();

const { org, user, repository } = yargs.argv;

if (!org && !user && !repository) {
	error(
		'Please provide a Github user (--user), a Github organisation (--org) or a Github repository (:owner/repository).'
	);

	process.exit(0);
}

(async () => {
	const client = new GitHubClient({
		baseUri: 'https://api.github.com',
		token: process.env.TOKEN
	});

	const insights = [];

	const orgRepos = org
		? await info(
				`Fetching repositories for ${chalk.yellow(org)} organisation`,
				async () => await getRepos(client, `/orgs/${org}/repos`)
		  )
		: empty;

	const userRepos = user
		? await info(
				`Fetching repositories for user ${chalk.yellow(user)}`,
				async () => await getRepos(client, `/users/${user}/repos`)
		  )
		: empty;

	const repos = [...getReposNames(orgRepos), ...getReposNames(userRepos)].sort((a, b) =>
		a > b ? 1 : a < b ? -1 : 0
	);

	if (repository) {
		repos.push(repository);
	}

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

	writeFileSync('./insights.json', JSON.stringify(insights, '', 2));

	info('🚀 🚀 Insights fetched. Please check "insights.json" file.');
})();
