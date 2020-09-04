// All icons
let icon = $(".icon");
let icons = [...icon];

// Smiley variable
let smile = document.querySelectorAll(".fa-smile-wink");


// moves variable
let moves = 0;
let counter = document.querySelector(".moves");

// deck variable
const deck = document.getElementById("icon-deck");




// matched icon variable
let matchedIcon = document.getElementsByClassName("match");

 // smiley list
 let smileyList = document.querySelectorAll(".smile li");

 // close icon in pop up
 let closeicon = document.querySelector(".close");

 // pop up
 let popUp = document.getElementById("popup1")

 // Open cards array
let openedIcons = [];


// shuffles icons

function shuffle(arr) {
    let currentInd = arr.length, tempVal, randomInd;

    while (currentInd !== 0) {
        randomInd = Math.floor(Math.random() * currentInd);
        currentInd -= 1;
        tempVal = arr[currentInd];
        arr[currentInd] = arr[randomInd];
        arr[randomInd] = tempVal;
    }

    return arr;
};


// shuffles on refresh
document.body.onload = startGame();


// Function to start a new game
function startGame(){
 
// shuffle icon deck
    icons = shuffle(icons);


// empty the open icon array
   let openedIcons = [];

//reset timer
second = 0;
minute = 0; 
hour = 0;
let timer = document.querySelector(".timer");
timer.innerHTML = "0 mins 0 secs";
clearInterval(interval);
// reset moves
moves = 0;
counter.innerHTML = moves;
// reset smiles
for (let i= 0; i < smile.length; i++){
    smile[i].style.color = "#";
    smile[i].style.visibility = "visible";
}

// removes classes from icons for reset
    for (let i = 0; i < icons.length; i++){
        deck.innerHTML = "";
        [].forEach.call(icons, function(item) {
            deck.appendChild(item);
        });
        icons[i].classList.remove("show", "open", "match", "disabled");
    }

  
}

// toggles classes
let displayIcon = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// add opened icons to open icon arrayy and check for matches
function iconOpen() {
    openedIcons.push(this);
    let len = openedIcons.length;
    if(len === 2){
        moveTimer();
        if(openedIcons[0].type === openedIcons[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};


function matched(){
    openedIcons[0].classList.add("match", "disabled");
    openedIcons[1].classList.add("match", "disabled");
    openedIcons[0].classList.remove("show", "open", "no-event");
    openedIcons[1].classList.remove("show", "open", "no-event");
    openedIcons = [];
}


function unmatched(){
    openedIcons[0].classList.add("unmatched");
    openedIcons[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedIcons[0].classList.remove("show", "open", "no-event","unmatched");
        openedIcons[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedIcons = [];
    },750);
}


// Temproary disablement of icons
function disable(){
    Array.prototype.filter.call(icons, function(icon){
        icon.classList.add('disabled');
    });
}


// enable and disable matched icons
function enable(){
    Array.prototype.filter.call(icons, function(icon){
        icon.classList.remove('disabled');
        for(let i = 0; i < matchedIcon.length; i++){
            matchedIcon[i].classList.add("disabled");
        }
    });
}


//function to get timer to start
function moveTimer(){
    moves++;
    counter.innerHTML = moves;
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
    // setting smiles via  moves
    if (moves > 5 && moves < 7){
        for( i= 0; i < 4; i++){
            if(i > 2){
                smile[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 10 && moves < 12) {
        for( i= 0; i < 4; i++){
            if(i > 1){
                smile[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 14){
        for( i= 0; i < 4; i++){
            if(i > 0){
                smile[i].style.visibility = "collapse";
            }
        }
    }
  
}


// timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


// congrats function
function congrats(){
    if (matchedIcon.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

    
        popUp.classList.add("show");

    
        let smileRates = document.querySelector(".smile").innerHTML;

        //show stats at end of game
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("smileRates").innerHTML = smileRates;
        document.getElementById("totalTime").innerHTML = finalTime;

    
        closePopup();
    };
}


// close popup
function closePopup(){
    closeicon.addEventListener("click", function(e){
        popUp.classList.remove("show");
        startGame();
    });
}


// play again function
function playAgain(){
    popUp.classList.remove("show");
    startGame();
}


// event listener added through loop
for (let i = 0; i < icons.length; i++){
    icon = icons[i];
    icon.addEventListener("click", displayIcon);
    icon.addEventListener("click", iconOpen);
    icon.addEventListener("click",congrats);
};
