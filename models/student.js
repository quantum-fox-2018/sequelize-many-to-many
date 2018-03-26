'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Student.associate = function(models) {
    Student.belongsToMany(models.Subject,{through:models.StudentSubject})
    Student.hasMany(models.StudentSubject)
  };

  Student.withSubject = function(){
    return new Promise(function(resolve, reject) {
      Student.findAll().then(dataStudents=>{
        let promSS = dataStudents.map(dataStudent=>{
          return new Promise(function(resolve, reject) {
            dataStudent.getSubjects().then(subjects=>{
              dataStudent.subjects = subjects
              resolve(dataStudent)
            })
            .catch(err=>{
              resolve(err)
            })
          });
        })
        Promise.all(promSS).then(newDataStudents=>{
          resolve(newDataStudents)
        }).catch(err=>{
          reject(err)
        })
      })
    });
  }
  return Student;
};
