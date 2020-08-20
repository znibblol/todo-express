const express = require('express');
const cors =  require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

const todos = require('./routes/todos');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/todos', todos);


// Catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({message: err.message,error: req.app.get('env') === 'development' ? err : {}});
});


let PORT = process.env.PORT || 3030;

module.exports = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
