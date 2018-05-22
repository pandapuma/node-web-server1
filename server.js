const express = require('express');
const hbs = require('hbs'); //hander bar
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
// set key value pair
app.set('view engine', 'hbs');
// middlewire is called upon the order you call use().

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('streamIt', (text) => {
  return text.toUpperCase();
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: "Welcome to my web page"
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad request'
  })
});


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
