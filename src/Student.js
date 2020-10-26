import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from "react-router-dom";

function Student(props, match) {
  var { id } = useParams();
  var student = props.students.students.find(g =>  Number(g.id) === Number(id));
    return ( 
      <div className="student">
        <div className="wrapper">
          <div className="student_container">
            <div className="edit_student">
              <h2>Редактировать студента</h2>
              <form id="edit_student">
                <label>
                  ФИО студента
                  <input name="fio" type="text" value={student.fio}/>
                </label>
                <label>
                  Группа, курс
                  <select>
                      {props.groups.groups.map(group => 
                        <option key={group.id} {...(group.id === student.group_id) ?  "selected" : ""}>{group.name} {group.course + " курс"}</option>
                      )}
                  </select>
                </label>
                <label>
                  Тип обучения 
                  <input name="type" type="text" value={student.type}/>
                </label>
                <label>
                  Возраст
                  <input name="age" type="text" value={student.age}/>
                </label>
                <label>
                  Средний балл
                  <input name="avgPoint" type="text" value={student.avgPoint}/>
                </label>
                <label>
                  Количество задолженностей
                  <input name="debt" type="text" value={student.debt}/>
                </label>
                <input type="submit" value="Применить изменения"/>
              </form>
              <button className="delete-student">Удалить студента <FontAwesomeIcon icon={faTrashAlt} /></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  export default Student;