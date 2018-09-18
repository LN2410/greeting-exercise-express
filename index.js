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

app.get('/', async (req, res) => {
  try {
    res.render('greeting', {
      count: await greetPeople.getGreeted()
    });
  } catch (error) {
    next(error.stack);
  }
});

app.post('/greet', async (req, res) => {
  try{
    let name = req.body.name;
    let language = req.body.language;

    let greetName =await greetPeople.greet(language, name);
    let count = await greetPeople.getCounter();

    res.render('greeting', {
      greetName,
      count
    });
  }
  catch(err){
    res.send(err.stack)
  }
});

app.post('/greet', async (req, res, next) => {
  try {
      let names = req.body.name;
      let languages = req.body.language;
      if (!names || names === '') {
          req.flash('error', 'Please enter a name in the text field!');
      } else
      if (!language) {
          req.flash('error', 'Please select a language!');
          return res.redirect('/');
      }

      let show = await greetPeople.getGreeted(languages, names);
      let counts = await greetPeople.getGreeted();
      res.render('greeting', {
          show,
          counts
      });
  }catch (error) {
      next(error.stack);
  }
});

app.get('/greeted/', async (req, res, next) => {
  try {
      res.render('greeted', {
        greeted_names: await greetPeople.returnGreeted()
      });
  } catch (error) {
      next(error.stack);
  }
});

app.post('/greeted', function (req, res) {
  let greetName = req.body.greeted_names;
  res.render('greeted');
});

// app.get('/greeting', async (req, res, next) => {
//   try {
//       await greetPeople.clearData()
//       res.redirect('/');
//   } catch (error) {
//       next(error.stack);
//   }
// });

const PORT = process.env.PORT || 3015;

app.listen(PORT, function() {
  console.log("app started at port:", PORT)
});
