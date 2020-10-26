import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from "react-router-dom";

function Group(props, match) {
  var { id } = useParams();
  var group = props.groups.groups.find(g =>  Number(g.id) === Number(id));
    return ( 
      <div className="group">
        <div className="wrapper">
          <div className="group_container">
            <div className="edit_group">
              <h2>Редактировать группу</h2>
              <form id="edit_group">
                <label>
                  Название группы 
                  <input name="name" type="text" value={group.name}/>
                </label>
                <label>
                  Тип обучения 
                  <input name="type" type="text" value={group.type}/>
                </label>
                <label>
                  Курс
                  <input name="course" type="text" value={group.course}/>
                </label>
                <input type="submit" value="Применить изменения"/>
              </form>
              <button className="delete-group">Удалить группу <FontAwesomeIcon icon={faTrashAlt} /></button>
            </div>
            <div className="students_group">
              <h2>Студенты</h2>
              {props.students.students.filter(s => group.id === s.group_id).map(student => 
                <div key={student.id}>
                  <span>{student.fio}</span>
                  <button className="delete-user" data-value={student.id}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  export default Group;