// express, dependencies
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

// global variables
const baseURL = "https://api.meaningcloud.com/sentiment-2.1";
const apiKey = process.env.API_KEY;
console.log(`Your API key is ${apiKey}`);

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post("/data", async function (req, res) {

    console.log("server post request received")
    const content = req.body
    const apiURL =`${baseURL}?key=${apiKey}&of=json&txt=${content}&lang=en`;
    const result = await fetch(apiURL);
    console.log(result)
    try {
        const data = result.json();
        console.log(data)
        return data;
    }catch(error) {
        console.log('error', error);
    } 

})

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

const updateUI = async() => {
    const res=await fetch('/');
    try {
        const allData = await res.json();
        document.getElementById('results').innerHTML = data.message;
    } catch(error) {
        console.log('error', error)
    }
 };