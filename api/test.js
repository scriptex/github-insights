const { join } = require('path');
const { execSync } = require('child_process');
const { lstatSync, readdirSync, readFileSync, writeFileSync } = require('fs');

const dirs = readdirSync('../');

const git = `
git add .
git commit -m "Update WhiteSource config"
git push
`;

dirs.forEach(dir => {
	const path = join('../', dir);

	if (lstatSync(path).isDirectory()) {
		const hasWhiteSourceFile = readdirSync(path).find(file => file === '.whitesource');

		if (hasWhiteSourceFile) {
			console.log(path);

			const filepath = join(path, '.whitesource');
			const content = readFileSync(filepath, 'utf8');

			writeFileSync(filepath, content.replace('failure', 'success'));

			execSync(git, { path });

			console.log('-----');
		}
	}
});
