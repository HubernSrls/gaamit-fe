import React, { Component } from 'react';
import { Button } from 'reactstrap';
import image from './assets/gaamit_placeholder.png';

export default class GaamitCard extends Component {
  render() {

    return (
      <div>

        <div className="card gaamit-card">

          <img className="img-fluid" src={image} alt="..."/>

          <p className="mt-3"><strong>Gaamit</strong> lets you and your fans <u><strong>earn</strong></u> while engaging on your awesome posts</p>

          <div className="gaamit-separator"/>

          <button className="btn btn-lg btn-primary gaamit-button m-3" onClick={() => this.props.changePage('login')}>Join Now!</button>

        </div>
      </div>
    );
  }
}
