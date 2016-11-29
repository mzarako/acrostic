const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');

function configuration(app) {

	app.use(express.static(path.resolve(__dirname, '../', 'client')));
	app.use('/libs', express.static(path.resolve(__dirname, '../', 'node_modules')));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

}

module.exports = configuration;

