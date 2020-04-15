require('dotenv').config();
const express = require('express');

const timelineRouter = require('./timeline/timeline-router.js');
const postsRouter = require('./posts/posts-router.js');
const commentsRouter = require('./comments/comments-router.js');
const ratingsRouter = require('./ratings/ratings-router.js');

const server = express();
server.use(express.urlencoded());
server.use(express.json());

server.use('/api/timeline', timelineRouter);
server.use('/api/post', postsRouter);
server.use('/api/comments', commentsRouter);
server.use('/api/ratings', ratingsRouter);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`\n===Server listening on port ${PORT} ===\n`);
});