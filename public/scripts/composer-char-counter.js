//this file is responsible for the character counter

$(document).ready(function() {
    $('#tweet-text').on('input', function() {
        // console.log(this);
        let inputLength = $(this).val().length;
        let counter = $('.counter');
        counter.val(140 - inputLength);

        if (counter.val() < 0) {
            counter.css('color', 'red');
        } else {
            counter.css('color', 'black');
        }
    });
  });
        
