const router = require('express').Router();

const Timeline = require('./timeline-model.js');
const Users = require('../users/users-model.js');


router.get('/:user_id', validateUserId, (req, res) => {
    const { user_id } = req.params;
    const { per_page, current_page } = req.query;

    let perPage = per_page || 10;
    let page = current_page || 1;

    Timeline.finalQuery(user_id, perPage, page).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
});

//middleware
function validateUserId(req, res, next) {
    const { user_id } = req.params;
    console.log(user_id)
    if(!user_id){
        return res.status(400).json({ message: 'user_id is required.'});
    };

    if(user_id[0] === '0'){
        return res.status(400).json({message: 'invalid user id.'});
    };

    if(!parseInt(user_id[0])){
        return res.status(400).json({message: 'invalid user id.'});
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