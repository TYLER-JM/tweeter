/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
let db = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    $('#tweets-container').prepend(createTweetElement(tweet));
  }
};

const createTweetElement = function(tweetOb) {
  let date = new Date(tweetOb.created_at);
  let stringDate = date.toLocaleDateString();
  return `
  <article class="tweet">
    <header>
      <div>
        <img src="${tweetOb.user.avatars}" alt="a simple avatar">
        <h4>${tweetOb.user.name}<h4>
      </div>
      <div class="handle">${tweetOb.user.handle}</div>
    </header>
    <div>${tweetOb.content.text}</div>
    <footer>
      <time datetime="${stringDate}">${date.toDateString()}</time>
      <div class="social">
        <img src="/images/flag.png">
        <img src="/images/like.png">
        <img src="/images/rt-arrow.png">
      </div>
    </footer>
  </article>
  `;
};

$(document).ready(function() {
  renderTweets(db);

  

  //using AJAX to handle POST requests
  let submitForm = $('.post-tweet');
  submitForm.submit(function(event) {
    console.log('form is doing something');
    // console.log(event);
    $.ajax({
      type: 'POST',
      url: $('.post-tweet').attr('action'),
      data: $('.post-tweet textarea').serialize()
    })
      .then(function(data) {
        console.log('something: ', data);
      }); // end then
    event.preventDefault();
    // loadTweets(); //putting it here loads on every push of btn
  }); //end submit
    
  const loadTweets = function() {
    $.ajax('/tweets/', {method: 'GET'})
      .then(function(something) {
        console.log('somethings happening');
        renderTweets(something);
      }); //end then
  };
  loadTweets(); //this loads them all on refresh
}); //end ready