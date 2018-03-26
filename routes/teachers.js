const routes = require('express').Router()

const {Teacher,Subject} = require('../models')

routes.get('/',function(req,res){
  Teacher.withSubject().then(newDataTeachers=>{
    let obj = {
      teachers: newDataTeachers
    }
    res.render('teachers/teachers.ejs',obj)
  })
})

routes.get('/add',function(req,res){
  Subject.findAll().then(subjects=>{
    let errMsg
    if(req.query==null){
      errMsg = null
    } else {
      errMsg = req.query.err
    }
    let obj = {
      subjects: subjects,
      err: errMsg
    }
    res.render('teachers/add.ejs',obj)
  })
})

routes.post('/add',function(req,res){
  let dataSubjectId = req.body.getSubject
  if(dataSubjectId==''){
    dataSubjectId = null
  }
  Teacher.create({
    firstName: req.body.newFirstName,
    lastName: req.body.newLastName,
    email: req.body.newEmail,
    SubjectId: dataSubjectId,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(()=>{
    res.redirect('/teachers')
  }).catch((err)=>{
    res.redirect(`/teachers/add?err=${err.message}`)
  })
})

routes.get('/:id/edit',function(req,res){
  Teacher.findById(req.params.id)
    .then(teacher=>{
      Subject.findAll().then(subjects=>{
        let obj = {
          id: teacher.id,
          firstName: teacher.firstName,
          lastName: teacher.lastName,
          email: teacher.email,
          SubjectId: teacher.SubjectId,
          subjects: subjects
        }
        let errMsg
        if(req.query==null){
          errMsg = null
        } else {
          errMsg = req.query.err
        }
        res.render('teachers/edit.ejs',{obj:obj,err:errMsg})
      })
    })
})

routes.post('/:id/edit',function(req,res){
  let dataSubjectId = req.body.getSubject
  if(dataSubjectId==''){
    dataSubjectId = null
  }
  Teacher.update({
    firstName: req.body.newFirstName,
    lastName: req.body.newLastName,
    email: req.body.newEmail,
    SubjectId: dataSubjectId
  },{
    where: {
      id:req.body.id
    }
  }).then(()=>{
    res.redirect('/teachers')
  }).catch(err=>{
    res.redirect(`/teachers/${req.params.id}/edit?err=${err.message}`)
  })
})

routes.get('/:id/delete',function(req,res){
  Teacher.destroy({
    where: {
      id: req.params.id
    }
  }).then(()=>{
    res.redirect('/teachers')
  })
})

module.exports = routes
