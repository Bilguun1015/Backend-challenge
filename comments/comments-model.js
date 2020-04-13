const db = require('../database/db-config.js');

module.exports = {
    findByPostId,
    findById,
    add,
    remove
};

function findByPostId(post_id) {
    return db('comments').where({post_id}).orderBy('commented_at', 'desc');
}

function findById(id) {
    return db('comments').where({id}).first();
}

async function add(post_id, user_id, msg) {
    const [id] = await db('comments').insert({user_id: user_id, post_id:post_id, message:msg}, 'id');
    return findById(id);
};

function remove(id) {
    return db('comments').where({id}).del();
};