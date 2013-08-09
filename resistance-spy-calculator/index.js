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

	this.spyCount = this.rules.spies.length;

	this.possibilities = [];
}

function Mission ( selectedPlayers, passed, failCount ){
	this.players = selectedPlayers;
	this.passed = passed;
	this.votesAgainst = failCount;
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
		rounds: ruleData[numberOfPlayers],
		spies: spyCounts[ numberOfPlayers ]
	};
}

Game.prototype.missionComplete( chosenOnes, passed ){
	missions.push( new Mission( chosenOnes, passed );
};

Game.prototype.initialOdds(){
	this.players.forEach(function(player){
		player.spyOdds = this.rules.spies / this.players.length;
	});

	this.possibilities = spyPermutations.generate(this.players, this.spyCount);
}

Round.prototype.wasIn( playerName ){
	this.players.forEach( function( player ){
		if( player.name === playerName ){
			return true;
		}
	})
	return false;
}

Game.prototype.oddsToDate( roundNumber ){

	var round = this.missions [ roundNumber - 1 ];
	var playersInMission = round.players.length;

	//Remember, decimals represent needing 2 spies to fail the mission.
	var spiesToFail = this.rules.rounds[ roundNumber ] % 1 !== 0 ? 2 : 1;

	var oddsForMissionMembers = round.votesAgainst / playersInMission;
	var oddsForNonMissionMembers = 

}