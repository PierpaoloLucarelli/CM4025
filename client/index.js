import { WINDOW_WIDTH, WINDOW_HEIGHT } from './config'
import Game from './state/Game'
import { getCookie } from './state/utils'

class App extends Phaser.Game {
  constructor (user) {
    super(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.AUTO)
    this.state.add('Game', Game)
    this.state.add("User", user)
    this.state.start('Game', user)
  }
}

// load data from server
	var user = getCookie("username");
	$.get( "/user/" + user, function(user_details) {
  		const SimpleGame = new App(user_details)
	});