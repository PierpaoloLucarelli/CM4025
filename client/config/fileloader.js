// load the assests like cars and bacgrkound
import { ASSETS_URL } from '.'

const fileLoader = game => {
  game.load.crossOrigin = 'Anonymous'
  game.stage.backgroundColor = '#1E1E1E'
  game.load.image('asphalt', `${ASSETS_URL}/sprites/terrain/terrain.png`)
  game.load.image('background', `${ASSETS_URL}/sprites/bg/bg.png`)
  game.load.image('background2', `${ASSETS_URL}/sprites/bg/bg2.png`)
  game.load.image('car1', `${ASSETS_URL}/sprites/car1/car1.png`)
  game.load.image('car2', `${ASSETS_URL}/sprites/car2/car2.png`)
  game.load.image('car3', `${ASSETS_URL}/sprites/car3/car3.png`)
}

export default fileLoader