import React, { Component } from 'react';
import { Button } from 'reactstrap';
import steem from 'steem';
import DescriptionCard from './DescriptionCard.js';
import NetworkCard from './NetworkCard.js';
import Post from './Post.js';
import Loading from './Loading.js';
import './ProfilePage.css';
import placeholder from './assets/gaamit_placeholder.png';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: '',
      image: '',
      location: '',
      website: '',
      about: ''
    };
  }

  componentDidMount = () => {
    steem.api.getAccounts([this.props.pageParams.username], (err, result) => {

      if (result[0].json_metadata !== '') {
        let data = JSON.parse(result[0].json_metadata).profile;

        this.setState({
          image: data.profile_image,
          location: data.location,
          website: data.website,
          about: data.about,
        });
      } else {
        this.setState({image: placeholder});
      }

    });
  }

  followUser = () => {

  }

  render() {

    let posts = [];
    let key = 0;
    for (let content in this.props.feed) {
      let data = this.props.feed[content];

      posts.push(
        <div key={key++} className="p-0">
          <Post id={content}
                title={data.title}
                author={data.author}
                lastUpdate={data.last_update}
                image={JSON.parse(data.json_metadata).image}
                reward={data.pending_payout_value}
                body={data.body}
                changePage={this.props.changePage}/>
        </div>);
    }

    // Loading
    if (!this.props.feed) {
      posts =
        <div style={{textAlign: 'center'}}>
          <Loading/>
        </div>
    }

    // Settings
    const settings =
      <Button id="profile-follow-settings" outline color="primary" className="gaamit-button mr-1 mb-1" onClick={() => this.props.changePage('settings')}>Settings</Button>

    const follow =
      <Button id="profile-follow-settings" outline color="primary" className="gaamit-button mr-1 mb-1" onClick={() => this.followUser()}>Follow</Button>

    return (
      <div>
        <div id="profile-banner">
          <img id="profile-banner-img" src="https://static.pexels.com/photos/443356/pexels-photo-443356.jpeg" alt="profile banner"/>
          <div id="profile-headline">
            <img id="profile-avatar" className="rounded-circle" src={this.state.image} alt="avatar"/>
            <h1 id="profile-title">{this.state.name} <small>@{this.props.pageParams.username}</small></h1>
          </div>
          {this.props.pageParams.username === this.props.userData.steemitUsername ? settings : follow}
        </div>

        <div id="profile-sub-banner"/>

        <div className="row mt-3">

          <div className="col-md-4 mb-3">
            <DescriptionCard about={this.state.about} location={this.state.location} website={this.state.website}/>
          </div>

          <div className="col-md-4 p-0">
            {posts}
          </div>

          <div className="col-md-4">
            <NetworkCard userData={this.props.userData} changePage={this.props.changePage} followUser={this.props.followUser}/>
          </div>

        </div>
      </div>
    );
  }
}
