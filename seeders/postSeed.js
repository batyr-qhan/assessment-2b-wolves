const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/anonBlog', {
  useNewUrlParser: true,
});

const Post = require('../models/postSchema');

const post1 = new Post({
  title: 'its first',
  content: 'holla asdasdasd fgdfg sdfgsdf',
  createdAt: 'december 2019',
});

post1.save();
