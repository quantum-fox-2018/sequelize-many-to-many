'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    name: DataTypes.STRING
  }, {});

  Subject.withTeacher = function(){
    return new Promise(function(resolve, reject) {
      Subject.findAll().then(dataSubjects=>{
        let promST = dataSubjects.map(dataSubject=>{
          return new Promise(function(resolve, reject) {
            dataSubject.getTeachers().then(teachers=>{
              dataSubject.teachers = teachers
              resolve(dataSubject)
            })
            .catch(err=>{
              reject(err)
            })
          });
        })
        Promise.all(promST).then(newDataSubject=>{
          resolve(newDataSubject)
        }).catch(err=>{
          reject(err)
        })
      })
    });
  }

  Subject.withStudent = function(searchedId){
    return new Promise(function(resolve, reject) {
      Subject.findOne({
        where: {
          id: searchedId
        }
      }).then(subject=>{
          subject.getStudents().then(students=>{
            subject.students = students
            resolve(subject)
          })
          .catch(err=>{
            reject(err)
          })
      })
    });
  }

  Subject.associate = function(models) {
    Subject.hasMany(models.Teacher)
    Subject.belongsToMany(models.Student,{through:models.StudentSubject})
    Subject.hasMany(models.StudentSubject)
  };
  return Subject;
};
