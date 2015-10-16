$(document).ready(function() {

  var hidden = function (){
  $('.responses > p').hide();
  };

  hidden();

  var randomNumber = Math.round(Math.random()*100);
  var guess;
  var count = 0;
  var pastDifferences = [];
  var pastGuesses = [];

  $('.Guess').on('keyup', function () {
    guess = +$(this).val();
  });

  var validGuess = function () {
    if (guess < 1 || guess > 100) {
      alert("Please pick a number between 1-100.");
      return false;
    } else if (pastGuesses.indexOf(guess) !== -1) {
      alert("You picked that one already, try again.");
      return false;
    }
    return true;
  };
  
  var checkForAnswer = function () {
    var difference = randomNumber - guess;
    pastDifferences.push(difference);
    pastGuesses.push(guess);
    if (randomNumber === guess) {
        $('.correct').show();
        $('.jumbotron').addClass('winner');
        count = 5;
        $('.storeGuesses').find('p').remove();
        $('.storeGuesses').append('<p>Press "Play Again" to play more!</p>').show();
    } else if (count < 1) {
        if (difference >= 1 && difference <= 5) {
          $('.closeUp').show();
      } else if (difference > 5 && difference <= 20) {
          $('.warmUp').show();
      } else if (difference > 20 && difference <= 45) {
          $('.coldUp').show();
      } else if (difference > 45) {
          $('.farUp').show();
      } else if (difference <= -1 && difference >= -5) {
          $('.closeDown').show();
      } else if (difference < -5 && difference >= -20) {
          $('.warmDown').show();
      } else if (difference < -20 && difference >= -45) {
          $('.coldDown').show();
      } else if (difference < -45) {
          $('.farDown').show();
      }
    } else {
      if (difference > 45) {
          $('.farUp').show();
      } else if (difference < -45) {
          $('.farDown').show();
      } else if (difference > 0 && Math.abs(pastDifferences[count]) <= Math.abs(pastDifferences[count -1])) {
          $('.warmerUp').show();
      } else if (difference > 0 && Math.abs(pastDifferences[count]) > Math.abs(pastDifferences[count -1])) {
          $('.colderUp').show();
      } else if (difference < 0 && Math.abs(pastDifferences[count]) < Math.abs(pastDifferences[count -1])) {
          $('.warmerDown').show();
      } else if (difference < 0 && Math.abs(pastDifferences[count]) >= Math.abs(pastDifferences[count -1])) {
          $('.colderDown').show();
      }
    }
    count++;
  };

  var submission = function () {
    hidden();
    if (validGuess()) {
      if (count < 4) {
        $('.storeGuesses').append('<p>' + guess + '</p>');
        checkForAnswer();
      } else {
        $('.storeGuesses').find('p').remove();
        $('.storeGuesses').append('<p>Press "Play Again" to start over.</p>').show();
          if (randomNumber !== guess) {
            $('.goodTry').show();
          }
      }
    }
  };

  $('#button1').on('click', submission);

  $('input').keyup(function(e) {
    if (e.keyCode === 13) {
      submission();
    }
  });

  $('#button2').on('click', function() {
    location.reload();
  });

  $('#button3').on('click', function() {
    alert(randomNumber);
  });


});