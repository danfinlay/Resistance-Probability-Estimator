function ViewUpdater (game){
	this.game = game;
	return this;
}

ViewUpdater.prototype.renderNames = function(players){
	var newHtml = '';
	players.forEach(function(player){
		newHtml+= '<tr><td>'+player+'</td><td>0</td></td><td>N/A</td><td>';
		newHtml+='<input type="radio" name="leaderRadio" value="'+escape(player);
		newHtml+='"></td><td><input type="checkbox" class="chosenCheckbox" player="'+escape(player)+'"></td></tr>';
	})
	$('#playerTable').html(newHtml);
}

ViewUpdater.prototype.updateGameView = function(){

	//Update missions:
	var newHtml = '';
	for(var i = 0, len = this.game.missions.length; i < len; i++){
		var color = this.game.missions[i].passed ? 'success' : 'danger';
		newHtml+='<tr class="'+color+'"><td>'+i+'</td><td>'+this.game.missions[i].leader+'</td><td>';
		newHtml+=JSON.stringify(this.game.missions[i].players)+'</td><td>';
		newHtml+=this.game.missions[i].votesAgainst+'</td></tr>';
	}
	$('#missionTable').html(newHtml);

	//Update possibilities:
	newHtml = '';
	for(var i = 0, len = this.game.possibilities.length; i < len; i++){
		if(this.game.possibilities.odds > 0){
			newHtml+='<tr>';
			for(var x = 0; length = this.game.possibilities[i].spies.length; x++){
				newHtml+='<td>'+this.game.possibilities[i].spies[x].name+'</td>';
			}	
			newHtml+='</tr>';
		}
	}
	$('#possibilityTable').html(newHtml);
}

module.exports = function(){
	return new ViewUpdater();
}