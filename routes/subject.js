const routes = require('express').Router()
const Subject = require('../controller/Subject')

routes.get('/', Subject.readData)

routes.get('/add', Subject.showAddData)
routes.post('/add', Subject.createData)

routes.get('/:id/edit', Subject.showUpdateData)
routes.post('/:id/edit', Subject.updateData)

routes.get('/:id/delete', Subject.deleteData)

routes.get('/:id/enrolledstudent', Subject.showEnrolledStudent)

routes.get('/:id/givescore', Subject.showGiveScore)
routes.post('/:id/givescore', Subject.createDataScore)


module.exports = routes