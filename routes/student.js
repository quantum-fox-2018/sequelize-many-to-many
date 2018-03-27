const routes = require('express').Router()
const Student = require('../controller/student')

routes.get('/', Student.readData)

routes.get('/add', Student.showAddData)
routes.post('/add', Student.createData)

routes.get('/:id/edit', Student.showUpdateData)
routes.post('/:id/edit', Student.updateData)

routes.get('/:id/delete', Student.deleteData)

routes.get('/:id/addsubject', Student.showAddSubject)
// routes.post('/:id/addsubject', Student.createDataSubject)

module.exports = routes