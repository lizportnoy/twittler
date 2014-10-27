$(document).ready(function () {


        var $body = $('.tweetbody');
        visitor = prompt ('What\'s your user name', 'Visitor');
        streams.users[visitor] = [];


        var refreshTweets = function (selectUser) {

          $('.tweetbody').html('');

          var tweetstore = [];


          var userOnlyStream = (streams.home).filter(function (elem) {
            return (elem.user === selectUser) 
          });

          var index = arguments.length < 1 ? streams.home.length - 1 : userOnlyStream.length -1;


          while(index>= 0) {
            var tweet = arguments.length < 1? streams.home[index] : userOnlyStream[index];
            var $tweet = $('<div class="tweet"></div>');
            var $user = $('<span class="username"> @' + '<a title="Display this user\'s tweets">' +  tweet.user + '</a>' +': </span>');
            var $message = $('<span class="message">' + tweet.message + ' </span> ');
            var $time = $('<span class="time">' + tweet.created_at + ' </span>');

            $tweet.append($user);
            $tweet.append($message);
            $tweet.append($time);
            tweetstore.push($tweet);
            index -= 1;
          } 

          $body.prepend(tweetstore);


        };

        refreshTweets();

        //window.setInterval(function () {streams.home.shift()}, Math.random() * 1500 );


        $('#showTweets').on('click',  function () {
          refreshTweets();
        });

        $('.tweetbody').on('click', '.username', function () {
          refreshTweets($(this).find('a').text());
        });

        $('.sentMessage').on('click', function () {
          
          var twit = $('#sentMessage').val();
          
          if (twit.length > 0) {
            $('#sentMessage').val('');
            writeTweet(twit, visitor);
            refreshTweets();
          };
        });


      });