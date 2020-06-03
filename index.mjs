// @ts-nocheck
import ora from 'ora';
import yargs from 'yargs';
import chalk from 'chalk';
import dotenv from 'dotenv';
import { GitHubClient } from './client.mjs';
import { writeFileSync } from 'fs';

dotenv.config();

const { org, user } = yargs.argv;

const info = async (msg, fn) => {
	if (!fn) {
		console.log(chalk.blue(msg));
		return;
	}

	const spinner = ora(chalk.blue(msg)).start();
	const { data } = await fn();

	spinner.succeed();

	return data;
};

const error = msg => console.log(chalk.red(msg));

if (!org || !user) {
	error('Please provide a Github user (--user) or a Github organisation (--org).');

	process.exit(1);
}

const empty = [
	{
		data: []
	}
];

const client = new GitHubClient({
	baseUri: 'https://api.github.com',
	token: process.env.TOKEN
});

async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

const getRepos = async path =>
	await client.get({ path }).catch(e => {
		console.error(e);
		return empty;
	});

(async () => {
	const insights = [];
	const spinner = ora('Fetching repositories').start();
	const orgRepos = org ? await getRepos(`/orgs/${org}/repos`) : empty;
	const userRepos = user ? await getRepos(`/users/${user}/repos`) : empty;
	const repos = [
		...Object.values(orgRepos.data).map(repo => repo.full_name),
		...Object.values(userRepos.data).map(repo => repo.full_name)
	];
	spinner.stop();

	await asyncForEach(repos, async repo => {
		const path = `/repos/${repo}/traffic`;

		const paths = await info(
			`Fetching paths data for ${repo}`,
			async () => await client.get({ path: `${path}/popular/paths` })
		);

		const views = await info(
			`Fetching views data for ${repo}`,
			async () => await client.get({ path: `${path}/views` })
		);

		const clones = await info(
			`Fetching clones data for ${repo}`,
			async () => await client.get({ path: `${path}/clones` })
		);

		const referrers = await info(
			`Fetching referrers data for ${repo}`,
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
