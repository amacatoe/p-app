import { Link } from "react-router-dom";
import { useState } from 'react';
import { addGroup } from './Functions';

function Groups(props) {
  const [groups] = useState(props.groups);
  const [isVisible, setVisible] = useState(false);

  const [name, setName] = useState("");
  const [type, setType] = useState("Очное");
  const [course, setСourse] = useState(1);

  function addGroupToState() {
    setVisible(false); 
    addGroup(name, type, course);
  }

  return ( 
    <div className="groups">
      <div className={"modal modalAdd" + (isVisible ? " visible" : "")}>
          <div onClick={() => setVisible(false)} className="closeModal">✖</div>
          <h1>Введите данные о новой группе</h1>
          <label>Название группы 
            <input name="name" type="text" value={name} onChange={(event) => setName(event.target.value)}/>
          </label>
          <label>Тип обучения
          <select value={type} name="type" onChange={(event) => setType(event.target.value)}>
            <option key={1} value="Очное">Очное</option>
            <option key={2} value="Заочное">Заочное</option>
          </select>
          </label>
          <label>Курс
          <select name="course" value={course} onChange={(event) => setСourse(event.target.value)}>
            <option key={1} value={1}>1</option>
            <option key={2} value={2}>2</option>
            <option key={3} value={3}>3</option>
            <option key={4} value={4}>4</option>
            <option key={5} value={5}>5</option>
          </select>
          </label>
          <button onClick={addGroupToState}>Добавить группу</button>
        </div>
        <div className="wrapper">
          <div className="students_container">
            <table>
              <tbody>
                <tr>
                  <th>Направление</th>
                  <th>Курс</th>
                  <th>Тип обучения</th>
                  <th>Количество студентов</th>
                  <th>Количество студентов-должников</th>
                  <th>Средний балл</th>
                </tr>
                {groups.map(group => 
                <tr key={group._id}>
                  <td><Link to={'/groups/' + group._id}>{group.name}</Link></td>
                  <td>{group.course}</td>
                  <td>{group.type}</td>
                  {getStudentsInfo(group.students)}
                </tr>
                )}
              </tbody>
            </table>
            <button onClick={() => setVisible(true)}>Добавить группу</button>
          </div>
        </div>
      </div>
  );
}

function getStudentsInfo(students) {
  var count_students = students.length;
  var count_debt_students = students.filter(s => s.debt !== 0).length;
  var avgPoint = 0;
  if (students.length > 0) { 
    students.map(s => 
      [
        avgPoint += s.avgPoint
      ]
    );

    avgPoint /= count_students;
  }
    return (
      [
        <td>{count_students}</td>,
        <td>{count_debt_students}</td>,
        <td>{avgPoint}</td>
      ]
    );
}

export default Groups;