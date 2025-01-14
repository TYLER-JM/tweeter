/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  for (let tweet of tweets) {
    $('#tweets-container').prepend(createTweetElement(tweet));
  }
};

const makeSafeTweet = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetOb) {
  let date = new Date(tweetOb.created_at);
  let stringDate = date.toLocaleDateString();
  let tod = date.toLocaleTimeString('en-US');
  return `
  <article class="tweet">
    <header>
      <div>
        <img src="${tweetOb.user.avatars}" alt="a simple avatar">
        <h4>${tweetOb.user.name}<h4>
      </div>
      <div class="handle">${tweetOb.user.handle}</div>
    </header>
    <div>${makeSafeTweet(tweetOb.content.text)}</div>
    <footer>
      <time datetime="${stringDate}">${tod}, ${date.toDateString()}</time>
      <div class="social">
        <img src="/images/flag.png">
        <img src="/images/like.png">
        <img src="/images/rt-arrow.png">
      </div>
    </footer>
  </article>
  `;
};
//handle get requests
const loadTweets = function() {
  $.ajax('/tweets/', {method: 'GET'})
    .then(function(something) {
      renderTweets(something);
    }); //end then
};

$(document).ready(function() {

  //using AJAX to handle POST requests
  let submitForm = $('.post-tweet');
  submitForm.submit(function(event) {
    $.ajax({
      type: 'POST',
      url: $(this).attr('action'),
      data: $(this).children('textarea').serialize(),
      beforeSend: () => {
        if ($('.post-tweet textarea').val() === '') {
          $('.empty').slideToggle();
          $('.too-long').hide(400);
          return false;
        } else if ($('.post-tweet textarea').val().length > 140) {
          $('.too-long').slideToggle();
          $('.empty').hide(400);
          return false;
        }
        $('.empty').hide(400);
        $('.too-long').hide(400);
        return true;
      }
    })
      .then(function() {
        loadTweets();
        $('.post-tweet textarea').val('');
        $('.post-tweet .counter').text('140');
      }); // end then
    event.preventDefault();
  }); //end submit
    
  //to do the initial load
  loadTweets();
}); //end ready