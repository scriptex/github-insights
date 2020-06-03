// @ts-nocheck

import ora from 'ora';
import chalk from 'chalk';

export const info = async (msg, fn) => {
	if (!fn) {
		console.log(chalk.blue(msg));
		return;
	}

	const spinner = ora(chalk.blue(msg)).start();
	const data = await fn();

	spinner.succeed();

	return data;
};

export const error = msg => console.error(chalk.red(msg));

export const empty = [
	{
		data: []
	}
];

export const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};

export const separator = () => info(chalk.green('--- --- --- --- --- --- --- --- --- ---'));

export const getRepos = async (client, path) =>
	await client.get({ path }).catch(() => {
		error(`Error getting repository data for ${chalk.yellow(path)}`);

		return empty;
	});

export const getReposNames = repos =>
	Object.values(repos)
		.map(repo => repo.full_name)
		.filter(Boolean);
