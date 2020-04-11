const db = require('../database/db-config.js');

module.exports = {
    findByDate
};

function findByDate(user_id) {
    return db('users as u')
        .join('posts as p', 'u.id', 'p.user_id')
        .join('comments as c', 'p.id', 'c.post_id')
        .join('ratings as r', 'u.id', 'r.user_id')
        .select('u.name', 'r.rating','p.created_at', 'p.title', 'p.body', 'c.message')
        .where({'u.id': user_id})
        .orderBy('p.created_at', 'asc')
};


