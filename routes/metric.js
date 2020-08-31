var router = require('express').Router();
const { check } = require('express-validator');

const metricController = require('../controllers/metric');
const validations = require('../validations');

router.post('/:key/sum', 
    [validations.metric.addMetric, validations.validateBody], 
    metricController.addMetric);

module.exports = router;
