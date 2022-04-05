const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const forecastElement = document.querySelector('#forecastMsg')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    forecastElement.textContent = 'Loading...'

    fetch(`/weather?city=${search.value}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                forecastElement.textContent = data.error
            } else {
                const { name, tmp, ws } = data.result
                const forecast = `The weather in "${name}" is ${tmp}°C with the windspeed ${ws}km/h.`;
                forecastElement.textContent = forecast
            }
        })
    })
})