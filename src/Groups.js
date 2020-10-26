import { Link } from "react-router-dom";

function Groups(props) {
  return ( 
    <div className="groups">
        <div className="wrapper">
          <div className="students_container">
            <table>
              <tbody>
                <tr>
                  <th>Направление</th>
                  <th>Курс</th>
                  <th>Количество студентов</th>
                  <th>Количество студентов-должников</th>
                  <th>Средний балл</th>
                </tr>
                {props.groups.groups.map(group => 
                <tr key={group.id}>
                  <td><Link to={'/groups/' + group.id}>{group.name}</Link></td>
                  <td>{group.course}</td>
                  {getStudentsInfo(props.students, group.id)}
                </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}

function getStudentsInfo(students, id) {
  var filter_students = students.students.filter(s => id === s.group_id);
  var count_students = filter_students.length;
  var count_debt_students = filter_students.filter(s => s.debt !== 0).length;
  var avgPoint = 0;
  filter_students.map(s => 
      [
        avgPoint += s.avgPoint
      ]
    );

    avgPoint /= count_students;

    return (
      [
        <td>{count_students}</td>,
        <td>{count_debt_students}</td>,
        <td>{avgPoint}</td>
      ]
    );
}

export default Groups;