const router = require('express').Router();
const User = require('../models/userSchema.js');

router.get('/', (req, res) => {
    res.render('register', { user: req.user })
});

router.post('/', async (req,res) => {
    const{username} = req.body;
    const email = req.user.email;
    await User.updateOne({email: email}, {
        $set: {
            firstTime:false,
            username: username
        }
    })
    res.redirect('/dashboard')
})

//export router
module.exports = router;