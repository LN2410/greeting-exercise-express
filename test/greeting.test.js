let assert = require("assert");
let Greetings = require('../greetings');
const pg = require("pg");
const Pool = pg.Pool;

// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/my_greetings';

const pool = new Pool({
  connectionString,
});

describe('The Greeting Exercise Function', function () {

  beforeEach(async function () {
    await pool.query("delete from users;");
  });
  let theGreet = Greetings(pool);

  it('should greet the name entered in English when the greetbtn is clicked', async function () {

    let result = await theGreet.greet('English', "Lihle")
    console.log(result);
    assert.equal(result, 'Good day, Lihle')
  });

  it('should greet the name entered in Afrikaans when the greetbtn is clicked', async function () {

    let result = await theGreet.greet('Afrikaans', "Siyasanga")
    console.log(result);
    assert.equal(result, 'Goeie dag, Siyasanga')
  });

  it('should greet the name entered in isiXhosa when the greetbtn is clicked', async function () {

    let result = await theGreet.greet('isiXhosa', "Yonela")
    console.log(result);

    assert.equal(result, 'Molo, Yonela')
  });

  it('should be able to count names greeted in isiXhosa', async function () {

    await theGreet.greet('isiXhosa', "Yonela");
    await theGreet.greet('isiXhosa', "Sanele");
    await theGreet.greet('isiXhosa', "Ntando");

    assert.equal(await theGreet.getGreeted(), 3)
  });

  it('should only count the same name entered once', async function(){

    await theGreet.greet('Afrikaans', "Yonela");
    await theGreet.greet('English', "Yonela");
    await theGreet.greet('isiXhosa', "Yonela");

    assert.equal(await theGreet.getGreeted(), 1);
  });

  it('should not greet when there is no name entered', function(){

    theGreet.greet('Afrikaans',"")

    assert.equal(await theGreet.greet());
  });

  after(function () {
    pool.end();
  });
});