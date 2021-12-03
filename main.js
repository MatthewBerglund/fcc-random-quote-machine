fetch('quotes.json').then(function(response) {
  return response.json();
}).then(function(json) {
  const quotes = json;
  init(quotes);
}).catch(function(error) {
  document.getElementById('quote-box').innerHTML = `Network request failed with message: ${error.message}. Please refresh to try again.`;
});

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
    const refYear = document.getElementById('ref-year');
    const quote = getRandomQuote(quotes);

    quotePara.innerText = `“${quote.text}”`;
    refCite.innerText = quote.movie;
    refYear.innerText = ` (${quote.year})`;
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
