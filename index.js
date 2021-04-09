const express = require("express");
const app = express();

app.listen(3000, () => {
   console.log(`App 🦵🏿 on 4`)
});

app.get('/', (req, res) => {
   console.log('My Request Object', req);
   console.log('My Response Object', res);
   res.send("Hello World, again.");
})

console.log("I'm almost done, time to job search")



