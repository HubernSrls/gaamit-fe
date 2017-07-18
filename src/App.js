import React, { Component } from 'react';
import GaamitNavbar from './GaamitNavbar.js';
import Posts from './Posts.js'
import PostContent from './PostContent.js'
import Info from './Info.js';
import Login from './Login.js';
import ProfileCard from './ProfileCard.js';
import NetworkCard from './NetworkCard.js';
import GaamitCard from './GaamitCard.js';
import SetUsernameCard from './SetUsernameCard.js';
import ProfilePage from './ProfilePage.js';
import EditorPage from './EditorPage.js';
import UserSettings from './UserSettings.js';
import Footer from './Footer.js';
import Api from './Api.js';
import steem from 'steem';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: '',
      pageParams: null,
      feed: null,
      postContent: '',
      userData: null,
      lastPermlink: '',
      lastAuthor: '',
      hideMascotte: false
    }
  }

  componentDidMount = () => {

    // Retrieve stored data
    if (localStorage.user_data) {
      this.setState({ userData: JSON.parse(localStorage.user_data) })
    }

    this.changePage('created', null, false);

    window.onscroll = (ev) => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.fetchCategory(this.state.page, this.state.lastPermlink, this.state.lastAuthor);
      }

      this.setState({hideMascotte: window.scrollY > 0});
    };

    // History API
    window.onpopstate = (e) => {
      console.log(e.state);
      if (e.state === null) {
        this.changePage('created', null, false);
      }
      else {
        this.changePage(e.state.page, e.state.params, false);
      }
    };

  }

  changePage = (newPage, params, pushToHistory=true) => {

    if (pushToHistory) {
      window.history.pushState({ page: newPage, params: params }, null);
    }

    // Feed categories
    if (newPage === 'created' || newPage === 'hot' || newPage === 'trending' || newPage === 'feed' || newPage === 'blog') {
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
      page: newPage,
      pageParams: params
    });

  }

  logout = () => {
    delete localStorage.user_data;
    this.setState({userData: null});
    this.changePage('created');
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

    let blogTag = this.state.pageParams && this.state.pageParams.username ? this.state.pageParams.username : this.state.userData.steemitUsername;

    switch (category) {

      case 'feed':
        steem.api.getDiscussionsByFeed({
          limit: limit,
          tag: this.state.userData.steemitUsername,
          start_author: startAuthor,
          start_permlink: startPost
        }, callback);
        break;

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

      case 'blog':
        steem.api.getDiscussionsByBlog({
          limit: limit,
          tag: blogTag,
          start_author: startAuthor,
          start_permlink: startPost
        }, callback);
        break;

      default:
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
    console.log(data);
    localStorage.setItem('user_data', JSON.stringify(data));
    this.setState({
      userData: data
    });
  }

  setSteemitData = (data) => {console.log(data);
    let userData = this.state.userData;
    userData = {
      id: userData.id,
      steemitUsername: data.steemitUsername,
      name: data.name,
      image: data.image,
      location: data.location,
      website: data.website,
      about: data.about,
      votingPower: data.votingPower
    };

    localStorage.setItem('user_data', JSON.stringify(userData));
    this.setState({
      userData: userData
    });
  }

  followUser = (id) => {
    let params = {
      follower: this.state.userData.id,
      followed: id,
    }

    Api.get(
      Api.methods.follow,
      params,
      (responseJson) => {
        console.log(responseJson);
      },
      (error) => {
        console.log(error);
      });
  }

  render() {

    // Current page
    let pageTag;
    //let toggleJumbo = true;
    let toggleFooter = false;

    const profileCard = <ProfileCard userData={this.state.userData} changePage={this.changePage}/>
    const networkCard = <NetworkCard userData={this.state.userData} changePage={this.changePage} followUser={this.followUser}/>
    const gaamitCard = <GaamitCard changePage={this.changePage}/>
    const setUsernameCard = <SetUsernameCard changePage={this.changePage}/>

    let leftComponent;
    if (this.state.userData) {
      if (this.state.userData.steemitUsername) {
        leftComponent = profileCard;
      } else {
        leftComponent = setUsernameCard;
      }
    } else {
      leftComponent = gaamitCard;
    }

    if (this.state.page === 'created' || this.state.page === 'hot' || this.state.page === 'trending' || this.state.page === 'feed') {
      pageTag =
        <div className="row">
          <div className="hidden-xs-down col-md-3">
            {leftComponent}
          </div>

          <div className="col-md-6 p-0">
            <Posts page={this.state.page}
                   changePage={this.changePage}
                   feed={this.state.feed}
                   userData={this.state.userData}/>
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
        pageTag = <PostContent show={this.state.showPostContent}
                               title={this.state.feed[this.state.postContent].title}
                               author={this.state.feed[this.state.postContent].author}
                               content={postContentBody}
                               userData={this.state.userData}/>
      }
    } else if (this.state.page === 'login') {
      pageTag = <Login changePage={this.changePage} setUserData={this.setUserData}/>
      //toggleJumbo = false;
    } else if (this.state.page === 'blog') {
      pageTag = <ProfilePage userData={this.state.userData}
                             changePage={this.changePage}
                             fetchCategory={this.fetchCategory}
                             feed={this.state.feed}
                             pageParams={this.state.pageParams}
                             followUser={this.followUser}/>
    } else if (this.state.page === 'editor') {
      pageTag = <EditorPage userData={this.state.userData}/>
    } else if (this.state.page === 'settings') {
      pageTag = <UserSettings userData={this.state.userData} setSteemitData={this.setSteemitData}/>
    }

    return (
      <div className="App">
        <GaamitNavbar page={this.state.page}
                      changePage={this.changePage}
                      userData={this.state.userData}
                      hideMascotte={this.state.hideMascotte}
                      logout={this.logout}/>
        <div className="container mb-5 mt-4">
          {pageTag}
        </div>
        { toggleFooter ? <Footer/> : null }
      </div>
    );
  }
}

export default App;
