import React, { Component } from 'react';
import './Post.css';
import placeholder from './assets/gaamit_placeholder.png';

export default class Post extends Component {

  togglePost = () => {
    this.props.changePage('post', this.props.id);
  }

  render() {

    //let image = this.props.body.match(/(https?:\/\/.*\.(?:png|jpg|gif))/i);
    let image = this.props.image ? this.props.image[0] : placeholder;
    let imageTag = <img className="card-img-top img-fluid gaamit-post-image" src={image} alt="" onClick={() => this.togglePost()}/>;
    let authorTag = <p className="gaamit-user-link mb-0" onClick={() => this.props.changePage('blog', {username: this.props.author})}>{this.props.author}</p>

    // Date
    /*let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    let todayDate = new Date(2008,1,12);
    let postDate = this.props.lastUpdate.split("T")[0];*/
    /*postDate = new Date(postDate[0], postDate[1], postDate[2]);
    let diffDays = Math.round(Math.abs((todayDate.getTime() - postDate.getTime())/(oneDay)));
    console.log(diffDays);*/

    let title = this.props.title;
    if (title.length > 32) {
      title = this.props.title.substring(0, 32) + '...';
    }

    let reward = this.props.reward.substring(0, this.props.reward.length-4);

    return (
      <div className="card mb-3 gaamit-card gaamit-post">
        {imageTag}
        <div className="card-block gaamit-post-inner">
          <h6 className="gaamit-card-title card-title" onClick={() => this.togglePost()}>{title}</h6>
          <p className="card-text mb-0"><small className="text-muted">$ {reward}</small></p>
          <div className="card-text"><small className="text-muted">{authorTag}</small></div>
        </div>
      </div>
    );
  }
}
