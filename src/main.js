import "./assets/css/index.css"
import Game from "./game/game";

const game = new Game()
window.game = game
document.querySelector('#game-play').onclick = function () {
    game.start()
}

document.querySelector('#replay').onclick = function () {
    window.location.reload()
}
