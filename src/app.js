import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import express from 'express'
import hbs from 'hbs'

import geocode from './utils/geocode.js'
import forecast from './utils/forecast.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const port = process.env.PORT || 3000

// Defines path for express config
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

// Setup handlebars and views locations
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', { title: 'Weather App' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

app.get('/help', (req, res) => {
    res.render('help', { title: 'Help', helpText: 'This is a helpful text.' })
})

app.get('/weather', (req, res) => {
    if (!req.query.city) {
        return res.send({ 'error': "City name must be provided." });
    }
    const query = decodeURIComponent(req.query.city)
    geocode(query, (error, { name, lat = latitude, long = longitude } = {}) => {
        if (error) return res.send({ query, error })
        forecast(lat, long, (error, { tmp = temperature, ws = windspeed } = {}) => {
            if (error) return res.send({ query, error })
            res.send({ query, 'result': { name, tmp, ws } });
        })
    })

})

app.get('*', (req, res) => {
    res.render('404', { title: 'Not Found' })
})

app.listen(port, () => {
    console.log(`We are flying on port ${port}`);
})