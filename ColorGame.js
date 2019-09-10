var colors = [];
var genSquares = 6;
var turnsLeft = 3;
var colorPicked = "";
var header = document.querySelector(".header");
var correctMsg = document.querySelector("#winMsg");
var tryAgainbttn = document.querySelector("#tryAgain");
var squareFill = document.querySelectorAll(".square");
var currentColor = document.querySelector("#currentColor");
var mode = document.querySelectorAll(".modeBttn");
var container = document.querySelector(".container");
var turns = document.querySelector("#turns");

//-------------------------------Functions--------------------------------------------
function init() {
    reset();
    gameLogic();
}

//Game logic function
function gameLogic() {
    for(var i = 0; i < squareFill.length; i++) {
        //On click compare rgb value of the square to the chosen color from color array
        //Alert if correct square, else make square disappear
        squareFill[i].addEventListener("click", function() {
            colorPicked = this.style.backgroundColor;
            if(colorPicked === colors[guessColor]) {
                header.style.background = colors[guessColor];
                correctMsg.textContent = "Correct!"
                tryAgainbttn.textContent = "Play Again?"
                for(var i = 0; i<squareFill.length; i++) {
                    squareFill[i].style.backgroundColor = colors[guessColor];
                }
            }
            else {
                turnsLeft -= 1;
                this.style.backgroundColor = "#232323";
                turns.textContent = turnsLeft;
                if(turnsLeft === 0) {
                    for(var i = 0; i < squareFill.length; i++) {
                        if(squareFill[i].style.backgroundColor !== colors[guessColor]){
                            squareFill[i].style.background = "#232323";
                            correctMsg.textContent = "You Lose!";
                            tryAgainbttn.textContent = "Play Again?"
                        }
                    }
                }
            }
        });
    }    
}

//rng function
function rng(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Difficulty Mode generator
function reset() {
    correctMsg.textContent = "";
    this.textContent = "New Colors";
    for(var i = 0; i < genSquares; i++) {
        colors[i] = "rgb("+ rng(0, 255) + ", " + rng(0, 255) + ", " + rng(0, 255) + ")";
    }
    for(var i = 0; i < squareFill.length; i++) {
        if(i < genSquares) {
            squareFill[i].style.display = "block";
            squareFill[i].style.backgroundColor = colors[i];
        }
        else {
            squareFill[i].style.display = "none";
        }
    }
    guessColor = rng(0, genSquares - 1);
    currentColor.textContent = colors[guessColor];    

    header.style.background = "rgb(9, 136, 175)";
    turns.textContent = turnsLeft;
}

//-----------------------------Initial Page Content------------------------------------------
init();

//------------------------------------Buttons---------------------------------------------
//Retry
tryAgainbttn.addEventListener("click", function() {
    correctMsg.textContent = "";
    this.textContent = "New Colors";
    for(var i = 0; i < genSquares; i++) {
        colors[i] = "rgb("+ rng(0, 255) + ", " + rng(0, 255) + ", " + rng(0, 255) + ")";
    }
    for(var i = 0; i < genSquares; i++) {
        squareFill[i].style.display = "block";
        squareFill[i].style.backgroundColor = colors[i];
    }
    guessColor = rng(0, genSquares - 1);
    currentColor.textContent = colors[guessColor];    
    
    if(genSquares === 3) {
        turnsLeft = 2;
    }
    else if(genSquares === 6) {
        turnsLeft = 3;
    }
    else if(genSquares === 12) {
        turnsLeft = 2;
    }
    else if(genSquares === 20) {
        turnsLeft = 1;
    }

    header.style.background = "rgb(9, 136, 175)";
    turns.textContent = turnsLeft;
});

//Difficulty mode handler
for(var i = 0; i < mode.length; i++) {
    mode[i].addEventListener("click", function() {
        mode[0].classList.remove("selected");
        mode[1].classList.remove("selected");
        mode[2].classList.remove("selected");
        mode[3].classList.remove("selected");
        this.classList.add("selected");

        this.textContent === "Easy" ? (genSquares = 3, turnsLeft = 2) : 
            this.textContent === "Medium" ? (genSquares = 6, turnsLeft = 3) : 
                this.textContent === "Hard" ? (genSquares = 12, turnsLeft = 2) : (genSquares = 20, turnsLeft = 1);

        for(var i = 0; i < squareFill.length; i++) {
            squareFill[i].classList.remove("impossible");
            squareFill[i].classList.remove("hard");
            if(genSquares === 20) {               
                squareFill[i].classList.add("impossible");
            }
            else if(genSquares === 12) {               
                squareFill[i].classList.add("hard");
            }
        }         
        reset();
    });
}