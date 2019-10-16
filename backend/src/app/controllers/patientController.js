const Patient = require('../models/Patient');

module.exports = {
	async loadAll(req, res) {
		try {
			const patients = await Patient.find();

			return res.send({ patients });
		} catch (err) {
			return res.status(400).send({ error: 'Error loading patients' });
		}
	},

	async loadById(req, res) {
		try {
			const patient = await Patient.findById(req.params.patientId);

			return res.send({ patient });
		} catch (err) {
			return res.status(400).send({ error: 'Error loading patient' });
		}
	},

	async store(req, res) {
		try {
			const { name, age, description, observations, location } = req.body;

			const patient = await Patient.create({
				name,
				age,
				description,
				observations,
				location,
				user: req.userId,
			});

			await patient.save();

			return res.send({ patient });
		} catch (err) {
			return res.status(400).send({ error: 'Error saving new patient' });
		}
	},

	async update(req, res) {
		try {
			const { name, age, description, observation, location } = req.body;

			const patient = await Patient.findByIdAndUpdate(
				req.params.patientId,
				{
					name,
					age,
					description,
					observation,
					location,
				},
				{ new: true },
			);

			await patient.save();

			return res.send({ patient });
		} catch (err) {
			return res.status(400).send({ error: 'Error updating patient' });
		}
	},

	async delete(req, res) {
		try {
			await Patient.findByIdAndRemove(req.params.patientId);

			return res.send();
		} catch (err) {
			return res.status(400).send({ error: 'Error deleting patient' });
		}
	},
};
