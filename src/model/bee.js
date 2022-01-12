import {BEE_SIZE, deleteBee, getBeeScore, getNextId} from "../config/game.config";
import Base from "./base";
import Bezier from "../utils/bezier";
import Bullet from "./bullet";

/**
 * 蜜蜂类
 */
class Bee extends Base {
    constructor(className, x, y, ox, oy, direction) {
        super(`bee ${className}`, getNextId('bee-'), x, y, BEE_SIZE, BEE_SIZE)
        this.type = className
        this.rock = false
        this.tx = x
        this.ty = y
        this.ox = ox
        this.oy = oy
        this.isDead = false
        this.isCrash = false
        this.direction = direction
    }

    /**
     * 进场
     */
    entry() {
        let i = 0
        const fn = () => {
            const bezier = new Bezier(this.direction ?
                [
                    { x: 260, y: -50 },
                    { x: 10, y: 100 },
                    { x: this.tx, y: this.ty }
                ] :
                [
                    { x: 260, y: -50 },
                    { x: 520, y: 100 },
                    { x: this.tx, y: this.ty }
                ], 120)
            const points = bezier.excute()
            this.move(points[i].x, points[i].y)
            if (i === 5) {
                this.rotate(this.direction ? -45 : 45)
            }
            if (i === bezier.unit * .9) {
                this.rotate(0)
            }
            i++
            if (i < bezier.unit) {
                requestAnimationFrame(fn)
            } else {
                this.isCrash = true
                this.rock = true
                this.getCurrentEl().classList.add('await')
            }
        }
        fn()
    }

    /**
     * 跟随阵列移动
     * @param {*} ox 阵列原点x
     * @param {*} oy 阵列原点y
     */
    rockMove(ox, oy) {
        this.tx = this.ox + ox
        this.ty = this.oy + oy
        this.rock && this.move(this.tx, this.ty)
    }

    /**
     * 蜜蜂旋转角度
     * @param {number} deg 旋转角度
     */
    rotate(deg) {
        const currentDom = this.getCurrentEl()
        currentDom.style.transform = `rotate(${deg}deg)`
    }

    attack() {
        this.getCurrentEl().classList.remove('await')
        this.rock = false
        const bezier = new Bezier(this.direction ?
            [
                { x: this.x, y: this.y },
                { x: this.x - 600, y: this.y - 100 },
                { x: this.x + 50, y: this.y + 200 },
                { x: window.player.x, y: window.player.y },
                { x: window.player.x, y: window.player.y + 100 }
            ] :
            [
                { x: this.x, y: this.y },
                { x: this.x + 600, y: this.y - 100 },
                { x: this.x - 50, y: this.y + 200 },
                { x: window.player.x - 40, y: window.player.y },
                { x: window.player.x, y: window.player.y + 100 }
            ],
            120
        )
        const points = bezier.excute()
        let i = 0
        const fn = () => {
            this.move(points[i].x, points[i].y)
            i++
            if(this.checkCrash(window.player)) {
                window.player.destroy()
                this.destroy()
                this.isCrash = false
                return
            }
            if (i === bezier.unit * .1) {
                this.rotate(this.direction ? -180 : 180)
                this.sendBullet()
            }
            else if (i === bezier.unit * .3) {
                this.rotate(this.direction ? -90 : 90)
            }
            else if (i === bezier.unit * .6) {
                this.rotate(this.direction ? -45 : 45)
            }
            if(this.isDead) return
            if (i < bezier.unit) {
                requestAnimationFrame(fn)
            } else {
                setTimeout(() => {
                    this.entry()
                }, 5000)
            }
        }
        fn()
    }

    destroy(isPlayerDestroy) {
        this.isDead = true
        if(isPlayerDestroy) {
            window.score.compute(getBeeScore(this.type))
        }
        const current = this.getCurrentEl()
        current.classList.add('destroy')
        document.querySelector('#hit').play()
        deleteBee(this.id)
        setTimeout(() => {
            this.remove()
        }, 500)
    }

    sendBullet() {
        new Bullet([window.player], this.x ,this.y, true)
    }
}

export default Bee