import React, { Component } from 'react';
import '../_styles/App.css';
import Header from '../components/Header.js'
import Click from './Click.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Click />
      </div>
    );
  }
}

export default App;
