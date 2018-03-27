const model = require('../models');

class ControllerSubject {
  static list() {
    return model.Subject.findAll({
      order: [
        ['id', 'ASC']
      ]
    });
  }

  static findAllWithTeachers() {
    return model.Subject.findAllWithTeachers();
  }

  static findOne(id) {
    return model.Subject.findById(id);
  }

  static add(obj) {
    let subject = model.Subject.build({
      subject_name: obj.subject_name
    })
    return subject.save();
  }

  static update(id, subject_name) {
    return model.Subject.findById(id)
    .then(function(subject) {
      return subject.update({
        subject_name: subject_name
      })
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  static delete(id) {
    return model.Subject.findById(id)
    .then(function(subject) {
      return subject.destroy()
    })
    .catch(err => {
      console.log(err.message);
    });
  }
}

module.exports = ControllerSubject;
