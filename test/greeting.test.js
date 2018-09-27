let assert = require("assert");
let Greetings = require('../greetings');
const pg = require("pg");
const Pool = pg.Pool;

// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/my_greetings';

const pool = new Pool({
    connectionString,
  });

describe('The Greeting Exercise Function', function(){
  
  beforeEach(async function(){
    await pool.query("delete from users;");
    });

    it('should greet the name entered in English when the greetbtn is clicked', function(){
    let engGreet = Greetings(pool);

    engGreet.greet("Lihle", 'english')

    assert.equal(engGreet.getGreeted(),'Good day, Lihle')
    console.log(engGreet);
    });

  //   it('should greet the name entered in Afrikaans when the greetbtn is clicked', function(){
  //   var afriGreet = GreetPeople();

  //   afriGreet.greetFunc("Siyasanga", 'afrikaans')

  //   assert.equal(afriGreet.returnGreet(),'Goeie dag, Siyasanga')
  //   });

  //   it('should greet the name entered in isiXhosa when the greetbtn is clicked', function(){
  //   var xhosaGreet = GreetPeople();

  //   xhosaGreet.greetFunc("Schtoo", 'isiXhosa')

  //   assert.equal(xhosaGreet.returnGreet(), 'Molo, Schtoo')
  // });

  // it('should be able to count names greeted in English', function(){
  //   var greetAll = GreetPeople();

  //   greetAll.greetFunc("Yonela", 'isiXhosa');
  //   greetAll.greetFunc("Sanele", 'isiXhosa');
  //   greetAll.greetFunc("Ntando", 'isiXhosa');
  //   greetAll.greetFunc("Pholisa", 'isiXhosa');
  //   greetAll.greetFunc("Siyasanga", 'isiXhosa');

  //   assert.equal(greetAll.greetCounter(), 5)
  // });

  // it('should only count the same name entered once', function(){
  //   var everyName = GreetPeople();

  //   everyName.greetFunc("Yonela", 'afrikaans')
  //   everyName.greetFunc("Yonela", 'english')
  //   everyName.greetFunc("Yonela", 'isiXhosa')

  //   assert.equal(everyName.greetCounter(), 1);
  // });

  // it('should not greet when there is no name entered', function(){
  //   var noName = GreetPeople();

  //   noName.greetFunc("", 'afrikaans')

  //   assert.equal(noName.greetFunc());
  // });

  // it('should not greet when there is no language selected', function(){
  //   var noLang = GreetPeople();

  //   noLang.greetFunc("Lihle", '')

  //   assert.equal(noLang.greetFunc());
  // });
  after(function() {
    pool.end();
  });
});