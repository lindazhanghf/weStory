// Authenticate via OAuth
var tumblr = require('tumblr.js');
var client = tumblr.createClient({
  consumer_key: 'ItnfzBhYek1F8BIZ0wMaf8cznREXcZtW4BmAbVniCVl4W16IIP',
  consumer_secret: 'ZgxK2r2GoQdW6HbadR9aH2lvK1Ac0ySxpQOLz4wiyIoZ9Xw4rd',
  token: '7CLjVvn0XiuRqLTtlzMP6govNZkigBYvaKKw7AP9gqlHKczIKc',
  token_secret: 'Q7ywytsG0iLAdfKiNcYSWyZkco67IBZ7jCtXPHWr7xRqoWwvJa'
});


function postStory(t, story) {
    client.text('we-story', { title: t,
                              body: story,
                              tweet: 'off',
                              format: 'markdown',
                              tags: 'story'}, function(err, success) {
                                console.log("success");
    });
}

postStory("cat", "wowwwww");