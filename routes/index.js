const routes = require('express').Router()

routes.get('/', (req, res) => {
  res.render('../views/home.ejs')
})

routes.use('/students', require('./student'))
routes.use('/teachers', require('./teacher'))
routes.use('/subjects', require('./subject'))

module.exports = routes