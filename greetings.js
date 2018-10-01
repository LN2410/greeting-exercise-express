module.exports = function Greetings(pool) {
  //let greetedNames = stored || {};

  var greet = async function (language, name) {
    if (language !== undefined && name || name !== '') {
      var checkUsers = await pool.query('select * from users where greeted_names=$1', [name]);
      if (checkUsers.rowCount === 0) {
        await pool.query('insert into users(greeted_names, greeted_counter) values ($1, $2)', [name, 1]);
      } else{
        await pool.query('update users set greeted_counter = greeted_counter + 1  where greeted_names = $1', [name]);
      }
    }

    if (language === 'English') {
      return 'Good day, ' + name;
    }
    if (language === 'Afrikaans') {
      return 'Goeie dag, ' + name;
    }
    if (language === 'isiXhosa') {
      return 'Molo, ' + name;
    }
    else {
      return '';
    }
  }

  var getGreeted = async function () {
    let countGreeted = await pool.query('select * from users');
    return countGreeted.rowCount;
  };
  let returnGreeted = async function () {
    let allGreeted = await pool.query('select * from users');
    return allGreeted.rows;
  };
  let getCounter = async function (name) {
    let namesCounted = await pool.query('select * from users where greeted_names = $1', [name]);
    return namesCounted.rows;
  };
  let clearData = async function () {
    await pool.query('delete from users');
  }

  return {
    greet,
    getGreeted,
    returnGreeted,
    getCounter,
    clearData
  }
}
