// express, dependencies
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

// Create an instance of app
const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'))

// global variables
const baseURL = "https://api.meaningcloud.com/sentiment-2.1";
const apiKey = process.env.API_KEY;

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.post('/data', async function (request, response) {
    const content = request.body
    console.log('data received from client', content)
    const apiURL =`${baseURL}?key=${apiKey}&of=json&txt=${content.message}&lang=en`;
    const result = await fetch(apiURL)
        .then(res => res.json())
        .then(function(data) {
            console.log(data);
            console.log(data.subjectivity);
            const sentiment = data.subjectivity;
            return sentiment;
        })    
    console.log(`sentiment: ${result}`)
    response.send({sentiment: result});
})

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
