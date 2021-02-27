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

app.get('/', function (request, response) {
    response.sendFile('dist/index.html')
})

app.post('/data', async function (request, response) {
    const content = request.body;
    console.log(content);
    const apiURL = `${baseURL}?key=${apiKey}&of=json&txt=${content.message}&lang=en`;
    
    const res = await fetch(apiURL);
    const result_json = await res.json();
    const subjectivity = result_json.subjectivity;
    const confidence = result_json.confidence;
    
    const agreement = result_json.agreement;
    const irony = result_json.irony;
    const score_tag = result_json.score_tag;
    response.send({subjectivity: subjectivity, confidence: confidence, agreement: agreement, irony: irony, score_tag: score_tag});
    console.log({subjectivity: subjectivity, confidence: confidence, agreement: agreement, irony: irony, score_tag: score_tag})
})

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
