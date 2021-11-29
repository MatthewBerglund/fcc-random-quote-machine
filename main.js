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
const displayArea = document.getElementById('display-area');

bindEvents();
displayNewQuote();

function bindEvents() {
  const newQuoteButton = document.getElementById('new-quote-button');
  newQuoteButton.addEventListener('click', handleNewQuoteClick);
}

function handleNewQuoteClick() {
  displayArea.classList.toggle('show');
  setTimeout(displayNewQuote, 350);
}

function displayNewQuote() {
  const quotePara = document.getElementById('quote');
  const refCite = document.getElementById('ref');
  const quote = getRandomQuote(quotes);

  quotePara.innerText = '\“' + quote['text'] + '\”';
  refCite.innerText = quote['movie'];
  displayArea.classList.toggle('show');
  updateTwitterIntent(quote);
};

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function getRandomQuote(quotes) {
  const index = getRandomIndex(quotes);
  return quotes[index];
}

function updateTwitterIntent(quote) {
  const twitterLink = document.getElementById('tweet-quote-link');
  const intentAddress = `https://twitter.com/intent/tweet?text=“${quote['text']}”  — ${quote['movie']}`;
  twitterLink.setAttribute('href', intentAddress);
}
