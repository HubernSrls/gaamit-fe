import React, { Component } from 'react';
import image from './assets/gaamit_placeholder.png';

export default class SetUsernameCard extends Component {
  render() {

    return (
      <div>

        <div className="card gaamit-card">

          <img className="img-fluid" src={image} alt="..."/>

          <p className="mt-3">Connect your <strong>Steemit</strong> account</p>

          <div className="gaamit-separator"/>

          <button className="btn btn-lg btn-primary gaamit-button m-3" onClick={() => this.props.changePage('settings')}>Set Username</button>

        </div>
      </div>
    );
  }
}
