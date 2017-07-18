import React, { Component } from 'react';
import { Tooltip, Progress, Button } from 'reactstrap';
import './ProfileCard.css';

export default class ProfileCard extends Component {
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

    let votingPower = this.props.userData.votingPower/100;

    return (
      <div className="card gaamit-card">
        <img className="rounded-circle img-circle mt-3 mb-3" src={this.props.userData.image} alt=""/>
        <div className="gaamit-separator"/>
        <div className="card-block">
          <h4 className="card-title">{this.props.userData.name}</h4>
          <p className="card-text" style={{ color: '#888' }}>@{this.props.userData.steemitUsername}</p>

          <div id="gaamit-voting-power">
            <Progress className="gaamit-progress" bar color="success" value={votingPower}/>
          </div>
          <p>{votingPower + '%'}</p>

          <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="gaamit-voting-power" toggle={this.toggle}>
            Voting Power {votingPower + '%'}
          </Tooltip>
          <Button className="gaamit-button mt-3" onClick={() => this.props.changePage('blog', {username: this.props.userData.steemitUsername})}>Your Page</Button>
        </div>
      </div>
    );
  }
}
