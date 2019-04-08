var secrets = require('./secrets')
var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    // console.log("Response received");
    // console.log("  error:", err);
    // console.log("  response.statusCode:", res.statusCode);
    // console.log("  response.statusMessage:", JSON.parse(body));
    var data = JSON.parse(body);
    var avatarObject = [];

    for (var i = 0; i < data.length; i++){
      avatarObject.push(data[i]['avatar_url']);
    }
    cb(err, avatarObject);
    // console.log(data[0]['avatar_url']);
      bam(err, body) {
        console.log(body);

      };
  });
}


// function cb (err, body) {
//   console.log('Test: ', data[0]['avatar_url']) ;
// }
getRepoContributors("jquery", "jquery", bam);


// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });