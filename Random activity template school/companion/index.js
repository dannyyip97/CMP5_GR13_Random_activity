import * as cbor from 'cbor';
import { outbox } from 'file-transfer';
import { settingsStorage } from 'settings';
import { geolocation } from "geolocation";
import {apiKey} from './keys';

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

//mapbox

geolocation.getCurrentPosition(locationSuccess, locationError, {
  timeout: 60 * 1000
});

async function locationSuccess(position) {
  console.log(position.coords);
  const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=${apikey}`;


  const response = await fetch(url);
  const json = await response.json();

let location ='';
json.features.forEach((feature) => {
  if (
    !location &&
    ( feature.place_type[0] === 'locality' ||
      feature.place_type[0] === 'place')
  ) {
    location = feature.text;
  }
});

outbox
  .enqueue('location.cbor', cbor.encode({ location }))
  .then(() => console.log(location + 'location sent'))
  .catch((error) => console.log(`send error: ${error}`));
}


function locationError(error) {
  console.log("Error: " + error.code, "Message: " + error.message);
}

/*settingsStorage.addEventListener('change', sendSettings);
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
}*/
