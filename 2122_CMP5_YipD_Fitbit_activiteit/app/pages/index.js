import document from 'document';
import { switchPage } from '../navigation';
import zeroPad from '../utils/zero-pad';
import clock from 'clock';
import { getStateItem } from '../state';
import { preferences } from 'user-settings';
import { gettext } from 'i18n';
import { data } from '../../companion/data.js';

clock.granularity = 'seconds';

//import { init as getStateItem } from '../state';

/*const $antwoorden = [
  'Ja',
  'Neen',
  'Ja zeker',
  'Alles kan nog',
  'Jammer maar helaas',
  'Euhm wil je het echt weten',
  'Wat een grap',
];*/

//const $weather = document.getElementById('weather');
let $buttonDetail = null;
let $buttonReplace = null;
let $acti = null;
let time = '';
let $time = null;
let $weather = null;
let $activiteit = null;

function doSomething() {
  console.log('hallo index');
  console.log(gettext('welcome'));
}

export function destroy() {
  console.log('destroy index page');
  $buttonDetail = null;
  $buttonReplace = null;
  $acti = null;
  $time = null;
  $weather = null;
  $activiteit = null;
}

export function init() {
  console.log('init index page');
  $buttonDetail = document.getElementById('detail-button');
  $buttonReplace = document.getElementById('replace-button');
  $acti = document.getElementById('acti');
  $time = document.getElementById('time');
  $weather = document.getElementById('weather');
  $activiteit = document.getElementById('activiteit');

  /*$activiteit = document.getElementById('activiteit');*/

  $buttonDetail.onclick = () => {
    switchPage('detail', true);
  };
  $buttonReplace.onclick = () => {
    switchPage('replace');
  };

  $acti.onclick = () => {
    $activiteit.text = data[willekeurigGetal(0, 20)].name;
  };

  doSomething();

  // use function above on clock tick
  clock.ontick = (evt) => updateTime(evt.date);
  // use the function on start as well
  updateTime(new Date());
}

function draw() {
  if ($time && $weather && $activiteit) {
    $weather.text = getStateItem('weatherTemp') + '°C';
    $time.text = time;
  }
}

//activiteiten

function willekeurigGetal(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

// draw
