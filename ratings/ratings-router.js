const router = require('express').Router();

const Ratings = require('./ratings-model.js');
const Users = require('../users/users-model.js');

router.post('/rate',verifyUser, (req, res) => {
    const { user_id, rater_id, rate } = req.body;
    if(!rate) {
        return res.status(400).json({ message: 'Rate number required.'})
    }
    let parsedRate = parseInt(rate)
    if(!(1 <= parsedRate && parsedRate <= 5)){
        return res.status(400).json({message: 'Rating number should be between 1 and 5.'})
    }
    Ratings.rate(user_id, rater_id, parsedRate).then(rate => {
        res.status(201).json(rate);
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
});

//middleware

function verifyUser(req, res, next){
    const { user_id, rater_id, rate } = req.body;
    if(user_id === rater_id) {
        return res.status(400).json({message: 'User can not rate themselves.'})
    }
    next();
}

module.exports = router;