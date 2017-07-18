import React, { Component } from 'react';
import { Button } from 'reactstrap';
import steem from 'steem';
import Api from './Api.js';

function NetworkItem(props) {
  return(
    <div>
      <div className="gaamit-separator"/>
      <div className="container">
        <div className="row pr-2 pt-2 pb-2">
          <div className="col-md-6 col-lg-4">
            <img className="rounded-circle img-circle-thumb" src={props.user.image} alt=""/>
          </div>
          <div className="col-md-6 col-lg-8">
            <div className="row">
              <h4 style={{ textAlign: 'left' }}>{props.user.name} <span style={{ fontSize: '16px', color: '#888' }}>@{props.user.steemitUsername}</span></h4>
            </div>
            <div className="row">
              <Button size="sm" outline color="primary" className="gaamit-button-outline pt-0 pb-0" onClick={() => props.followUser(props.user.id)}>Follow</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default class NetworkCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersData: []
    };
  }

  componentDidMount = () => {

    let params = {
      id: this.props.userData.id
    }

    Api.get(
      Api.methods.suggested,
      params,
      (responseJson) => {
        console.log("resp ", responseJson);
        this.fetchSteemitData(responseJson);

      },
      (error) => {
        console.log(error);
        this.setState({
          loading: false,
          showError: true
        });
      });

  }

  fetchSteemitData = (users) => {

    let usersData = [];
    users.forEach((user) => {

      steem.api.getAccounts([user.steemitUsername], (err, result) => {

        let data = result[0];

        if (data && data.json_metadata !== '') {
          let profileData = JSON.parse(data.json_metadata).profile;

          usersData.push({
            id: user._id,
            name: profileData.name,
            image: profileData.profile_image,
            steemitUsername: data.name
          });

          this.setState({usersData: usersData});
        }
      });

    });
    console.log(usersData);
    this.setState({usersData: usersData});
  }

  render() {

    let usersTag = [];
    this.state.usersData.forEach((user) => {
      usersTag.push(
        <NetworkItem key={user.steemitUsername} user={user} followUser={this.props.followUser}/>
      );
    });

    return (
      <div>

        <div className="card gaamit-card">
          <h4 className="card-title mt-3">Follow more Devs</h4>
           {usersTag}
        </div>
      </div>
    );
  }
}
