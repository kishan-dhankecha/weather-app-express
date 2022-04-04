const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const forecastElement = document.querySelector('#forecastMsg')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    forecastElement.textContent = 'Loading...'

    fetch(`http://localhost:3000/weather?city=${search.value}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                forecastElement.textContent = data.error
            } else {
                const { name, temperature, windspeed } = data.result
                const forecast = `The weather in "${name}" is ${temperature}°C with the windspeed ${windspeed}km/h.`;
                forecastElement.textContent = forecast
            }
        })
    })
})