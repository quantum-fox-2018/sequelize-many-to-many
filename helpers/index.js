function subjectTeacher(value) {
  if(!value) {
    return 'unassigned'
  } else {
    return value.subject_name
  }
}

function teacherSubject(value) {
  if(value.length == 0) {
    return '-'
  } else {
    let text = []
    value.forEach((teacher, i) => {
      text.push(`${i+1}. ${teacher.first_name} ${teacher.last_name}`)
    })
    return `${text.join('<br>')}`
  }
}

module.exports = {
  subjectTeacher,
  teacherSubject
}