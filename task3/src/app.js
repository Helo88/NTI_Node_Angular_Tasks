const express = require('express')
require('./dbConnection/mongoose') // reauire mongose
const userRoutes = require('./routes/user')
const app = express() // this is the line which should exit once  ONe express Method
app.use(express.json()) // cauze this time from api  n't like session8  use module json for encoding
app.use(userRoutes)
app.listen(3000)
