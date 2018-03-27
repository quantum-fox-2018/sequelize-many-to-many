'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "email format is incorrect"
        },
        isUnique(value, next) {
          sequelize.models.Student.findOne({
            where: {
              email: value
            }
          })
          .then(data => {
            if(data) {
              next('email is already used')
            } else {
              next('')
            }
          })
          .catch(err => {
            next(err)
          })
        }
      }
    }
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsToMany(models.Subject, {through: 'StudentSubject'})
  };
  return Student;
};