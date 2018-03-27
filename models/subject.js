'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  }, {});
  Subject.associate = function(models) {
    // associations can be defined here
    Subject.hasMany(models.Teacher, {
      foreignKey: "subject_id"
    })
    Subject.belongsToMany(models.Student, {
      through: models.StudentSubject
    })
    Subject.hasMany(models.StudentSubject)
  };

  Subject.prototype.listStudents = function() {
    return this.getStudents()
  }

  Subject.findAllWithTeachers = function() {
    return new Promise(function(resolve, reject) {
      Subject.findAll({
        order: [
          ['id', 'ASC']
        ]
      })
      .then(subjects => {
        var promises = subjects.map((subject) => {
          return subject.getTeachers()
          .then(teachers => {
            subject.teachers = teachers;
          })
        })
        Promise.all(promises).then(() => {
          resolve(subjects);
        })
      })
    })
  }

  return Subject;
};
