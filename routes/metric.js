var router = require('express').Router();
const { check } = require('express-validator');

const metricController = require('../controllers/metric');
const validations = require('../validations');

router.post('/:key', 
    [validations.metric.addMetric, validations.validateBody], 
    metricController.addMetric);

router.get('/:key/sum', metricController.metricSum);

module.exports = router;
