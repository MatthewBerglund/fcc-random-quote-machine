const displayArea = document.getElementById('display-area');

const newQuoteButton = document.getElementById('new-quote-button');
newQuoteButton.addEventListener('click', handleNewQuoteClick);

let quotes;

fetchQuotes().then(fetchedQuotes => {
  quotes = fetchedQuotes;
  displayNewQuote();
});

function displayNewQuote() {
  const quote = getRandomQuote(quotes);

  const quotePara = document.getElementById('quote');
  quotePara.innerText = `“${quote.text}”`;

  const movieCite = document.getElementById('movie');
  movieCite.innerText = quote.movie;

  const refYear = document.getElementById('ref-year');
  refYear.innerText = ` (${quote.year})`;

  displayArea.classList.toggle('show');

  // Allow quote text to fade in before enabling button
  setTimeout(() => {
    newQuoteButton.disabled = false;
  }, 150);

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

async function fetchQuotes() {
  const response = await fetch('quotes.json');

  if (!response.ok) {
    const quoteBox = document.getElementById('quote-box');
    quoteBox.textContent = `Network request failed with status ${response.status}: ${response.statusText}. Please try again.`;
  } else {
    const fetchedQuotes = await response.json();
    return fetchedQuotes;
  }
}

function getRandomQuote(quotes) {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

function handleNewQuoteClick() {
  newQuoteButton.disabled = true;
  displayArea.classList.toggle('show');
  setTimeout(displayNewQuote, 350);
}

function updateTwitterIntent(quote) {
  const tweetText = encodeTweetForURI(`“${quote.text}”  — ${quote.movie} (${quote.year})`);
  const intentURL = `https://twitter.com/intent/tweet?text=${tweetText}`;
  const twitterLink = document.getElementById('tweet-quote-link');
  twitterLink.setAttribute('href', intentURL);
}
