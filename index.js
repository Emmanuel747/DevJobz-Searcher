const express = require("express");
const app = express();

app.listen(3000, () => {
   console.log(`App 🦵🏿 on 4`)
});

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
 
 server.listen(3000, () => {
   console.log('I am listening...');
 });