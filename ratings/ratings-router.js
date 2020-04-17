const router = require('express').Router();

const Ratings = require('./ratings-model.js');
const Users = require('../users/users-model.js');

router.post('/rate', validateRate, (req, res) => {
    const { user_id, rater_id, rate } = req.body;
    
    Ratings.rate(user_id, rater_id, rate).then(rate => {
        res.status(201).json(rate);
    }).catch(err => {
        res.status(500).json(err);
    });
});

//middleware

function validateRate(req, res, next){
    const { user_id, rater_id, rate } = req.body;
    if(!user_id){
        return res.status(400).json({message: 'user_id is required'});
    };
    if(!rater_id){
        return res.status(400).json({message: 'rater_id is required'});
    };
    if(!rate) {
        return res.status(400).json({ message: 'Rate number required.'});
    }
    let parsedRate = parseInt(rate);
    if(!(1 <= parsedRate && parsedRate <= 5)){
        return res.status(400).json({message: 'Rating number should be between 1 and 5.'});
    }
    if(user_id === rater_id) {
        return res.status(400).json({message: 'User can not rate themselves.'});
    }
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