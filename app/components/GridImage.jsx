import React from 'react';

const FontAwesome = require('react-fontawesome');
const childProcess = window.require('child_process');

class GridImage extends React.Component {
  constructor(props) {
    super(props);
    console.log('[GridImage#constructor]');
    console.dir(this.props);
  }

  onExec(file) {
    // console.log('onExec : ' + file);
    // console.dir(file);

    const fullPath = file.path + '/' + file.name;
    let command = 'ls';
    if (file.isPhoto) {
      command = 'open -a Preview ' + fullPath;
    } else {
      command = 'open ' + fullPath;
      //command = 'open -a `quicktime player` ' + fullPath;
    }

    childProcess.exec(command, (error, stdout, stderr) => {
      if (error != null) {
        console.log(error);
      } else {
        console.log(stdout + '/' + stderr);
      }
    });
  }

  render() {
    console.log('[GridImage#render]');
    console.dir(this.props);

    const thumbnail =  this.props.file.path + '/' + this.props.file.name;

    return (
      <li className={`card ${this.props.selected ? 'selected' : ''}`}>
        {this.props.file.isPhoto ? (
          <img
            className="card-image"
            src={thumbnail}
            title={this.props.file.name}
            onClick={() => this.onExec(this.props.file)}
          />
        ) : (
          <video
            className="card-image"
            src={thumbnail}
            title={this.props.file.name}
            onClick={() => this.onExec(this.props.file)}
          />
        )}
        <FontAwesome
          className={`card-action ${this.props.selected ? 'selected' : ''}`}
          name="check-circle"
          size="2x"
          onClick={() => this.props.onCheckFile(this.props.file.name)}
        />
      </li>
    );
  }
}

export default GridImage;
