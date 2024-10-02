const router = require('express').Router();
const Crypt = require('../models/CryptSchema.js');
const Ctf = require('../models/CtfSchema.js');
const User = require('../models/userSchema.js');

router.get('/cryptic', async (req, res) => {
    //get all cryptic levels
    let cryptLvls = await Crypt.find({}).sort({lvlNo: 1});
    
    let lvls = cryptLvls;
    //get users complted challs
    const completed = req.user.completed;
    console.log(completed)
    res.render('cryptic', { user: req.user, lvls: lvls, completed: completed})
});

router.get('/cryptic/:lvlNo', async (req, res) => {
    //get the level number from the url
    let lvlNo = req.params.lvlNo;
    let cryptLvl = await Crypt.findOne({lvlNo: lvlNo});
    console.log(cryptLvl);
    
    const completed = req.user.completed;
    console.log(completed)
    res.render('cryptLvl', { user: req.user, cryptLvl: cryptLvl, completed: completed})
})

router.post('/cryptic/:lvlNo', async (req, res) => {
    //get the level number from the url
    let lvlNo = req.params.lvlNo;
    let cryptLvl = await Crypt.findOne({lvlNo: lvlNo});
    
    //get user
    const user = await User.findOne({username: req.user.username});
    //checking answer
    if(req.body.answer == cryptLvl.answer){
        let completedD = user.completedDetail;
        let completed = user.completed;
        let score = user.score;
        
        //updateing user score
        score = score+cryptLvl.points;
        //update completed crypt chall details includees lvl num, title and type
        completedD.push({lvlNo:lvlNo, title: cryptLvl.title, type:'cryptic'});
        //update completed crypt chall _id
        completed.cryptic.push(cryptLvl._id);
        console.log("correct");
        res.redirect('/challenges/cryptic');
        
        //updateing user details
        await User.updateOne({username: req.user.username}, {
            $set: {
                completedDetail: completedD,
                score: score,
                completed: completed
            }
        }).then(console.log("yooo"))
    }
    else{
        //if ans is wrong
        const completed = req.user.completed;
        res.render('cryptLvl', { user: req.user, cryptLvl: cryptLvl, completed: completed})
    }
})

router.get('/ctf', async (req, res) => {
    //get all ctf lvls
    let ctfLvls = await Ctf.find({}).sort({lvlNo: 1});
    let lvls = ctfLvls;

    //get user completed challs
    const completed = req.user.completed;
    console.log(completed)
    res.render('ctf', { user: req.user, lvls: lvls, completed: completed})
});

router.get('/ctf/:lvlNo', async (req, res) => {
    //get ctf lvl num from url
    let lvlNo = req.params.lvlNo;
    let ctfLvl = await Ctf.findOne({lvlNo: lvlNo});
    
    //user completed challs
    const completed = req.user.completed;
    console.log(completed)
    res.render('ctfLvl', { user: req.user, ctfLvl: ctfLvl, completed: completed})
});

router.post('/ctf/:lvlNo', async (req, res) => {
    //get lvl from url
    let lvlNo = req.params.lvlNo;
    let ctfLvl = await Ctf.findOne({lvlNo: lvlNo});
    
    //get user
    const user = await User.findOne({username: req.user.username});
    if(req.body.answer == ctfLvl.answer){
        let completedD = user.completedDetail;
        let completed = user.completed;
        let score = user.score;

        //update user score
        score = score+ctfLvl.points;
        
        //update details of completed challs
        completedD.push({lvlNo:lvlNo, title: ctfLvl.title, type:'ctf'});
        
        //update completed challs _id
        completed.ctf.push(ctfLvl._id);

        //redirecting
        res.redirect('/challenges/ctf');
        
        //updating user details
        await User.updateOne({username: req.user.username}, {
            $set: {
                completedDetail: completedD,
                score: score,
                completed: completed
            }
        }).then(console.log("yooo"))
    }

    //if ans wrong
    else{
        const completed = req.user.completed;
        console.log(completed)
        console.log("GALT JAWAB");
        res.render('ctfLvl', { user: req.user, ctfLvl: ctfLvl, completed: completed})
    }
})


//export router
module.exports = router;