const routes = require('express').Router()
const Teacher = require('../controller/teacher')

routes.get('/', Teacher.readData)

routes.get('/add', Teacher.showAddData)
routes.post('/add', Teacher.createData)

routes.get('/:id/edit', Teacher.showUpdateData)
routes.post('/:id/edit', Teacher.updateData)

routes.get('/:id/delete', Teacher.deleteData)


module.exports = routes