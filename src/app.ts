import 'dotenv/config'
import express from 'express'
import env from './env'
import morgan from 'morgan'
import cors from 'cors'
import errorHandler from './middlewares/errorHandler'

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


app.get('/', (req, res) =>
    res.status(200).json({ message: 'Wellcome to ASP API' })
)



app.use(errorHandler)

export default app