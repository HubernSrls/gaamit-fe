import React, { Component } from 'react';
import showdown from 'showdown';
import steem from 'steem';
import Comment from './Comment.js';
import Api from './Api.js';
import './PostContent.css';
import loading from './loading.svg';

export default class PostContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      replies: null,
      upvoted: false,
      loading: false
    };

  }

  componentDidMount = () => {

    // Replies
    /*steem.api.getContent(this.props.content.author, this.props.content.permlink, (err, result) => {
      console.log(err, result);
    });*/

    // Check if if already voted
    if (this.props.userData) {
      let votes = this.props.content.active_votes;
      for (let i in votes) {
        if (votes[i].voter === "mikepicker") {
          this.setState({upvoted: true});
        }
      }
    }

  }

  upvote = () => {

    this.setState({ loading: true });

    let params = {
      username: "mikepicker",
      author: this.props.content.author,
      permlink: this.props.content.permlink
    }

    Api.post(
      Api.methods.upvote,
      params,
      (responseJson) => {

        this.setState({
          loading: false,
          upvoted: true
        });

        console.log(responseJson);

      },
      (error) => {
        console.log(error);
        this.setState({
          loading: false
        });
      });
  }

  render() {

    let converter = new showdown.Converter();
    let text = this.props.content.body;
    let body = converter.makeHtml(this.props.content.body);
    body = body.replace(/<img/gi, '<br/><img class="img-fluid"');

    // Find images
    /*let re = /(\shttps?:\/\/.*\.(?:png|jpg|gif))/gi;
    let match;
    do {
      match = re.exec(body);
      if (match) {
        console.log(match);
        body = body.replace(match[0], '<img class="img-fluid" src="' + match[0] + '" />');
      }
    } while (match);*/

    let reward = this.props.content.pending_payout_value.substring(0, this.props.content.pending_payout_value.length-4);
    let upvoteStyle = "fa fa-chevron-up gaamit-upvote";
    if (this.state.upvoted) {
      upvoteStyle += " active";
    }

    return (
      <div className="container col-md-12">
        <div className="card mb-3 pt-3 gaamit-card">
          <h4 className="card-title">{this.props.content.title}</h4>
          <p className="card-title">By <a href={"https://steemit.com/@" + this.props.content.author}>{this.props.content.author}</a></p>
        </div>
        <div className="card mb-3 gaamit-card pt-5">
          <div className="pl-5 pr-5" dangerouslySetInnerHTML={{ __html: body}} style={{ textAlign: 'left' }}/>
          <div className="card-footer">
            {this.state.loading ? <img className="gaamit-upvote-loading" src={loading} alt="loading" /> : <i className={upvoteStyle} onClick={() => this.upvote()}/>}
            <p className="gaamit-post-reward ml-2 mb-0">$ {reward}</p>
          </div>
        </div>
      </div>
    );
  }
}
