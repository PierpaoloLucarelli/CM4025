// creating a new player
const createPlayer = (x, y, game, car) => {
	if(car == null){
		car = "car1"
	}
  const sprite = game.add.sprite(x, y, car)
  game.physics.p2.enable(sprite, false)
  return sprite
}

export default createPlayer