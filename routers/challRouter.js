const router = require('express').Router();
const Crypt = require('../models/CryptSchema.js');
const Ctf = require('../models/CtfSchema.js');
const User = require('../models/userSchema.js');

router.get('/cryptic', async (req, res) => {
    let cryptLvls = await Crypt.find({}).sort({lvlNo: 1});
    console.log(cryptLvls);
    let lvls = cryptLvls;
    const completed = req.user.completed;
    console.log(completed)
    res.render('cryptic', { user: req.user, lvls: lvls, completed: completed})
});

router.get('/cryptic/:lvlNo', async (req, res) => {
    let lvlNo = req.params.lvlNo;
    let cryptLvl = await Crypt.findOne({lvlNo: lvlNo});
    console.log(cryptLvl);
    const completed = req.user.completed;
    console.log(completed)
    res.render('cryptLvl', { user: req.user, cryptLvl: cryptLvl, completed: completed})
})

router.post('/cryptic/:lvlNo', async (req, res) => {
    let lvlNo = req.params.lvlNo;
    let cryptLvl = await Crypt.findOne({lvlNo: lvlNo});
    console.log(req.body.answer)
    const user = await User.findOne({username: req.user.username});
    if(req.body.answer == cryptLvl.answer){
        let completedD = user.completedDetail;
        let completed = user.completed;
        let score = user.score;
        score = score+cryptLvl.points;
        completedD.push({lvlNo:lvlNo, title: cryptLvl.title, type:'cryptic'});
        console.log(cryptLvl._id)
        console.log(completed)
        completed.cryptic.push(cryptLvl._id);
        console.log("correct");
        res.redirect('/challenges/cryptic');
        await User.updateOne({username: req.user.username}, {
            $set: {
                completedDetail: completedD,
                score: score,
                completed: completed
            }
        }).then(console.log("yooo"))
    }
    else{
        const completed = req.user.completed;
        console.log(completed)
        console.log("GALT JAWAB");
        res.render('cryptLvl', { user: req.user, cryptLvl: cryptLvl, completed: completed})
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

// router.post('/cryptic/:lvlNo', async (req, res) => {
    
// })


//export router
module.exports = router;