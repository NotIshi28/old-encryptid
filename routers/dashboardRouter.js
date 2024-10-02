const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('dashboard', { user: req.user })
});

//export router
module.exports = router;