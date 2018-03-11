const collision = (socket, win_player, loose_player) => {
    socket.emit('collision', {
      win_id: win_player,
      loose_id: loose_player
    })
}

export default collision
