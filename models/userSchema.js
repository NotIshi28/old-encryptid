const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reqString = { type: String, required: true };

const userSchema = new Schema(
    {
        username: reqString,
        password: reqString,
        email: reqString,
        school: reqString,
        isBanned: { type: Boolean, default: false },
        isAdmin: { type: Boolean, default: false },
        completed: [],
        pending: [],
        logs:[{level: reqString, answer: reqString, timestamp: {type:String, default: new Date().toLocaleString()}}],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);