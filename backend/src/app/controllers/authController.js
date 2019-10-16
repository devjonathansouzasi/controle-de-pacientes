const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mailer = require("../../modules/mailer");

const authConfig = require("../../config/auth");

const { from } = require("../../config/mail");

const User = require("../models/User");

function generateToken(params = {}) {
	return jwt.sign(params, authConfig.secret, {
		expiresIn: authConfig.expirationTime
	});
}

module.exports = {
	async register(req, res) {
		try {
			const user = await User.create(req.body);

			user.password = undefined;

			return res.send({
				user,
				token: generateToken({ id: user.id })
			});
		} catch (err) {
			const errors = [];
			if (err.errors.username) errors.push("Username already exists");
			if (err.errors.email) errors.push("Email already exists");

			return res.status(400).send({
				err
			});
		}
	},

	async authenticate(req, res) {
		const { username, password } = req.body;

		try {
			const user =
				(await User.findOne({ username }).select("+password")) ||
				(await User.findOne({ email: username }).select("+password"));

			if (!user)
				return res.status(400).send({
					error: "User not found"
				});

			if (!(await bcrypt.compare(password, user.password)))
				return res.status(400).send({
					error: "Invalid password"
				});

			user.password = undefined;

			res.send({
				user,
				token: generateToken({ id: user.id })
			});
		} catch (err) {
			return res.status(400).send({
				error: err
			});
		}
	},

	async forgotPassword(req, res) {
		const { email } = req.body;

		try {
			const user = await User.findOne({ email });

			if (!user)
				return res.status(400).send({
					error: "User not found"
				});

			const token = crypto.randomBytes(20).toString("hex");

			const now = new Date();
			now.setHours(now.getHours() + 1);

			await User.findByIdAndUpdate(user.id, {
				$set: {
					passwordResetToken: token,
					passwordResetExpires: now
				}
			});

			mailer.sendMail(
				{
					to: email,
					from: from,
					template: "auth/forgot_password",
					context: { token }
				},
				err => {
					if (err) {
						return res.status(400).send({
							error: "Cannot send forgot password email"
						});
					}

					return res.send();
				}
			);
		} catch (err) {
			console.log(err);
			res.status(400).send({
				error: "Error on forgot password, try again"
			});
		}
	},

	async resetPassword(req, res) {
		const { email, token, password } = req.body;

		try {
			const user = await User.findOne({ email }).select(
				"+passwordResetToken passwordResetExpires"
			);

			if (!user)
				return res.status(400).send({
					error: "User not found"
				});

			if (token !== user.passwordResetToken)
				return res.status(400).send({ error: "Token invalid" });

			const now = new Date();

			if (now > user.passwordResetExpires)
				return res
					.status(400)
					.send({ error: "Token expired, generate a new one" });

			user.password = password;

			await user.save();

			res.send();
		} catch (err) {
			res.status(400).send({
				error: "Cannot reset password, try again"
			});
		}
	},
	async loadAll(req, res) {
		try {
			const users = await User.find();

			return res.send({ users });
		} catch (err) {
			return res.status(400).send({ error: "Error loading users" });
		}
	}
};
