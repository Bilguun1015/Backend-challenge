const router = require('express').Router();

const Comments = require('./comments-model.js');

router.post('/add', (req, res) => {
    const { post_id, user_id, msg } = req.body;
    if(!msg) {
        return res.status(400).json({ message: 'Comment is required.'})
    }
    if(!post_id) {
        return res.status(400).json({ message: 'post_id is required.'})
    }
    if(!user_id) {
        return res.status(400).json({ message: 'user_id is required.'})
    }
    Comments.add(post_id, user_id, msg).then(comment => {
        res.status(201).json(comment);
    }).catch(err => {
        console.log(err)
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
        res.status(500).json({message: 'Backend error'})
    })
    
});

module.exports = router