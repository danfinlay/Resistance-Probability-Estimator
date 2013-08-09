function ViewUpdater (game){
	this.game = game;
	return this;
}

ViewUpdater.prototype.renderNames = function(players){
	var newHtml = '';
	players.forEach(function(player){
		newHtml+= '<tr><td>'+player+'</td><td>0</td></td><td>N/A</td><td>';
		newHtml+='<input type="radio" name="leaderRadio" player="'+escape(player);
		newHtml+='"></td><td><input type="checkbox" class="chosenCheckbox" player="'+escape(player)+'"></td></tr>';
	})
	$('#playerTable').html(newHtml);
}

ViewUpdater.prototype.updateGameView = function(){
	
}

module.exports = function(){
	return new ViewUpdater();
}