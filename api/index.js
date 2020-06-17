// @ts-nocheck

const { writeFileSync } = require('fs');

const chalk = require('chalk');
const yargs = require('yargs');
const dotenv = require('dotenv');

const { getInsights } = require('./get-insights.js');
const { info, error, empty, getClient, getRepos, getReposNames } = require('./helpers.js');

dotenv.config();

const { org, user, repository } = yargs.argv;

if (!org && !user && !repository) {
	error(
		'Please provide a Github user (--user), a Github organisation (--org) or a Github repository (:owner/repository).'
	);

	process.exit(0);
}

(async () => {
	const client = getClient(process.env.TOKEN);
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

	const insights = await getInsights(client, repos);

	writeFileSync('./insights.json', JSON.stringify(insights, '', 2));

	info('🚀 🚀 Insights fetched. Please check "insights.json" file.');
})();
