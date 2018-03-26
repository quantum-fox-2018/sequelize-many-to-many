'use strict'

const app = require('express')()
const bodyParser = require('body-parser')

app.set('view engine','ejs')

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/',require('./routes'))

app.listen(3000,()=>{
  console.log(`Server running on port 3000`)
})
