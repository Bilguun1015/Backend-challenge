const db = require('../database/db-config.js');

module.exports = {
    findById,
    rate
};

function findById(id) {
    return db('ratings').where({id})
}

async function rate(user_id, rater_id, rating){
    const [id] = await db('ratings').insert({user_id: user_id, rater_id: rater_id, rating: rating}, 'id');
    return findById(id);
};
