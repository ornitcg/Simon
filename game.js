// alert("hello");
var buttonColors = ["red", "green", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = -1;

//this part is listening to the keytboard
$(document).on("keypress", function (event) {

    if (!started) {
        level = -1;
        started = true;
        nextSequence(); // 
    }

});

function nextSequence() {
    level++;
    setTimeout($("#level-title").text("Level " + level), 3000); //changes the title to the actual level

    var randomNumber = Math.floor(Math.random() * 10 + 1) % 4; //randomizes a number
    var randomChosenColor = buttonColors[randomNumber]; //translates a number to a color
    gamePattern.push(randomChosenColor); //adds color to array
    console.log(gamePattern);
    //display the new sequence
    var i = 0;
    while (i <= level) {
        $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
        setInterval(
            function () {
                i++;
            }, 3000);
    }
}

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
                userClickedPattern = [];
                setTimeout(nextSequence(), 20000);
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


//this method plays a sound according to a name of color
function playSoundName(colorName) {
    var audio = new Audio("sounds/" + colorName + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 75);
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] != userClickedPattern[currentLevel]) {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        return false;
    } else {
        return true; //nextSequence();
    }
}