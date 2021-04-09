const express = require("express");
const server = express();

server.use(express.static('public'));

server.get('/hello', (req, res, next) => {
  res.send(`
  <html>
  <head></head>
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

const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.static('public'));

const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.post('/job-search', (req, res) => {
   res.send({
     searchData: req.body,
     status: "PENDING",
   })
 });

server.listen(3000, () => {
  console.log('Server is up...');
});

