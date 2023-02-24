const express = require('express')
const app = express()
const { db } = require('./models/db')
const port = 3100
const showRouter = require('./router/show-router')

app.use(express.json())

app.use(showRouter)

app.listen(port, () => {
  db.sync()
  console.log(`Listening on port ${port}`)
})