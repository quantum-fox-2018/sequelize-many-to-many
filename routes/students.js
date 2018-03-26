const routes = require('express').Router()
const Op = require('sequelize').Op

const {Student,Subject,StudentSubject} = require('../models')

routes.get('/',function(req,res){
  Student.findAll().then(students=>{
    let obj = {
      students: students
    }
    res.render('students/students.ejs',obj)
  })
})

routes.get('/add',function(req,res){
  res.render('students/add.ejs')
})

routes.post('/add',function(req,res){
  Student.create({
    firstName: req.body.newFirstName,
    lastName: req.body.newLastName,
    email: req.body.newEmail,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(()=>{
    res.redirect('/students')
  }).catch((err)=>{
    console.log(err.message)
  })
})

routes.get('/:id/edit',function(req,res){
  Student.findById(req.params.id)
    .then(student=>{
      let obj = {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email
      }
      res.render('students/edit.ejs',obj)
    })
})

routes.post('/:id/edit',function(req,res){
  Student.update({
    firstName: req.body.newFirstName,
    lastName: req.body.newLastName,
    email: req.body.newEmail
  },{
    where: {
      id:req.body.id
    }
  }).then(()=>{
    res.redirect('/students')
  }).catch(err=>{
    console.log(err.message)
  })
})

routes.get('/:id/delete',function(req,res){
  Student.destroy({
    where: {
      id: req.params.id
    }
  }).then(()=>{
    res.redirect('/students')
  })
})

routes.get('/:id/addSubject',function(req,res){
  Student.withSubject().then(newDataStudents=>{
    newDataStudents.forEach(dataStudent=>{
      let array = []
      for(let i=0; i<dataStudent.subjects.length; i++){
        array.push(dataStudent.subjects[i].id)
      }
      if(dataStudent.id==req.params.id){
        Subject.findAll({
          where: {
            id: {
              [Op.notIn]: array
            }
          }
        }).then(dataSubjects=>{
          let obj = {
            subjects: dataSubjects,
            studentId: dataStudent.id,
            studentFirstName: dataStudent.firstName,
            studentLastName: dataStudent.lastName,
            studentEmail: dataStudent.email
          }
          res.render('students/addSubject.ejs',obj)
          // res.send(dataStudent.subjects)
        })
      }
    })
  })
})

routes.post('/:id/addSubject',function(req,res){
  StudentSubject.create({
    StudentId: req.body.id,
    SubjectId: req.body.getSubject
  }).then(()=>{
    res.redirect('/students')
  }).catch(err=>{
    console.log(err.message)
  })
})

module.exports = routes
