import { Link} from "react-router-dom";

function Students(props) {
  return ( 
    <div className="students">
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
                {props.students.students.map(student => 
                <tr key={student.id}>
                  <td><Link to={'/students/' + student.id}>{student.fio}</Link></td>
                  {getGroupsInfo(props.groups, student.group_id)}
                  <td>{student.type}</td>
                  <td>{student.age}</td>
                  <td>{student.avgPoint}</td>
                </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}

function getGroupsInfo(groups, id) {
  var groupInfo = groups.groups
    .filter(g => id === g.id)
    .map(g => 
      [
      <td><Link to={'/groups/' + g.id}>{g.name}</Link></td>,
      <td>{g.course}</td>
      ]
    );

    return groupInfo;
}

export default Students;