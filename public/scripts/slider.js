$(document).ready(function() {
  $('.slide-btn').on('click', function() {
    $('.new-tweet').slideToggle(400);
    if ($('.slide-btn').attr('src') === '/images/down.png') {
      $('.slide-btn').attr('src', '/images/up.png');
    } else {
      $('.slide-btn').attr('src', '/images/down.png');
    }
  });
}); //end ready