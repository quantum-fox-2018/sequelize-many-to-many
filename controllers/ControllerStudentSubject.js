const model = require('../models');

class ControllerStudentSubject {
  static list(subject_id) {
    return model.StudentSubject.findAll({
      where: {
          SubjectId: subject_id
        },
      order: [
        ['id', 'ASC']
      ]
    });
  }

  static findStudentName() {
    return model.StudentSubject.findStudentName();
  }

  static findOne(id) {
    return model.StudentSubject.findById(id);
  }

  static add(obj) {
    let StudentSubject = model.StudentSubject.build({
      StudentId: obj.StudentId,
      SubjectId: obj.SubjectId
    })
    return StudentSubject.save();
  }

  static delete(id) {
    return model.StudentSubject.findById(id)
    .then(function(StudentSubject) {
      return StudentSubject.destroy()
    })
    .catch(err => {
      console.log(err.message);
    });
  }
}

module.exports = ControllerStudentSubject;
