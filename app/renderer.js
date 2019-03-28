import React from 'react';
import ReactDOM from 'react-dom';

import Home from './components/Home.jsx';

import { ipcRenderer } from 'electron'

ReactDOM.render(<Home />, document.getElementById('root'));

var base = document.getElementsByClassName('card');
var holder = document.getElementById('favorites');

base = Array.prototype.slice.call(base);
base.forEach(element => {
    element.ondragstart = function(e){
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", element.children[0].getAttribute('title'));
    };
});

/** hoverエリアにドラッグされた場合 */
holder.ondragover = function () {  
  return false;
};

/** hoverエリアから外れた or ドラッグが終了した */
holder.ondragleave = holder.ondragend = function (e) {

    // console.log('holder.ondragleave = holder.ondragend');
    // console.dir(e);
    // e.dataTransfer.setData('text', this.id);

  
  return false;
};
/** hoverエリアにドロップされた */
holder.ondrop = function (e) {
  e.preventDefault(); // イベントの伝搬を止めて、アプリケーションのHTMLとファイルが差し替わらないようにする

  console.log('holder.ondrop');
  console.log(e.dataTransfer.getData("text/plain"));
  console.dir(e);

  ipcRenderer.send('drop-file', e.dataTransfer.getData("text/plain"))

  return false;
};
