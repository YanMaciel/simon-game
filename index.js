// Simon Game using jQuery //

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$("body").keydown(function() {
    if (!started){
        $("#level-title").text("Level " + level);
        setTimeout(function () {
            nextSequence();
        }, 1000);   
        started = true;
    }
});

//  Detect when any of the buttons are clicked

$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    // Plays audio
    playSound(userChosenColour);

    // Flashes card
    animatePress(userChosenColour);

    // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {
    // Reset array to check answer again and again each level of the game
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    // Creates random number from 0 to 3.
    var n1 = Math.floor(Math.random() * 4);  

    var randomChosenColour = buttonColours[n1];

    // Add the new randomChosenColour generated to the end of the gamePattern array
    gamePattern.push(randomChosenColour);

    // Animating flashing button with the same id of randomChosenColour
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // Plays audio
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play(); 
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("sucess");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    }
    } else {
        // Plays sound
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        // Flashes background-color red
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        // Changes title
        $("#level-title").html("Game Over, Press Any Key to Restart");
        startOver();
    }    
}

// Resets game
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


