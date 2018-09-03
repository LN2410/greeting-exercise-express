module.exports = function Greetings(stored) {
  let greetedNames = stored || {};

  function greet(language, name) {
    if (name !== "" && language ) {
      if (greetedNames[name] === undefined) {
        greetedNames[name] = 0;
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
  }

  function greetCounter() {
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
