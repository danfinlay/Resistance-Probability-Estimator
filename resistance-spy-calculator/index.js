var gameEstimator = require('./resistanceEstimator');
var view = require('./view')();
var game;
var gameStarted = false;
var players = [];
var failsPlayed = 0;
var _ = require('underscore');

$('#newPlayerButton').click(function(e){
	var name = $('#playerName').val();
	players.push(name);
	view.renderNames(players);
});

$('.failCardButtons button').on('click', function(e){
	e.preventDefault();
	$('.failCardButtons button').removeClass('active');
	failsPlayed = parseInt($(this).attr('val'));
	$(this).addClass('active');
})

$('#recordMissionButton').click(function(e){
	console.log("Record mission pressed.");
	if(!gameStarted){
		gameStarted = true;
		console.log("Trying to start game with players: "+JSON.stringify(players));
		game = gameEstimator(players);
	}
	var chosenPlayers = [];
	playerEls = $('.chosenCheckbox');
	var thesePlayers = _map(playerEls, function(el){
		return unescape(el.attr('name'));
	});
	console.log("thesePlayers checked: "+JSON.stringify(thesePlayers));

	game.missionComplete( thesePlayers, failsPlayed );
	view.updateGameView();
});