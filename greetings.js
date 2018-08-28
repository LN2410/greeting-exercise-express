module.exports = function Greetings(stored) {
  let greetedNames = stored || {};
  let name = '';
  let language = '';

  function greet(language, name) {
    if (greetedNames[name] === undefined) {
      greetedNames[name] = 0;
      // localStorage.setItem('greetedNames',JSON.stringify(greetedNames));
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
  }

  function greetCounter() {
    let storedNames = greetedNames;
     return Object.keys(storedNames).length;
    // return storedNames;
  }

  function greetnamCounter() {
    return greetedNames;
  }

  return {
    greet,
    greetCounter,
    greetnamCounter,
  }
}
