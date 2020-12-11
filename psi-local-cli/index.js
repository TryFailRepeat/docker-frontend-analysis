#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs-extra');
const ora = require('ora');
const ngrok = require('ngrok');
const args = process.argv.slice(2);
const spinner = ora({color: 'cyan'});

// print native help
if (args.includes('--help')) {
	return exec('psi --help', (error, stdout) => {
		if (error) throw new Error(error);

		const output = (error)? error : stdout.replace(/psi/gm, 'psi-local')
			.replace('todomvc.com', 'unymira.com');

		process.stdout.write(output);
		process.exit();
	});
}

// get command line arguments
const options = ((arguments) => {
	const args = [...arguments];

	return {
		url: new URL(args.shift()) || false,
		args: args,
		dir: './reports',
		file: 'speed-report.txt'
	}
})(args);

// set port
const port = (options.url.port)? options.url.port : '80';
const arg_string = options.args.join(' ');

const result = (error, stdout, stderr) => {
	// error out
	if (error) {
		throw new Error(error);
		process.exit(1);
	}

	// console out
	process.stdout.write(stdout);
	process.stdout.write(stderr);

	fs.ensureDir(options.dir, err => {
		if (err) {
			throw new Error(err);
			process.exit(1);
		}

		fs.writeFile(`${options.dir}/${options.file}`, stdout, (err) => {
			if (err) {
				throw new Error(err);
				process.exit(1);
			}

			process.exit();
		});
	});
}

// localhost
if (options.url.hostname === 'localhost') {
	spinner.start();
	spinner.text = '---> Creating ngrok tunnel';

	(async function() {
		let url = await ngrok.connect(options.port);

		if (options.url.pathname) {
			url += options.url.pathname;
		}

		spinner.text = `---> analyzing ${options.url.href}`;

		return exec(`psi ${url} ${arg_string}`, (error, stdout, stderr) => {
			spinner.stop();

			result(error, stdout, stderr);
		});

	})();
} else {
	spinner.start();
	spinner.text = `---> analyzing ${options.url.href}`;

	return exec(`psi ${options.url.href} ${arg_string}`, (error, stdout, stderr) => {
		spinner.stop();

		result(error, stdout, stderr);
	});
}
