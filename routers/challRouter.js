const router = require('express').Router();
const Crypt = require('../models/CryptSchema.js');
const Ctf = require('../models/CtfSchema.js');


router.get('/cryptic', async (req, res) => {
    let cryptLvls = await Crypt.find({});
    console.log(cryptLvls);
    lvls = cryptLvls.length;
    
    res.render('cryptic', { user: req.user, lvls: lvls})
});

router.get('/ctf', (req, res) => {
    res.render('ctf', { user: req.user })
});



//export router
module.exports = router;