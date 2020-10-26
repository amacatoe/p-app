import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './Header';
import Groups from './Groups';
import Students from './Students';
import Main from './Main';
import data_g from "./data_groups.json";
import data_s from "./data_students.json";
import Group from "./Group";
import Student from "./Student";


function App() {
  return (
    <div className="App">
      <Router> 
        <Header/>
        <Switch>
            <Route exact path="/">
              <Main groups={data_g} students={data_s} />
            </Route>
            <Route path="/groups/:id">
              <Group groups={data_g} students={data_s}/>
            </Route>
            <Route path="/students/:id">
              <Student groups={data_g} students={data_s} id=":id"/>
            </Route>
            <Route path="/students">
              <Students groups={data_g} students={data_s} />
            </Route>
            <Route path="/groups">
              <Groups groups={data_g} students={data_s}/>
            </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
