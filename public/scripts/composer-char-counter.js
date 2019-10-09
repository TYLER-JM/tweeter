$(document).ready(function() {
  $('.new-tweet textarea').on('keyup', function() {
    let counter = $(this).siblings('.counter');
    counter.text(140 - this.textLength);
    if (counter.text() < 0) {
      counter.addClass('over-limit');
    } else if (counter.text() >= 0) {
      counter.removeClass('over-limit');
    }
  }); //end and keyup
});