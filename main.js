var Worker = require('webworker-threads').Worker;
require('http').createServer(function(req, res) {

  var url = require('url');
  var urlParts = url.parse(req.url, true);
  var query = urlParts.query;
  var maxNum = 100;

  if (query.max) {
    maxNum = query.max;
  }

  var engine = new Worker('primes.js');
  engine.addEventListener("message", primeHandler, false);

  engine.postMessage({
    'cmd': 'start',
    'upto': maxNum
  });

  function primeHandler(event) {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(event.data);
  }

  function is_numeric(input) {
    return typeof(input) == 'number';
  }

}).listen(1337);