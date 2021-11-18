/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {

    const data = [
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
                "handle": "@rd"
            },
            "content": {
                "text": "Je pense , donc je suis"
            },
            "created_at": 1461113959088
        }
    ]

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
            tweetContainer.append(createTweetElement(tweet));
        }
    };
    renderTweets(data);

    $('#label-form').on('submit', function(event) {
        event.preventDefault();
        tweet = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: '/tweets',
            data: tweet,
            success: function(tweet) {
                console.log(tweet);
            }, 
            error: function(err) {
                console.log(err);
            }
        })
    })
});