import React, { Component } from 'react';
import { Button } from 'reactstrap';
import DescriptionCard from './DescriptionCard.js';
import NetworkCard from './NetworkCard.js';
import Post from './Post.js';
import Loading from './Loading.js';
import './ProfilePage.css';

export default class ProfilePage extends Component {
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
                body={data.body}
                changePage={this.props.changePage}/>
        </div>);
    }

    // Loading
    if (!this.props.feed) {
      posts = <Loading/>
    }

    return (
      <div>
        <div id="profile-banner">
          <img id="profile-banner-img" src="https://static.pexels.com/photos/443356/pexels-photo-443356.jpeg" alt="profile banner"/>
          <div id="profile-headline">
            <img id="profile-avatar" className="rounded-circle" src={this.props.userData.image}/>
            <h1 id="profile-title">Mike <small>@mikepicker</small></h1>
          </div>
          <Button id="profile-follow-settings" outline color="primary" className="gaamit-button mr-1 mb-1" onClick={() => this.props.changePage('settings')}>Settings</Button>
        </div>

        <div id="profile-sub-banner"/>

        <div className="row mt-3">

          <div className="col-md-4 mb-3">
            <DescriptionCard userData={this.props.userData}/>
          </div>

          <div className="col-md-4 p-0">
            {posts}
          </div>

          <div className="col-md-4">
            <NetworkCard/>
          </div>

        </div>
      </div>
    );
  }
}
