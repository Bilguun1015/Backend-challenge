const router = require('express').Router();
const axios = require('axios');

const Timeline = require('./timeline-model.js');
const Users = require('../users/users-model.js');


router.get('/', (req, res) => {
    const {user_id} = req.body;
    let mainData = []
    if(!user_id){
        return res.status(400).json({ message: 'user_id is required.'})
    }
    Users.findById(user_id).then(user => {
        if(user['github_username']){
            axios.get(`https://api.github.com/users/${user['github_username']}/events/public`).then(data => {
                mainData.push(data.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }).catch(err => {
        console.log(err)
    })
    Timeline.findByDate(user_id).then(data => {
        console.log(data)
        res.status(200).json(data)
    }).catch(err => {
        console.log(err)
    })
})



module.exports = router;