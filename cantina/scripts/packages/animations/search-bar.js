"use strict";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function animation1(strings, idSearchBar) {
  const searchBar = document.getElementById(idSearchBar);

  const interval = setInterval(function generateSugestions() {
    const choice = strings[randomIntFromInterval(0, (strings.length - 1))]
    searchBar.setAttribute("placeholder", choice);
  }, 3000);
}

export { animation1 };
