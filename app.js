const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet'); 

const apiRoutes = require('./routes');

//App
const app = express();
// Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.json());
app.use(apiRoutes);

//Starting Sever
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
  