const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

/**
 * Getting config values from json file
 */
const { host, port, user, pass } = require('../config/mail.json');

/**
 * Initializing connection with mail provider
 */
const transport = nodemailer.createTransport({
	host,
	port,
	auth: { user, pass },
});

/**
 * Setting path and type of mail pages files
 */
const handlebarOptions = {
	viewEngine: {
		extName: '.html',
		defaultLayout: null,
		partialsDir: path.resolve('./src/resources/mail/'),
		layoutsDir: path.resolve('./src/resources/mail/'),
	},
	viewPath: path.resolve('./src/resources/mail/'),
	extName: '.html',
};

/**
 * Expose settings for the connection
 */
transport.use('compile', hbs(handlebarOptions));

module.exports = transport;
