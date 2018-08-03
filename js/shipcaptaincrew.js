$(document).ready(function(){
	var turn = 0;
	var diceCount = 0;
	var hand = [];
	var ship = 0;
	var captain = 0;
	var crew = 0;
	var score = 0;
	const diceMax = 6;
	
	document.getElementById("turnDisplay").innerHTML = turn;
	
	function drawDice(value, rand){
		$("#dicePic"+ii).remove();
		$("<object id='dicePic"+value+"' data='lib/dice_"+rand+".svg' type='image/svg+xml'><img width='50' src='lib/dice_"+rand+".svg'></object>").appendTo("#dice"+ii);
	}
	
	function shuffleDice(){
	  for(ii = 1; ii < diceCount; ii++){
			  curDice = document.getElementById("dice"+ii);
			  randNum = Math.floor(Math.random() * 6);
			
			  randNum = randNum + 1;
			  hand.push(randNum);
		    drawDice(ii, randNum);	  
		}
	}
	
	//writes score and hand to DOM
	function updateDisplays(){
	  //update turn
	  document.getElementById("turnDisplay").innerHTML = turn;
	  //update hand items
	  if (ship) {
	  	document.getElementById("handDisplay").innerHTML = "Ship";
	  }
	  if (captain) {
	  	document.getElementById("handDisplay").innerHTML = "Ship, Captian";
	  }
	  if (crew) {
	  	document.getElementById("handDisplay").innerHTML = "Ship, Captian, Crew";
	  }
	  //update score
	  if (score !== 0) {
	  	document.getElementById("scoreDisplay").innerHTML = "with a score of "+score;
	  }
	}

	//lockDice in place by removing it from hand 
	function lockDice(thisDice){
		delete hand[thisDice];
	}
	
	//parses hand looking for ship, captain and crew
	function checkHand(){
		hand.sort(function(a, b){return a-b});
		score = 0;

		//loop through each die in hand and determine arsenal and score
		for (var i = hand.length-1; i >= 0; i--) {
			//TODO: condense  logic
			if(hand[i] === 6 && !ship){
				ship = 1;
				lockDice(i); i--; diceCount--;
			}
			if(hand[i] === 5 && ship ===1){
				captain = 1;
				lockDice(i); i--; diceCount--;
			}
			if(hand[i] === 4 && ship ===1 && captain ===1){
				crew = 1;
				lockDice(i); i--; diceCount--;
			}
			if (ship && captain && crew) {
				score = score + hand[i]; 
			}
		}
	}
  
  while(diceCount < 5){
		diceCount = diceCount + 1;
		$("<div id='dice"+diceCount+"' class='diceDiv'></div>").appendTo("#playColumn");
		$("<object id='dicePic"+diceCount+"' data='lib/dice_1.svg' type='image/svg+xml'><img width='50' src='lib/dice_1.svg'></object>").appendTo("#dice"+diceCount);
  }
	
	$("#takeTurn").click(function(){
		if(turn < 3){
		  shuffleDice();
		  checkHand();
		  turn = turn + 1;
		  updateDisplays();
		}
	});
});