const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const service = require("../service/auth")

module.exports = () => {
  
    //serializeUser determines, which data of the user object should be stored in the session.
    //see: https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async(id, done) => {
        const user = await service.findById(id)
        done(null, user)
    })
    
    // Sign in with Email and Password
    passport.use('local', new LocalStrategy({
        usernameField: 'username'
    }, async(username, password, done) => {
        const user = await service.signin(username, password)
        done(null, user)
    }))
}