import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateGroupInMongo, delGroup } from './Functions';

function Group(props) {

  var { id } = useParams();
  const [ groups, setGroups] = useState(props.groups);
  const [ group, setGroup] = useState(groups.find(g =>  g._id === id));
  const [ students, setStudents] = useState(group.students);
  const [ otherGroupStudents, setOtherGroupStudents ] = useState();
  const [ selectValue, setSelectValue ] = useState();
  const [ name, setName ] = useState(group.name);
  const [ type, setType ] = useState(group.type);
  const [ course, setCourse ] = useState(group.course);
  const history = useHistory();

  const [ isVisibleDeleteGroupModal, setVisibleDeleteGroupModal] = useState(false);
  const [ isVisibleDeleteStudentModal, setVisibleDeleteStudentModal] = useState(false);
  const [ isVisibleUpdateModal, setVisibleUpdateModal] = useState(false);
  const [ isVisibleAddStudentModal, setVisibleAddStudentModal] = useState(false);

  const [selectedStudentForDelete, setSelectedStudentForDelete] = useState();

  useEffect(() => {
    async function setData() {
      var tmp = [];
      groups.filter(g => g._id !== group._id).map(g => tmp.push(g.students));
      await setOtherGroupStudents(() => tmp.flat());
      setSelectValue(() => tmp[0][0]);
    }

    setData();
  }, [groups]);

  function deleteStudent() {
    setVisibleDeleteStudentModal(() => false);
    var student = students.filter(s => s._id === selectedStudentForDelete)[0];
    var groupTmp = group;
    var defaultGroup = groups.filter(g => g.name === "Нет группы")[0];

    var changedGroups = groups.filter((g)=> g._id !== defaultGroup._id && g._id !== group._id);
    groupTmp.students = groupTmp.students.filter((s) => s._id !== student._id);
    updateGroupInMongo(groupTmp.name, groupTmp.name, groupTmp.type, groupTmp.type, groupTmp.course, groupTmp.course, groupTmp.students);
    changedGroups.push(groupTmp);
    defaultGroup.students.push(student);
    updateGroupInMongo(defaultGroup.name, defaultGroup.name, defaultGroup.type, defaultGroup.type, defaultGroup.course, defaultGroup.course, defaultGroup.students);
    changedGroups.push(defaultGroup);
    setGroup(() => groupTmp);
    setStudents(() => group.students);
    setGroups(() => changedGroups);
  }

  function addStudent() {
    setVisibleAddStudentModal(() => false);
    var student = selectValue;
    var groupTmp;
    groups.filter(g => g._id !== group._id).map(g => g.students.map(s => {
      if (s._id === student._id) groupTmp = g;
    }));

    var changedGroups = groups.filter((g)=> g._id !== groupTmp._id && g._id !== group._id);
    groupTmp.students = groupTmp.students.filter((s) => s._id !== student._id);
    changedGroups.push(groupTmp);
    updateGroupInMongo(groupTmp.name, groupTmp.name, groupTmp.type, groupTmp.type, groupTmp.course, groupTmp.course, groupTmp.students);
    groupTmp = group;
    groupTmp.students.push(student);
    updateGroupInMongo(groupTmp.name, groupTmp.name, groupTmp.type, groupTmp.type, groupTmp.course, groupTmp.course, groupTmp.students);
    changedGroups.push(groupTmp);
    setGroup(() => groupTmp);
    setGroups(() => changedGroups);
  }

  function selectChange(id) {
    setSelectValue(() => otherGroupStudents.find(s => s._id === id));
  }

  function nameChange(event) {
    setName(() => event.target.value);
  }

  function typeChange(event) {
    setType(() => event.target.value);
  }

  function courseChange(event) {
    setCourse(() => event.target.value);
  }

  function groupSubmit() {
    setVisibleUpdateModal(() => false);
    var name1 = group.name;
    var type1 = group.type;
    var course1 = group.course;
    var elem = group;
    elem.name = name;
    elem.type = type;
    elem.course = course;
    setGroup(() => elem);
    updateGroupInMongo(name1, elem.name, type1, elem.type, course1, elem.course, group.students);
  } 

  function deleteGroup() {
    var defaultGroup = groups.filter(g => g.name === "Нет группы")[0];
    var changedGroups = null;
    if (group.students.length > 0) {
      group.students.map(s => defaultGroup.students.push(s));
      changedGroups = groups.filter(g => g._id !== defaultGroup._id && g._id !== group._id);
      changedGroups.push(defaultGroup);
      updateGroupInMongo(defaultGroup.name, defaultGroup.name, defaultGroup.type, defaultGroup.type, defaultGroup.course, defaultGroup.course, defaultGroup.students);
      setGroups(() => changedGroups);
    }
    else {
      changedGroups = groups.filter(g => g._id !== group._id);
      setGroups(() => changedGroups);
    }
    delGroup(group._id);
    history.goBack();
  }
  
    return ( 
      <div className="group">
        <div className={"modal" + (isVisibleDeleteStudentModal? " visible" : "")}>
          <h1>Подтвердите удаление студента из данной группы</h1>
          <button className="okButton" onClick={() => deleteStudent()}>Ок</button>
          <button className="noButton" onClick={() => setVisibleDeleteStudentModal(() => false)}>Отмена</button>
        </div>
        <div className={"modal" + (isVisibleDeleteGroupModal? " visible" : "")}>
          <h1>Подтвердите удаление группы</h1>
          <button className="okButton" onClick={() => deleteGroup()}>Ок</button>
          <button className="noButton" onClick={() => setVisibleDeleteGroupModal(() => false)}>Отмена</button>
        </div>
        <div className={"modal" + (isVisibleUpdateModal? " visible" : "")}>
          <h1>Подтвердите изменение группы</h1>
          <button className="okButton" onClick={(event) => {event.preventDefault() ; groupSubmit()}}>Ок</button>
          <button className="noButton" onClick={() => setVisibleUpdateModal(() => false)}>Отмена</button>
        </div>
        <div className={"modal" + (isVisibleAddStudentModal? " visible" : "")}>
          <h1>Подтвердите добавление студента в группу</h1>
          <button className="okButton" onClick={() => addStudent()}>Ок</button>
          <button className="noButton" onClick={() => setVisibleAddStudentModal(() => false)}>Отмена</button>
        </div>
        <div className="wrapper">
          <div className="group_container">
            <div className="edit_group">
              <h2>Редактировать группу</h2>
              <form id="edit_group" onSubmit={(event) => {event.preventDefault(); setVisibleUpdateModal(() => true)}}>
                <label>
                  Название группы 
                  <input name="name" type="text" value={name} onChange={nameChange}/>
                </label>
                <label>
                  Тип обучения 
                  <select name="type" value={type} onChange={typeChange}>
                    <option key={1} value="Очное">Очное</option>
                    <option key={2} value="Заочное">Заочное</option>
                    {group.name==="Нет группы" &&
                      <option key={3} value="Не указывается">Не указывается</option>
                    }
                  </select>
                </label>
                <label>
                  Курс
                  <select name="course" value={course} onChange={courseChange}>
                    <option key={1} value={1}>1</option>
                    <option key={2} value={2}>2</option>
                    <option key={3} value={3}>3</option>
                    <option key={4} value={4}>4</option>
                    <option key={5} value={5}>5</option>
                    {group.name==="Нет группы" &&
                      <option key={0} value="0">0</option>
                    }
                  </select>
                </label>
                <input type="submit" hidden={group.name==="Нет группы"} value="Применить изменения"/>
              </form>
              <button className="delete-group" onClick={() => setVisibleDeleteGroupModal(()=>true)} hidden={group.name==="Нет группы"}>Удалить группу <FontAwesomeIcon icon={faTrashAlt} /></button>
            </div>
            <div className="students_group">
              <h2>Студенты</h2>
              <div className="students_group_container">
              {students && students.map(student => 
                <div key={student._id}>
                  <span>{student.fio}</span>
                  <button className="delete-user" hidden={group.name==="Нет группы"} onClick={() => {setSelectedStudentForDelete(() =>student._id); setVisibleDeleteStudentModal(()=> true)}}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </div>
                )}
              </div>
              <div className="add_group_container">
                <h2>Добавить студента в группу</h2>
                <form onSubmit={(event) => {event.preventDefault(); setVisibleAddStudentModal(()=>true);}}>
                  <select onChange={(event) => selectChange(event.target.value)}>
                    {otherGroupStudents ? otherGroupStudents.map(student => 
                      <option key={student._id} value={student._id}>{student.fio}</option>
                    ) : ""} 
                  </select>
                <input type="submit" value="Добавить"/>
                </form>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }


  export default Group;