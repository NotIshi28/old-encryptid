const router = require('express').Router();
const Crypt = require('../models/CryptSchema.js');
const Ctf = require('../models/CtfSchema.js');
const User = require('../models/userSchema.js');

router.get('/', (req, res) => {
    res.render('admin', { user: req.user })
});

router.get('/new', (req, res) => {
    res.render('newChall', { user: req.user })
});

router.post('/new', async (req, res) => {
    let {type, title, lvlNo, lvlText, lvlImg, lvlCr, answer, points} = req.body;

    //for cryptic    
    if(type=='cryptic'){
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
        points: 100
        })
    }

    //for ctf
    else if(type=='ctf'){
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
        answer: answer,
        points: 100
        })
    }
    await level.save();
    res.redirect('/admin');
});




//export router
module.exports = router;