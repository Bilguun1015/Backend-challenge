const db = require('../database/db-config.js');

module.exports = {
    find,
    findByUserId,
    findByID,
    add
};

function find() {
    return db('posts').select('id','title', 'body', 'user_id');
};

function findByUserId(user_id) {
    return db('posts').where({user_id}).orderBy('created_at', 'desc');
};

function findByID(id){
    return db('posts').where({id}).first();
}

async function add(user_id, title, body) {
    const [id] = await db('posts').insert({user_id: user_id, title:title, body:body}, 'id');
    return findByID(id)
}