require('dotenv').config()

const express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    passportInit = require('./utils/passportConfig.js'),
    flash = require('express-flash'),
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose');
    nodemailer = require('nodemailer')

const indexRouter = require('./routers/indexRouter.js'),
    loginRouter = require('./routers/loginRouter.js'),
    dashboardRouter = require('./routers/dashboardRouter.js'),
    adminRouter = require('./routers/adminRouter.js'),
    challRouter = require('./routers/challRouter.js'),
    lbRouter = require('./routers/lbRouter.js')



const { ensureAuthenticated, ensureAdminAuthenticated } = require('./utils/authenticate.js');

const app = express(),
    PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }), express.urlencoded({ extended: true, limit: '1mb' }))
app.use(flash())
// app.use(expressLayouts)
app.use('/', express.static('public'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}))

passportInit(passport)

mongoose.connect(process.env.DB_URI).then(console.log("Connected to mongodb"))

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
app.use('/dashboard', ensureAuthenticated, dashboardRouter)
app.use('/admin', ensureAuthenticated, ensureAdminAuthenticated, adminRouter)
app.use('/challenges', ensureAuthenticated, challRouter)
app.use('/leaderboard', lbRouter)


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});