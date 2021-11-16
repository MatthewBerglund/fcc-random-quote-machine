const quotes = [
  {text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia provident dolorum ex vero pariatur suscipit culpa impedit voluptates quos, expedita, placeat tempora optio atque itaque dolore obcaecati, voluptatibus ab cum.', author: 'Author 1'},
  {text: 'Quote 2', author: 'Author 2'},
  {text: 'Quote 3', author: 'Author 3'},
  {text: 'Quote 4', author: 'Author 4'},
  {text: 'Quote 5', author: 'Author 5'},
  {text: 'Quote 6', author: 'Author 6'},
  {text: 'Quote 7', author: 'Author 7'},
  {text: 'Quote 8', author: 'Author 8'},
  {text: 'Quote 9', author: 'Author 9'},
  {text: 'Quote 10', author: 'Author 10'},
  {text: 'Quote 11', author: 'Author 11'},
  {text: 'Quote 12', author: 'Author 12'},
  {text: 'Quote 13', author: 'Author 13'},
  {text: 'Quote 14', author: 'Author 14'},
  {text: 'Quote 15', author: 'Author 15'},
  {text: 'Quote 16', author: 'Author 16'},
  {text: 'Quote 17', author: 'Author 17'},
  {text: 'Quote 18', author: 'Author 18'},
  {text: 'Quote 19', author: 'Author 19'},
  {text: 'Quote 20', author: 'Author 20'},
  {text: 'Quote 21', author: 'Author 21'},
  {text: 'Quote 22', author: 'Author 22'},
  {text: 'Quote 23', author: 'Author 23'}
];

bindEvents();
displayNewQuote();

function bindEvents() {
  document.querySelector('.new-quote-button').addEventListener('click', displayNewQuote);
}

function displayNewQuote() {
  var randomQuote = getRandomQuote(quotes);
  document.querySelector('.quote-text').innerText = randomQuote['text'];
  document.querySelector('.quote-author').innerText = randomQuote['author'];
  document.querySelector('.twitter-share-button').setAttribute('data-text', randomQuote['text'] + randomQuote['author']);
}

function getRandomIndex(array) {
  var min = Math.ceil(0);
  var max = Math.floor(array.length);
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomQuote(quotesArray) {
  var randomIndex = getRandomIndex(quotesArray);
  return quotesArray[randomIndex];
}