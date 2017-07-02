import React, { Component } from 'react';
import { Tooltip, Progress, Button } from 'reactstrap';
import { MarkdownEditor } from 'react-markdown-editor';
import { InputGroup, Input } from 'reactstrap';

export default class ProfileCard extends Component {
  render() {

    return (
      <div>
        <div className="mb-3">
          <InputGroup>
            <Input placeholder="Title"/>
          </InputGroup>
        </div>
        <MarkdownEditor initialContent="Test" iconsSet="font-awesome"/>
        <Button className="gaamit-button mt-3">Publish</Button>
      </div>
    );
  }
}
