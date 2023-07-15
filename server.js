const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index.js');
const booksRouter = require('./routes/books.js');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout.ejs');
app.use(expressLayouts);
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/books', booksRouter);

app.listen(process.env.PORT || 3000);

console.log('running');