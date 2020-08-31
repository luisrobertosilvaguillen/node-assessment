var models  = require('../models');
const { Op } = require("sequelize");
// Private Methods
addMetricValue = (req, res, next, metric) => {
    const value = Math.round(req.body.value);
    models.MetricValues.create({value, metricId: metric.id})
    .then(newMetric => {
        metric = newMetric;
        res.status(200).send({});
    })    
    .catch((error) => {
        next(error);
    })
}

getMetricValuesSummarized =  (req, res, next, metric) => {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 1);

    models.MetricValues.sum('value', {
        where: {
            metricId: metric.id,
            createdAt: {
                [Op.gt]: currentDate,
            }
        }
    })
    .then(total => {
        res.status(200).send({value: total});
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

exports.metricSum = (req, res, next) => {
    const metricKey = req.params["key"];
    models.Metrics
    .findOne({ where: {name: metricKey} })
    .then((metric) => {
        if(metric) { // If metric exist, sum all values in the last hour
            getMetricValuesSummarized(req, res, next, metric);
        } else { // If metric not exist, return error
            const error = new Error("Metric not found");
            error.status= 404;
            next(error);
        }
    })
    .catch((error) => {
        next(error);
    })
};
