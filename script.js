var $timerId = $('#timer');
var seconds = 35;
var $playerOneScore = $('#first-score');
var $playerTwoScore = $('#second-score');
var $startButton = $('#btn');
var $ball = $('#ball');
var $turnBox = $('#turn');
var $container = $('#container');
var $powermeter = $('#powermeter');
var oldSrc = 'http://icons.iconseeker.com/png/fullsize/nx10/basketball.png';
var $makeormiss = $('#makeormiss');
var $bigbox = $('.bigbox');
let p1Name;
let p2Name;



var game = {
  playerOne: 'Player One',
  playerTwo: 'Player Two',
  scoreCount: 0,
  whosTurn: '',
  firstScore: 0,
  secondScore: 0,
  shotsTaken: 0,
  difficulty: '',



randNum: function(){
    return Math.floor(Math.random() * (1100 - 10 + 1)) + 10;
},

start: function(){

    $('p').hide();
    $startButton.hide();
    $bigbox.animate({ left: "20%", width: "65%", height: "8%"}, 700);
    $bigbox.append('<input placeholder="Player 1 Name" class="playerName" id="p1"/>');
    $bigbox.append('<input placeholder="Player 2 Name" class="playerName" id="p2"/>');
    $('.playerName').keydown((event) => {
      let key = event.keyCode;
      if (key == 13) {
        if ($('#p1').val() == '' || $('#p2').val() == '') {
          $('.error').remove();
          $bigbox.append('<h2 class="error" >Please Enter Valid Name </h2>');
        } else {
          p1Name = $('#p1').val();
          p2Name = $('#p2').val();
          $bigbox.empty();
          $bigbox.append('<button class="diff" id="rookie">Rookie</button>');
          $bigbox.append('<button class="diff" id="pro">Pro</button>');
          $bigbox.append('<button class="diff" id="allstar">All-Star</button>');
          $bigbox.append('<button id="manual">How To Play</button>')
          $('.diff').on('click', game.diffLevel);
          $('#manual').on('click', game.showDirections);
        }
      }
    })

 }, 

showDirections: function(){
  $bigbox.animate({ height: "48%"}, 500);
  $('p').show();
  $('.diff').hide();
  $('#manual').hide();
  $('p').on('click', game.start);

},


 diffLevel: function(){
   $('.diff').hide();
   game.difficulty = $(this).text();
   $bigbox.hide();
   $powermeter.text("").animate({ left: "10%", bottom: "18%" }, 'slow').animate({
     height: 36, width: 160}, 'fast');
   $powermeter.append('<div id="innerbox"> Shoot !</div>');
   $playerOneScore.text( p1Name + "'s Score: " + game.scoreCount);
   $playerTwoScore.text( p2Name + "'s Score: " + game.scoreCount);
   $ball.append('<img class="basketball" src="http://icons.iconseeker.com/png/fullsize/nx10/basketball.png">');
   $timerId.text("Shot Clock: " + seconds);
   $turnBox.text( p1Name + ", You're Up! Click the Ball to start shooting!");
   if (game.whosTurn === '') {
     game.whosTurn = p1Name;
   } else if (game.whosTurn === p1Name) {
     game.whosTurn = p2Name;
   }
 },

 updateScore: function(){
   if (seconds !== 0) {
     if(game.whosTurn === p1Name){
       $playerOneScore.text( p1Name + " Score: " + game.scoreCount);
       game.firstScore = game.scoreCount;
     } else if (game.whosTurn === p2Name){
       $playerTwoScore.text( p2Name + " Score: " + game.scoreCount);
       game.secondScore = game.scoreCount;
     }
  }
 },


makeShot: function(){
  if (game.shotsTaken !== 0 && game.shotsTaken%5 === 0){
  $('img[src="' + oldSrc + '"]')
  game.scoreCount+=2;
  $makeormiss.text("You're On Fire!");
} else {
  $makeormiss.text("SWISH!");
  game.scoreCount++
  console.log(game.scoreCount);
}
  game.updateScore();
},

missShotLong: function() {
 $makeormiss.text("Late Release!");
},

missShotShort: function(){
  $makeormiss.text("Early Release!");
},

animateMake: function(){
  $ball.animate({ left: "45%", top: "10%" }, 'slow').animate({
                     left: "53%", top: "37%", opacity: 0 }, 500 ).animate({
                     left: game.randNum(), top: "80%" }, 'fast').animate({ opacity: 1, }, 'fast');
},

animateMissShort: function(){
  $ball.animate({ left: "70%", top: "30%", opacity: 0 }, 'slow').animate({
                     left: game.randNum(), top: "80%", opacity: 1 }, 'fast');
},

animateMissLong: function(){
  $ball.animate({ left: "35%", top: "10%", opacity: 0 }, 'fast').animate({
                     left: game.randNum(), top: "80%", opacity: 1 }, 'fast');
},

animatePowerMeter: function(){
    switch (game.difficulty) {
      case "Rookie":
        $('#innerbox').animate({ width: "100%", backgroundColor: "#00cc00"}, 1700).animate({
                                 backgroundColor: "#b3000"}, 200);
        break;
      case "Pro":
        $('#innerbox').animate({ width: "100%", backgroundColor: "#00cc00"}, 1500).animate({
                                 backgroundColor: "#b9000"}, 200);
        break;
      case "All-Star":
        $('#innerbox').animate({ width: "100%", backgroundColor: "#00cc00"}, 1500).animate({
                                 backgroundColor: "#c2000"}, 200);
        break;
      default:
        $('#innerbox').animate({ width: "100%", backgroundColor: "#00cc00"}, 1700).animate({
                               backgroundColor: "#b3000"}, 200);
    }
},

animateWinner: function(){
  $('#winner').animate({ top: "20%" }, 4000);
},




 addEventToBall: function(){
       var startTime;
       function begin(){
          startTime = new Date();
          game.shotsTaken++
          game.animatePowerMeter();
        ('src', oldSrc);
          if (game.shotsTaken !== 0 && game.shotsTaken%5 === 0){
            $('img[src="' + oldSrc + '"]'); 
          }
       }

       function end(){

         $('#innerbox').stop();
         $('#innerbox').animate({
           width: "0%",
           backgroundColor: "ffffff"
         }, 100);

          var now = new Date();
          var downTime = (now -startTime);
          game.randNum();
          switch (game.difficulty) { 
                case 'Rookie':
                  if (downTime > 1000 && downTime < 2000){
                     game.makeShot();
                     game.animateMake();
                   } else if (downTime < 1000){
                     game.missShotShort();
                     game.animateMissShort();
                   } else if (downTime > 2000) {
                     game.missShotLong();
                     game.animateMissLong();
                   }
                   break;
               case 'Pro':
                  if (downTime > 1200 && downTime < 1800){
                     game.makeShot();
                     game.animateMake();
                   } else if (downTime < 1200){
                     game.missShotShort();
                     game.animateMissShort();
                   } else if (downTime > 1800) {
                     game.missShotLong();
                     game.animateMissLong();
                   }
                   break;
               case 'All-Star':
                  if (downTime > 1400 && downTime < 1600){
                     game.makeShot();
                     game.animateMake();
                   } else if (downTime < 1400){
                     game.missShotShort();
                     game.animateMissShort();
                   } else if (downTime > 1600) {
                     game.missShotLong();
                     game.animateMissLong();
                   }
                  break;
          }
         }
    $ball.mousedown(begin);
    $ball.mouseup(end) 
 },

 endTurn: function(){
       $timerId.animate({ color: '#ffffff' }, 500);
       $ball.off();
       $turnBox.text("Nice Shooting! You got " + game.scoreCount + " points");
       if (game.whosTurn === p2Name) {
         if(game.firstScore > game.secondScore){
           $('#winner').text(p1Name + " You Won!")
           game.animateWinner();
           $($container).append('<button id="playagain">Play Again</button>');
           $('#playagain').on('click', function(){
             location.reload();
           });
           return;
         } else if (game.firstScore < game.secondScore) {
           $('#winner').text(p2Name + " You Won!");
           game.animateWinner();
           $($container).append('<button id="playagain">Play Again</button>');
           $('#playagain').on('click', function(){
             location.reload();
           });
           return;
         } else if (game.firstScore === game.secondScore) {
           $('#winner').text("It was a tie!");
           game.animateWinner();
           $($container).append('<button id="playagain">Play Again</button>');
           $('#playagain').on('click', function(){
             location.reload();
           });
           return;
         }
       } else {
         $($container).append('<button id="next">Next</button>');
         $('#next').on('click', game.startNextRound);
       }

 }, 

 startNextRound: function(){
   $('#next').hide();
   var seconds = 35;
   game.shotsTaken = 0;
   game.scoreCount = 0;
   $($timerId).text("Shot Clock: " + seconds);
   $($turnBox).text(p2Name + ", You're Up! Click the Ball to start shooting!");
   if (game.whosTurn === '') {
     game.whosTurn = p1Name;
   } else if (game.whosTurn === p1Name) {
     game.whosTurn = p2Name;
   }
   $($ball).on('click', game.startTheTimer);
 },


 startTheTimer: function(){
   seconds = 35;
   $($ball).off('click');
   $($turnBox).text('');
   var mytimer = setInterval(updateTime, 1000);

   function updateTime(){
       seconds--;
       $($timerId).text("Shot Clock: " + seconds);
       if(seconds < 11){
         $($timerId).animate({ color: "#b3000", }, 200);
         $($timerId).fadeOut(500);
         $($timerId).fadeIn(500);
       } if(seconds === 0) {
         clearInterval(mytimer);
         game.endTurn();
       }
   }
   game.addEventToBall();
 },

};


$( function() {


$('p').hide();
$($startButton).on('click', game.start);
$($ball).on('click', game.startTheTimer);



});