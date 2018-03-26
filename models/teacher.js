'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail(value,next){
          let atPosition = value.indexOf('@')
          let dotPosition = value.indexOf('.')
          if(atPosition>=1 && dotPosition>=atPosition+1 && dotPosition<=value.length-2){
            next()
          } else {
            next('Format email salah')
          }
        },
        isUnique(value,next){
          Teacher.findOne({raw:true,
            where: {
              email: value
            }
          }).then(Teacher=>{
            if(Teacher==undefined){
              next()
            } else {
              next('Email sudah ada di database')
            }
          }).catch(err=>{
            console.log(err)
          })
        }
      }
    },
    SubjectId: DataTypes.INTEGER
  }, {});

  Teacher.withSubject = function(){
    return new Promise(function(resolve, reject) {
      Teacher.findAll().then(dataTeachers=>{
        let promTS = dataTeachers.map(dataTeacher=>{
          return new Promise(function(resolve, reject) {
            dataTeacher.getSubject().then(subject=>{
              dataTeacher.subject = subject
              resolve(dataTeacher)
            })
            .catch(err=>{
              reject(err)
            })
          });
        })
        Promise.all(promTS).then(newDataTeachers=>{
          resolve(newDataTeachers)
        }).catch(err=>{
          reject(err)
        })
      })
    });
  }

  Teacher.associate = function(models) {
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};
