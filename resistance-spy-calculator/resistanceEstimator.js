var players = [];
var spyPermutations = require('./spyPermutations');

function Player(playerName){
	this.name = playerName;
}

function Game( players ){

	this.players = players;
	this.playerCount = this.players.length;

	this.missions = [];
	this.rules = generateRules( players.length );

	var spyCount = this.rules.spies;
	this.spyCount = spyCount;

	this.possibilities = spyPermutations.generate(this.players, this.spyCount);

	this.players.forEach(function(player){
		player.spyOdds = spyCount / players.length;
	});

	this.possibilities = spyPermutations.generate(this.players, this.spyCount);
}

Game.prototype.updateOdds = function(){

	//Reset player odds
	this.players.forEach(function(player){
		player.spyOdds = 0;
	});

	var possibilityCounter = 0;

	//Add 1 to each player's spy odds for each scenerio in which they are a spy:
	this.possibilities.forEach(function(possibility){
		possibilityCounter += possibility.odds;

		possibility.spies.forEach(function(possibleSpy){
			possibleSpy.spyOdds += possibility.odds;
		});
	});

	//Normalize odds:
	this.players.forEach(function(player){
		player.spyOdds /= possibilityCounter;
	})

	return this.players;

}

function Mission ( leader, selectedPlayers, failCount ){
	this.leader = leader;
	this.players = selectedPlayers;
	this.passed = failCount === 0;
	this.votesAgainst = failCount;
}

Mission.prototype.wasIn = function( playerName ){
	this.players.forEach( function( player ){
		if( player.name === playerName ){
			return true;
		}
	})
	return false;
}

function generateRules( numberOfPlayers ){
	var ruleData = { //Decimals represent rounds where two spies are required to fail a mission.
		5:[2, 3, 2, 3, 3],
		6:[2, 3, 4, 3, 4],
		7:[2, 3, 3, 4.5, 4],
		8:[3, 4, 4, 5.5, 5],
		9:[3, 4, 4, 5.5, 5],
		10:[3, 4, 4, 5.5, 5]
	};
	
	var spyCounts = {
		5: 2,
		6: 2, 
		7: 3,
		8: 3, 
		9: 3,
		10: 4
	};

	return {
		rounds: ruleData[ numberOfPlayers ],
		spies: spyCounts[ numberOfPlayers ]
	};
}

Game.prototype.missionComplete = function( leader, chosenOnes, failCount ){
	var mission = new Mission( leader, chosenOnes, failCount );

	this.possibilities.forEach(function(possibility){
		if(!isPossible(possibility, mission, failCount)){
			possibility.odds = 0;
		}
	})
	this.missions.push( mission );
};

function isPossible( possibility, mission, failCount ){
	var inMissionCount = 0;
	var notInMissionCount = 0;

	possibility.spies.forEach(function(spy){
		if(inArray(spy, mission.players)){
			inMissionCount++;
		}else{
			notInMissionCount++;
		}
	})
	return inMissionCount >= failCount;
}

function inArray(o, arr){
	for (var i = 0, len = arr.length; 0 < len; i++){
		if(o === arr[i])
			return true;
	}
	return false;
}

module.exports = function newGame (playerNameArray){
	var players = [];
	playerNameArray.forEach(function(name){
		var player = new Player(name);
		players.push(player);
	})
	var game = new Game(players);
	return game;
}