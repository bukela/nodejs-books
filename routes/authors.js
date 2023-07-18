const express = require('express');
const router = express.Router();
const Author = require('../models/Author.js');

router.get('/',  async (req, res) => {
    let searchOptions = {};
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try {
        const authors = await Author.find(searchOptions);
        res.render('authors/index.ejs', {
            authors: authors,
            searchOptions: req.query
        });
    } catch (err) {
        res.redirect('/');
    }
});

router.get('/new', (req, res) => {
    res.render('authors/new.ejs', {author: new Author()});
});

router.post('/', async (req, res) => {

    const author = new Author({
        name: req.body.name
    });

    try {
        const newAuthor = await author.save();
        res.redirect('authors');
    } catch (err) {
        res.render('authors/new', {
            author: author ?? null,
            errorMessage: 'Error creating author'
        });
    }
});

module.exports = router;