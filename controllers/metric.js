var models  = require('../models');

// Private Methods
addMetricValue = (req, res, next, metric) => {
    const value = req.body.value;
    models.MetricValues.create({value, metricId: metric.id})
    .then(newMetric => {
        metric = newMetric;
        res.status(200).send({});
    })    
    .catch((error) => {
        next(error);
    })
}

// Controller Services
exports.addMetric = (req, res, next) => {
    // Lest Get Or Create a Metric 
    const metricKey = req.params["key"];
    models.Metrics
    .findOne({ where: {name: metricKey} })
    .then((metric) => {
        if(!metric) { // If not exist a metric, it must be created, then, add the value
            models.Metrics.create({name: metricKey})
            .then(newMetric => {
                addMetricValue(req, res, next, newMetric);
            })    
            .catch((error) => {
                next(error);
            })
        } else { // If exist, add the value
            addMetricValue(req, res, next, metric);
        }
    })
    .catch((error) => {
        next(error);
    })
};

