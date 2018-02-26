var config = {
  tori: require('./tori.json'),
  mongodb: require('./mongodb.json'),
  setupSlackMessageFormat: (data) => {
    config.tori.newRequest = {
      "attachments": [
        {
          "title": "New request",
          "text": 'title: ' + data.movie_name,
          "fields": [{"title": "IMDb link","value": data.imdb_url}]
        }
      ]
    };
  }
};
module.exports = config;
