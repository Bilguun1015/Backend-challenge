const router = require('express').Router();
const Posts = require('./posts-model.js');
const Users = require('../users/users-model.js')

router.post('/add', validatePost, (req, res) => {
    const { user_id, title, body } = req.body;
    Posts.add(user_id, title, body).then(post => {
        res.status(201).json(post)        
    }).catch(err => {
        console.log(err)
    })
})


//middleware

function validatePost(req, res, next) {
    const { user_id, title, body } = req.body;
    if(!user_id){
        res.status(400).json({message: 'user_id required'})
    }
    if(!title || !body) {
        console.log('greenfish')
        res.status(400).json({message: 'Title and body required.'})
    }
    Users.findById(user_id).then(user => {
        if(user === undefined) {
            res.status(400).json({message: 'invalid user id.'})
        }
        next();
    }).catch(err => {
        console.log(err)
    })
}

module.exports = router;