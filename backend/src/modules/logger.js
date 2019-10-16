const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

module.exports = app => {
	/**
	 * log only 4xx and 5xx responses to console
	 */
	app.use(morgan('dev'));

	/**
	 *  log all requests to access.log
	 */
	app.use(
		morgan('combined', {
			skip: (req, res) => res.statusCode < 400,
			stream: fs.createWriteStream(path.join('./src', 'api.log'), {
				flags: 'a',
			}),
		}),
	);
};
