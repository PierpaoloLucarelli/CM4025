const death = (socket, player) => {
  socket.on('death', () => {
      $(".popup").show();
      player.sprite.destroy()
      player.playerName.destroy()
      player.speedText.destroy()
  })
}

export default death
