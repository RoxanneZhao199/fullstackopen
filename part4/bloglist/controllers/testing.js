const express = require('express');
const User = require('../models/user');
const Blog = require('../models/blog');
const testingRouter = express.Router();

testingRouter.post('/reset', async (request, response) => {
  if (process.env.NODE_ENV === 'test') {
    await User.deleteMany({});
    await Blog.deleteMany({});

    response.status(204).end();
  } else {
    response.status(403).json({ error: 'not in test mode' });
  }
});

module.exports = testingRouter;
