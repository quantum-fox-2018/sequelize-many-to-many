const {Student, Subject, StudentSubject, Sequelize} = require('../models')

class cStudent {
  static readData(req, res) {
    return Student.findAll({
      order: [
        ['id', 'ASC']
      ]
    })
    .then(students => {
      let obj = {
        heads: ['No', 'First Name', 'Last Name', 'Email'],
        students: students
      }
      res.render('./student/readData', obj)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }

  static showAddData(req, res) {
    let obj = {
      info : req.query.err
    }
    return res.render('./student/createForm', obj)
  }

  static createData(req, res) {
    let data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    }
    return Student.create(data)
    .then(() => {
      res.redirect('/students')
    })
    .catch(err => {
      console.log(err.message)
      res.redirect(`/students/add?err=${err.message}`)
    })
  }

  static showUpdateData(req, res) {
    let id = req.params.id
    return Student.findById(id)
    .then(student => {
      let obj = {
        student: student,
        info: req.query.err
      }
      res.render('./student/updateForm', obj)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }

  static updateData(req, res) {
    let idObj = req.params.id
    let obj = req.body
    return Student.findById(idObj)
    .then(student => {
      student.update(obj)
      .then(() => {
        res.redirect('/students')
      })
      .catch(err => {
        console.log(err.message)
        res.redirect(`/students/edit/${idObj}?err=${err.message}`)
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }

  static deleteData(req, res) {
    let idObj = req.params.id
    return Student.findById(idObj)
    .then(student => {
      student.destroy()
      .then(() => {
        res.redirect('/students')
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

  static showAddSubject(req, res) {
    let studentId = req.params.id
    return Student.findById(studentId, {
      include: {
        model: Subject
      }
    })
    .then(student => {
      StudentSubject.findAll({
        where: {
          StudentId: studentId
        }
      })
      .then(studentSubject => {
        let arrayIdSubject = []
        studentSubject.forEach(subjectId => {
          arrayIdSubject.push(subjectId.SubjectId)
        });

        Subject.findAll({
          where: {
            id: {
              [Sequelize.Op.notIn] : arrayIdSubject
            }
          }
        })
        .then(addSubject => {
          let obj = {
            heads: ['First Name', 'Last Name', 'Email', 'Subject'],
            student: student,
            subjects: student.Subjects,
            addSubjects: addSubject,
            info: req.query.err
          }
          // res.send(obj)
          res.render('./student/createAddSubjectForm', obj)
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
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }

  static createDataSubject(req, res) {
    let obj = {
      studentId: req.params.id,
      subjectId: req.body.SubjectId
    }
    // res.send(obj)
    StudentSubject.create({
      StudentId: obj.studentId,
      SubjectId: obj.subjectId
    })
    .then(() => {
      res.redirect('/students')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }
}

module.exports = cStudent