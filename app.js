const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminRouts = require('./routes/admin');
const shopRouts = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouts);
app.use(shopRouts);

app.use('/', (req, res, next) => {
    res.status(400).send('<h1>not found</h1>');
});

app.listen(3030);
