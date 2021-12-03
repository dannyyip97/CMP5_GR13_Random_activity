import * as cbor from 'cbor';
import { outbox } from 'file-transfer';
import { settingsStorage } from 'settings';

/* Settings */
function sendSettings() {
  const settings = {
    letter: settingsStorage.getItem('letter')
      ? JSON.parse(settingsStorage.getItem('letter')).values[0].value
      : '',
    // add other settings here
  };

  outbox
    .enqueue('settings.cbor', cbor.encode(settings))
    .then(() => console.log('settings sent'))
    .catch((error) => console.log(`send error: ${error}`));
}

settingsStorage.addEventListener('change', sendSettings);
if (companion.permissions.granted("access_location")) {
   weather
     .getWeatherData()
     .then((data) => {
       if (data.locations.length > 0) {
         const temp = Math.floor(data.locations[0].currentWeather.temperature);
         const cond = data.locations[0].currentWeather.weatherCondition;
         const loc = data.locations[0].name;
         const unit = data.temperatureUnit;
         console.log(`It's ${temp}\u00B0 ${unit} and ${cond} in ${loc}`);
       }
     })
     .catch((ex) => {
       console.error(ex);
     });
}
