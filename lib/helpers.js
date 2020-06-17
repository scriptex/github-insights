// @ts-nocheck

const ora = require('ora');
const chalk = require('chalk');
const fetch = require('node-fetch');
const { GitHubClient } = require('universal-github-client');

const getClient = token =>
	new GitHubClient({
		base: 'https://api.github.com',
		token,
		fetch
	});

const info = async (msg, fn) => {
	if (!fn) {
		console.log(chalk.blue(msg));
		return;
	}

	const spinner = ora(chalk.blue(msg)).start();
	const data = await fn();

	spinner.succeed();

	return data;
};

const error = msg => console.error(chalk.red(msg));

const empty = [
	{
		data: []
	}
];

const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};

const separator = () => info(chalk.green('--- --- --- --- --- --- --- --- --- ---'));

const getRepos = async (client, path) =>
	await client.get({ path }).catch(() => {
		error(`Error getting repository data for ${chalk.yellow(path)}`);

		return empty;
	});

const getReposNames = repos =>
	Object.values(repos)
		.map(repo => repo.full_name)
		.filter(Boolean);

module.exports = {
	info,
	error,
	empty,
	getRepos,
	getClient,
	separator,
	asyncForEach,
	getReposNames
};
