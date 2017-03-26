import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root.js';
import configureStore from './store/configureStore.js'
import './_styles/index.css';

const Loading = () => (<h1>Loading...</h1>)

const store = configureStore()

class Starter extends React.Component {
  constructor(){
    super()
    this.state = {
      serverUp: false,
    }
  }

  componentDidMount(){
    const tryServer = () => {
      console.log('Trying server.')
      fetch('http://localhost:3000/on')
      .then(() => this.setState({serverUp: true}))
      .catch(() => setTimeout(tryServer, 1000))
    }
    tryServer()
  }

  render() {
    return (
      this.state.serverUp
      ? <Root store={store}/>
      : <Loading />
    )
  }
}

ReactDOM.render(
  <Starter />,
  document.getElementById('root')
);
