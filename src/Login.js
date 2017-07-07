import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import Loading from './Loading.js';
import './Login.css';
import Api from './Api.js';
import steem from 'steem';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: false,
      showWrongCredentials: false
    };
  }

  componentWillMount = () => {
    document.addEventListener('keyup', this.onKeyUp, false);
  }

  componentWillUnmount = () => {
    document.removeEventListener('keyup', this.onKeyUp, false);
  }

  onKeyUp = (e) => {
    // ENTER
    if (e.key === 'Enter') {
      this.onClickLogin();
    }
  }

  handleChangeEmail = () => {
    this.setState({
      email: this.inputEmail.value
    });
  }

  handleChangePassword = () => {
    this.setState({
      password: this.inputPassword.value
    });
  }

  onClickLogin = () => {
    this.setState({ loading: true });

    let params = {
      username: this.state.email,
      password: this.state.password
    }

    Api.post(
      Api.methods.login,
      params,
      (responseJson) => {
        console.log(responseJson);
        let userData = {
          id: responseJson._id,
          username: responseJson.username,
          postingKey: responseJson.postingKey
        };

        this.fetchSteemitData(userData);

      },
      (error) => {
        this.setState({
          loading: false,
          showWrongCredentials: true
        });
      });
  }

  fetchSteemitData = (userData) => {
    steem.api.getAccounts(['mikepicker'], (err, result) => {

      let data = JSON.parse(result[0].json_metadata).profile;
      console.log(data);
      this.setState({ loading: false });
      userData = {
        'image': data.profile_image,
        'location': data.location,
        'website': data.website
      };

      console.log(userData);
      this.props.setUserData(userData);

    });
  }

  render() {

    let wrongCredentialsAlert =
      <div className="mt-3">
        <Alert color="danger">
          <strong>Ops!</strong> Wrong username and/or password, please try again.
        </Alert>
      </div>;

    return (
        <div className="container col-md-8 mt-3">
            <div className="card gaamit-card">
              <div className="card-block">
                <h4 className="card-title">Join Gaamit!</h4>
                  <input id="inputEmail"
                         type="text"
                         className="form-control mb-2"
                         placeholder="Email"
                         required
                         autoFocus
                         onChange={this.handleChangeEmail}
                         ref={(input) => this.inputEmail = input}/>
                  <input id="inputPassword"
                         type="password"
                         className="form-control"
                         placeholder="Password"
                         required
                         onChange={this.handleChangePassword}
                         ref={(input) => this.inputPassword = input}/>
                  <button className="btn btn-lg btn-primary btn-block mt-3 gaamit-login-btn" onClick={() => this.onClickLogin()}>Log in</button>

                  {this.state.showWrongCredentials ? wrongCredentialsAlert : null}
                  {/*<h3 className="card-text mt-3 mb-3">Or</h3>
                  <button className="btn btn-lg btn-primary btn-block mt-3 gaamit-login-btn" type="submit">Sign up</button>
                  <a href="#" className="pull-right need-help mt-3">Forgot password? </a><span className="clearfix"></span>*/}
              </div>
            </div>
            {this.state.loading ? <Loading/> : null}
          </div>
    );
  }
}
