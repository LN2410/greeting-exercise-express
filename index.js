let express = require('express');
let Greetings = require('./greetings');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
// const express = require('express');
const app = express();

//let app = express();

let greetPeople = Greetings();

//handlebars
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(req, res) {
  let count = greetPeople.greetCounter();
  res.render('greeting', {
    count
  });
});

app.post('/greet', function(req, res) {
  let name = req.body.name;
  let language = req.body.language;
  let greetName = greetPeople.greet(language, name);
  let count = greetPeople.greetCounter();

  res.render('greeting', {
    greetName,
    count
  });
});

app.get('/greet/:name/:language', function(req, res) {
  let name = req.params.name;
  let language = req.params.language;
  let greetName = greetPeople.greet(language, name);
  let count = greetPeople.greetCounter();
  console.log(req.params);

  res.render('greeting', {
    greetName,
    count
  });
  // res.redirect('/');
});

const PORT = process.env.PORT || 3015;

app.listen(PORT, function() {
  console.log("app started at port:", PORT)
});
