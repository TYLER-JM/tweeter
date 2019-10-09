$(document).ready(function() {
  $('.slide-btn').on('click', function() {
    $('.new-tweet').slideToggle(400);
    $(this).toggleClass('rotate');
    $('.new-tweet textarea').focus();
  });

  $(document).scroll(function() {
    let y = $(this).scrollTop();
    if (y > 600) {
      $('.to-top').fadeIn();
    } else {
      $('.to-top').fadeOut();
    }
  }); //end scroll
}); //end ready