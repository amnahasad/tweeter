/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const createTweetElement = function (tweetData) {
    console.log(tweetData);
    const escape = function (str) {
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };

    const $tweet = $(`<article class="tweet">
    <header class="article-header">
      <div class="avatar_img">
        <img src=${tweetData.user.avatars}/>
        <p>${tweetData.user.name}</p>
      </div>
      <p>${tweetData.user.handle}</p>
    </header>
    <div class="user-tweet">
      <p>${escape(tweetData.content.text)}</p>
    </div>
    <div class="horizontal-line"></div>
    <footer class="article-footer">
      <p class="days-ago">${timeago.format(tweetData.created_at)}</p>
      <div class="symbols">
        <i class="fas fa-flag flag"></i>
        <i class="fas fa-retweet retweet"></i>
        <i class="fas fa-heart heart-likes"></i>
      </div>
    </footer>
    </article>`
    );

    return $tweet;
};

const renderTweets = function (tweets) {

    const tweetContainer = $('#tweets-container');

    for (let tweet of tweets) {
        tweetContainer.prepend(createTweetElement(tweet));
    }
};

const loadTweets = function () {
    $.get('/tweets', function (data) {
        renderTweets(data);
    })
};

$(document).ready(function () {

    const $tweetContainer = $('#tweets-container');

    const $message = $('.error-message span');
    loadTweets();
    $message.hide();


    $('#label-form').submit(function (event) {

        event.preventDefault();
        const $form = $(this);
        const $tweetText = $form.find('textarea');
        $tweetText.on("input", () => {
            $message.fadeOut(500);
        });

        const tweetLength = $('#tweet-text').val().length;

        if (!tweetLength) {
            $message.text('❗ Error, please enter 1 to 140 characters to tweet ❗').slideDown(600);
        }
        else if (tweetLength > 140) {
            $message.text('❗ Error, you have exceeded the 140 character limit! ❗').slideDown(600);
        }


        else {
            $.ajax({
                type: 'POST',
                url: '/tweets',
                data: $(this).serialize(),
                success: function (tweet) {
                    $('textarea').val('');
                    $('.counter').val(140);
                    $.get('http://localhost:8080/tweets', (data) => {
                        const newTweet = data.slice(-1).pop();
                        const newTweetElement = createTweetElement(newTweet);
                        $('#tweets-container').prepend(newTweetElement);
                    })
                },
                error: function (err) {
                    console.log(err);
                }
            })

        }
    })
});