// when 2 payers collide
const collision = (socket, win_player, loose_player) => {
    socket.emit('collision', {
      win_username: win_player.username,
      win_id: win_player.id,
      loose_id: loose_player
    })
}

export default collision
