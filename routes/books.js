const express = require('express');
const router = express.Router();
const Book = require('../models/Book.js');
const Author = require('../models/Author.js');

router.get('/',  async (req, res) => {
    res.render('books/index.ejs');
});

router.get('/new', async (req, res) => {
    try {
        const authors = await Author.find({});
        const book = new Book();
        res.render('books/new.ejs', {
            authors: authors,
            book: book
        });
    } catch (err) {
        res.redirect('/books');
    }
});

router.post('/', async (req, res) => {
    res.send('Create book');
});

module.exports = router;