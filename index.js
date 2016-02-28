var express = require('express');
var app = express();
var http = require('http').Server(app);
//Socket io listens to app
var io = require('socket.io')(http);

app.get('/', function(req, res) {
res.sendFile(__dirname + '/index.html');
});

var clicked = false;
var prompt = null;
var prompts = [
"",
"You find yourself on a deserted island. How would you survive?",
"You hide in an amusement park until it closes. Everyone is gone. What is your next move?",
"Write a poem with one another about finals week. Make sure it rhymes!",
"Describe a normal day at Tech.",
"Describe the normal day in the life of a dog.",
"You find yourself in a galaxy far, far away. Start your story.",
"On your way down the mountain, an avalanche starts that is coming down quickly on you. Finish the scene.",
"You are back in the great times of the Romans. Describe a walk down a street in Rome.",
"You spot an UFO way up in the sky. What are the following events?",
"You wake up and find yourself in a maze. A sign says: 'You have one hour. Don't touch the walls.' Finish the scene.",
"Write a love note to a past lover.",
"You're the anchor of your track team. It comes down to you to win the race. Finish the screne.",
"You see an oasis in the distance. In desperate need of thirst, you walk towards it. What do you find?",
"The game is almost over. You have the last buzzer-beater shot. Finish the scene.",
"Free Play. Let's see how creative you can get.",
"Think back to elementary school. Create a playground scene.",
"You're stuck in traffic. What would you do during the spare time?",
"Is love at first sight real? Give a scene.",
"Imagine yourself on your deathbed, having lived a great life. You have a flashback. Describe it.",
"You find yourself in the middle of a battlefield. One of the soldiers next to you has been shot. What will you do next?",
"You open your locker only to have a note fall out from someone anonymous. What does it say and what do you do?",
"You wake up and look at your hands to find them wrinkled. You’ve aged to 80 years old! What do you do now?",
"You find out on your 18th birthday that you’re not actually human, you’re a ____________! How do you react? How are you going to live your life now?",
"You hear strange noises coming from under your bed. You crouch down to look under it, and you jump back. It’s a ___________! What now?",
"You hear your mom scream downstairs. Startled, you run down only to find a giant portal where your living room used to be. Of course, you jump in. Where does it go?",
"You’re in lab working on an experiment when your lab partner accidentally pours the wrong chemical into the beaker. There’s a puff of smoke and you appear to be fine but you’re lab partner on the other hand… what happened to him?",
"You wake up to a really bright light only to find its 2am and that light is coming from your closet. You open it. What do you find?",
"You come back from taking pictures of scenery at the park and develop them only to see that there’s an unknown figure in every one of them. Who is it and how did they get in your photos?",
"You get a newspaper dated 5 days into the future and realize you have to take action. What happened?",
"You’re sitting on the bus, when the person next to you says “This is a secret but I have to tell you something.” What do they tell you?",
"A picture of your long lost dad falls off the mantle and breaks. You discover a note that was hidden behind the photo. What’s it say?",
"Write from the perspective of a dog. What’s your daily life like?",
"You see a basket of cookies on the counter. They look funny but you shrug and eat it anyway, when suddenly you turn into a ______! What now?",
"A friend you haven’t talked to in 7 years suddenly calls you in the middle of the night. What happened? Why did they call you?",
"Choose a fictional character to write in the perspective of.",
"You suddenly win a billion dollars. What’s the first thing you do with it?",
"You walk down the street and bump into somebody only to realize it’s _________. You’re shocked. Who is it and what do you do?",
"You wake up one day to find that you’re now 2 years old, but you live alone! What do you do?",
"Write about a character that has a weird phobia. Why does he have to face his fear?",
"A genie will grant you one wish. What is it and what happens as a result?"
];

var numberOfPlayers = 0;
var randomNum1;
var chosen;

var text = "";

io.on('connection', function(socket) {
console.log('user connected.');
numberOfPlayers ++;
console.log("User" + numberOfPlayers + " joined.");
io.emit('playerID', numberOfPlayers);
io.emit('playerJoined', numberOfPlayers);

  socket.on('chat message', function(msg) {
       io.emit('chat message', msg);
       text = text + " " + msg;
     });
socket.on('startT', function(msg) {
  console.log("reached");
  startTimer();
     });
  socket.on('disconnect', function() {
console.log('user disconnected');
// echo globally that this client has left
      // socket.broadcast.emit('user left', {
     //   username: socket.username,
     //   numUsers: numUsers
      // });
  io.emit('PlayerLeft', numberOfPlayers);
numberOfPlayers--;
});
socket.on('post', function(msg){
postStory(msg, text);
})
});

var seconds;
var time;

function initialize(minutes) {
seconds = minutes * 60;
text = "";
}

function startTimer() {
if (!clicked) {
randomNum1 = Math.floor((Math.random() * 40) + 1);
chosen = prompts[randomNum1].toString();
//initialize timer
initialize(5); //number of minutes
time = setInterval(timer, 1000);
clicked = true;
}
}

function timer() {
var m = (seconds - (seconds % 60)) / 60;
var s = seconds % 60;
console.log(seconds);
if (s > -1) {
if (m < 10) {
var minutesLabel = '0' + (m).toString();
} else {
var minutesLabel = (m).toString();
}
if (s < 10) {
var secondsLable = '0' + (s).toString();
} else {
var secondsLable = (s).toString();
}
seconds--;
} else {
clearInterval(time);
var minutesLabel = '00';
var secondsLable = '00';
clicked = false;
io.emit('done', clicked);
}
  io.emit('prompt', chosen);
  io.emit('timer', [minutesLabel,secondsLable]);

}

http.listen(3000, function(){
console.log('listening on *:3000');
});

// Authenticate via OAuth
var tumblr = require('tumblr.js');
var client = tumblr.createClient({
  consumer_key: 'ItnfzBhYek1F8BIZ0wMaf8cznREXcZtW4BmAbVniCVl4W16IIP',
  consumer_secret: 'ZgxK2r2GoQdW6HbadR9aH2lvK1Ac0ySxpQOLz4wiyIoZ9Xw4rd',
  token: '7CLjVvn0XiuRqLTtlzMP6govNZkigBYvaKKw7AP9gqlHKczIKc',
  token_secret: 'Q7ywytsG0iLAdfKiNcYSWyZkco67IBZ7jCtXPHWr7xRqoWwvJa'
});


function postStory(t, story) {
if (story == "" || story == null) {
story = "...";
}
    client.text('we-story', { title: t,
                              body: story,
                              tweet: 'off',
                              format: 'markdown',
                              tags: 'story'}, function(err, success) {
                                console.log("success");
    });
}

