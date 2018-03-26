const routes = require('express').Router()

routes.get('/',function(req,res){
  res.render('home/home.ejs')
})

routes.use('/students',require('./students.js'))
routes.use('/teachers',require('./teachers.js'))
routes.use('/subjects',require('./subjects.js'))

module.exports = routes
