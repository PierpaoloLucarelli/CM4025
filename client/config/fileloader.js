import { ASSETS_URL } from '.'

const fileLoader = game => {
  game.load.crossOrigin = 'Anonymous'
  game.stage.backgroundColor = '#1E1E1E'
  game.load.image('asphalt', `${ASSETS_URL}/sprites/terrain/terrain.png`)
  game.load.image('car1', `${ASSETS_URL}/sprites/car1/car1.png`)
}

export default fileLoader