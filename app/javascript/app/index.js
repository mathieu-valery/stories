import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home'
import Upload from './pages/Upload'


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home}/>
        <Route path="/upload" component={Upload}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('react-app')
);


