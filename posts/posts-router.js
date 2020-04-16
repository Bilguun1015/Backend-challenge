const router = require('express').Router();
const Posts = require('./posts-model.js');
const Users = require('../users/users-model.js')

router.post('/add', validatePost, (req, res) => {
    const { user_id, title, body } = req.body;
    Posts.add(user_id, title, body).then(post => {
        res.status(201).json(post);        
    }).catch(err => {
        res.status(500).json(err);
    });
});


//middleware

function validatePost(req, res, next) {
    const { user_id, title, body } = req.body;
    if(!user_id){
        return res.status(400).json({message: 'user_id required'});
    };

    if(user_id[0] === '0'){
        return res.status(400).json({message: 'invalid user id.'});
    };

    if(!parseInt(user_id[0])){
        return res.status(400).json({message: 'invalid user id.'});
    };

    if(!title || !body) {
        return res.status(400).json({message: 'Title and body required.'});
    };

    Users.findById(user_id).then(user => {
        if(user === undefined) {
            return res.status(400).json({message: 'invalid user id.'});
        }
        next();
    }).catch(err => {
        res.status(500).json(err);
    });
};

module.exports = router;