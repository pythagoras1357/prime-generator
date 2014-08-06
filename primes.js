  self.addEventListener('message', function(e) {
    var data = e.data;
    var shouldRun = true;

    switch (data.cmd) {
      case 'stop':
        postMessage('Worker stopped the prime calculation' +
          data.msg);
        shouldRun = false;
        self.close(); // Terminates the worker.
        break;
      case 'start':
        var numbers = sieve(data.upto);
        postMessage(numbers);
        break;
      default:
        postMessage('Unknown cmd: ' + data.msg);
    };
  }, false);
  // sieve of eratosthenes
  function sieve(max) {
    var D = [],
      primes = "";
    for (var q = 2; q < max; q++) {
      if (D[q]) {
        for (var i = 0; i < D[q].length; i++) {
          var p = D[q][i];
          if (D[p + q]) D[p + q].push(p);
          else D[p + q] = [p];
        }
        delete D[q];
      } else {
        primes += (q + " ");
        if (q * q < max) D[q * q] = [q];
      }
    }

    var result = primes//"{primes_up_to_" + max + ":" + primes + "}"
    return result;
  }