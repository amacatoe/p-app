import axios from 'axios';

export const updateGroupInMongo = function (name, name2, type, type2, course, course2, students) {
  var body = {
    name: name,
    type: type,
    course: course,
    students: students,
    name2: name2,
    course2: course2,
    type2: type2
  };

  axios.put('/groups', body)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const addGroup = function (name, type, course) {
  var body = {
    name: name,
    type: type,
    course: course,
    students: []
  };

  axios.post('/groups', body)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const delGroup = function (id) {
  axios.delete('/groups', {
    params: { _id: id }
   })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const addStudent = function (groupId, fio, type, age, avgPoint, debt) {
  var body = {
    fio: fio,
    type: type,
    age: age,
    avgPoint: avgPoint,
    debt: debt,
    group: groupId
  };

  axios.post('/students', body)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};