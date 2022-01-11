import { BEE_SIZE, getNextId } from "../config/game.config";
import Base from "./base";
import Bezier from "../utils/bezier";

/**
 * 蜜蜂类
 */
class Bee extends Base {
    constructor(className, x, y, ox, oy, direction) {
        super(`bee ${className}`, getNextId('bee-'), x, y, BEE_SIZE, BEE_SIZE)
        this.rock = false
        this.tx = x
        this.ty = y
        this.ox = ox
        this.oy = oy
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
                this.rotate(this.direction ? 45 : -45)
            }
            if (i === bezier.unit * .9) {
                this.rotate(0)
            }
            i++
            if (i < bezier.unit) {
                requestAnimationFrame(fn)
            } else {
                this.rock = true
            }
        }
        fn()
    }

    /**
     * 
     * @param {*} ox 
     * @param {*} oy 
     */
    rockMove(ox, oy) {
        this.tx = this.ox + ox
        this.rock && this.move(this.ox + ox, this.oy)
    }

    rotate(deg) {
        const currentDom = this.getCurrentEl()
        currentDom.style.transform = `rotate(${deg}deg)`
    }

    attack() {
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
            console.log(this.checkCrash(window.player))
            if (i === bezier.unit * .1) {
                this.rotate(this.direction ? -180 : 180)
            }
            else if (i === bezier.unit * .3) {
                this.rotate(this.direction ? -90 : 90)
            }
            else if (i === bezier.unit * .6) {
                this.rotate(this.direction ? -45 : 45)
            }
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
}

export default Bee