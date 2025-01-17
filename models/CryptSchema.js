const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reqString = { type: String, required: true };

const cryptSchema = new Schema(
    {
        type: reqString,
        title: reqString,
        lvlNo: {type:Number, required: true},
        lvlText: reqString,
        lvlImg: {type:String, default: "", required: false},
        lvlCr: reqString,
        answer: reqString,
        points: {type:Number, required: true},
        logs:[{title: reqString, answer:reqString, timestamp: reqString, user: reqString}],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Crypt", cryptSchema);