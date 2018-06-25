var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
  console.log("request:", request.url);
  let url = request.url;
  response.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "Content-Type,Access-Token",
    "Access-Control-Expose-Headers": "*"
  });
  if (url.indexOf('/api/login') != -1) {
    response.end(JSON.stringify({
      code: '200',
      data: true
    }))
  } else if (url.indexOf('/api/logout') != -1) {
    response.end(JSON.stringify({
      code: '200',
      data: true
    }))
  }

}).listen(5007);
console.log("server running at port 5007...");