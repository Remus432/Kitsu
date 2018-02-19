var express = require('express');
var mustacheExpress = require('mustache-express');
var path = require('path');
var port = process.env.PORT || 3000

var app = express();

// Middleware
app.engine('html', mustacheExpress());
app.set('view engine', 'mustache');
app.use('/public', express.static('public'));

// Routes
app.get('/', function(req, res) {
  res.render('index.html');
});

app.get("/animes.html", function(req, res) {
    res.render("animes.html");
})

app.get("/anime.html", function(req, res) {
    res.render("anime.html");
})

app.listen(port, function() {
  console.log('Running on port 1337');
});
