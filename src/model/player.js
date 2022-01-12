import {BEES, GAME_EL} from "../config/game.config"
import Base from "./base"
import Bullet from "./bullet"
import Bezier from "../utils/bezier";

/**
 * 玩家类
 */
class Player extends Base {
    /**
     *
     * @param x 横坐标
     * @param y 纵坐标
     */
    constructor(x, y) {
        super('plane', 'plane', x, y, 30, 30)
        this.dir = {
            a: false,
            d: false
        }
        this.ox = x
        this.oy = y
        this.isAttack = false
        this.enableMove = false
        this.isCrash = true
        this.onkeydown = this.onkeydown.bind(this)
        this.onkeyup = this.onkeyup.bind(this)
        this.entry()
    }

    /**
     * 绑定键盘控制事件
     */
    bind() {
        document.addEventListener('keydown', this.onkeydown)
        document.addEventListener('keyup', this.onkeyup)
        this.startMove()
    }
    /**
     * 解绑键盘控制事件
     */
    unBind() {
        document.removeEventListener('keydown', this.onkeydown)
        document.removeEventListener('keyup', this.onkeyup)
    }

    /**
     * 键盘按下事件
     * @param e
     */
    onkeydown(e) {
        if (e.key === " ") {
            this.attack()
        }
        this.dir[e.key] = true
    }
    /**
     * 键盘弹起事件
     * @param e
     */
    onkeyup(e) {
        this.dir[e.key] = false
    }

    /**
     * 开始移动方法
     */
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

    /**
     * 停止移动
     */
    stopMove() {
        this.enableMove = false
    }

    /**
     * 等待子弹
     */
    awaitBullet() {
        setTimeout(() => {
            this.getCurrentEl().classList.add('attack')
            this.isAttack = false
        }, 1000)
    }

    /**
     * 攻击方法
     */
    attack() {
        if (this.isAttack) return
        this.isAttack = true
        this.getCurrentEl().classList.remove('attack')
        document.querySelector('#shoot').play()
        new Bullet(BEES, this.x + 14.5, this.y, false)
        this.awaitBullet()
    }

    /**
     * 入场方法
     */
    entry() {
        this.isCrash = false
        const bezier = new Bezier([
            {
                x: this.ox,
                y: GAME_EL.offsetHeight + 20
            },
            {
                x: this.ox,
                y: this.oy
            }
        ], 60)
        const points = bezier.excute()
        let i = 0
        const fn = () => {
            this.move(points[i].x,points[i].y)
            i++
            if(i < bezier.unit) {
                requestAnimationFrame(fn)
            } else {
                this.awaitBullet()
                // this.isCrash = true
                setTimeout(() => {
                    this.stopGod()
                }, 5000)
            }
        }
        fn()
    }

    /**
     * 摧毁方法
     */
    destroy() {
        const clone = this.getCurrentEl().cloneNode()
        clone.id = ""
        GAME_EL.appendChild(clone)
        clone.classList.add('destroy')
        clone.classList.remove(...['attack','await'])
        document.querySelector('#destroyed').play()
        const el = document.querySelector('.life-item')
        if (el) {
            el.remove()
        } else {
            alert('game-over')
            console.log('game over')
        }
        this.startGod()
        this.entry()
        setTimeout(() => {
            clone.remove()
        }, 500)
    }

    startGod() {
        this.isCrash = false
        this.getCurrentEl().classList.add('god')
    }

    stopGod() {
        this.isCrash = true
        this.getCurrentEl().classList.remove('god')
    }
}

export {Player}
export default Player