const request = require('request');
const http = require("http")
let data ={}

require('dotenv').config();

let city = "istanbul";

const form = "<form action='/' method='post'><input name='city' type='text'/> <button type='submit'>Submit</button></form>"

const myServer = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" })
  res.write(form)
  let body = "";
  req.on('data', function (chunk) {
    body += chunk;
    city = body
    const url = `http://api.weatherstack.com/current?access_key=${process.env.apiKey}&query=${city}`;
    request(url, function (err, response, body) {
      if (err) {
        console.log('error:', error);
      } else {
        console.log('body:', JSON.parse(body));
        data = JSON.parse(body)
        console.log('body:', data);
        console.log(`Today ${data.current.temperature} degress in ${data.location.name}`)
        res.end(`Today ${data.current.temperature} degress in ${data.location.name}!`)
      }      
    });
  })
})
myServer.listen(3000)
