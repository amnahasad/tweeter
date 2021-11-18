/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {

    
    const createTweetElement = function (tweetData) {

        return `<article class="tweet">
    <header class="article-header">
      <div class="avatar_img">
        <img src="${tweetData["user"]["avatars"]}"/>
        <p>${tweetData["user"]["name"]}</p>
      </div>
      <p>${tweetData["user"]["handle"]}</p>
    </header>
    <div class="user-tweet">
      <p>${tweetData["content"]["text"]}</p>
    </div>
    <div class="horizontal-line"></div>
    <footer class="article-footer">
      <p class="days-ago">${timeago.format(tweetData["created_at"])}</p>
      <div class="symbols">
        <i class="fas fa-flag flag"></i>
        <i class="fas fa-retweet retweet"></i>
        <i class="fas fa-heart heart-likes"></i>
      </div>
    </footer>
  </article>`

    };

    const renderTweets = function (tweets) {

        const tweetContainer = $('#tweets-container');

        for (let tweet of tweets) {
            tweetContainer.prepend(createTweetElement(tweet));
        }
    };

    $('#label-form').on('submit', function(event) {
        event.preventDefault();
        tweet = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: '/tweets',
            data: tweet,
            success: function(tweet) {
                console.log(tweet);
                loadTweets();
            }, 
            error: function(err) {
                console.log(err);
            }
        })
    })

    const loadTweets = () => {
        $.ajax('/tweets', {method: 'GET'})
        .then((tweets) => {
            renderTweets(tweets);
        })
        .fail((err) => {
            console.log(err);
        })
    };

    loadTweets();
});