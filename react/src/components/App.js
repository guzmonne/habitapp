import React, { Component } from 'react';
import '../_styles/App.css';
import Header from './Header.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <h2>Something</h2>
      </div>
    );
  }
}

export default App;
