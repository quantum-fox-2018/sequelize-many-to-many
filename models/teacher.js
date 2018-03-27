'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
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
          sequelize.models.Teacher.findOne({
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
    },
    SubjectId: DataTypes.INTEGER,
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject);
  };
  return Teacher;
};