const path = require('path');
const fs = require('fs');

const nodeModules = {};

fs.readdirSync('node_modules')
	.filter(function (x) {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach(function (mod) {
		nodeModules[mod] = 'commonjs ' + mod;
	});

module.exports = {
	mode: 'development',
	entry: './server.js',
	target: 'node',
	output: {
		filename: 'taskApiServer.js',
		path: path.resolve(__dirname, './')
	},
	externals: nodeModules,
	watch: false
};