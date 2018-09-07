module.exports = function Greetings(stored) {
  let greetedNames = stored || {};

  async function greet(language, name) {
    if (language !== undefined && name || name !== '') {

    }
    var checkUsers = await pool.query('select * from my_greetings where greeted_names=$1', [name]);;

    if (language === 'English') {
      return 'Good day, ' + name;
    }
    if (language === 'Afrikaans') {
      return 'Goeie dag, ' + name;
    }
    if (language === 'isiXhosa') {
      return 'Molo, ' + name;
    }
  }

  function greetCounter() {
    let storedNames = greetedNames;
    return Object.keys(greetedNames).length;
  }

  function greetnamCounter() {
    return greetedNames;
  }

  function reset(language, name){
  }

  return {
    greet,
    greetCounter,
    greetnamCounter,
  }
}
