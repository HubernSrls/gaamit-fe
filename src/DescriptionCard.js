import React, { Component } from 'react';
import { Tooltip, Progress } from 'reactstrap';

export default class DescriptionCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tooltipOpen: false
    };
  }

  toggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {

    return (
      <div className="card gaamit-card">
        <div className="card-block">
          <p className="card-title">{this.props.userData.about}</p>
          <p><i className="fa fa-map-marker"/> {this.props.userData.location}</p>
          {/*<p><i className="fa fa-calendar-o"/> Joined 27-10-2016</p>*/}
          <p><i className="fa fa-link"/> <a href="http://www.michelerullo.com">{this.props.userData.website}</a></p>
        </div>
      </div>
    );
  }
}
