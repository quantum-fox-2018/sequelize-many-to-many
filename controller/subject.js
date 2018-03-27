const {Subject, Teacher, StudentSubject, Student} = require('../models')

class cSubject {
  static readData(req, res) {
    return Subject.findAll({
      order: [
        ['id', 'ASC']
      ],
      include: [
        {
          model: Teacher
        }
      ]
    })
    .then(subjects => {
      // res.send(subjects)
      let obj = {
        heads: ['No', 'Subject Name', 'Teacher Name'],
        subjects: subjects
      }
      res.render('./subject/readData', obj)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }

  static showAddData(req, res) {
    return res.render('./subject/createForm')
  }

  static createData(req, res) {
    let data = {
      subject_name: req.body.subject_name
    }
    return Subject.create(data)
    .then(() => {
      res.redirect('/subjects')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }

  static showUpdateData(req, res) {
    let id = req.params.id
    return Subject.findById(id)
    .then(subject => {
      // res.send(subject)
      let obj = {subject}
      res.render('./subject/updateForm', obj)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }

  static updateData(req, res) {
    let idObj = req.params.id
    let obj = req.body
    return Subject.findById(idObj)
    .then(subject => {
      subject.update(obj)
      .then(() => {
        res.redirect('/subjects')
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

  static deleteData(req, res) {
    let idObj = req.params.id
    return Subject.findById(idObj)
    .then(subject => {
      subject.destroy()
      .then(() => {
        res.redirect('/subjects')
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

  static showEnrolledStudent(req, res) {
    let subjectId = req.params.id
    StudentSubject.findAll({
      where: {
        SubjectId: subjectId
      },
      include: [
        {
          model: Student
        }, {
          model: Subject
        }
      ]
    })
    .then(studentSubjects => {
      let obj = {
        heads: ['Name', 'Score'],
        studentSubjects: studentSubjects,
        info: req.query.err
      }
      res.render('./subject/enrolledStudents', obj)
    })
  }

  static showGiveScore(req, res) {
    res.send('otw')
  }

  static createDataScore(req, res) {
    res.send('')
  }

}

module.exports = cSubject