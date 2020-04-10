const db = require('../database/db-config.js');

module.exports = {
    find,
    findById
};

function find() {
    return db('users').select('id','name', 'github_username', 'email');
};

function findById(id) {
    return db('users').where({id}).first();
};