require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT
const router = require('./routers/index')
const cors = require('cors')
const { errorHandler } = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})