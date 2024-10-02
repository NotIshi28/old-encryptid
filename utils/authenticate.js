const passport = require('passport')

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    else res.redirect('/login');
  }

function forwardAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    else{
      if(req.user.admin){
        res.redirect('/admin')
      }
      else{
        res.redirect('/dashboard')
      }
    } 
  }

function ensureAdminAuthenticated(req, res, next) {
  if(!req.isAuthenticated()) res.redirect('/login')
  if(!req.user.isAdmin) res.redirect('/')
  else return next()
}

async function loginUser(req, res, next) {
  console.log(req.body.email, req.body.password)
  await passport.authenticate('local', (err, user, info) => {
    console.log(err, user, info)
    if (err) throw err;
    if (!user) res.send([{ msg: info.message }]);
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.redirect('/dashboard');
        // res.redirect('/admin');
      });
    }
  })(req, res, next);
}



module.exports = { ensureAuthenticated, forwardAuthenticated, ensureAdminAuthenticated, loginUser };