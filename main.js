const request = new XMLHttpRequest();
request.open('GET', 'quotes.json');
request.responseType = 'json';

request.onload = function() {
  if (request.status === 200) {
    const quotes = request.response;
    init(quotes);
  } else {
    console.log(`Network request for quotes.json failed.`);
  }
};

request.send();

function init(quotes) {
  const displayArea = document.getElementById('display-area');
  bindEvents();
  displayNewQuote();

  function bindEvents() {
    const newQuoteButton = document.getElementById('new-quote-button');
    newQuoteButton.addEventListener('click', handleNewQuoteClick);
  }

  function displayNewQuote() {
    const quotePara = document.getElementById('quote');
    const refCite = document.getElementById('ref');
    const quote = getRandomQuote(quotes);

    quotePara.innerText = `“${quote.text}”`;
    refCite.innerText = quote.movie;
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

  function handleNewQuoteClick() {
    displayArea.classList.toggle('show');
    setTimeout(displayNewQuote, 350);
  }

  function updateTwitterIntent(quote) {
    const twitterLink = document.getElementById('tweet-quote-link');
    const intentAddress = `https://twitter.com/intent/tweet?text=“${quote.text}”  — ${quote.movie}`;
    twitterLink.setAttribute('href', intentAddress);
  }
}
