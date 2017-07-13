import React, { Component } from 'react';
import './Comment.css';

export default class Comment extends Component {
  render() {

    return (
      <div className="container gaamit-comment p-2 mb-2">
        <div className="row">
          <div className="ml-3 gaamit-comment-profile">
            <img className="rounded-circle img-circle-thumb" src="https://s-media-cache-ak0.pinimg.com/736x/83/34/f5/8334f5875bf8d261ab64cd2df6d49c86--warcraft--world-of-warcraft.jpg" alt=""/>
          </div>

          <div className="pl-3 gaamit-comment-content">
            <p className="m-0"><strong>mikepicker</strong></p>
            <p className="m-0">Test</p>
          </div>
        </div>
      </div>
    );
  }
}
