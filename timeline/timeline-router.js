const router = require('express').Router();
const axios = require('axios');

const Users = require('../users/users-model.js');
const Posts = require('../posts/posts-model.js');
const Comments = require('../comments/comments-model.js');
const Ratings = require('../ratings/ratings-model.js');


router.get('/user', validateUserId, (req, res) => {
    const { user_id } = req.body;
    let finalData = {};
    Users.findById(user_id).then(user => {
        finalData['user'] = user;
        Ratings.findByUserId(user_id).then(rates => {
            let average = 0;
            rates.forEach(each => {
                average += each.rating
            });
            average = parseFloat((average/rates.length)).toFixed(2);
            finalData['rating'] = average;
            res.status(200).json(finalData)
        }).catch(err => {
            res.status(500).json(err);
        });
    }).catch(err => {
        res.status(500).json(err);
    });
    
    return finalData;
});


router.get('/posts', validateUserId, (req, res) => {
    const {user_id} = req.body;
    Posts.findByUserId(user_id).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(500).json(err);
    })
});

router.get('/github', validateUserId, (req, res) => {
    const {user_id} = req.body;
    Users.findById(user_id).then(user => {
        if(user['github_username']){
            axios.get(`https://api.github.com/users/${user['github_username']}/events/public`).then(data => {
                res.status(200).json(data.data)
            }).catch(err => {
                console.log(err)
            })
        } else {
            return res.status(400).json({message: 'user needs to provide github profile name.'})
        }
    }).catch(err => {
        res.status(500).json(err);
    })
})

router.get('/comments/:post_id', validatePostId, (req, res) => {
    const {post_id} = req.params;
    Comments.findByPostId(post_id).then(comments => {
        res.status(200).json(comments)
    }).catch(err => {
        res.status(500).json(err);
    })
})

//middleware
function validateUserId(req,res, next) {
    const {user_id} = req.body;
    if(!user_id){
        return res.status(400).json({ message: 'user_id is required.'})
    }
    Users.findById(user_id).then(user => {
        if(user === undefined) {
            return res.status(400).json({message: 'invalid user id.'})
        }
        next();
    }).catch(err => {
        res.status(500).json(err);
    })
}

function validatePostId(req, res, next) {
    const {post_id} = req.params;
    if(!post_id){
        return res.status(400).json({ message: 'post_id is required.'})
    }
    Posts.findByID(post_id).then(post => {
        if(post === undefined) {
            return res.status(400).json({message: 'invalid post id.'})
        }
        next();
    }).catch(err => {
        res.status(500).json(err);
    })
}



module.exports = router;