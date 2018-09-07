let express = require('express');
let Greetings = require('./greetings');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

const flash = require('express-flash');
const session = require('express-session');


app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

const pg = require("pg");
const Pool = pg.Pool;

let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/my_greetings';

const pool = new Pool({
    connectionString,
  });

let greetPeople = Greetings(pool);

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

// app.get('/greet/:name/:language', function(req, res) {
//   let name = req.params.name;
//   let language = req.params.language;
//   let greetName = greetPeople.greet(language, name);
//   let count = greetPeople.greetCounter();
//
//   res.render('greeting', {
//     greetName,
//     count
//   });
//   // res.redirect('/');
// });

app.post('/greets', function (req, res) {
  let greetName = req.body.greeted_names;
  res.render('greets');
});

// app.post('/', function(req, res){
//   greetPeople.reset();
//   // let count = greetPeople.greetCounter();
//   // res.render('greeting', {
//   //   count
//   // });
// });

const PORT = process.env.PORT || 3015;

app.listen(PORT, function() {
  console.log("app started at port:", PORT)
});
