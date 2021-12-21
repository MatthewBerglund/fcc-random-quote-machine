const displayArea = document.getElementById('display-area');

const newQuoteButton = document.getElementById('new-quote-button');
newQuoteButton.addEventListener('click', handleNewQuoteClick);

displayNewQuote();

function displayNewQuote() {
  fetch('https://movie-quote-api.herokuapp.com/v1/quote?censored')
    .then(response => {
      if (!response.ok) {
        const quoteBox = document.getElementById('quote-box');
        quoteBox.textContent = `Network request failed with status ${response.status}: ${response.statusText}. Please try again.`;
      }
      return response.json();
    })
    .then(quoteJson => {
      const quotePara = document.getElementById('quote');
      quotePara.innerText = `“${quoteJson.quote}”`;

      const refCite = document.getElementById('ref');
      refCite.innerText = quoteJson.show;

      displayArea.classList.toggle('show');
      
      setTimeout(() => {
        newQuoteButton.disabled = false;
      }, 150);

      updateTwitterIntent(quoteJson);
    });
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

function handleNewQuoteClick() {
  newQuoteButton.disabled = true;
  displayArea.classList.toggle('show');
  setTimeout(displayNewQuote, 350);
}

function updateTwitterIntent(quoteJson) {
  const tweetText = encodeTweetForURI(`“${quoteJson.quote}”  — ${quoteJson.show}`);
  const intentURL = `https://twitter.com/intent/tweet?text=${tweetText}`;
  const twitterLink = document.getElementById('tweet-quote-link');
  twitterLink.setAttribute('href', intentURL);
}
