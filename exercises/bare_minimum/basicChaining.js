/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var PConstructor = require('./promiseConstructor');
var promisification = require('./promisification');
var fsPromisified = Promise.promisifyAll(require('fs'));

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // pluckFirstLineFromFileAsync (readFilePath)
  return PConstructor.pluckFirstLineFromFileAsync(readFilePath)
    .then((user) => promisification.getGitHubProfileAsync(user))
    .then((profile) => fsPromisified.writeFileAsync(writeFilePath, JSON.stringify(profile)))
    .catch((err) => console.log(err));
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
