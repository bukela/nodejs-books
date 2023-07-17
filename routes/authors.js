const express = require('express');
const router = express.Router();
const Author = require('../models/Author.js');

router.get('/', (req, res) => {
    res.render('authors/index.ejs');
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