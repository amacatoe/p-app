import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams, useHistory } from "react-router-dom";
import {useState } from 'react';
import { updateGroupInMongo } from './Functions';

function Student(props) {
  var { id } = useParams();
  var group = null;

  const [ groups, setGroups ] = useState(props.groups);
  const [ student, setStudent] = useState(setInfo());
  const [ fio, setFio ] = useState(student.fio);
  const [ type, setType ] = useState(student.type);
  const [ groupId, setGroupId ] = useState(() => group._id);
  const [ age, setAge ] = useState(student.age);
  const [ avgPoint, setAvgPoint ] = useState(student.avgPoint);
  const [ debt, setDebt ] = useState(student.debt);

  const [ isVisibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [ isVisibleUpdateModal, setVisibleUpdateModal] = useState(false);

  const history = useHistory();

  function setInfo() {
    var tmpS = [];
    groups.map((g) => {
      g.students.map((s) => {
        if(s._id === id) {
          tmpS = s;
          group = g;
        }
      });
    });
    return tmpS;
  }

  function studentSubmit() {
    setVisibleUpdateModal(false);
    var elem = student;
    elem.fio = fio;
    elem.type = type;
    elem.age = Number(age);
    elem.avgPoint = Number(avgPoint);
    elem.debt = Number(debt);
    setStudent(() => elem);
    updateGroup();
  }

  function updateGroup() {
    var changedGroups;
    var students;
    var newGroup;
    if (groupId === group._id) {
      changedGroups = groups.filter(g => g._id !== group._id); 
      students = group.students.filter(s => s._id !== student._id);
      students.push(student);
      group.students = students;
      changedGroups.push(group);
      setGroups(() => changedGroups);
      updateGroupInMongo(group.name, group.name, group.type, group.type, group.course, group.course, group.students);
    }
    else {
      newGroup = groups.filter(g => g._id === groupId)[0];
      changedGroups = groups.filter(g => g._id !== group._id && g._id !== newGroup._id); 
      students = group.students.filter(s => s._id !== student._id);
      group.students = students;
      changedGroups.push(group);
      updateGroupInMongo(group.name, group.name, group.type, group.type, group.course, group.course, group.students);
      students = newGroup.students;
      students.push(student);
      newGroup.students = students;
      changedGroups.push(newGroup);
      updateGroupInMongo(newGroup.name, newGroup.name, newGroup.type, newGroup.type, newGroup.course, newGroup.course, newGroup.students);
      setGroups(() => changedGroups);
    }
  }

  function deleteStudent() {
    setVisibleDeleteModal(false);
    group.students = group.students.filter(s=> s._id !== student._id);
    var changedGroups = groups.filter(g => g._id !== group._id);
    changedGroups.push(group);
    setGroups(changedGroups);
    updateGroupInMongo(group.name, group.name, group.type, group.type, group.course, group.course, group.students);
    history.goBack();
  }

  function fioChange(event) {
    setFio(() => event.target.value);
  }

  function typeChange(event) {
    setType(() => event.target.value);
  }

  function ageChange(event) {
    setAge(() => event.target.value);
  }

  function avgPointChange(event) {
    setAvgPoint(() => event.target.value);
  }

  function debtChange(event) {
    setDebt(() => event.target.value);
  }
  
    return ( 
      <div className="student">
        <div className={"modal" + (isVisibleDeleteModal? " visible" : "")}>
          <h1>Подтвердите удаление студента</h1>
          <button className="okButton" onClick={() => deleteStudent()}>Ок</button>
          <button className="noButton" onClick={() => setVisibleDeleteModal(() => false)}>Отмена</button>
        </div>
        <div className={"modal" + (isVisibleUpdateModal? " visible" : "")}>
          <h1>Подтвердите изменение студента</h1>
          <button className="okButton" onClick={() => studentSubmit()}>Ок</button>
          <button className="noButton" onClick={() => setVisibleUpdateModal(() => false)}>Отмена</button>
        </div>
        <div className="wrapper">
          <div className="student_container">
            <div className="edit_student">
              <h2>Редактировать студента</h2>
              <form id="edit_student" onSubmit={(event) => {setVisibleUpdateModal(() => true); event.preventDefault();}}>
                <label>
                  ФИО студента
                  <input name="fio" type="text" value={fio} onChange={fioChange}/>
                </label>
                <label>
                  Группа, курс
                  <select onChange={(event) => {setGroupId(() => event.target.value)}} value={groupId}>
                      {groups.map(g => 
                        <option key={g._id} value={g._id}>{g.name} {g.course + " курс"}</option>
                      )}
                  </select>
                </label>
                <label>
                  Тип обучения 
                  <select name="type" value={type} onChange={typeChange}>
                    <option key={1} value="Бюджет">Бюджет</option>
                    <option key={2} value="Коммерция">Коммерция</option>
                  </select>
                </label>
                <label>
                  Возраст
                  <input name="age" type="text" value={age} onChange={ageChange}/>
                </label>
                <label>
                  Средний балл
                  <input name="avgPoint" type="text" value={avgPoint} onChange={avgPointChange}/>
                </label>
                <label>
                  Количество задолженностей
                  <input name="debt" type="text" value={debt} onChange={debtChange}/>
                </label>
                <input type="submit" value="Применить изменения"/>
              </form>
              <button className="delete-student" onClick={() => setVisibleDeleteModal(() => true)}>Удалить студента <FontAwesomeIcon icon={faTrashAlt} /></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  export default Student;