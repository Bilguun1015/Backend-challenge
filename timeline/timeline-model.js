// The goal is to provide a simple end point to the mobile clients to display user's timeline
// newest post that the user made
// comments that the user wrote
// when they surpass a 4 star rating
// if the user has github account, when they create a repo
// when they open a new pull request
// when they push commits to a branch
// What to do?
// have 4 different tables to work with
const axios = require('axios');
const db = require('../database/db-config.js');


module.exports = {
    finalQuery,
    findUserRating
};

//find the user
const findUserById = (user_id) => {
    return db('users').where({id : user_id});
};

//find the user posts
const findUserPosts = (user_id) => {
    return db('posts').where({user_id}).orderBy('created_at', 'desc');
};

//find the user comments
const findUserComments = (user_id) => {
    return db('comments').where({user_id}).orderBy('created_at', 'desc');
}

function findUserRating(user_id) {
    return db('ratings').where({user_id}).avg('rating as rating');
}

async function finalQuery (user_id) {
    let finalData = {};
    finalData['userInfo'] = await findUserById(user_id);
    finalData['userRating'] = await findUserRating(user_id);
    finalData['userPosts'] = await findUserPosts(user_id);   
}