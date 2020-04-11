const db = require('../database/db-config.js');

module.exports = {
    find,
    findByUserId,
    findByUserPostId,
    add
};

function find() {
    return db('posts').select('id','title', 'body', 'user_id');
};

function findByUserId(user_id) {
    return db('posts').where({user_id});
};

function findByUserPostId(user_id, post_id){
    return db('posts').where({user_id: user_id, id: post_id})
}

async function add(user_id, title, body) {
    const [id] = await db('posts').insert({user_id: user_id, title:title, body:body}, 'id');
    return findByUserPostId(user_id, id)
}