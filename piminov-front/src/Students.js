import { Link } from "react-router-dom";
import { useState } from 'react';
import { addStudent } from "./Functions";

function Students(props) {
  const [ groups ] = useState(props.groups);
  const [isVisible, setVisible] = useState(false);
  const [group, setGroup] = useState(groups[0]._id);
  const [fio, setFio] = useState("");
  const [type, setType] = useState("Бюджет");
  const [age, setAge] = useState(null);
  const [avgPoint, setAvgPoint] = useState(0);
  const [debt, setDebt] = useState(0);

  function addStudents() {
    setVisible(false);
    addStudent(group, fio, type, age, avgPoint, debt);
  }

  return ( 
    <div className="students">
      <div className={"modal modalAdd" + (isVisible ? " visible" : "")}>
          <div onClick={() => setVisible(false)} className="closeModal">✖</div>
          <h1>Введите данные о новом студенте</h1>
          <label>ФИО
            <input name="name" type="text" value={fio} onChange={(event) => setFio(event.target.value)}/>
          </label>
          <label>Тип обучения
          <select name="type" value={type} onChange={(event) => setType(event.target.value)}>
            <option key={1} value="Бюджет">Бюджет</option>
            <option key={2} value="Коммерция">Коммерция</option>
          </select>
          </label>
          <label>Средний балл
            <input name="avgPoint" type="text" value={avgPoint} onChange={(event) => setAvgPoint(event.target.value)}/>
          </label>
          <label>Возраст
            <input name="age" type="text" value={age} onChange={(event) => setAge(event.target.value)} />
          </label>
          <label>Количество задолженностей
            <input name="debt" type="text" value={debt} onChange={(event) => setDebt(event.target.value)}/>
          </label>
          <label>Группа
            <select name="group" value={group} onChange={(event) => setGroup(event.target.value)}>
              {groups.map(g =>
                <option key={g._id} value={g._id}>{g.name + " " + g.course + " курс"}</option>
              )}
            </select>
          </label>
          <button onClick={addStudents}>Добавить студента</button>
        </div>
        <div className="wrapper">
          <div className="students_container">
            <table>
              <tbody>
                <tr>
                  <th>ФИО студента</th>
                  <th>Направление</th>
                  <th>Курс</th>
                  <th>Тип обучения</th>
                  <th>Возраст</th>
                  <th>Средний балл</th>
                </tr>
                {groups.map(group => 
                  getGroupsInfo(group)
                )} 
              </tbody>
            </table>
            <button onClick={() => setVisible(true)}>Добавить студента</button>
          </div>
        </div>
      </div>
  );
}

function getGroupsInfo(group) {
  var groupInfo = group.students.map(
    student => [
      <tr key={student._id}>
        <td><Link to={'/students/' + student._id}>{student.fio}</Link></td>
        <td><Link to={'/groups/' + group._id}>{group.name}</Link></td>
        <td>{group.course}</td>
        <td>{student.type}</td>
        <td>{student.age}</td>
        <td>{student.avgPoint}</td>
      </tr>
    ]
  );
  return groupInfo;
}

export default Students;