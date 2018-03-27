const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
const cStudent = require('./controllers/ControllerStudent.js');
const cTeacher = require('./controllers/ControllerTeacher.js');
const cSubject = require('./controllers/ControllerSubject.js');
const cStudentSubject = require('./controllers/ControllerStudentSubject.js');

app.get('/', function(req, res) {
  res.render('index');
});

// Student
app.get('/students', function(req, res) {
  cStudent.list()
  .then((students) => {
    res.render('student-data', {students: students});
  })
  .catch(err => {
    console.log(err.message);
  });
});

app.get('/students/:id/addsubject', function(req, res) {
  cStudent.findOne(req.params.id)
  .then(function(student) {
    student.listSubject()
    .then(studentSubjects => {
      cSubject.list()
      .then((subjects) => {
        res.render('student-add-subject', {student, subjects, studentSubjects});
      })
    })
  })
});

app.post('/students/:id/addsubject', function(req, res) {
  let attributeStudentSubject = {
    StudentId: req.params.id,
    SubjectId: req.body.subject
  }
  cStudentSubject.add(attributeStudentSubject)
  .then((StudentSubject) => {
    cStudent.findOne(req.params.id)
    .then(function(student) {
      student.listSubject()
      .then(studentSubjects => {
        cSubject.list()
        .then((subjects) => {
          res.render('student-add-subject', {student, subjects, studentSubjects});
        })
      })
    })
  })
});

app.get('/students/add', function(req, res) {
  res.render('student-add');
});

app.post('/students/add', function(req, res) {
  let attributeStudent = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  };
  cStudent.add(attributeStudent)
  .then((student) => {
    cStudent.list()
    .then((students) => {
      res.render('student-data', {students: students});
    })
    .catch(err => {
      console.log(err.message);
    });
  })
});

app.get('/students/edit/:id', function(req, res) {
  cStudent.findOne(req.params.id)
  .then(function(student) {
    res.render('student-edit', {student: student})
  })
  .catch(err => {
    console.log(err.message);
  });
});

app.post('/students/edit/:id', function(req, res) {
  let id = req.params.id;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;
  cStudent.update(id, first_name, last_name, email)
  .then(function(student) {
    cStudent.list()
    .then((students) => {
      res.render('student-data', {students: students});
    })
    .catch(err => {
      console.log(err.message);
    });
  })
  .catch(err => {
    console.log(err.message);
  });
});

app.get('/students/delete/:id', function(req, res) {
  let id = req.params.id;
  cStudent.delete(id)
  .then(function() {
    cStudent.list()
    .then((students) => {
      res.render('student-data', {students: students});
    })
    .catch(err => {
      console.log(err.message);
    });
  })
  .catch(err => {
    console.log(err.message);
  });
});

// Teacher
app.get('/teachers', function(req, res) {
  cTeacher.FindAllWithSubjectName()
  .then(teachers => {
    res.render('teacher-data', {teachers: teachers})
  })
});

// app.get('/teachers', function(req, res) {
//   cTeacher.list()
//   .then((teachers) => {
//     res.render('teacher-data', {teachers: teachers});
//   })
//   .catch(err => {
//     console.log(err.message);
//   });
// });

app.get('/teachers/add', function(req, res) {
  cSubject.list()
  .then((subjects) => {
    res.render('teacher-add', {subjects: subjects});
  })
});

app.post('/teachers/add', function(req, res) {
  let attributeTeacher = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    subject_id: req.body.subject
  };
  cTeacher.add(attributeTeacher)
  .then((teacher) => {
    cTeacher.FindAllWithSubjectName()
    .then(teachers => {
      res.render('teacher-data', {teachers: teachers})
    })
    .catch(err => {
      console.log(err.message);
    });
  })
  .catch(err => {
    cSubject.list()
    .then((subjects) => {
      res.render('teacher-add', {subjects: subjects, err: err.message});
    })
  })
});

app.get('/teachers/edit/:id', function(req, res) {
  cTeacher.findOne(req.params.id)
  .then(function(teacher) {
    cSubject.list()
    .then((subjects) => {
      res.render('teacher-edit', {teacher: teacher, subjects: subjects});
    })
  })
  .catch(err => {
    console.log(err.message);
  });
});

app.post('/teachers/edit/:id', function(req, res) {
  let id = req.params.id;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;
  let subject_id = req.body.subject;
  cTeacher.update(id, first_name, last_name, email, subject_id)
  .then(function(teacher) {
    cTeacher.FindAllWithSubjectName()
    .then(teachers => {
      res.render('teacher-data', {teachers: teachers})
    })
    .catch(err => {
      console.log(err.message);
    });
  })
  .catch(err => {
    console.log(err.message);
  });
});

app.get('/teachers/delete/:id', function(req, res) {
  let id = req.params.id;
  cTeacher.delete(id)
  .then(function() {
    cTeacher.FindAllWithSubjectName()
    .then(teachers => {
      res.render('teacher-data', {teachers: teachers})
    })
    .catch(err => {
      console.log(err.message);
    });
  })
  .catch(err => {
    console.log(err.message);
  });
});

// Subject
app.get('/subjects', function(req, res) {
  // cSubject.list()
  // .then((subjects) => {
  //
  //   res.render('subject-data', {subjects: subjects});
  // })
  // .catch(err => {
  //   console.log(err.message);
  // });
  cSubject.findAllWithTeachers()
  .then(subjects => {
    res.render('subject-data', {subjects: subjects});
  })
  .catch(err => {
    console.log(err.message);
  });
});

app.get('/subjects/:id/enrolledstudents/', function(req, res) {
  cSubject.findOne(req.params.id)
  .then(function(subject) {
    cStudentSubject.list(subject.id)
    .then(studentSubjects => {
      res.render('subject-enrolled-students', {subject, students: studentSubjects})
    })
  })
  .catch(err => {
    console.log(err.message);
  });
});

app.get('/subjects/add', function(req, res) {
  res.render('subject-add');
});

app.post('/subjects/add', function(req, res) {
  let attributeSubject = {
    subject_name: req.body.subject_name
  };
  cSubject.add(attributeSubject)
  .then((subject) => {
    cSubject.list()
    .then((subjects) => {
      res.render('subject-data', {subjects: subjects});
    })
    .catch(err => {
      console.log(err.message);
    });
  })
});

app.get('/subjects/edit/:id', function(req, res) {
  cSubject.findOne(req.params.id)
  .then(function(subject) {
    res.render('subject-edit', {subject: subject})
  })
  .catch(err => {
    console.log(err.message);
  });
});

app.post('/subjects/edit/:id', function(req, res) {
  let id = req.params.id;
  let subject_name = req.body.subject_name;
  cSubject.update(id, subject_name)
  .then(function(subject) {
    cSubject.list()
    .then((subjects) => {
      res.render('subject-data', {subjects: subjects});
    })
    .catch(err => {
      console.log(err.message);
    });
  })
  .catch(err => {
    console.log(err.message);
  });
});

app.get('/subjects/delete/:id', function(req, res) {
  let id = req.params.id;
  cSubject.delete(id)
  .then(function() {
    cSubject.list()
    .then((subjects) => {
      res.render('subject-data', {subjects: subjects});
    })
    .catch(err => {
      console.log(err.message);
    });
  })
  .catch(err => {
    console.log(err.message);
  });
});

app.listen(3000, () => {
  console.log("connected");
});
