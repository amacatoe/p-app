const {Router, query} = require('express');
const router = Router();
const Group = require('../model/groupScheme');
const Student = require('../model/studentScheme');

router.get('/', (req, res) => {
  res.send('Проверка на работоспособность');
})

router.get('/groups', (req, res) => {
  Group.find({}, (err, doc) => {
    if (err) return console.log(err);

    console.log("Получены объекты Group", doc);
    return res.send(doc);
  });
})

router.post('/students', async (req, res) => {
  const data = req.body;

  const group = await Group.findOne({_id: data.group});

  var student = new Student();
  student.fio = data.fio;
  student.age = data.age;
  student.type = data.type;
  student.avgPoint = data.avgPoint;
  student.debt = data.debt;
  
  var newStudents = group.students;
  newStudents.push(student);

  Group.updateOne(
    {name: group.name, course: group.course, type: group.type}, 
    {name: group.name, course: group.course, type: group.type, students: newStudents}, 
    function(err, doc){
      if(err) return console.log(err);
      console.log("Обновлен объект Group", doc);
      return res.send(doc);
  });
})

router.post('/groups', (req, res) => {
  const data = req.body;

  const newGroup = new Group({
    name: data.name,
    course: data.course,
    type: data.type,
    students: data.students
  });

  Group.create(newGroup, (err, doc) => {
    if (err) return console.log(err);

    console.log("Сохранен объект Group", doc);
    return res.send(doc);
  });
})

router.put('/groups',(req,res)=>{
  const data = req.body;

  Group.updateOne(
    {name: data.name, course: data.course, type: data.type}, 
    {name: data.name2, course: data.course2, type: data.type2, students: data.students}, 
    function(err, doc){
      if(err) return console.log(err);
      console.log("Обновлен объект Group", doc);
      return res.send(doc);
  });
})

router.delete('/groups',(req,res)=>{
  const data = req.query;

  Group.deleteOne(data, function (err, doc) {
      if (err) return console.log(err);
      console.log("Удален объект Group", doc);
      return res.send(doc);
  });
})

module.exports = router;