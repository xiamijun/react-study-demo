import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import routes from './router/routes'

function App() {
  return (
    <Router>
      {
        routes.map((route,index)=>(
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          ></Route>
        ))
      }
    </Router>
  );
}

export default App;
