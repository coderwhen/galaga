import "./assets/css/index.css"
import {BEE_ROW_SIZE, GAME_EL} from "./config/game.config"
import BeeGroup from "./model/beeGroup"
import Player from "./model/player"
import md5 from "md5-node"

document.querySelector('#game-play').onclick = function () {
    document.querySelector('.game-start').remove()
    const beeGroup = new BeeGroup((GAME_EL.offsetWidth - BEE_ROW_SIZE) / 2, 50)
    const player = new Player(GAME_EL.offsetWidth / 2 - 40, GAME_EL.offsetHeight - 35)
    beeGroup.createBees()
    player.bind()

    window.player = player
}

window.md5 = md5
console.log(md5('123456'))