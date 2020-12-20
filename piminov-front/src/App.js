import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {useState, useEffect} from 'react';
import Header from './Header';
import Groups from './Groups';
import Students from './Students';
import Main from './Main';
import Group from "./Group";
import Student from "./Student";
import axios from 'axios';


function App() {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    axios.get('/groups')
    .then(function (response) {
      setGroups(response.data)
      console.log("axios test infinity");
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [null])

  return (
    <div className="App">
      <Router> 
        <Header/>
              {groups &&
        <Switch>
            <Route exact path="/">
              <Main groups={groups} />
            </Route>
            <Route path="/groups/:id">
              <Group groups={groups}/>
            </Route>
            <Route path="/students/:id">
              <Student groups={groups}/>
            </Route>
            <Route path="/students">
              <Students groups={groups} />
            </Route>
            <Route path="/groups">
              <Groups groups={groups}/>
            
            </Route>
        </Switch>
            }
      </Router>

    </div>
  );
}

export default App;
