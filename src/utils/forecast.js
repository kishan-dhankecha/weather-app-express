import fetch from 'node-fetch';

const forecast = async (latitude, longitude, callback) => {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=" + encodeURIComponent(latitude) + "&longitude=" + encodeURIComponent(longitude) + "&current_weather=true"

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
        callback('Unable to find given location.', undefined)
    } else {
        callback(undefined, data.current_weather)
    }
}

export default forecast