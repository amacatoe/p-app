import { Link} from "react-router-dom";


function Main(props) {
  return ( 
    <div className="main">
      <div className="wrapper">
        <div className="main_container">
          <table>
            <tbody>
              <tr>
                <th>Название группы</th>
                <th>Студенты</th>
              </tr>
              {props.groups.groups.map(e => 
              <tr key={e.id}>
                <td><Link to={'/groups/' + e.id}>{e.name}</Link></td>
                <td>
                  <ul>
                    {getStudents(props.students, e.id)}
                  </ul>
                </td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function getStudents(students, id) {
  var ulStudent = students.students
  .filter(student => student.group_id === id)
  .map(student => <li key={student.id}><Link to={'/students/' + student.id}>{student.fio}</Link></li>);
  return ulStudent;
}

export default Main;