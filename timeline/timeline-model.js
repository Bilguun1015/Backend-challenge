// The goal is to provide a simple end point to the mobile clients to display user's timeline
// newest post that the user made
// comments that the user wrote
// when they surpass a 4 star rating
// if the user has github account, when they create a repo
// when they open a new pull request
// when they push commits to a branch
// What to do?
// have 4 different tables to work with
// find Posts made by 
const axios = require('axios');
const db = require('../database/db-config.js');

const findUserById = (user_id) => {
    return db('users').where({id : user_id}).first();
};

const findUserPosts = (user_id, limit) => {
    return db('comments as c')
        .join('posts as p', 'c.post_id', 'p.id')
        .select('p.title', 'p.posted_at','c.post_id', 'p.user_id')
        .where({'p.user_id': user_id})
        .count('c.message as comments')
        .groupBy('c.post_id')
        .limit(limit)
        .orderBy('p.posted_at', 'desc')
};

const findUserComments = (user_id, limit) => {
    return db('comments as c')
        .join('posts as p', 'p.id', 'c.post_id')
        .join('users as u', 'u.id', 'p.user_id')
        .select('u.id','u.name', 'c.commented_at')
        .where({'c.user_id': user_id})
        .limit(limit)
        .orderBy('c.commented_at', 'desc');
}

const findUserRating = (user_id) => {
    return db('ratings').where({user_id}).avg('rating as rating');
}

const findGithubInfo = async (github_name) => {
    const data = await axios.get(`https://api.github.com/users/${github_name}/events/public`);
    return data.data;
}

async function finalQuery (user_id, limit) {
    let finalData = {};

    const user = await findUserById(user_id);
    finalData['user_info'] = user;
    if(user['github_username']){
        finalData['github_activities'] = await findGithubInfo(user['github_username'])
    }
    const [userRating] = await findUserRating(user_id);

    if(userRating['rating'] >= 4){
        finalData.user_info['user_rating'] = userRating['rating'];
    }

    finalData['user_posts'] = await findUserPosts(user_id, limit);
    let users = await findUserComments(user_id, limit);
    for(let user of users){
        let [avg] = await findUserRating(user.id);
        user['rating'] = avg.rating;
    }
    finalData['user_comments'] = users;

    return finalData;
}

module.exports = {
    finalQuery,
    findUserRating,
    findGithubInfo
};