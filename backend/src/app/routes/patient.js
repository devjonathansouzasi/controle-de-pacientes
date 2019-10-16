const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const patientController = require('../controllers/patientController');

const router = express.Router();

router.use(authMiddleware);

router.get('/', patientController.loadAll);
router.get('/:patientId', patientController.loadById);
router.post('/', patientController.store);
router.put('/:patientId', patientController.update);
router.delete('/:patientId', patientController.delete);

module.exports = app => app.use('/patients', router);
