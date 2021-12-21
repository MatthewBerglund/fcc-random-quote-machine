fetch('quotes.json')
  .then(response => {
    if (!response.ok) {
      const quoteBox = document.getElementById('quote-box');
      quoteBox.textContent = 
          `Network request failed with status ${response.status}: 
          ${response.statusText}. Please refresh to try again.`;
    }
    return response.json();
  })
  .then(quotesJson => {
    init(quotesJson);
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
    const quote = getRandomQuote(quotes);
    
    const quotePara = document.getElementById('quote');
    quotePara.innerText = `“${quote.text}”`;
    
    const refCite = document.getElementById('ref');
    refCite.innerText = quote.movie;
    
    const refYear = document.getElementById('ref-year');
    refYear.innerText = ` (${quote.year})`;
    
    displayArea.classList.toggle('show');
    updateTwitterIntent(quote);
  }

  function encodeTweetForURI(tweetText) {
    let encodedTweet = encodeURIComponent(tweetText);
    
    // Encode reserved chars not encoded by `encodeURIComponent()`
    encodedTweet = encodedTweet.replace(/[!*)(']/g, char => {
      const charInHex = char.charCodeAt(0).toString(16);
      return '%' + charInHex;
    });

    return encodedTweet;
  }

  function getRandomQuote(quotes) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  function handleNewQuoteClick() {
    displayArea.classList.toggle('show');
    setTimeout(displayNewQuote, 350);
  }

  function updateTwitterIntent(quote) {
    const tweetText = encodeTweetForURI(`“${quote.text}”  — ${quote.movie} (${quote.year})`);
    const intentURL = `https://twitter.com/intent/tweet?text=${tweetText}`;
    const twitterLink = document.getElementById('tweet-quote-link');
    twitterLink.setAttribute('href', intentURL);
  }
}
