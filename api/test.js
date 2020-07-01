const { join } = require('path');
const { exec } = require('child_process');
const { lstatSync, readdirSync, readFileSync, writeFileSync } = require('fs');

const dirs = readdirSync('../');

const command = (command, options, cb) => {
	exec(command, options, (err, stdout, stderr) => {
		if (err != null) {
			return cb(err, null);
		} else if (typeof stderr != 'string') {
			return cb(stderr, null);
		} else {
			return cb(null, stdout);
		}
	});
};

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

			command(git, { path }, (err, result) => {
				console.log(result);
			});

			console.log('-----');
		}
	}
});
