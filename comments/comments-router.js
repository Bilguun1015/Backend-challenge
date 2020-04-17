const router = require('express').Router();

const Comments = require('./comments-model.js');
const Users = require('../users/users-model.js');

router.post('/add', validateComment, (req, res) => {
    const { post_id, user_id, message } = req.body;

    Comments.add(post_id, user_id, message).then(comment => {
        res.status(201).json(comment);
    }).catch(err => {
        res.status(500).json(err)
    });
});

router.delete('/delete', (req, res) => {
    const { comment_id } = req.body;
    if(!comment_id) {
        return res.status(400).json({ message: 'Comment_id is required.'})
    }
    Comments.findById(comment_id).then(comment => {
        if(comment === undefined){
            return res.status(404).json({message: 'The comment does not exist'});
        }
        Comments.remove(comment_id).then(del => {
            res.status(200).json(del);
        }).catch(err => {
            res.status(404).json(err);
        });
    }).catch(err => {
        res.status(500).json(err)
    })
    
});

//middleware

function validateComment(req, res, next) {
    const { user_id, post_id, message } = req.body;
    if(!user_id){
        return res.status(400).json({message: 'user_id required'});
    };

    if(user_id[0] === '0'){
        return res.status(400).json({message: 'invalid user id.'});
    };

    if(!parseInt(user_id[0])){
        return res.status(400).json({message: 'invalid user id.'});
    };

    if(!post_id || !message) {
        return res.status(400).json({message: 'post_id and message required.'});
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

module.exports = router