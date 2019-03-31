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
        console.log(1);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", element.children[0].getAttribute('title'));
    };
});

toElementFav.ondragover = function () {  
  return false;
};

toElementFav.ondrop = function (e) {
  e.preventDefault();
  console.log(2);
  ipcRenderer.send('drop-file1', e.dataTransfer.getData("text/plain"))
  return false;
};

toElementChk.ondragover = function () {  
  return false;
};

toElementChk.ondrop = function (e) {
  e.preventDefault();
  console.log(3);
  ipcRenderer.send('drop-file2', e.dataTransfer.getData("text/plain"))
  return false;
};

