import { init as initState } from './state';
import { init as initCommands } from './commands';
import { init as initNavigation, switchPage } from './navigation';
import router from './router';
//import clock from 'clock';
//import { preferences } from 'user-settings';

//import zeroPad from './utils/zero-pad';
//let time = '';
//const $time = document.getElementById('time');

initState();
initCommands();
initNavigation(router);
switchPage('index');

/*function draw() {
  $time.text = time;
}

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

// draw when code loaded
draw();*/
