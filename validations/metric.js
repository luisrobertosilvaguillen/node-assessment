const { check } = require('express-validator');

const addMetric = [
    check('value', 'Must send value').exists(),
    check('value', 'Value must be numeric').isNumeric()
]

module.exports = {
    addMetric
}