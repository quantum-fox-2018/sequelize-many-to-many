'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    subject_id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'email format is incorrect'
        },
        isUnique: function(value, next) {
          Teacher.find({
            where: {email: value},
            attributes: ['id']
          })
          .then(function(error, user) {
            if(error || user)
              return next('Email address already in use!');
            next();
          });
        }
      }
    }
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject, {
      foreignKey: "subject_id"
    })
  };

  Teacher.FindAllWithSubjectName = function() {
    return new Promise(function(resolve, reject) {
      Teacher.findAll({
        order: [
          ['id', 'ASC']
        ]
      })
      .then(teachers => {
        var promises = teachers.map((teacher) => {
          return teacher.getSubject()
          .then(subject => {
            if(subject) {
              teacher.subject = subject.subject_name;
            } else {
              teacher.subject = "unassigned";
            }
          })
        })
        Promise.all(promises).then(() => {
          resolve(teachers);
        })
      })
    })
  }

  return Teacher;
};
