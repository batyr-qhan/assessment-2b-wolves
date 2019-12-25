/* eslint-disable space-before-function-paren */
/* eslint-disable func-names */
const express = require('express');

const router = express.Router();
const Party = require('../models/partySchema');

// const posts = Post.find({});
//   console.log(posts);

// entries home page
router.get('/', async (req, res, next) => {
  const posts = await Post.find({});
  console.log(posts);

  res.render('entries', { posts });
});

// принимаем форму нового поста

router.post('/', (req, res, next) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  newPost.save();
  res.redirect('/entries');
});

// new entries

router.get('/new', (req, res, next) => {
  res.render('new');
});

// показывем конкретный пост

router.get('/:id', async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  res.render('show', { post });
});

// редактируем

router.get('/:id/edit', async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  res.render('edit', { post });
});

// хз почему но этот роут перехватывет кнопку delete. В общем кнопка делет работает сама собой.

router.post('/:id', async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  post.title = req.body.title;
  post.content = req.body.content;
  await post.save();

  res.redirect(`/entries/${post.id}`);
});

module.exports = router;
