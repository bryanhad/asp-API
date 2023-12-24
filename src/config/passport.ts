import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import userModel from '../models/user.model'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'


passport.serializeUser((user, cb) => {
    console.log(user, 'SERIALIZE USER')
    //after the user logged in successfuly, the user returned from our localStrategy OR the req.login 
    // would be passed to this function! where now, we can decide what data should be stored in the session! we can do that via the cb function!
    //basically this func purpose is to handle writing the user's session into our database
    cb(null, {id: user._id, role: user.role})
})

passport.deserializeUser(({id, role}: {id:string, role:string}, cb) => {
    console.log({id, role}, 'DESERIALIZE USER')
    //this function purpose is to handle everytime there is a request to the server, passport would get the user's session from our database and will pass the data we stored to the first param of this func, which is 'userId'!, then passport would attach the thing that we return from this deeserializeUser function to the request object! in the req.user
    // so that we can use the data from the stored session into our endpoints

    cb(null, { _id: new mongoose.Types.ObjectId(id), role })
})


passport.use(
    new LocalStrategy(async (username, password, cb) => {
        try {
            const userExists = await userModel
            .findOne({ username })
            .select('+password')
            .exec()

            
            if (!userExists || !userExists.password) {
                //if the user doesn't exist or has no password, meaning they use social provider to login..
                return cb(null, false) //the second argument of the cb just tells that there is no user found or they uses a social provider, and this will return a 401 response, which means unvalid credentials
            }

            const passwordMatch = await bcrypt.compare(
                password,
                userExists.password
            )

            if (!passwordMatch) {
                return cb(null, false)
            }

            const user = userExists.toObject()
            delete user.password

            cb(null, user) //this will return the user and append it to the request object!

        } catch (err) {
            cb(err)
        }
    })
)