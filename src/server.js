//require('dotenv').config()
const express = require('express');
const app = express()
const mongoose = require('mongoose')
const http = require('http');
const htmlHandler = require(`./htmlResponses.js`);
const apiHandler = require(`./api-call.js`);
//creates and connects to the api
mongoose.connect('https://radiant-mesa-08758.herokuapp.com/exercises')
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Conntected to Database'))
console.log(mongoose.connection.readyState);

app.use(express.json());

const exerciseRouter = require('./routes/exercises')

app.use('/exercises', exerciseRouter)

app.listen(3000, () => console.log('Server Started'))

const port = process.env.PORT || process.env.NODE_PORT || 3001;
const onRequest = (request, response) => {
    //parses url and recieves paremeters if present
    const url = new URL(`localhost:3000${request.url}`)
    if(url.searchParams.has("username") && url.searchParams.has("exercise")){
        //uses these parameters to push to the api
        const username = url.searchParams.get('username');
        const exercise = url.searchParams.get('exercise');
        apiHandler.makePost(username, exercise);
    }
    htmlHandler.getIndex(request, response);

};
http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});
