import React, { Component } from 'react';
import MainLayout from './ui/MainLayout';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
class App extends Component {

  render() {
    return (
      <div className="App">
        <MainLayout />
      </div>
    );
  }
}

export default App;
