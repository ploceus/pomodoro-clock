$(document).ready(function() {
  //Call to functions.
  $('#timer').click(onOff);
  $('#breakLess').click(breakLess);
  $('#breakAdd').click(breakAdd);
  $('#sessionLess').click(sessionLess);
  $('#sessionAdd').click(sessionAdd);
  sessionTime();
  
});


//Global Variables
var contador = 0;// contador = 0 then is the first click and start the timer.
var pause = 1 ;//0 = running and 1 = paused.
var restOfTime;//stores the rest of the cicle time.
var activePhase = 0;// 0 = session active and 1 = break active.
var phaseTime;//Actual phase length.
var progress;//Step for fill
var timerHeight = 300;


//Functions

//Click the score board.
function onOff () {
  if(contador == 0){
    sessionTime();
    repeat();
    pause = 0;
    activePhase = 1;
  }else{
    runAndStop();
  }
  contador++;
}
//Time Settings
var breakLess = function () {
  var time = $('#breakTime').text();
  time = parseInt(time);
  if (time > 1) {
    time = time - 1;
  }else{
    time = 1;
  };
    
  $('#breakTime').text(time);
  sessionTime();
}

var breakAdd = function () {
  var time = $('#breakTime').text();
  time = parseInt(time);
  time = time + 1;
  $('#breakTime').text(time);
  sessionTime();
}

var sessionLess = function () {
  var time = $('#sessionTime').text();
  time = parseInt(time);
  if (time > 1) {
    time = time - 1;
  }else{
    time = 1;
  };
  $('#sessionTime').text(time);
  $('#time').text(time);
  sessionTime();
}

var sessionAdd = function () {
  var time = $('#sessionTime').text();
  time = parseInt(time);
  time = time + 1;
  $('#sessionTime').text(time);
  $('#time').text(time);
  sessionTime();
}

//Change of phase (break or session)
function changeToOther () {
  if (activePhase == 0) {
    changeToSession();
    activePhase = 1;
  }else{
    changeToBreak();
    activePhase = 0;
  };
  console.log(activePhase);
}

//Updates the session length
function sessionTime () {
  var totalTime = $('#sessionTime').text();
  totalTime = parseInt(totalTime)*60;
  restOfTime = totalTime;
  phaseTime = restOfTime;
  console.log('Duracion de la fase '+phaseTime);
  calculateProgress(phaseTime);
}


//Stop and starting
function runAndStop () {
  if(pause == 1){
    repeat();
    pause = 0;
  }else{
    clearInterval(intervalRepeat);
    pause = 1;
    //console.log('pause is 1 para');
  }
}

//Countdown
function countdown (){
  restOfTime--
  actualizarTime(restOfTime);
  fillBackground ();
  if (restOfTime == 0) {
    ring();
    clearInterval(intervalRepeat);
    changeToOther();
    console.log(restOfTime);
  };
}

//Time interval
function repeat(){
  intervalRepeat = setInterval('countdown()', 1000)
}

//update the value of time in scoreboard
function actualizarTime (restOfTime) {
  var minutes = Math.floor(restOfTime/60);
  minutes = minutes < 10 ? '0' + minutes : minutes;//Necesito repasar ?????????
  var seconds = restOfTime % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  var time = minutes + ':' + seconds;
  $('#time').text(time);
}

//Change to Break.
function changeToBreak () {
  console.log('Change to Break');
  $('#timerTitle').text('BREAK!!!');
  var breakTime = $('#breakTime').text();
  breakTime = parseInt(breakTime)*60;
  restOfTime = breakTime;
  phaseTime = restOfTime;
  console.log('Duracion de la fase '+phaseTime); 
  calculateProgress (phaseTime);
  repeat();
  timerHeight = 300;
  $('.fillBackground').css('backgroundColor','#49C79C');
}

//Change to Session
function changeToSession () {
  console.log('Change to Session');
  $('#timerTitle').text('Session');
  sessionTime();
  repeat();
  timerHeight = 300;
  $('.fillBackground').css('backgroundColor','#FF8A00');
}

//Alarm phase finished.
function ring () {
  var sound = 'http://www.oringz.com/oringz-uploads/bb_sunny.mp3';
  var ringtone = new Audio(sound);
  ringtone.play();
}

//Fill background timer
function fillBackground () {
  timerHeight = timerHeight - progress;
  var relleno = timerHeight + "px"; 
  console.log('timerHeight '+ relleno);
  $('.fillBackground').css('top',relleno);
 }
  
//Calculate de progress of the fillBackground.
function calculateProgress (phaseTime) {
  progress = 300/phaseTime;
  progress = progress ;
  console.log("El progress para la presente sesion es " + progress);
}