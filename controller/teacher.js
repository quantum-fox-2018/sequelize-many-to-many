const {Teacher, Subject} = require('../models')

class cTeacher {
  static readData(req, res) {
    return Teacher.findAll({
      order: [
        ['id', 'ASC']
      ],
      include: [
        {
          model: Subject
        }
      ]
    })
    .then(teachers => {
      let obj = {
        heads: ['No', 'First Name', 'Last Name', 'Email', 'Subject'],
        teachers: teachers
      }
      res.render('./teacher/readData', obj)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }

  static showAddData(req, res) {
    Subject.findAll({
      order: [
        ['id', 'ASC']
      ]
    })
    .then(subjects => {
      let obj = {
        subjects: subjects,
        info: req.query.err
      }
      return res.render('./teacher/createForm', obj)
    })
    .catch(err =>{
      console.log(err)
      res.redirect('/')
    })
  }

  static createData(req, res) {
    let data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      SubjectId: req.body.SubjectId
    }
    return Teacher.create(data)
    .then(() => {
      res.redirect('/teachers')
    })
    .catch(err => {
      console.log(err.message)
      res.redirect(`/teachers/add?err=${err.message}`)
    })
  }

  static showUpdateData(req, res) {
    let id = req.params.id
    return Teacher.findById(id)
    .then(teacher => {
      Subject.findAll()
      .then(subjects => {
        let obj = {
          teacher: teacher,
          subjects: subjects,
          info: req.query.err
        }
        res.render('./teacher/updateForm', obj)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/')
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }

  static updateData(req, res) {
    let idObj = req.params.id
    let obj = req.body
    return Teacher.findById(idObj)
    .then(teacher => {
      teacher.update(obj)
      .then(() => {
        res.redirect('/teachers')
      })
      .catch(err => {
        console.log(err.message)
        res.redirect(`/teachers/edit/${idObj}?err=${err.message}`)
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }

  static deleteData(req, res) {
    let idObj = req.params.id
    return Teacher.findById(idObj)
    .then(teacher => {
      teacher.destroy()
      .then(() => {
        res.redirect('/teachers')
      })
      .catch(err => {
        console.log(err)
        res.redirect('/')
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }
}

module.exports = cTeacher