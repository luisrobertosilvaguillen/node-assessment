const router = require('express').Router();

const metricsRoute =  require('./metric');


router.use('/metric', metricsRoute);

router.use(function(err, req, res, next) {
    if(err.name === 'SequelizeValidationError'){
      return res.status(422).json({
        errors: Object.keys(err.errors).reduce(function(errors, key){
          errors[key] = err.errors[key].message;
          return errors;
        }, {})
      });
    }
    return next(err);
});
  
module.exports = router;