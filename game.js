//THE SIMON GAME
//by Ornit Cohn Gindi
//guided by 'The Complete 2020 Web Development Bootcamp' on Udemy

//in this game a sequence of flickering colored squars is given and the player should
//follow it without mistakes.
//once a mistake is done, the game is over.
var buttonColors = ["red", "green", "yellow", "blue"];
var gamePattern = []; //will contain the array of colors to follow
var userClickedPattern = []; //will contain the player's answer
var started = false;
var level = -1;

//this part is listening to the keytboard, to initiate a new game
$(document).on("keypress", function (event) {
    if (!started) {
        level = -1;
        started = true;
        nextSequence(); // 
    }
});





//this part is listenng to the  mouse clicks
$(".btn").on("click", function () {

    if (started) {
        var userChosenColour = $(this).attr("id"); //gets the relevant color from the button's id name
        userClickedPattern.push(userChosenColour); //adds color to array
        console.log(userClickedPattern);

        playSoundName(userChosenColour);
        animatePress(userChosenColour);

        if (checkAnswer(userClickedPattern.length - 1) == true) {
            if (gamePattern.length == userClickedPattern.length) {
                $("#level-title").text("GOOD JOB!!!");

                userClickedPattern = [];
                setTimeout(function () {
                    nextSequence();
                }, 1000);
            }
        } else {
            $("#level-title").text("GAME OVER  Press any key to Restart");
            gamePattern = [];
            userClickedPattern = [];

            started = false;

            setTimeout($("body").addClass("game-over").removeClass("game-over").animate(), 15000);
        }
    }
});
/////////////////////// functions //////////////////////

//this method randomly picks a new color to be added to the game sequence, when a new level begins
//and the whle sequence is shown each time
function nextSequence() {
    level++;
    $("#level-title").text("Level " + level); // updates the title to the relevant level

    var randomNumber = Math.floor(Math.random() * 10 + 1) % 4; //randomizes a number
    var randomChosenColor = buttonColors[randomNumber]; //translates a number to a color
    gamePattern.push(randomChosenColor); //adds color to array

    //the following loop will display the new sequence
    var i = 0;
    while (i <= level) {
        console.log(i + " level " + level);
        fadeSqr(i);
        i++;
    }
}

//this method flickers a square that is of a color that is on the i'th 
//place in the gamePattern array, in delay so thhe whole sequence is 
//possible to follow
function fadeSqr(i) {
    setTimeout(function () {
        $("#" + gamePattern[i]).fadeIn(200).fadeOut(200).fadeIn(200);
    }, 500 * i);
}

//this method plays a sound according to a name of color
function playSoundName(colorName) {
    var audio = new Audio("sounds/" + colorName + ".mp3");
    audio.play();
}

//this method make a colored squuare flicker  whhe it's pressed
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 75);
}

// this method checks every answer of the user. if the nswer is wrong the game is over
// returns true if a click is right
// retuurns false if a click is wrong
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] != userClickedPattern[currentLevel]) {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        return false;
    } else {
        return true; //nextSequence();
    }
}