import document from 'document';
import clock from 'clock';
import { preferences } from 'user-settings';
import { HeartRateSensor } from 'heart-rate';
import { today } from 'user-activity';
import { init as initState, getStateItem, setStateCallback } from './state';
import zeroPad from './utils/zero-pad';

// init state
initState();

// elements
const $letter = document.getElementById('letter');
const $location = document.getElementById('location');
const $time = document.getElementById('time');
const $hr = document.getElementById('hr');
const $steps = document.getElementById('steps');
const $calories = document.getElementById('calories');
const $dots = document.getElementById('dots');

//const $antwoorden = ["Ja", "Neen", "Ja zeker", "Alles kan nog","Jammer maar helaas", "Euhm wil je het echt weten", "Wat een grap"];
//const $activiteit = document.getElementById("activiteit");
//const $knop = document.querySelector(".Submit");

// define vars for later use;
let time = '';
let hr = '--';

//click event
$dots.onclick = () => {

}
//activiteiten
//$activiteit.appendChild($antwoorden);

//function willekeurigGetal(min, max) {
//  min = Math.ceil(min);
//  max = Math.floor(max);
//  return Math.floor(Math.random() * (max - min + 1)) + min;
//}

//function answer(){
//  if ($knop.onclick = () => {
//    document.getElementById("activiteit").innerHTML = //$antwoorden[willekeurigGetal(0,6)];
//  }
//}
//$knop.addEventListener("click",answer);

// get heart rate
if (HeartRateSensor) {
  const hrm = new HeartRateSensor({ frequency: 1 });
  hrm.addEventListener('reading', () => {
    hr = hrm.heartRate;
  });
  hrm.start();
}

// draw
function draw() {
  $time.text = time;
  $location.text = getStateItem('location');
  $letter.text = getStateItem('letter');
  $hr.text = hr;
  $steps.text = today.adjusted.steps;
  $calories.text = today.adjusted.calories;
}

// time
clock.granularity = 'seconds'; // seconds if you like to show seconds or update stats every second, minutes if you only need it minutely
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
// use function above on clock tick
clock.ontick = (evt) => updateTime(evt.date);
// use the function on start as well
updateTime(new Date());

// draw whenever a change in state happens
setStateCallback(draw);

// draw when code loaded
draw();
