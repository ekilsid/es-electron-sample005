import React from 'react';
import ReactDOM from 'react-dom';

import Home from './components/Home.jsx';

import { ipcRenderer } from 'electron'

ReactDOM.render(<Home />, document.getElementById('root'));

let fromElement = document.getElementsByClassName('card');
let toElementFav = document.getElementById('favorites');
let toElementChk = document.getElementById('checked');

fromElement = Array.prototype.slice.call(fromElement);
fromElement.forEach(element => {
    element.ondragstart = function(e){
        console.log('ondragstart');
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", element.children[0].getAttribute('title'));
    };
});


toElementFav.ondragenter = function (e) {  
  e.preventDefault();
  console.log('ondragenter1');
  ipcRenderer.send('dragging', 'favorites');
  return false;
};

toElementFav.ondragleave = function (e) {  
  e.preventDefault();
  console.log('ondragleave1');
  ipcRenderer.send('leaving', '');
  return false;
};


toElementFav.ondragover = function () {  
  //console.log('ondragover1');
  return false;
};

toElementFav.ondrop = function (e) {
  e.preventDefault();
  console.log('ondrop1');
  ipcRenderer.send('drop-file1', e.dataTransfer.getData("text/plain"))
  return false;
};

toElementChk.ondragenter = function (e) {  
  console.log('ondragenter2');
  ipcRenderer.send('dragging', 'checked');
  return false;
};

toElementChk.ondragleave = function (e) {  
  e.preventDefault();
  console.log('ondragleave2');
  ipcRenderer.send('leaving', '');
  return false;
};


toElementChk.ondragover = function () {  
  //console.log('ondragover2');
  return false;
};

toElementChk.ondrop = function (e) {
  e.preventDefault();
  console.log('ondrop2');
  ipcRenderer.send('drop-file2', e.dataTransfer.getData("text/plain"))
  return false;
};

