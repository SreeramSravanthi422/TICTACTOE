var player1Name = localStorage.getItem("player1"), player2Name=localStorage.getItem("player2"), turn = "";
var count=0,won1=0,won2=0;
var grid =  [[0,0,0],[0,0,0],[0,0,0]];
var hasWinner = 0, moveCount=0;

function boardMsg(x){
	return $("#board").text(x);
}

function setTurn(){
	var r = Math.floor((Math.random() * 2) + 1);
	hasWinner=0;
	if(r==1){
		turn = player1Name;
		boardMsg(player1Name+"'s turn now!");
	}
	else{
		turn = player2Name;
		boardMsg(player2Name+"'s turn now!");
	}
}

function init(){
		turn = "";
		grid =  [[0,0,0],[0,0,0],[0,0,0]];
		boardMsg("");
		$(".col").map(function() {
    		$(this).text("");
		}).get();
		hasWinner = 0;
		moveCount=0;
}

$("#playButton").click(function (){
	if(hasWinner==1){
			init();
	}
	setTurn();
});

$(".col").click(function (){
	var row = $(this).parent().index();
	var col = $(this).index();

	if(grid[row][col]!==0){
		alert("This position is taken. Please try other position.");
		return;
	}
	if(hasWinner==1){
		alert("Please click play again");
		return;
	}

	if(turn==player1Name){
		moveCount++;
		$(this).text("O");
		grid[row][col] = 1;
		var ifWon = winnerCheck(1,player1Name);
		if(!ifWon){
			if(moveCount>=9){
				boardMsg("Match Drawn!");
				if(count<3){
				   count++;
				   moveCount=0;
				   $("#playButton").text("Play Again!");
				   hasWinner=1;
				   return;
				}
				else{
					Redirect1();
				}
			}else{
				turn = player2Name;
				boardMsg(player2Name+"'s turn now!");
			}
			return;
		}
		else{
			return;
		}
	}
	else if(turn==player2Name){
		moveCount++;
		$(this).text("X");
		grid[row][col] = 2;
		var ifWon = winnerCheck(2,player2Name);
		if(!ifWon){
			if(moveCount>=9){
				boardMsg("Match Drawn!");
                if(count<3){
					count++;
					moveCount=0;
					$("#playButton").text("Play Again!");
					hasWinner=1;
					return;
				 }
				 else{
					 Redirect1();
				 }
			}else{
				turn = player1Name;
				boardMsg(player1Name+"'s turn now!");
			}
			return;
		}
		else{
			/*localStorage.setItem("winner2", won2);*/
			return;
		}
	}
});

function winnerCheck(n,playerName){
	if( (grid[0][0]==n && grid[0][1]==n && grid[0][2]==n) ||
		(grid[1][0]==n && grid[1][1]==n && grid[1][2]==n) ||
		(grid[2][0]==n && grid[2][1]==n && grid[2][2]==n) ||
		(grid[0][0]==n && grid[1][0]==n && grid[2][0]==n) ||
		(grid[0][1]==n && grid[1][1]==n && grid[2][1]==n) ||
		(grid[0][2]==n && grid[1][2]==n && grid[2][2]==n) ||
		(grid[0][0]==n && grid[1][1]==n && grid[2][2]==n) ||
		(grid[0][2]==n && grid[1][1]==n && grid[2][0]==n)
		){
		boardMsg(playerName+" won the game!");
		count++;
		if(playerName == player1Name){
			won1++;
			localStorage.setItem("winner1", won1);
			console.log(won1);
		}
		else if(playerName == player2Name){
			won2++;
			localStorage.setItem("winner2", won2);
			console.log(won2);
		}
		hasWinner = 1;
		moveCount=0;
		if(count<3){
		   $("#playButton").text("Play Again!");
		   return true;
		}
		Redirect1();
	}
	return false;
}
function Redirect1(){
	window.location="win.html";
}
console.log(count);
