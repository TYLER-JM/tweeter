/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


let db = [
  /*
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
  */
];


const renderTweets = function(tweets) {
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
//handle get requests
const loadTweets = function() {
  $.ajax('/tweets/', {method: 'GET'})
    .then(function(something) {
      renderTweets(something);
    }); //end then
};


//defining it outside the docready
/*

const handleSubmit = (evt) => {
  $.ajax({
    type: 'POST',
    url: $(this).attr('action'),
    data: $(this).children('textarea').serialize(),
    beforeSend: () => {
      if ($('.post-tweet textarea').val() === '') {
        console.log("whoah there partner");
        alert("tweet feild must not be empty");
        return false;
      } else if ($('.post-tweet textarea').val().length > 140) {
        console.log("whoah there partner");
        alert("you have too much to say. limit is 140 characters");
        return false;
      }
      // console.log(event);
      // console.log($('.post-tweet textarea').val());
      return true;
    }
  })
    .then(function() {
      loadTweets();
    }); // end then
  evt.preventDefault();
};
*/

$(document).ready(function() {
  renderTweets(db);

  

  //using AJAX to handle POST requests
  //COULD DEFINE A FUNCTION TO PASS INTO SUBMITTION\
  //AND NOT USE ANON FUNC
  let submitForm = $('.post-tweet');
  submitForm.submit(function(event) {
    // console.log('form is doing something');
    // console.log('EVENT:', event);
    $.ajax({
      type: 'POST',
      url: $(this).attr('action'),
      /* '.post-tweet textarea' */
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
    
  loadTweets(); //to do the initial load
}); //end ready