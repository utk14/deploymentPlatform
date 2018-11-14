import React, { Component } from 'react';
import logo from './styles/images/gitlab.png';
import './styles/App.css';


class App extends Component {

  test() {
    console.log("clicked");
    const url = "https://github.com/yravinderkumar33/portfolio.git";
    fetch(`/deploy`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: url
    })
      .then(res => { return res.json() })
      .then(res => console.log(res))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a className="App-link" id="loginButton" href={`/auth`}> Connect using Gitlab </a>
          {/* <button onClick={this.test}> test </button> */}
        </header>
      </div>
    );
  }
}

export default App;
