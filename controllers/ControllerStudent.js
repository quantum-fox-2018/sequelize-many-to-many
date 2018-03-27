const model = require('../models');

class ControllerStudent {
  static list() {
    return model.Student.findAll({
      order: [
        ['id', 'ASC']
      ]
    });
  }

  static listSubject(id) {
    return model.Student.findById(id)
    .then(student => {
      return student.getSubjects()
    })
  }

  static findOne(id) {
    return model.Student.findById(id);
  }

  static add(obj) {
    let student = model.Student.build({
      first_name: obj.first_name,
      last_name: obj.last_name,
      email: obj.email
    })
    return student.save();
  }

  static update(id, first_name, last_name, email) {
    return model.Student.findById(id)
    .then(function(student) {
      return student.update({
        first_name: first_name,
        last_name: last_name,
        email: email
      })
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  static delete(id) {
    return model.Student.findById(id)
    .then(function(student) {
      return student.destroy()
    })
    .catch(err => {
      console.log(err.message);
    });
  }
}

module.exports = ControllerStudent;
