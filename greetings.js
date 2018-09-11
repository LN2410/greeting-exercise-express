module.exports = function Greetings(pool) {
  //let greetedNames = stored || {};

  var greet = async function(language, name) {
    if (language !== undefined && name || name !== '') {
      var checkUsers = await pool.query('select * from users where greeted_names=$1', [name]);;
      if (checkUsers.rowCount === 0) {

        await pool.query('insert into users(greeted_names, greeted_counter) values ($1, $2)', [name, 0]);
      }
      await pool.query('update users set greeted_counter = greeted_counter + 1  where greeted_names = $1', [name]);

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
    let allGreeted = await pool.query('select greeted_names from users');
    return allGreeted.rows;
  };
  let getCounter = async function (users) {
    let namesCounted = await pool.query('select greeted_names, greeted_counter from users where greeted_names = $1', [users]);
    return namesCounted.rows[0];
  };
  let clearData = async function () {
    let clearSQL = await pool.query('delete from users');
    return clearSQL.rows[0];
  }

  return {
    getGreeted,
    returnGreeted,
    getCounter,
    clearData
  }
}
