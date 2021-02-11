module.exports = (teacher) => {
  return {
    id: teacher.getDataValue('person_id'),
    name: teacher.person.getDataValue('name'),
    subjects: teacher.subjects.map(sub => sub.getDataValue('subject_name'))
  }
}