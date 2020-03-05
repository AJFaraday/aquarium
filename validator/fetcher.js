const request = require('request');

class Fetcher {

  constructor(question_id, site) {
    // https://api.stackexchange.com/2.2/questions/18632/answers?site=codegolf.meta&filter=!.FjsvG2X2tViZPCgDuGvW88wrGptD
    this.url = 'https://api.stackexchange.com/2.2/questions/' + question_id +
      '/answers?site=' + site + '&filter=!.FjsvG2X2tViZPCgDuGvW88wrGptD';

    var finished = false;
    var fetcher = this;
    request(
      this.url,
      {json: true, gzip: true},
      function (err, res, body) {
        if (err) {
          throw err;
        }
        fetcher.data = body;
        finished = true;
      }
    );
  }

}
