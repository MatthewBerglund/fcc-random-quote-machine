const quotes = [
  {text: 'Leave the gun. Take the cannoli.', movie: 'The Godfather'},
  {text: 'I\’m gonna make him an offer he can\’t refuse.', movie: 'The Godfather'},
  {text: 'I want all of you to enjoy your cake, so...enjoy.', movie: 'The Godfather'},
  {text: 'Frankly my dear, I don\’t give a damn.', movie: 'Gone with the Wind'},
  {text: 'You don\’t understand! I coulda had class. I coulda been a contender. I could\’ve been somebody, instead of a bum, which is what I am.', movie: 'On the Waterfront'},
  {text: 'Toto, I\’ve got a feeling we\’re not in Kansas anymore.', movie: 'The Wizard of Oz'},
  {text: 'Here\’s looking at you, kid.', movie: 'Casablanca'},
  {text: 'As God is my witness, I\’ll never be hungry again.', movie: 'Gone with the Wind'},
  {text: 'Say \‘hello\’ to my little friend!', movie: 'Scarface'},
  {text: 'I feel the need — the need for speed!', movie: 'Top Gun'},
  {text: 'Houston, we have a problem.', movie: 'Apollo 13'},
  {text: 'Nobody puts Baby in a corner.', movie: 'Dirty Dancing'},
  {text: 'I\’ll get you, my pretty, and your little dog, too!', movie: 'The Wizard of Oz'},
  {text: 'One morning I shot an elephant in my pajamas. How he got in my pajamas, I don\’t know.', movie: 'Animal Crackers'},
  {text: 'You\’ve got to ask yourself one question: \‘Do I feel lucky?\’ Well, do ya, punk?', movie: 'Dirty Harry'},
  {text: 'Hold on to your butts.', movie: 'Jurassic Park'},
  {text: 'As far back as I can remember, I always wanted to be a gangster.', movie: 'Goodfellas'},
  {text: 'Human sacrifice! Dogs and cats living together. Mass hysteria!', movie: 'Ghostbusters'}
];

bindEvents();
displayNewQuote();

function bindEvents() {
  document.getElementById('new-quote-button').addEventListener('click', displayNewQuote);
}

function displayNewQuote() {
  var quote = getRandomQuote(quotes);
  var displayArea = document.getElementById('display-area');
  var quotePara = document.getElementById('quote');
  var refPara = document.getElementById('ref');

  var fadeOut = displayArea.animate([{ opacity: 1 },{ opacity: 0 }], 250);

  fadeOut.onfinish = function() {
    quotePara.innerText = '\“' + quote['text'] + '\”';
    refPara.innerText = '— ' + quote['movie'];
    displayArea.animate([{ opacity: 0 },{ opacity: 1 }], 750);
  }

  // displayArea.animate([{ opacity: 1 },{ opacity: 0 }], { duration: 3000 });
  // displayArea.style.opacity = 0;
  // quotePara.innerText = '\“' + quote['text'] + '\”';
  // refPara.innerText = '— ' + quote['movie'];
  // displayArea.animate([{ opacity: 0 },{ opacity: 1 }], { duration: 1000 });
  // displayArea.style.opacity = 1;
  updateTwitterIntent(quote);
}

function getRandomIndex(array) {
  var min = Math.ceil(0);
  var max = Math.floor(array.length);
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomQuote(quotes) {
  var index = getRandomIndex(quotes);
  return quotes[index];
}

function updateTwitterIntent(quote) {
  var intentAddress = 'https://twitter.com/intent/tweet?text=';
  intentAddress += '\"' + quote['text'] + '\"' + '  — ' + quote['movie'];
  document.getElementById('tweet-quote-link').setAttribute('href', intentAddress);
}