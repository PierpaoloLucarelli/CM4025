import player from './../player'


const createText = (game, target) =>
  game.add.text(target.x, target.y, '', {
    fontSize: '12px',
    fill: '#FFF',
    align: 'center'
  })


const updatePlayers = (socket, otherPlayers, game) => {
  socket.on('update-players', playersData => {
    let playersFound = {}
    for (let index in playersData) {
      const data = playersData[index]
      if (otherPlayers[index] === undefined && index !== socket.id) {
        const newPlayer = player(data.x, data.y, game,null, data.car)
        newPlayer.playerName = createText(game, newPlayer)
        newPlayer.speedText = createText(game, newPlayer)
        newPlayer.updatePlayerName(data.playerName.name, data.playerName.x, data.playerName.y)
        otherPlayers[index] = newPlayer
      }

      playersFound[index] = true

      // Update players data
      if (index !== socket.id) {
        // Update players target but not their real position
        otherPlayers[index].target_x = data.x
        otherPlayers[index].target_y = data.y
        otherPlayers[index].target_rotation = data.angle

        otherPlayers[index].playerName.target_x = data.playerName.x
        otherPlayers[index].playerName.target_y = data.playerName.y

        otherPlayers[index].speedText.target_x = data.speed.x
        otherPlayers[index].speedText.target_y = data.speed.y

        otherPlayers[index].speed = data.speed.value
      }
    }

    for (let id in otherPlayers) {
      if (!playersFound[id]) {
        otherPlayers[id].sprite.destroy()
        otherPlayers[id].playerName.destroy()
        otherPlayers[id].speedText.destroy()
        delete otherPlayers[id]
      }
    }
  })
}

export default updatePlayers
