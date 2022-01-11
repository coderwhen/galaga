import {BEES, GAME_EL} from "../config/game.config"
import Base from "./base"
import Bullet from "./bullet"

class Player extends Base {
    constructor(x, y) {
        super('plane', 'plane', x, y, 30, 30)
        this.dir = {
            a: false,
            d: false
        }
        this.isAttack = false
        this.enableMove = false
        this.isCrash = true
        this.onkeydown = this.onkeydown.bind(this)
        this.onkeyup = this.onkeyup.bind(this)
        this.awaitBullet()
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
        if (e.key === " ") {
            this.attack()
        }
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

    awaitBullet() {
        setTimeout(() => {
            this.getCurrentEl().classList.add('attack')
            this.isAttack = false
        }, 1000)
    }

    attack() {
        if (this.isAttack) return
        this.isAttack = true
        this.getCurrentEl().classList.remove('attack')
        document.querySelector('#shoot').play()
        new Bullet(BEES, this.x + 14.5, this.y, false)
        this.awaitBullet()
    }

    entry() {

    }

    destroy() {
        const clone = this.getCurrentEl().cloneNode()
        clone.id = ""
        GAME_EL.appendChild(clone)
        clone.classList.add('destroy')
        clone.classList.remove('attack')
        document.querySelector('#destroyed').play()
        setTimeout(() => {
            clone.remove()
        }, 1000)
    }
}

export {Player}
export default Player