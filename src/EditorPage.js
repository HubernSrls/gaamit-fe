import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { MarkdownEditor } from 'react-markdown-editor';
import { InputGroup, Input } from 'reactstrap';
import Api from './Api.js';
import loading from './loading.svg';

export default class ProfileCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      title: '',
      content: ''
    }
  }

  postContent = () => {
    let params = {
      title: this.state.title,
      content: this.state.content
    }

    Api.post(
      Api.methods.post,
      params,
      (responseJson) => {

        this.setState({
          loading: false,
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

  titleChange = (title) => {
    this.setState({title: title});
  }

  contentChange = (content) => {
    this.setState({content: content});
  }

  render() {

    return (
      <div>
        <div className="mb-3">
          <InputGroup>
            <Input placeholder="Title" onChange={this.titleChange}/>
          </InputGroup>
        </div>
        <MarkdownEditor initialContent="" iconsSet="font-awesome" onContentChange={this.contentChange}/>
        {this.state.loading ? <img className="gaamit-post-loading" src={loading} alt="loading" /> : <Button className="gaamit-button mt-3">Publish</Button>}
      </div>
    );
  }
}
