import React, { Component } from 'react';
import { InputGroup, Input, Button, Alert } from 'reactstrap';
import steem from 'steem';
import './UserSettings.css';
import Api from './Api.js';

export default class ProfileCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: null,
      confirmPassword: null,
      postingKey: null,
      steemitUsername: null,
      loading: false,
      showPasswordMismatch: false,
      profileUrl: props.userData.image,
      bannerUrl: 'https://static.pexels.com/photos/443356/pexels-photo-443356.jpeg',
      showError: false,
      showSuccess: false
    };
  }

  handleChangeKey = (e) => {
    this.setState({
      postingKey: e.target.value
    });
  }

  handleChangeProfile = (e) => {

    if (e.target.value.match(/(https?:\/\/.*\.(?:png|jpg))/i)) {
      this.setState({
        profileUrl: e.target.value
      });
    }

  }

  handleChangeBanner = (e) => {

    if (e.target.value.match(/(https?:\/\/.*\.(?:png|jpg))/i)) {
      this.setState({
        bannerUrl: e.target.value
      });
    }

  }

  handleChangeUsername = (e) => {
    this.setState({ steemitUsername: e.target.value });
  }

  onClickSubmit = () => {
    this.setState({ loading: true });

    let params = {
      id: this.props.userData.id,
      postingKey: this.state.postingKey ? this.state.postingKey : null,
      steemitUsername: this.state.steemitUsername ? this.state.steemitUsername : null,
    }

    Api.put(
      Api.methods.settings,
      params,
      (responseJson) => {
        console.log("resp ", this.props.userData.id);
        this.fetchSteemitData(responseJson.steemitUsername);

      },
      (error) => {
        console.log(error);
        this.setState({
          loading: false,
          showError: true
        });
      });
  }

  fetchSteemitData = (steemitUsername) => {
    console.log("call ", steemitUsername);
    steem.api.getAccounts([steemitUsername], (err, result) => {

      if (result[0].json_metadata !== '') {
        let data = JSON.parse(result[0].json_metadata).profile;

        let userData = {
          steemitUsername: steemitUsername,
          name: data.name,
          image: data.profile_image,
          location: data.location,
          website: data.website,
          about: data.about,
          votingPower: result[0].voting_power
        };

        this.props.setSteemitData(userData);

        this.setState({
          loading: false,
          showSuccess: true
        });
      } else {
        this.setState({
          loading: false,
          showError: true
        });
      }

    });
  }

  render() {

    let passwordMismatchAlert =
      <div className="mt-3">
        <Alert color="danger">
          <strong>Ops!</strong> Password mismatch!.
        </Alert>
      </div>;

    let errorAlert =
      <div className="mt-3">
        <Alert color="danger">
          <strong>Ops!</strong> Something went wrong, please try again.
        </Alert>
      </div>;

    let successAlert =
      <div className="mt-3">
        <Alert color="success">
          <strong>Success!</strong> Your changes have been successfully applied.
        </Alert>
      </div>;

    return (
      <div className="card gaamit-card p-3">

        <h1 className="card-title">User Settings</h1>

        {/*<label htmlFor="settings-profile-img">Change Profile Picture</label>
        <img id="settings-profile-img" className="rounded-circle" src={this.state.profileUrl} alt="profile pic"/>

        <div id="input-profile-pic" className="mt-3 mb-3">

          <InputGroup>
            <Input placeholder="http//..." onChange={this.handleChangeProfile}/>
          </InputGroup>

        </div>*/}

        <div className="mt-3 mb-3"/>

        <label htmlFor="settings-banner-img">Change Banner</label>
        <img id="settings-banner-img" className="img-fluid" src={this.state.bannerUrl} alt="banner pic"/>

        <div id="input-banner-pic" className="mt-3 mb-3">

          <InputGroup>
            <Input placeholder="http//..." onChange={this.handleChangeBanner}/>
          </InputGroup>

        </div>

        <div className="mt-3 mb-3"/>

        <label htmlFor="input-password">Change Password</label>
        <div id="input-password" className="mb-3">

          <InputGroup>
            <Input placeholder="password"/>
          </InputGroup>

          <div className="mt-1 mb-1"/>

          <InputGroup>
            <Input placeholder="confirm password"/>
          </InputGroup>
        </div>

        <div className="mt-3 mb-3"/>

        <label htmlFor="input-posting-key">Steemit Username</label>
        <div id="input-steemit-username">
          <InputGroup>
            <Input placeholder="username" onChange={this.handleChangeUsername}/>
          </InputGroup>
        </div>

        <div className="mt-3 mb-3"/>

        <label htmlFor="input-posting-key">Steemit Posting Key</label>
        <div id="input-posting-key">
          <InputGroup>
            <Input placeholder="posting key" onChange={this.handleChangeKey}/>
          </InputGroup>
        </div>

        {this.state.showSuccess ? successAlert : null}
        {this.state.showError ? errorAlert : null}
        {this.state.showPasswordMismatch ? passwordMismatchAlert : null}

        <Button outline color="primary" className="gaamit-button mt-5" onClick={() => this.onClickSubmit()}>Submit</Button>
      </div>
    );
  }
}
