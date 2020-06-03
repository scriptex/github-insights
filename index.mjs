// @ts-nocheck
import { writeFileSync } from 'fs';

import chalk from 'chalk';
import yargs from 'yargs';
import dotenv from 'dotenv';

import { GitHubClient } from './client.mjs';
import { info, error, empty, asyncForEach } from './helpers.mjs';

dotenv.config();

const { org, user } = yargs.argv;

if (!org || !user) {
	error('Please provide a Github user (--user) or a Github organisation (--org).');

	process.exit(1);
}

const client = new GitHubClient({
	baseUri: 'https://api.github.com',
	token: process.env.TOKEN
});

const getRepos = async path =>
	await client.get({ path }).catch(e => {
		console.error(e);
		return empty;
	});

(async () => {
	const insights = [];

	const orgRepos = org
		? await info(
				`Fetching repositories for ${chalk.yellow(org)} organisation`,
				async () => await getRepos(`/orgs/${org}/repos`)
		  )
		: empty;

	const userRepos = user
		? await info(
				`Fetching repositories for user ${chalk.yellow(user)}`,
				async () => await getRepos(`/users/${user}/repos`)
		  )
		: empty;

	const repos = [
		...Object.values(orgRepos).map(repo => repo.full_name),
		...Object.values(userRepos).map(repo => repo.full_name)
	].sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));

	await asyncForEach(repos, async repo => {
		const path = `/repos/${repo}/traffic`;

		const paths = await info(
			`Fetching paths data for ${chalk.yellow(repo)}`,
			async () => await client.get({ path: `${path}/popular/paths` })
		);

		const views = await info(
			`Fetching views data for ${chalk.yellow(repo)}`,
			async () => await client.get({ path: `${path}/views` })
		);

		const clones = await info(
			`Fetching clones data for ${chalk.yellow(repo)}`,
			async () => await client.get({ path: `${path}/clones` })
		);

		const referrers = await info(
			`Fetching referrers data for ${chalk.yellow(repo)}`,
			async () => await client.get({ path: `${path}/popular/referrers` })
		);

		insights.push({
			repo,
			paths,
			views,
			clones,
			referrers
		});
	});

	writeFileSync('./insights.json', JSON.stringify(insights, '', 2));

	info('🚀 🚀 Insights fetched. Please check "insights.json" file.');
})();
