import document from 'document';
import { switchPage } from '../navigation';
import zeroPad from '../utils/zero-pad';
import clock from 'clock';
import { preferences } from 'user-settings';
//import { init as getStateItem } from '../state';

/*const $antwoorden = ["Ja", "Neen", "Ja zeker", "Alles kan nog","Jammer maar helaas", "Euhm wil je het echt weten", "Wat een grap"];
const $activiteit = document.getElementById("#text");
const $knop = document.querySelector(".Submit");*/
//const $weather = document.getElementById('weather');

let $buttonDetail = null;
let $buttonReplace = null;
let time = '';
let $time = null;

function doSomething() {
  console.log('hallo index');
}

export function destroy() {
  console.log('destroy index page');
  $buttonDetail = null;
  $buttonReplace = null;
  $time = null;
}

export function init() {
  console.log('init index page');
  $buttonDetail = document.getElementById('detail-button');
  $buttonReplace = document.getElementById('replace-button');
  $time = document.getElementById('time');

  $buttonDetail.onclick = () => {
    switchPage('detail', true);
  };
  $buttonReplace.onclick = () => {
    switchPage('replace');
  };

  doSomething();

  // use function above on clock tick
  clock.ontick = (evt) => updateTime(evt.date);
  // use the function on start as well
  updateTime(new Date());
}

function draw() {
  if ($time) {
    $time.text = time;
  }
}

function updateTime(datetime) {
  const minute = datetime.getMinutes();
  const hour = datetime.getHours();
  let hours = hour;
  if (preferences.clockDisplay === '12h') {
    // 12h format
    hours = zeroPad(hours % 12 || 12);
  } else {
    // 24h format
    hours = zeroPad(hours);
  }
  const mins = zeroPad(minute);
  time = `${hours}:${mins}`;

  // draw every second to show time changes
  draw();
}

// draw when code loaded

//activiteiten
/* $activiteit.appendChild($antwoorden)
function willekeurigGetal(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function answer(){
  if ($knop.onclick = () => {
    document.getElementById("activiteit").innerHTML = //$antwoorden[willekeurigGetal(0,6)];
  }
}
$knop.addEventListener("click",answer);*/
// draw

/*function draw() {
  $weather.text = getStateItem('weather');
}
draw();*/