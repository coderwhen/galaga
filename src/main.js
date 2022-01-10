import "./assets/css/index.css"
import { GAME_EL } from "./config/game.config"
import BeeGroup from "./model/beeGroup"
import { Player } from "./model/player"

const msg = "galaga game"

const foo = (info) => {
    console.log(info)
}

foo(msg)


setTimeout(() => {
    const beeGroup = new BeeGroup()
    const player = new Player(10, GAME_EL.offsetHeight - 35)
    beeGroup.createBees()
    player.bind()

    window.player = player
}, 200)