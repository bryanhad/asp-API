import app from './app'
import mongoose from 'mongoose'
import env from './env'

mongoose
    .connect(env.MONGODB_ATLAS_STRING)
    .then(() => {
        console.log('Mongoose successfully connected!')
        app.listen(env.PORT, () => {
            console.log(`Server is running on port: ${env.PORT}`)
        })
    })
    .catch(console.error)
