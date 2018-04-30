var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'vOA6nhvPfBftL0TRFOtHHdQHw',
  consumer_secret: 'aPC9EASYTewW0C3WERJZF6O5A2YP1x1dJJlBFwJ6z2xhhQXt5e',
  access_token_key: '903692368318222336-jAXYNHptJMha5eBocEk3HZBFHywYVFp',
  access_token_secret: 'oXIqLfyl8fuIjedSz86Q8iK3cfgGpUPEIOCAcV6O1UNO4'
});




var params = {screen_name: 'username we want to see'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});



client.get('search/tweets', {q: 'cov2021'},
function(error, tweets, response) {
   console.log(tweets);
});


client.post('statuses/update', {status: 'this is the tweet we will send'}, function(error, tweet, response) {
  if (!error) {
    console.log(tweet);
  }
});