import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Header from './Header.js';
import GaamitNavbar from './GaamitNavbar.js';
import Jumbotron from './Jumbotron.js';
import Sidebar from './Sidebar.js';
import Posts from './Posts.js'
import PostContent from './PostContent.js'
import Info from './Info.js';
import Login from './Login.js';
import ProfileCard from './ProfileCard.js';
import NetworkCard from './NetworkCard.js';
import GaamitCard from './GaamitCard.js';
import ProfilePage from './ProfilePage.js';
import EditorPage from './EditorPage.js';
import UserSettings from './UserSettings.js';
import Footer from './Footer.js';
import steem from 'steem';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: '',
      feed: null,
      postContent: '',
      userData: null,
      lastPermlink: '',
      lastAuthor: ''
    }
  }

  componentDidMount = () => {
    this.changePage('created');

    window.onscroll = (ev) => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          this.fetchCategory(this.state.page, this.state.lastPermlink, this.state.lastAuthor);
      }
    };

  }

  changePage= (newPage, params) => {

    // Feed categories
    if (newPage === 'created' || newPage === 'hot' || newPage === 'trending') {
      this.setState({
        feed: null,
        lastPermlink: '',
        lastAuthor: ''
      }, () => this.fetchCategory(newPage));
    }

    // Show post content
    if (newPage === 'post') {
      this.setState({
        postContent: params
      });
    }

    this.setState({
      page: newPage
    });

  }


  fetchCategory = (category, startPost, startAuthor) => {

    let currentFeed = this.state.feed;
    let limit = startPost ? 13 : 12;

    let callback = (err, result) => {

      if (!result) {
        return;
      }

      if (!currentFeed) {
        currentFeed = result
      } else {
        currentFeed.splice(-1,1);
        currentFeed = currentFeed.concat(result);
      }

      let size = result.length < limit ? result.length : limit;

      this.setState({
        feed: currentFeed,
        lastPermlink: result[size-1].permlink,
        lastAuthor: result[size-1].author
      });
    }

    switch (category) {

      case 'created':
        steem.api.getDiscussionsByCreated({
          limit: limit,
          tag: 'gamedev',
          start_author: startAuthor,
          start_permlink: startPost
        }, callback);
        break;

      case 'hot':
        steem.api.getDiscussionsByHot({
          limit: limit,
          tag: 'gamedev',
          start_author: startAuthor,
          start_permlink: startPost
        }, callback);
        break;

      case 'trending':
        steem.api.getDiscussionsByTrending({
          limit: limit,
          tag: 'gamedev',
          start_author: startAuthor,
          start_permlink: startPost
        }, callback);
        break;
    }

    /*fetch(`https://api.steemjs.com/getState?path=/${category}/gamedev`).then((response) => {
      return response.json();
    }).then((json) => {console.log(json);

      this.setState({
        feed: json.content
      });
    });*/
  }

  setUserData = (data) => {
    this.setState({
      userData: data
    });
  }

  render() {

    // Current page
    let pageTag;
    let toggleJumbo = true;
    let toggleFooter = false;

    let profileCard = <ProfileCard userData={this.state.userData} changePage={this.changePage}/>
    let networkCard = <NetworkCard/>
    let gaamitCard = <GaamitCard changePage={this.changePage}/>

    if (this.state.page === 'created' || this.state.page === 'hot' || this.state.page === 'trending') {
      pageTag =
        <div className="row">
          <div className="hidden-xs-down col-md-3">
            {this.state.userData ? profileCard : gaamitCard}
          </div>

          <div className="col-md-6 p-0">
            <Posts page={this.state.page}
                   changePage={this.changePage}
                   feed={this.state.feed}/>
          </div>

          <div className="hidden-xs-down col-md-3">
            {networkCard}
          </div>
        </div>

      toggleFooter = true;

    } else if (this.state.page === 'info') {
      pageTag = <Info/>
    } else if (this.state.page === 'post') {
      let postContentBody = this.state.feed ? this.state.feed[this.state.postContent] : '';
      if (postContentBody) {
        postContentBody = postContentBody.body;
        pageTag = <PostContent show={this.state.showPostContent}
                               title={this.state.feed[this.state.postContent].title}
                               author={this.state.feed[this.state.postContent].author}
                               body={postContentBody}/>
      }
    } else if (this.state.page === 'login') {
      pageTag = <Login changePage={this.changePage} setUserData={this.setUserData}/>
      toggleJumbo = false;
    } else if (this.state.page === 'profile') {
      pageTag = <ProfilePage userData={this.state.userData} changePage={this.changePage}/>
    } else if (this.state.page === 'editor') {
      pageTag = <EditorPage userData={this.state.userData}/>
    } else if (this.state.page === 'settings') {
      pageTag = <UserSettings userData={this.state.userData}/>
    }

    return (
      <div className="App">
        <GaamitNavbar page={this.state.page} changePage={this.changePage} userData={this.state.userData}/>
        <div className="container mb-5 mt-4">
          {pageTag}
        </div>
        { toggleFooter ? <Footer/> : null }
      </div>
    );
  }
}

export default App;
