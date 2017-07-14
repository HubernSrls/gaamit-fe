import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import './GaamitNavbar.css';
import logo from './gaamit_logo.svg';

export default class GaamitNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {

    let login =
      <NavItem>
        <NavLink onClick={() => this.props.changePage('login')}>Login</NavLink>
      </NavItem>

    let profile =
      <img className="rounded-circle img-circle-nav hidden-xs-down ml-3" src={this.props.userData ? this.props.userData.image : ''} alt="" onClick={() => this.props.changePage('blog')}/>

    let newPost =
      <Button outline id="gaamit-btn-post" color="primary" className="ml-3 pt-2 pb-2 hidden-xs-down" onClick={() => this.props.changePage('editor')}>New Post</Button>

    return (
      <div id="gaamit-navbar">
        <div className="container">
          <Navbar color="#fff" light toggleable>
            <NavbarToggler right onClick={this.toggle} />

            <NavbarBrand onClick={() => this.props.changePage('created')}>Gaamit</NavbarBrand>

            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink onClick={() => this.props.changePage('info')}>How it works</NavLink>
                </NavItem>

                {this.props.userData ? null : login}

                <div className="hidden-sm-up">
                  <NavItem>
                    <NavLink onClick={() => this.props.changePage('editor')}>Write a Post</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={() => this.props.changePage('blog')}>Profile</NavLink>
                  </NavItem>
                </div>
              </Nav>
            </Collapse>

            {/*<form className="form-inline my-2 my-lg-0">
              <input id="gaamit-search" className="form-control mr-sm-2" type="text" placeholder="Search"/>
              <div id="gaamit-btn-search" className="fa fa-search"/>
            </form>*/}

            {this.props.userData ? profile : null}

            {this.props.userData ? newPost : null}

          </Navbar>
        </div>
        <img src={logo} id="gaamit-navbar-logo" alt="logo"/>
      </div>
    );
  }
}
