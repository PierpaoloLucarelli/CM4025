const death = (socket, player) => {
  socket.on('death', () => {
      alert("ded");
      player.sprite.destroy()
      player.playerName.destroy()
      player.speedText.destroy()
  })
}

export default death
