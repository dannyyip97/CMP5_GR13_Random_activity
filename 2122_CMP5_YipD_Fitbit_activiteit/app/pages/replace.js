import document from 'document';
import { switchPage } from '../navigation';
import { setStateCallback, removeStateCallback } from '../state';
let $button = null;

function doSomething() {
  console.log('hallo replace');
}

function draw() {}

export function destroy() {
  console.log('destroy replace page');
  $button = null;

  removeStateCallback('replace');
  removeStateCallback('index', draw);
}

export function init() {
  console.log('init replace page');

  $button = document.getElementById('back-button');
  $button.onclick = () => {
    destroy();
    switchPage('index');
  };

  setStateCallback('replace', draw);
  doSomething();
  draw();
}
