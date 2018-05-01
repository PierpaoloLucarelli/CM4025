import { WINDOW_WIDTH, WINDOW_HEIGHT } from './config'
import Game from './state/Game'
import { getCookie } from './state/utils'

class App extends Phaser.Game {
  constructor (user, level) {
    super(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.AUTO)
    this.state.add('Game', Game)
    this.state.add("User", user)
    this.state.start('Game', user)
  }
}

// load data from server
	var user = getCookie("username");
	$.get( "/user/" + user, function(user_details) {
      if(getParameterByName("level")){
        if(user_details.unlock){
          user_details.l = 2;
          const SimpleGame = new App(user_details);
        } else{
          const SimpleGame = new App(user_details);
        }
      } else{
        user_details.l = 1;
        const SimpleGame = new App(user_details);
      }
	});

  $("#respawn-btn").click(function(){
      location.reload();
  });


  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}