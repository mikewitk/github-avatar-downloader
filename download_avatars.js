var secrets = require('./secrets')
var request = require('request');
var fs = require('fs');
var repoOwner = process.argv[2];
var repoName = process.argv[3];

 if (process.argv.length < 4){
    throw "Missing Arguments. Please input repository Owner and Name";
  }

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

  for (var i = 0; i < result.length; i++){
    var url = result[i]['avatar_url']
    var filePath = "avatars/" + result[i]['login'] + ".jpg";
    downloadImageByURL(url, filePath);
  }
});