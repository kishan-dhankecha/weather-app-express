import fetch from 'node-fetch';

const geocode = async (address, callback) => {
    const url = "https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(address)

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
        callback(data.reason, undefined)
    } else if (!data.results) {
        callback('No results found for your input.', undefined)
    } else {
        const city = data.results[0];
        callback(undefined, { name: `${city.name}, ${city.country}`, latitude: city.latitude, longitude: city.longitude })
    }
}

export default geocode