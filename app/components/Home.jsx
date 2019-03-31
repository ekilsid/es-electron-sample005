import React from 'react';

import FsAccess from '../utils/FsAccess';
import GridImage from './GridImage';

import { remote } from 'electron';
const dialog = remote.dialog;
const app = remote.app;
const { ipcRenderer } = window.require('electron');

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log('[Top#constructor]');

    this.state = {
      //path: app.getPath('home'),
      path: '/Users/takano/Dev/PicTest',
      photos: [],
      selected: [],
      list1: [],
      list2: []
    };

    this.handleOnCheckFile = this.handleOnCheckFile.bind(this);

    ipcRenderer.on('reply1', (event, arg) => {
      if (this.state.list1.indexOf(arg) == -1) {
        this.setState({
          list1: this.state.list1.concat([arg])
        });
      }
    });

    ipcRenderer.on('reply2', (event, arg) => {
      if (this.state.list2.indexOf(arg) == -1) {
        this.setState({
          list2: this.state.list2.concat([arg])
        });
      }
    });
  }

  componentDidMount() {
    console.log('[Home#componentDidMount]');

    this.setState({
      photos: FsAccess.searchByPath(this.state.path)
    });
  }

  handleOpen() {
    const win = remote.getCurrentWindow();
    const options = {
      properties: ['openDirectory'],
      title: 'Choose folder',
      defaultPath: app.getPath('home')
    };

    const decided = dialog.showOpenDialog(win, options);
    if (decided) {
      //console.dir(decided);

      this.setState({
        path: decided[0],
        photos: FsAccess.searchByPath(decided[0])
      });
    }
  }

  handleOnCheckFile(name) {
    console.log(name);
    let nowSelected = this.state.selected;

    if (nowSelected.indexOf(name) == -1) {
      nowSelected.push(name);
    } else {
      nowSelected.splice(nowSelected.indexOf(name), 1);
    }

    this.setState({
      selected: nowSelected
    });
  }

  render() {
    console.log('[Home#render]');
    console.dir(this.state);

    const GalleryContents = this.state.photos.map((file, index) => (
      <GridImage
        key={'img' + index}
        file={file}
        selected={this.state.selected.indexOf(file.name) > -1}
        onCheckFile={name => this.handleOnCheckFile(name)}
      />
    ));

    const List1 = this.state.list1.map((item, index) => (
      <span key={`f-${index}`} className="nav-group-item">
        {item}
      </span>
    ));

    const List2 = this.state.list2.map((item, index) => (
      <span key={`c-${index}`} className="nav-group-item">
        {item}
      </span>
    ));

    return (
      <div className="window">
        <header className="toolbar toolbar-header">
          <h1 className="title">Header</h1>
          <div
            className="btn-group pull-left"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <button
              className="btn btn-default"
              style={{ width: '65px', float: 'left' }}
              onClick={() => this.handleOpen()}
            >
              <span className="icon icon-folder" /> Open
            </button>
            <span style={{ marginLeft: '10px' }}>{this.state.path}</span>
          </div>
        </header>
        <div className="window-content">
          <div className="pane-group">
            <div className="pane" style={{ minWidth: '400px' }}>
              <ul className="gallery">{GalleryContents}</ul>
            </div>
            <div className="pane-sm sidebar">
              <h5>Drag and drop in here.</h5>
              <nav id="favorites" className="nav-group area-drop">
                <h5 className="nav-group-title">Favorites</h5>
                {List1}
              </nav>
              <nav id="checked" className="nav-group area-drop">
                <h5 className="nav-group-title">Checked</h5>
                {List2}
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
