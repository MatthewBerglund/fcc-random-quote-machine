fetch('quotes.json')
  .then(response => {
    if (!response.ok) {
      document.getElementById('quote-box').textContent = `
        Network request failed with status 
        ${response.status}: ${response.statusText}. 
        Please refresh to try again.
      `;
    }
    return response.json();
  })
  .then(json => {
    const quotes = json;
    init(quotes);
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
    const tweetText = encodeTweetForURI(`“${quote.text}”  — ${quote.movie} (${quote.year})`);
    const intentURL = `https://twitter.com/intent/tweet?text=${tweetText}`;
    const twitterLink = document.getElementById('tweet-quote-link');
    twitterLink.setAttribute('href', intentURL);
  }
}
