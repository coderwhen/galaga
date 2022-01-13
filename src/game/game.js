import BeeGroup from "../model/beeGroup";
import {BEE_ROW_SIZE, GAME_EL} from "../config/game.config";
import Player from "../model/player";

class Game {
    constructor() {

    }

    start() {
        document.querySelector('.game-start').classList.add('hide')
        document.querySelector('.game-play').classList.remove('hide')
        const beeGroup = new BeeGroup((GAME_EL.offsetWidth - BEE_ROW_SIZE) / 2, 50)
        const player = new Player(GAME_EL.offsetWidth / 2 - 40, GAME_EL.offsetHeight - 35)
        beeGroup.createBees()
        player.bind()

        window.player = player
        score.renderHigh()
    }

    pause() {

    }

    over() {
        document.querySelector('.game-play').classList.add('hide')
        document.querySelector('.game-over').classList.remove('hide')
        window.score.save()
    }
}

export default Game