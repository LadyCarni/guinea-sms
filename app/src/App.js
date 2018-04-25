import React, { Component } from 'react';
import axios from 'axios';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import hello from './images/guinea-hello.png';
import almost from './images/guinea-almost.png';
import welcome from './images/guinea-welcome.png';
import './App.css';

axios.defaults.baseURL = 'http://localhost:4000';

const Guinea = ({ requestId, verified }) => {
  if (! requestId) {
    return <img src={hello} className="App-logo" alt="hello guinea" />;
  }
  if (requestId && ! verified) {
    return <img src={almost} className="App-logo" alt="almost guinea" />
  }
  if (requestId && verified) {
    return <img src={welcome} className="App-logo" alt="welcome guinea" />
  }
  return null;
}

const Request = ({ disabled, onChange, onClick, requestId }) => {
  if (requestId) {
    return null;
  }
  return (
    <div className="body-content">
      <p className="convo">But first, I need to know it's really you.</p>
      <p>Enter your phone number below and let's see...</p>
      <FormGroup>
        <Label for="phone">Phone Number</Label>
        <Input type="tel" name="phone" id="phone" placeholder="e.g.: 447700900000" onChange={(event) => onChange(event)} />
      </FormGroup>
      <Button color="info" onClick={() => onClick()} disabled={disabled}>Witness Me!</Button>
    </div>
  );
}

const Verify = ({ disabled, onChange, onClick, requestId, verified }) => {
  if (! requestId || verified) {
    return null;
  }
  return (
    <div className="body-content">
      <p className="convo">Almost there! What's the super secret code?</p>
      <FormGroup>
        <Label for="code">SMS Code</Label>
        <Input type="nummber" name="code" id="code" placeholder="e.g.: 4477" onChange={(event) => onChange(event)} />
      </FormGroup>
      <Button color="info" onClick={() => onClick()} disabled={disabled}>Verify Me!</Button>
    </div>
  );
}

const Rick = ({ verified }) => {
  if (! verified) {
    return null;
  }
  return (
    <div className="body-content">
      <p className="convo">OMG! You did it!</p>
      <Button color="info" onClick={() => {window.location = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';}}>Show me my quest!</Button>
    </div>
  );
}

class App extends Component {
  state = {
    phone: null,
    code: null,
    verified: null,
    request_id: null,
    loading: false
  }
  handleRequest() {
    this.setState({ loading: true });
    axios.post('/request', {
      number: this.state.phone
    })
    .then((response) => {
      this.setState({ request_id: response.data.request_id });
      this.setState({ loading: false });
    })
    .catch((error) => {
      console.log(error);
      this.setState({ loading: false });
    });
  }
  handleVerify() {
    this.setState({ loading: true });
    axios.post('/verify', {
      request_id: this.state.request_id,
      code: this.state.code
    })
    .then((response) => {
      this.setState({ verified: response.data.verified });
      this.setState({ loading: false });
    })
    .catch((error) => {
      console.log(error);
      this.setState({ loading: false });
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Guinea
            requestId={this.state.request_id}
            verified={this.state.verified} />
          <h1 className="App-title">Hello!</h1>
          <p>I'm so excited you made it! I have a quest for you!</p>
        </header>

        <Request
          requestId={ this.state.request_id }
          disabled={ this.state.loading }
          onClick={() => this.handleRequest()}
          onChange={(event) => this.setState({ phone: event.target.value })} 
          />

        <Verify
          requestId={ this.state.request_id }
          verified={ this.state.verified }
          disabled={ this.state.loading }
          onClick={() => this.handleVerify()}
          onChange={(event) => this.setState({ code: event.target.value })} />
        
        <Rick verified={ this.state.verified } />
      </div>
    );
  }
}

export default App;
