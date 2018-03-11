const death = (socket) => {
  socket.on('death', () => {
      alert("ded");
  })
}

export default death
