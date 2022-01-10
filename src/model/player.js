import { GAME_EL } from "../config/game.config"
import Base from "./base"

class Player extends Base {
    constructor(x, y) {
        super('plane', 'plane', x, y)
        this.dir = {
            a: false,
            d: false
        }
        this.enableMove = false
        this.onkeydown = this.onkeydown.bind(this)
        this.onkeyup = this.onkeyup.bind(this)
    }

    bind() {
        document.addEventListener('keydown', this.onkeydown)
        document.addEventListener('keyup', this.onkeyup)
        this.startMove()
    }

    unBind() {
        document.removeEventListener('keydown', this.onkeydown)
        document.removeEventListener('keyup', this.onkeyup)
    }

    onkeydown(e) {
        this.dir[e.key] = true
    }

    onkeyup(e) {
        this.dir[e.key] = false
    }

    startMove() {
        if (this.enableMove) return
        this.enableMove = true
        const fn = () => {
            if (this.dir.a) {
                this.x -= 5
                if (this.x <= 0) this.x = 5
                this.move(this.x, this.y)
            } else if (this.dir.d) {
                this.x += 5
                if (this.x >= GAME_EL.offsetWidth - 30) this.x = GAME_EL.offsetWidth - 5 - 30
                this.move(this.x, this.y)
            }
            this.enableMove && requestAnimationFrame(fn)
        }
        fn()
    }

    stopMove() {
        this.enableMove = false
    }
}

export { Player }
export default Player