import 'dotenv/config'
import express from 'express'
import env from './env'
import morgan from 'morgan'
import cors from 'cors'
import errorHandler from './middlewares/errorHandler'
import { usersRoutes } from './routes/users.routes'
import './config/passport' //by importing the file just like this, we can automatically execute all code in that file
import createHttpError from 'http-errors'
import session from 'express-session'
import sessionConfig from './config/session'
import passport from 'passport'

const app = express()

if (env.NODE_ENV === 'production') {
    app.use(morgan('combined')) //logs more info
} else {
    app.use(morgan('dev')) //logs are simple
}

app.use(cors({
    origin: env.WEBSITE_URL,
    credentials: true,
}))

app.use(express.json())

app.use(session(sessionConfig)) //this will run the express-session as the middleware for our Express app! //this lets us create the session and save our session to our database (currently using mongo, but later we gonna use redis in our server) //basically express-session is for managing session

app.use(passport.authenticate('session')) //this activates passport, and on every request to the backend, passport will fetch the user's session from the db, and then call thee deserializeUser to deserialize the session fetched, and then making the user object available on 'req.user' for every routes!


app.get('/', (req, res) =>
    res.status(200).json({ message: 'Wellcome to ASP API' })
)

app.use('/users', usersRoutes)

app.use((req, res, next) => next(createHttpError(404, 'Endpoint not found'))) // just a catch all basically

app.use(errorHandler)

export default app