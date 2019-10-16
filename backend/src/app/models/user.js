const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
	{
		firstname: {
			type: String,
			require: true,
		},
		lastname: {
			type: String,
			require: true,
		},
		username: {
			type: String,
			unique: true,
			required: true,
			lowercase: true,
			trim: true,
			min: 3,
			max: 25,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			min: 3,
			max: 25,
			select: false,
		},
		passwordResetToken: {
			type: String,
			select: false,
		},
		passwordResetExpires: {
			type: Date,
			select: false,
		},
	},
	{
		timestamps: true,
	},
);

UserSchema.pre('save', async function(next) {
	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;

	next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
