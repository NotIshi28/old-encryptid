const router = require('express').Router();
const Crypt = require('../models/CryptSchema.js');
const Ctf = require('../models/CtfSchema.js');
const User = require('../models/userSchema.js');

router.get('/cryptic', async (req, res) => {
    let cryptLvls = await Crypt.find({}).sort({lvlNo: 1});
    console.log(cryptLvls);
    let lvls = cryptLvls;

    res.render('cryptic', { user: req.user, lvls: lvls})
});

router.get('/cryptic/:lvlNo', async (req, res) => {
    let lvlNo = req.params.lvlNo;
    let cryptLvl = await Crypt.findOne({lvlNo: lvlNo});
    console.log(cryptLvl);
    res.render('cryptLvl', { user: req.user, cryptLvl: cryptLvl})
})

router.post('/cryptic/:lvlNo', async (req, res) => {
    let lvlNo = req.params.lvlNo;
    let cryptLvl = await Crypt.findOne({lvlNo: lvlNo});
    console.log(req.body.answer)
    const user = await User.findOne({username: req.user.username});
    let completed = user.completed;
    completed.push({lvlNo: cryptLvl.lvlNo, title: cryptLvl.title});
    if(req.body.answer == cryptLvl.answer){
        console.log("correct");
        res.redirect('/challenges/cryptic');
        await User.updateOne({username: req.user.username}, {
            $set: {
                completed: completed
            }
        }).then(console.log("yooo"))
    }
    else{
        console.log("GALT JAWAB");
        res.render('cryptLvl', { user: req.user, cryptLvl: cryptLvl})
    }
})

router.get('/ctf', async (req, res) => {
    let ctfLvls = await Ctf.find({});
    
    let lvls = ctfLvls;
    res.render('ctf', { user: req.user, lvls : lvls})
});

router.get('/ctf/:lvlNo', async (req, res) => {
    let lvlNo = req.params.lvlNo;
    let ctfLvl = await Ctf.findOne({lvlNo: lvlNo});
    console.log(ctfLvl);
    res.render('ctfLvl', { user: req.user, ctfLvl: ctfLvl})
});



//export router
module.exports = router;