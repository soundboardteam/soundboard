import express, { Express } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import todoRoutes from './routes'

const app: Express = express()
const middleware = require('./middleware')

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(todoRoutes)
app.use(middleware.decodeToken)

const uri: string = `mongodb+srv://soundboardteam:2x6RFYmRwmLFi5uG@soundboard-prod.qqipku7.mongodb.net/?retryWrites=true&w=majority`

const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set('useFindAndModify', false)

mongoose
    .connect(uri, options)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch((error) => {
        throw error
    })
