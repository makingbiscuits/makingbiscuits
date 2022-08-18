    

// variables:    


let player = document.querySelectorAll(".photo-player");
let playerSelection;
let round;
let equalSign = document.querySelector('#equalSign');
let playerSign = document.querySelector('#playerSign');
let computerSign = document.querySelector('#computerSign');
let playerScore = document.querySelector('#playerScore');
let computerScore = document.querySelector('#computerScore');
let winRound = document.querySelector("#middle");
    
let roundCount = 0;
let playerCount = 0;
let computerCount = 0;
    
let resetButton = document.querySelector("#resetButton");


// const audioWin = new Audio("/audio/happy1.wav");
// const audioLose = new Audio("/audio/pralaimejimas.wav");
// const audioTie = new Audio("/audio/lygiosios.wav");


// randomize computer move:

let items = ["šulinys", "popierius", "žirklės"];
let computerSelection = computerPlay();
function computerPlay(){
    return items[Math.floor(Math.random()*items.length)];
};  

// randomize selection for animation-intervals:   

let myPix = new Array("photos/šulinys.png","photos/popierius.png",);
    
function choosePic() {
    let randomNum = Math.floor(Math.random() * myPix.length);
    document.querySelector("#drawPlayer").src = myPix[randomNum];
}
function choosePicPC() {
    let randomNum = Math.floor(Math.random() * myPix.length);
    document.querySelector("#drawPC").src = myPix[randomNum];
}         
    


// checking and comparing moves by Player and computer, adding count to score, show score:      

function singleRound(){  
    if (playerSelection == computerSelection){
    round = ++roundCount;
    playerScore.textContent = ++playerCount;
    computerScore.textContent = ++computerCount;
    winRound.textContent = "Lygiosios";
    equalSign.textContent = "=";
    computerSign.textContent = computerSelection;
    setTimeout(function(){
        document.getElementById('audioLygiosios').play();
        console.log();
        }, 700)
    }
    else if (playerSelection == "šulinys" && computerSelection == "žirklės" || playerSelection == "popierius" && computerSelection == "šulinys" || playerSelection == "žirklės" && computerSelection == "popierius"){
    round = ++roundCount;
    playerScore.textContent = ++playerCount;
    winRound.textContent = "Valio!";
    equalSign.textContent = ">";
    computerSign.textContent = computerSelection;
    setTimeout(function(){
        document.getElementById('audioHappy').play();
        console.log();
        }, 700)
    }
    else if (playerSelection == "šulinys" && computerSelection == "popierius" || playerSelection == "popierius" && computerSelection == "žirklės" || playerSelection == "žirklės" && computerSelection == "šulinys"){
    round = ++roundCount;
    computerScore.textContent = ++computerCount;
    winRound.textContent = "Et...";
    equalSign.textContent = "<";
    computerSign.textContent = computerSelection;
    setTimeout(function(){
        document.getElementById('audioPralaimejimas').play();
        console.log();
        }, 700)
    }
    endGame();
}


    // show or hide paws and round results:

function roundGame(){
    $("#roundButton").on("click", function(){
    $(".photo-player, .photo-pc").show();
    $("#drawPlayer, #drawPC").hide();
    $("#roundButton").hide();
    $("#middle").hide();
})};
    
    

// check whether the game is over:

function endGame(){
    if (playerCount > 4){
        winRound.textContent = "Laimėjote!";
        resetButton.textContent = "Iš naujo?";
        }
    else if (computerCount > 4){
        winRound.textContent = "Pralaimėjote!";
        resetButton.textContent = "Iš naujo?";
        }  
    }


// resetting the game on reset button:  

function resetGame() {
    resetButton.addEventListener('click',() => 
    location.reload());
}


// calling functions on clicks, setting interval:

player.forEach((player) => {
player.addEventListener('click', () => {
    playerSelection = player.id;
    playerSign.textContent = player.id; 
    computerSign.textContent = computerSelection;
    computerSelection = computerPlay();
    $("#game-results").hide();
    $(".container-results-2").hide();
    console.log(playerSelection, computerSelection);
});
});
    
$(".photo-player").on("click", function(){
    resetGame();
    roundGame();
    endGame();
    singleRound();
    $imgid = $(this).attr('imgid');
    $("#middle").hide();
    $(".photo-player, .photo-pc").hide();
    setTimeout(function(){
        $("#middle").show();
        if (playerCount < 5 && computerCount < 5) {
            $("#roundButton").fadeIn();
            $("#game-results").fadeIn();
            $(".container-results-2").fadeIn();
            roundButton.textContent = "Dar?";
        }
    }, 1000);
    var startTime = new Date().getTime();
    var interval = setInterval(function(){
        if(new Date().getTime() - startTime > 1000){
            $("#drawPlayer").fadeOut(100, function(){
                $(this).attr("src","photos/"+$imgid+".png").fadeIn(100);
            });
            $('#drawPC').fadeOut(100, function(){
                $(this).attr("src","photos/"+computerSelection+".png").fadeIn(100);
            });
            clearInterval(interval);
            return;
        }
        $('#drawPlayer').fadeOut(100, function(){
            $(this).html(choosePic()).fadeIn(100);
        });
        $('#drawPC').fadeOut(100, function(){
            $(this).html(choosePicPC()).fadeIn(100);
        });
    }, 100);
});
    
    