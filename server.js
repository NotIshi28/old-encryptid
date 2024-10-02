require('dotenv').config()

const express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    passportInit = require('./utils/passportConfig.js'),
    flash = require('express-flash'),
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose');
    nodemailer = require('nodemailer')
    request = require('request')

const indexRouter = require('./routers/indexRouter.js'),
    loginRouter = require('./routers/loginRouter.js'),
    dashboardRouter = require('./routers/dashboardRouter.js'),
    regRouter = require('./routers/regRouter.js'),
    inviteRouter = require('./routers/inviteRouter.js'),
    adminRouter = require('./routers/adminRouter.js'),
    { botInit, discoIt } = require('./utils/discordBot');
const { addAbortListener, addAbortSignal } = require('nodemailer/lib/xoauth2/index.js');

const app = express(),
    PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }), express.urlencoded({ extended: true, limit: '1mb' }))
app.use(flash())
app.use(expressLayouts)
app.use('/', express.static('public'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}))

passportInit(passport)

mongoose.connect(process.env.DB_URI).then(console.log("Connected to mongodb"))

botInit()

app.use(passport.initialize())
app.use(passport.session())

function isAdmin(req, res, next) {
    if (req.user.admin) {
        return next()
    }
    res.redirect('/dashboard')
}
app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/register', regRouter)
app.use('/invite', inviteRouter)
app.use('/admin', isAdmin, adminRouter)
app.use('/dashboard', dashboardRouter)

app.use((err, req, res, next) => {
    discoIt(err.stack.toString())
    discoIt("kya karra h bhai");
    next()
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
    discoIt("Server started on port " + PORT)
});