import React, { Component } from 'react';

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

    const about = this.props.about ? <p className="card-title">{this.props.about}</p> : "I'm just a cool guy :)"
    const location = this.props.location ? <p><i className="fa fa-map-marker"/> {this.props.location}</p> : null
    const website = this.props.website ? <p><i className="fa fa-link"/> <a href="http://www.michelerullo.com">{this.props.website}</a></p> : null

    return (
      <div className="card gaamit-card">
        <div className="card-block">
          {about}
          {location}
          {/*<p><i className="fa fa-calendar-o"/> Joined 27-10-2016</p>*/}
          {website}
        </div>
      </div>
    );
  }
}
