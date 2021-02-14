const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const app = express();
const routes = require('./routes/routes');
require('./config/db');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/', routes);

app.set('port', 7007);


app.listen(app.get('port'), ()=>{
    console.log(`Server running on port ${app.get('port')}.`)
});