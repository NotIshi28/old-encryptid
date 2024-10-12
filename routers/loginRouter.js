const router = require('express').Router();
const {loginUser, forwardAuthenticated} = require('../utils/authenticate.js')

router.get('/', forwardAuthenticated, (req, res) => {
    res.render('login', { user: req.user })
});

router.post('/', async (req, res, next) => {
    await loginUser(req, res, next);
})

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) console.log(err)
        return res.redirect('/')
    });
})

//export router
module.exports = router;