const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reqString = { type: String, required: true };

const userSchema = new Schema(
    {
        username: reqString,
        password: reqString,
        email: reqString,
        firstTime: { type: Boolean, default: true },
        school: reqString,
        score: { type: Number, default: 0 },
        isBanned: { type: Boolean, default: false },
        isAdmin: { type: Boolean, default: false },
        completed: {cryptic:[], ctf:[]},
        completedDetail: [],
        pending: [],
        logs:{
            cryptic:[
                {level: reqString, answer: reqString, isCorrect: {type:Boolean}, id: reqString, timestamp: {type:String, default: new Date().toLocaleString()}}
            ],
            ctf:[
                {level: reqString, answer: reqString,isCorrect: {type:Boolean}, id:reqString, timestamp: {type:String, default: new Date().toLocaleString()}}
            ]},
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);