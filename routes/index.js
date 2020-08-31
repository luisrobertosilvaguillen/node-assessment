const router = require('express').Router();

const metricsRoute =  require('./metric');


router.use('/metric', metricsRoute);

// 404 NOT FOUND
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handling
router.use(function(err, req, res, next) {
    if(err.name === 'SequelizeValidationError'){
      return res.status(422).json({
        errors: Object.keys(err.errors).reduce(function(errors, key){
          errors[key] = err.errors[key].message;
          return errors;
        }, {})
      });
    }
    
    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
});
  
module.exports = router;