import { Link } from "react-router-dom";

function Header() {
  return (
      <div className="header">
        <div className="wrapper">
          <div className="header_container">
            <ul>
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/students">Студенты</Link></li>
              <li><Link to="/groups">Группы</Link></li>
            </ul>
          </div>
        </div>
      </div>
  );
}
export default Header;