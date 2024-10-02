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
    res.render('cryptic', { user: req.user, lvls: lvls, completed: completed})
});

router.get('/cryptic/:lvlNo', async (req, res) => {
    //get the level number from the url
    let lvlNo = req.params.lvlNo;
    let cryptLvl = await Crypt.findOne({lvlNo: lvlNo});
    console.log(cryptLvl);
    
    const completed = req.user.completed;
    res.render('cryptLvl', { user: req.user, cryptLvl: cryptLvl, completed: completed})
})

router.post('/cryptic/:lvlNo', async (req, res) => {
    //get the level number from the url
    let lvlNo = req.params.lvlNo;
    let cryptLvl = await Crypt.findOne({lvlNo: lvlNo});
    
    //get user
    const user = await User.findOne({username: req.user.username});

    
    
    if(req.body.answer == '' || req.body.answer == null || req.body.answer == undefined){
        res.redirect('/challenges/cryptic/');
    }
    else{
        //logging answers entered by user
        let log = {
            level: lvlNo, 
            answer: req.body.answer, 
            timestamp: new Date().toLocaleString()
        };
        
        //updating logs in user
        user.logs.push(log);
        
        //logging answers acc to lvl
        let lvlLog = {
            title: cryptLvl.title,
            answer: req.body.answer,
            user: req.user.username,
            timestamp: new Date().toLocaleString()
        }

        // cryptLvl.logs.push(lvlLog);

        console.log('this is logGGG',log)

        //checking answer
        if(req.body.answer == cryptLvl.answer){
            let completedD = user.completedDetail;
            let completed = user.completed;
            let score = user.score;
            
            //updateing user score
            score = score+cryptLvl.points;
        
            //update completed crypt     details includees lvl num, title and type
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
                },
                $push: {
                    logs: log
                }
            }).then(console.log("yooo"))

            //update chall logs
            await Crypt.updateOne({ lvlNo: lvlNo }, {
                $push: {
                    logs: lvlLog
                }
            });
        }
        else{
            //if ans is wrong
            const completed = req.user.completed;
            res.render('cryptLvl', { user: req.user, cryptLvl: cryptLvl, completed: completed})

            await User.updateOne({username: req.user.username}, {
                $push: {
                    logs: log
                }
            })

            //update chall logs
            await Crypt.updateOne({ lvlNo: lvlNo }, {
                $push: {
                    logs: lvlLog
                }
            });
        }
    }
    
})

router.get('/ctf', async (req, res) => {
    //get all ctf lvls
    let ctfLvls = await Ctf.find({}).sort({lvlNo: 1});
    let lvls = ctfLvls;

    //get user completed challs
    const completed = req.user.completed;
    res.render('ctf', { user: req.user, lvls: lvls, completed: completed})
});

router.get('/ctf/:lvlNo', async (req, res) => {
    //get ctf lvl num from url
    let lvlNo = req.params.lvlNo;
    let ctfLvl = await Ctf.findOne({lvlNo: lvlNo});
    
    //user completed challs
    const completed = req.user.completed;
    res.render('ctfLvl', { user: req.user, ctfLvl: ctfLvl, completed: completed})
});

router.post('/ctf/:lvlNo', async (req, res) => {
    //get the level number from the url
    let lvlNo = req.params.lvlNo;
    let ctfLvl = await Ctf.findOne({lvlNo: lvlNo});
    
    //get user
    const user = await User.findOne({username: req.user.username});
    
    if(req.body.answer == '' || req.body.answer == null || req.body.answer == undefined){
        res.redirect('/challenges/ctf/');
    }
    else{
        //logging answers entered by user
        let log = {
            level: lvlNo, 
            answer: req.body.answer, 
            timestamp: new Date().toLocaleString()
        };
        
        //updating logs in user
        user.logs.push(log);
        
        //logging answers acc to lvl
        let lvlLog = {
            title: ctfLvl.title,
            answer: req.body.answer,
            user: req.user.username,
            timestamp: new Date().toLocaleString()
        }

        console.log('this is logGGG',log)

        //checking answer
        if(req.body.answer == ctfLvl.answer){
            let completedD = user.completedDetail;
            let completed = user.completed;
            let score = user.score;
            
            //updateing user score
            score = score+ctfLvl.points;
        
            //update completed ctf details includees lvl num, title and type
            completedD.push({lvlNo:lvlNo, title: ctfLvl.title, type:'ctf'});
        
            //update completed ctf chall _id
            completed.ctf.push(ctfLvl._id);
        
            console.log("correct");
            res.redirect('/challenges/ctf');
            
            //updateing user details
            await User.updateOne({username: req.user.username}, {
                $set: {
                    completedDetail: completedD,
                    score: score,
                    completed: completed
                },
                $push: {
                    logs: log
                }
            }).then(console.log("yooo"))

            //update chall logs
            await Ctf.updateOne({ lvlNo: lvlNo }, {
                $push: {
                    logs: lvlLog
                }
            });
        }
        else{
            //if ans is wrong
            const completed = req.user.completed;
            res.render('ctfLvl', { user: req.user, ctfLvl: ctfLvl, completed: completed})

            await User.updateOne({username: req.user.username}, {
                $push: {
                    logs: log
                }
            })

            //update chall logs
            await Ctf.updateOne({ lvlNo: lvlNo }, {
                $push: {
                    logs: lvlLog
                }
            });
        }
    }
    
})


//export router
module.exports = router;