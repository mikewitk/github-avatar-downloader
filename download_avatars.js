var secrets = require('./secrets')
var request = require('request');
var fs = require('fs');
var repoOwner = process.argv[2];
var repoName = process.argv[3];

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
    var data = JSON.parse(body);
    var avatarObject = [];

    for (var i = 0; i < data.length; i++){
      // avatarObject.push(data[i]['avatar_url']);
      var url = data[i]['avatar_url']
      var filePath = "avatars/" + data[i]['login'] + ".jpg";
      downloadImageByURL(url, filePath);
    }
    cb(err, data);
  });
}


function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err){
      throw err;
    })
    .pipe(fs.createWriteStream(filePath)
    .on('finish', function(response){
      console.log("Download finished")
    }))
}


getRepoContributors(repoOwner, repoName, function(err, result) {
});