import { WORLD_SIZE } from '../config'
import { createText } from './utils'
import fileLoader from '../config/fileloader'
import createWorld from './world/createWorld'
import player from './player'
import newPlayer from './sockets/newPlayer'
import updatePlayers from './sockets/updatePlayers'
import collision from './sockets/collision'
import death from './sockets/death'
import getCookie from "./utils"
import playerMovementInterpolation from './predictions/playerMovementInterpolation'

const SERVER_IP = '192.168.0.7:8000'
let otherPlayers = {}

class Game extends Phaser.State {
  constructor () {
    super()
    this.player = {}
    this.socket = null
  }

  preload () {
    // Loads files
    this.user = this.state.states.User;
    fileLoader(this.game)
  }

  create () {
    const { width, height } = WORLD_SIZE
    // Creates the world
    createWorld(this.game)
    // Connects the player to the server
    this.socket = io(SERVER_IP)
    // Creates the player passing the X, Y, game and socket as arguments
    this.player = player(Math.random() * width, Math.random() * height / 2, this.game, this.socket, this.user.car)
    // Creates the player name text
    this.player.playerName = createText(this.game, this.player.sprite.body)
    // Creates the player speed text
    this.player.speedText = createText(this.game, this.player.sprite.body)

    // Sends a new-player event to the server
    newPlayer(this.socket, this.player, this.user.car)
    // update all players
    updatePlayers(this.socket, otherPlayers, this.game)
    death(this.socket, this.player)

    // Configures the game camera
    this.game.camera.x = this.player.sprite.x - 800 / 2
    this.game.camera.y = this.player.sprite.y - 600 / 2

    // Scale game to fit the entire window
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
  }

  update () {
    this.player.drive(this.game)


    // Move the camera to follow the player
    let cameraX = this.player.sprite.x - 800 / 2
    let cameraY = this.player.sprite.y - 600 / 2
    this.game.camera.x += (cameraX - this.game.camera.x) * 0.08
    this.game.camera.y += (cameraY - this.game.camera.y) * 0.08

    // Interpolates the players movement
    playerMovementInterpolation(otherPlayers)
    this.detectCollisions()
  }

  detectCollisions () {
    let tip = this.getCarTip()
    for (let id in otherPlayers) {
        let p = otherPlayers[id].sprite.getBounds()
        if(tip[0] >= p.x && tip[0] <= p.x + p.width){
            if(tip[1] >= p.y && tip[1] <= p.y + p.height){
                // delete the player that died
                // emit socket.io event to server with id of person that won and person that died
                let win_player = {id: this.player.socket.id, username: this.player.username }
                collision(this.socket, win_player, id)
            }
        }
    }
  }

  getCarTip(){
    const p = this.player.sprite
    let x = p.body.x + (Math.cos(p.body.rotation * p.width / 2))
    let y = p.body.y + (Math.sin(p.body.rotation * p.width / 2))
    return [x,y]
  }


}

export default Game
