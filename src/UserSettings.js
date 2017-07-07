import React, { Component } from 'react';
import { InputGroup, InputGroupButton, Input, Button } from 'reactstrap';
import './UserSettings.css';
import Api from './Api.js';

export default class ProfileCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      confirmPassword: '',
      postingKey: '',
      loading: false,
      showPasswordMismatch: false,
      profileUrl: 'http://teamzone-gaming.com/wp-content/uploads/2016/05/Durotan-Warcraft.0.0.jpg',
      bannerUrl: 'https://static.pexels.com/photos/443356/pexels-photo-443356.jpeg'
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

  onClickSubmit = () => {
    this.setState({ loading: true });

    let params = {
      id: '59596642b31ec700119904c7',
      postingKey: this.state.postingKey,
    }

    Api.put(
      Api.methods.settings,
      params,
      (responseJson) => {

        this.setState({ loading: false });
        console.log(responseJson);

      },
      (error) => {
        this.setState({
          loading: false,
          showPasswordMismatch: true
        });
      });
  }

  render() {

    return (
      <div className="card gaamit-card p-3">

        <label htmlFor="settings-profile-img">Change Profile Picture</label>
        <img id="settings-profile-img" className="rounded-circle" src={this.state.profileUrl} alt="profile pic"/>

        <div id="input-profile-pic" className="mt-3 mb-3">

          <InputGroup>
            <Input placeholder="http//..." onChange={this.handleChangeProfile}/>
          </InputGroup>

        </div>

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

        <label htmlFor="input-posting-key">Steemit Posting Key</label>
        <div id="input-posting-key">
          <InputGroup>
            <Input placeholder="posting key" onChange={this.handleChangeKey}/>
          </InputGroup>
        </div>

        <Button outline color="primary" className="gaamit-button mt-5" onClick={() => this.onClickSubmit()}>Submit</Button>
      </div>
    );
  }
}
