const router = require('express').Router();
const User = require('../models/userSchema.js');

router.get('/', async (req, res) => {
    users = await User.find({isBanned:false}).sort({score: -1});
    res.render('leaderboard', { users: users });
});

//export router
module.exports = router;