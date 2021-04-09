require('dotenv').config(); // this will read the .env file, if it exists

const { PORT = 3000, WEATHER_KEY } = process.env;

const express = require("express");
const server = express();
const axios = require('axios');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cowsay = require('cowsay');
const Quote = require('inspirational-quotes');

server.listen(PORT, () => {
  // stuff
});

// server.listen(3000, () => {
//    console.log('Server is up...');
//  });

server.use(express.static('public'));

server.get('/hello', (req, res, next) => {
  res.send(`
  <html>
   <head> </head>
   <body>
      <h3>Hello!</h3>
   </body>
  </html>
  `)
});

server.get('/', (req, res) => {
  // it's ok to omit next if you're not going to call it

  res.send({ message: 'boop' })
});

// sad static server
server.use(express.static('public'));

server.use(morgan('dev'));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.get('/cowspiration', (req, res) => {
   const {text, author} = Quote.getQuote()
   const cow = cowsay.say({
     text: `${text}\n\n- ${author}`,
     W: 80,
   });
   res.send({cow})
 });

 server.post('/job-search', async (req, res) => {
   try {
     const { description, fulltime } = req.body;
 
     const URL = `https://jobs.github.com/positions.json?${
       description ? `description=${ description }&` : ''
     }${
       fulltime ? 'fulltime=true' : ''
     }`;
 
     const { data } = await axios.get(URL);
 
     res.send({ results: data });
   } catch (error) {
     res.send({ error });
   }
 });

 server.get('/weather', async (req, res) => {
   // build URL from key AND query strings
   // make axios request
   // send back data, or send back error
   try {
      const { lat, lon } = req.query;
      const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${ lat }&lon=${ lon }&appid=${ WEATHER_KEY }`;
  
      const { data } = await axios.get(URL);
      res.send({ results: data });
    } catch (error) {
      res.send({ error });
    }
  });
  
