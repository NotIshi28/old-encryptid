const router = require('express').Router();
const Crypt = require('../models/CryptSchema.js');
const Ctf = require('../models/CtfSchema.js');
const User = require('../models/userSchema.js');

router.get('/', async(req, res) => {
    const cryptLvlLogs = await Crypt.find({}).sort({lvlNo: 1});
    const ctfLvlLogs = await Ctf.find({}).sort({lvlNo: 1});
    const userLogs = await User.find({}).sort({score: -1});

    res.render('admin', { user: req.user, cryptLvlLogs: cryptLvlLogs, ctfLvlLogs: ctfLvlLogs, userLogs: userLogs });
});

router.get('/new', (req, res) => {
    res.render('newChall', { user: req.user })
});

router.post('/new', async (req, res) => {
    
    //for cryptic    
    if(type=='cryptic'){
        let {type, title, lvlNo, lvlText, lvlImg, lvlCr, answer, points} = req.body;
        //finding if level exists
        const checkLevel = await Crypt.findOne({title: title});
        if(checkLevel) {
            return res.send("Level already exists");
        }
        
        //lvlNO -> int
        lvlNo = parseInt(lvlNo);

        //all level with same number (only for debugging, not required) 
        const levelNum = await Crypt.find({lvlNo: lvlNo})
        console.log('this is levelNum', levelNum);
        

        //level with same number, to be changed
        const currLevel = await Crypt.find({lvlNo: lvlNo}).sort().limit(1);
        console.log('this is currLevel', currLevel);
        

        //max number of level
        const maxLevel = await Crypt.find({type:'cryptic'}).sort({lvlNo: -1}).limit(1);
        console.log('this is maxLevel', maxLevel);
        

        //codimgs for changing level number
        if(levelNum.length > 0){
            let a = currLevel[0].lvlNo;
            let  max = maxLevel[0].lvlNo
            let  max2 = maxLevel[0].lvlNo
            for(let i = a; i<(max2+1); i++){
                console.log('THIS IS IIIIII', i);
                await Crypt.updateOne({lvlNo: max}, {
                    $set: {
                        lvlNo: max+1
                    }
                }).then(console.log("yooo"))
                max = max-1;
            }
        }


        //checking if level numeber entered is greater than max level number
        if( lvlNo != 1 && lvlNo > maxLevel[0].lvlNo ){
            lvlNo = maxLevel[0].lvlNo+1;
        }

        //saveing the cryptic chall
        level = new Crypt({
            type: type,
            title: title,
            lvlNo: lvlNo,
            lvlText: lvlText,
            lvlImg: lvlImg,
            lvlCr: lvlCr,
            answer: answer,
            logs: [],
            points: 100
        })
    }

    //for ctf
    else if(type=='ctf'){
        let {type, title, lvlNo, lvlText, lvlImg, lvlCr, srcCode, answer, points} = req.body;

        //lvlNo -> int
        lvlNo = parseInt(lvlNo);
    
        //finding if level already exists
        const checkLevel = await Ctf.findOne({title: title});
        if(checkLevel) {
            return res.send("Level already exists");
        }

        //all level with same number (only for debugging, not required)
        const levelNum = await Ctf.find({lvlNo: lvlNo})
        console.log('this is levelNum', levelNum);
        
        //level with same number, to be changed
        const currLevel = await Ctf.find({lvlNo: lvlNo}).sort().limit(1);
        console.log('this is currLevel', currLevel);
        
        //max number of level
        const maxLevel = await Ctf.find({type:'ctf'}).sort({lvlNo: -1}).limit(1);
        console.log('this is maxLevel', maxLevel);

        //codings for changing level number
        if(levelNum.length > 0){
            let a = currLevel[0].lvlNo;
            let  max = maxLevel[0].lvlNo
            let  max2 = maxLevel[0].lvlNo
            for(let i = a; i<(max2+1); i++){
                console.log('THIS IS IIIIII', i);
                await Ctf.updateOne({lvlNo: max}, {
                    $set: {
                        lvlNo: max+1
                    }
                }).then(console.log("yooo"))
                max = max-1;
            }
        }


        //checking if level numeber entered is greater than max level number
        if( lvlNo != 1 && lvlNo > maxLevel[0].lvlNo ){
            lvlNo = maxLevel[0].lvlNo+1;
        }


        //saveing the ctf chall
        level = new Ctf({
            type: type,
            title: title,
            lvlNo: lvlNo,
            lvlText: lvlText,
            lvlImg: lvlImg,
            lvlCr: lvlCr,
            srcCode: srcCode,
            answer: answer,
            logs: [],
            points: 100
        })
    }
    await level.save();
    res.redirect('/admin');
});


//cryptic
//logging and edititng

router.get('/logs/cryptic/:id', async (req, res) => {
    const lvlNo = req.params.id
    const level = await Crypt.findOne({lvlNo:lvlNo});
    res.render('challLogViewerCrypt', { user: req.user, logs: level.logs, lvlNo,lvlNo, title: level.title });
});


router.get('/edit/cryptic/:id', async (req, res) => {
    const lvlNo = req.params.id
    const level = await Crypt.findOne({lvlNo:lvlNo});
    console.log('this is level.lvlNo', level.lvlNo)
    res.render('editChallCrypt', { user: req.user, level: level });
});

router.post('/edit/cryptic/:id', async (req, res) => {
    console.log('working')
    const lvlNo = req.params.id;
    level = await Crypt.findOne({lvlNo:lvlNo});

    await Crypt.updateOne({lvlNo: lvlNo}, {
        $set: {
            title: req.body.title,
            lvlText: req.body.lvlText,
            lvlNo: req.body.lvlNo,
            lvlImg: req.body.lvlImg,
            lvlCr: req.body.lvlCr,
            answer: req.body.answer,
            points: req.body.points
        }
    }).then(console.log("noway"));
    res.redirect('/admin');
});

//ctf 
//logging and editing

router.get('/logs/ctf/:id', async (req, res) => {
    const lvlNo = req.params.id
    const level = await Ctf.findOne({lvlNo:lvlNo});
    res.render('challLogViewerCtf', { user: req.user, logs: level.logs, lvlNo,lvlNo,title: level.title  });
});


router.get('/edit/ctf/:id', async (req, res) => {
    const lvlNo = req.params.id
    const level = await Crypt.findOne({lvlNo:lvlNo});
    console.log('this is level.lvlNo', level.lvlNo)
    res.render('editChallCtf', { user: req.user, level: level });
});

router.post('/edit/ctf/:id', async (req, res) => {
    console.log('working')
    const lvlNo = req.params.id;
    level = await Ctf.findOne({lvlNo:lvlNo});

    await Ctf.updateOne({lvlNo: lvlNo}, {
        $set: {
            title: req.body.title,
            lvlText: req.body.lvlText,
            lvlNo: req.body.lvlNo,
            lvlImg: req.body.lvlImg,
            lvlCr: req.body.lvlCr,
            answer: req.body.answer,
            points: req.body.points
        }
    }).then(console.log("noway"));
    res.redirect('/admin');
});

router.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });

    // Filter logs into cryptic and ctf based on the completed lists
    const crypticLogs = user.logs.cryptic;
    const ctfLogs = user.logs.ctf;

    res.render('userLogs', { crypticLogs, ctfLogs, user });
});

router.get('/ban/:id', async (req, res) => {
    const id = req.params.id;
    await User.updateOne({_id: id}, {
        $set: {
            isBanned: true
        }
    });
    res.redirect('/admin');
})

//export router
module.exports = router;