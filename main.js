const quotes = [
  {text: 'Leave the gun. Take the cannoli.', character: 'Peter Clemenza'},
  {text: 'I\'m gonna make him an offer he can\'t refuse, okay?', character: 'Don Corleone'},
  {text: 'Some day, and that day may never come, I will call upon you to do a service for me. But until that day, consider this justice a gift on my daughter\'s wedding day.', character: 'Don Corleone'},
  {text: 'Fredo, you\'re my older brother, and I love you. But don\'t ever take sides with anyone against the Family again. Ever.', character: 'Michael Corleone'},
  {text: 'It\'s a Sicilian message. It means Luca Brasi sleeps with the fishes.', character: 'Peter Clemenza'},
  {text: 'Friendship is everything. Friendship is more than talent. It is more than the government. It is almost the equal of family.', character: 'Don Corleone'},
  {text: 'A friend should always underestimate your virtues and an enemy overestimate your faults.', character: 'Don Corleone'},
  {text: 'Time erodes gratitude more quickly than it does beauty.', character: 'Mario Puzo'},
  {text: 'Mothers are like cops. They always believe the worst.', character: 'Mario Puzo'},
  {text: 'I want all of you to enjoy your cake, so...enjoy.', character: 'Hyman Rother'}
];

bindEvents();
displayNewQuote();

function bindEvents() {
  document.querySelector('.new-quote-button').addEventListener('click', displayNewQuote);
}

function displayNewQuote() {
  var quote = getRandomQuote(quotes);
  var twitterAddress = 'https://twitter.com/intent/tweet?text=' + quote['text'] + '  — ' + quote['character']; 
  document.querySelector('.quote-text').innerText = quote['text'];
  document.querySelector('.quote-author').innerText = '— ' + quote['character'];
  document.querySelector('.tweet-quote').setAttribute('href', twitterAddress);
}

function getRandomIndex(array) {
  var min = Math.ceil(0);
  var max = Math.floor(array.length);
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomQuote(quotesArray) {
  var index = getRandomIndex(quotesArray);
  return quotesArray[index];
}