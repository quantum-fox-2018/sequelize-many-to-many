'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {});
  StudentSubject.associate = function(models) {
    // associations can be defined here
    StudentSubject.belongsTo(models.Student)
    StudentSubject.belongsTo(models.Subject)
  };

  StudentSubject.prototype.getStudentName = function() {
    return this.getStudents
  }

  StudentSubject.findStudentName = function(subject_id) {
    return new Promise(function(resolve, reject) {
      StudentSubject.findAll({
        where: {
            SubjectId: subject_id
          },
        order: [
          ['id', 'ASC']
        ]
      })
      .then(studentSubject => {
        var promises = studentSubjects.map((studentSubject) => {
          return studentSubject.getStudent()
          .then(student => {
            studentSubject.studentName = student.first_name;
          })
        })
        Promise.all(promises).then(() => {
          resolve(studentSubject);
        })
      })
    })
  }

  return StudentSubject;
};
