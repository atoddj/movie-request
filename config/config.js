var config = {
  //tori is the name of my slackbot - configure to your needs
  tori: require('./tori.json'),
  mongodb: require('./mongodb.json'),
  tmdb: require('./tmdb.json'),
  setupSlackMessageFormat: (data) => {
    config.tori.newRequest = {
      "attachments": [
        {
          "title": "New request",
          "text": data.movie_name,
          "fields": [{"title": "IMDb link","value": data.imdb_url}]
        }
      ]
    };
  },
};
config.mongodb.uri = 'mongodb://' + config.mongodb.user + ':' + config.mongodb.pass + '@ds147118.mlab.com:47118/movie-requests';
module.exports = config;
