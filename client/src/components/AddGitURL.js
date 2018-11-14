/*eslint react/jsx-filename-extension: 0 */
/* eslint react/forbid-prop-types: 0 */
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List'
import HomePageComponent from './HomePageComponent';
import ProgressBar from './loadingSpinner';
import '../styles/AddGitUrl.css';
import * as Rx from 'rxjs';
import { filter, map } from 'rxjs/operators';
import io from 'socket.io-client';


class AddGitURL extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: '',
      printResponse: ''
    }
  }

  componentDidMount() {
    const socket = io();
    console.log('before rxjs');
    Rx.fromEvent(document.getElementById("outlined-email-input"), "click")
      .pipe(map(() => {
        return document.getElementById("outlined-email-input2").value;
      }),
        filter((data) => {
          return data !== ""
        }))
      .subscribe((url) => {
        fetch(`/deploy`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "url": url
          })
        })
          .then(res => res.json())
          .then(res => {
            if (res) {
              this.setState({ context: '' })
            }
            return res;
          })
          .then(res => console.log('this is res: ', res))
      })

    socket.on('chat', (data) => {
       document.getElementById("logger").style.display = 'block';
       const logs = document.getElementById("logger").innerHTML + `${data} <br/>`;
       if(data){
         this.setState({context: '', printResponse:(logs) })
       }
      //  document.getElementById("logger").innerHTML += `${data} <br/>`;
    })

  }

  handleClickButton = () => {
    console.log('inside handleClickButton', this.state.loading);
    if (document.getElementById("outlined-email-input2").value) {
      this.setState({
        context: <ProgressBar />
      })
    }
  }

  clearResult = () => {
    console.log('inside clearResult');
    this.setState({
      printResponse: ''
    })
  }
  render() {
    const { context,printResponse } = this.state;
    return (
      <div className="main">
        <HomePageComponent />
        <Paper className="root1" elevation={20}>
          <div className="text1">
            <TextField
              id="outlined-email-input2"
              label="GitURL"
              className="textField1"
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              onFocus={this.clearResult}
            />
            <Button
              variant="outlined"
              color="primary"
              className="button1"
              id="outlined-email-input"
              name="buttonSubmit"
              onClick={this.handleClickButton}
            >
              Deploy
                        </Button>
            {context}
            {printResponse}
          </div>
        </Paper>

        <Paper id="logger" className={"root2"} style={{ maxHeight: 150, overflow: 'auto', padding: 20, background: "black", color: "white", display: 'none', fontSize: '0.8rem' }}>
          <List>

          </List>
        </Paper>

      </div>
    )
  }
}
export default AddGitURL;





