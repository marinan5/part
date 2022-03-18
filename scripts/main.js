import { colors, backgroundColors } from "./colors.js";

var question = document.getElementById('question');
var quest = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
question.textContent = String.fromCharCode(quest);
var gameover = false;
var state = 0;
var id = 0;
var timerId = window.setTimeout(() => {
    gameOver("Time Out");
}, 2000);
var progressBar = anime({
    targets: ".progressBar",
    width: 0,
    duration: 2000,
    easing: "linear"
});
init();

function init() {
    anime({
        targets: '.main-box',
        translateX: 250,
        rotate: '1turn',
        duration: 800
    });
    window.addEventListener("keypress", function (e) {
        if (state === 0)
            onKeyPress(e.keyCode - 32);
        return;
    });

}

function onKeyPress(answer) {
    if (!gameover) {
        if (answer === quest) {
        quest = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
        question.textContent = String.fromCharCode(quest);
        anime({
            targets: '.main-box',
            translateX: setCoordinatesX(),
            translateY: setCoordinatesY(),
            backgroundColor: colors[anime.random(0, colors.length)],
            duration: Math.floor(Math.random() * (1250 - 600 + 1)) + 500
        });
        anime({
            targets: 'body',
            backgroundColor: backgroundColors[anime.random(0, backgroundColors.length)],
            duration: 1000
        });
        addScore();
        resetTimer();
        return;
        } else {
        gameOver("Wrong key!");
        }
    }
}

function setCoordinatesX() {
    var x = Math.floor((Math.random() * window.innerWidth) - 150);
    if (x < 0) {
        x = 0
    }
    return x
}

function setCoordinatesY() {
    var y = Math.floor((Math.random() * window.innerHeight) - 150);
    if (y < 0) {
        y = 0
    }
    return y
}

function addScore() {
    var scoreBox = document.getElementById("scoreCount");
    id = id + 100;
    scoreBox.innerHTML = id;
}

function resetTimer() {
    window.clearTimeout(timerId);
    progressBar.restart();
    timerId = window.setTimeout(() => {
        gameOver("Time Out");
    }, 2000);
}

function gameOver(message) {
    alert(`Game over ${message} do you want to restart?`);
    progressBar.restart();
    var scoreBox = document.getElementById("scoreCount");
    scoreBox.innerHTML = 0;
}
var main_box= document.getElementById('main_box'),
    tleft = main_box.offsetLeft,
    ttop = main_box.offsetTop,
    smokes= [],
    deltaX= 2,
    deltaY = 2;

setInterval(fly, 10); 

function fly() {
  if(Math.random()>0.5) {
    var smoke= main_box.cloneNode();

    smoke.classList.add('smoke');
    smoke.style.background= 'gray';
    smoke.style.opacity= 0.2;
    smoke.style.transition= Math.random()+'s';
    smoke.style.width= Math.random()*main_box.offsetWidth+'px';
    smoke.style.height= Math.random()*main_box.offsetHeight+'px';
    smoke.style.marginTop= smoke.offsetHeight+'px';
    smoke.style.borderRadius= (Math.random()*25+25)+'%';
    document.body.appendChild(smoke);
    setTimeout(function() {
      smoke.style.opacity= 0;
    },100);
    
    smokes.push(smoke);
    if(smokes.length>20) {
      smokes[0].parentNode.removeChild(smokes[0]);
      smokes.shift();
    }
  }
  
  if(tleft+deltaX > document.body.offsetWidth-main_box.offsetWidth   || tleft < 0) {
    deltaX= -deltaX;
  }
  if(ttop +deltaY > document.body.offsetHeight-main_box.offsetHeight || ttop  < 0) {
    deltaY= -deltaY;
  }
  tleft+= deltaX;
  ttop += deltaY;
  main_box.style.left = tleft + 'px';
  main_box.style.top  = ttop  + 'px';
}
