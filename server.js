require('dotenv').config();
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index.js');
const authorsRouter = require('./routes/authors.js');
const booksRouter = require('./routes/books.js');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout.ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: false
}));

const mongoose = require('mongoose');
mongoose.connect(
    process.env.DATABASE_URL,
    {useNewUrlParser: true}
);
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected'));

app.use('/', indexRouter);
app.use('/authors', authorsRouter);
app.use('/books', booksRouter);

app.listen(process.env.PORT || 3000);