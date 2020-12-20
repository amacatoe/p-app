import { Link} from "react-router-dom";


function Main(props) {  
  const groups = props.groups;
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
              {groups.map(e => 
              <tr key={e._id}>
                <td><Link to={'/groups/' + e._id}>{e.name}</Link></td>
                <td>
                  <ul>
                    {getStudents(e.students)}
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

function getStudents(students) {
  var ulStudent = students
  .map((student) => 
  <li key={student._id}>
    <Link to={'/students/' + student._id}>
      {student.fio}
    </Link>
  </li>);
  return ulStudent;
}

export default Main;