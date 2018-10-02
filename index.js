let express = require('express');
let Greetings = require('./greetings');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

const flash = require('express-flash');
const session = require('express-session');


app.use(session({
    secret: "add a secret string here",
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
    req.flash('info', ' ');
    res.render('greeting', {
      count: await greetPeople.getGreeted()
    });
  } catch (err) {
    console.error("Does not open home",err);
  };
});

// app.get('/', async(req, res) => {
//   res.redirect('/');
// });


app.post('/greet', async (req, res) => {
  try {
      let names = req.body.name;
      let languages = req.body.language;
      if(names === '') {
          req.flash('info', 'Please enter a name in the text field!');
          res.redirect('/');
      }
      else if(languages === undefined){
        req.flash('info', 'Please select a language!');
        res.redirect('/');
      }
      else{
        let show = await greetPeople.greet(languages, names);
        let counts = await greetPeople.getGreeted();
        res.render('greeting', {
            greetName:show,
            count:counts
        });
      }    
  }catch (err) {
    console.error("Does not return greeted and an error message",err);
  }
});


app.get('/greeted', async (req, res) => {
  try{
    let greetName = await greetPeople.returnGreeted();
 
    res.render('greeted', {users: greetName});
  } catch (err) {
    console.error("Does not return greeted names",err);
  }
});
app.get('/counter/:name', async (req, res, next) => {
  try{
    let names = req.params.name;
    let greeted_names = await greetPeople.getCounter(names);
    let greeted_counter = greeted_names[0].greeted_counter;
    console.log(greeted_counter);

    res.render('times', {names, greeted_counter});
  } catch (err) {
    console.error("how many times greeted",err);
    next(err)
  }
});

app.get('/deleteAll', async (req, res) => {
  try {
      await greetPeople.clearData();
      res.redirect('/');
  } catch(err) {
    console.error("Dosnt clear data base",err);
  }
});

const PORT = process.env.PORT || 3066;

app.listen(PORT, function() {
  console.log("app started at port:", PORT)
});
