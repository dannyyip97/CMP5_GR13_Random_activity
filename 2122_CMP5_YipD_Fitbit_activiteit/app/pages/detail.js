import document from 'document';
import { getLocationName } from '../commands';
import { switchPage } from '../navigation';
import {
  getStateItem,
  setStateCallback,
  removeStateCallback,
  setStateItem,
} from '../state';
import { getListData } from '../commands';

let myList = null;
let $button = null;
let $locationName = null;

function doSomething() {
  console.log('hallo detail');
}

function draw() {
  const list = getStateItem('listData');

  console.log(JSON.stringify(list));

  myList.delegate = {
    getTileInfo: (index) => {
      return {
        type: 'my-pool',
        value: list[index],
        index: index,
      };
    },
    configureTile: (tile, info) => {
      console.log(`Item: ${info.index}`);
      if (info.type == 'my-pool') {
        tile.getElementById('text').text = `${info.value.name}`;
        let touch = tile.getElementById('touch');
        touch.onclick = function () {
          setStateItem('detailId', info.value.id);
          switchPage('detail');
        };
      }
    },
  };

  // length must be set AFTER delegate
  myList.length = list.length;
  $locationName.text = getStateItem('location');
}

export function destroy() {
  console.log('destroy detail page');
  $locationName = null;
  $button = null;
  myList = null;
  removeStateCallback('replace');
  removeStateCallback('index', draw);
  removeStateCallback('detail');
}

export function init() {
  console.log('init detail page');

  $locationName = document.getElementById('location');
  $button = document.getElementById('back-button');
  $button.onclick = () => {
    destroy();
    document.history.back();
    switchPage('index');
  };
  myList = document.getElementById('myList');
  console.log('test');
  getListData();
  doSomething();
  getLocationName();
  setStateCallback('index', draw);
  setStateCallback('replace', draw);
  setStateCallback('detail', draw);
  draw();
}
