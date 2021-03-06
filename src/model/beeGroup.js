import {BEES, BEE_POINTS, BEE_ROW_SIZE, BEE_SIZE, GAME_EL, getBeeType, pushBee, getBee} from "../config/game.config";
import Bee from "./bee";

/**
 * 蜜蜂组类
 */
class BeeGroup {
    /**
     *
     * @param {number} ox 原点x坐标
     * @param {number} oy 原点y坐标
     */
    constructor(ox, oy) {
        this.ox = ox
        this.oy = oy
        this.isRock = false
    }

    /**
     * 创建蜜蜂方法
     */
    createBees() {
        BEE_POINTS.forEach((rowBees, row) => {
            rowBees.forEach((beeType, column) => {
                if (!beeType) return
                const bee = new Bee(
                    getBeeType(beeType),
                    column * BEE_SIZE + this.ox,
                    row * BEE_SIZE + this.oy,
                    column * BEE_SIZE,
                    row * BEE_SIZE,
                    column < BEE_POINTS[0].length / 2
                )
                pushBee(bee)
            })
        })

        this.entryBees()
        this.rockMove()
    }

    /**
     * 蜜蜂入场方法
     */
    entryBees() {
        const bees = Object.keys(BEES)
        let i = 0
        const timer = setInterval(() => {
            BEES[bees[i]].entry()
            i++
            if (i >= bees.length) {
                clearInterval(timer)
                this.attackBee()
            }
        }, 500)
    }

    /**
     * 阵列移动
     */
    rockMove() {
        this.isRock = true
        const speed = 1
        let x = speed
        const fn = () => {
            this.ox += x
            if (this.ox <= 5) {
                this.ox = 5
                x = speed
            } else if (this.ox >= (GAME_EL.offsetWidth - BEE_ROW_SIZE)) {
                this.ox = (GAME_EL.offsetWidth - BEE_ROW_SIZE)
                x = -speed
            }
            for (const key in BEES) {
                BEES[key].rockMove(this.ox, this.oy)
            }
            this.isRock && requestAnimationFrame(fn)
        }
        fn()
    }

    /*
    * 蜜蜂攻击
    * */
    attackBee() {
        const timer = setInterval(() => {
            const bees = GAME_EL.querySelectorAll('.bee.await')
            if (bees.length === 0) {
                if (GAME_EL.querySelectorAll('.bee').length === 0) {
                    clearInterval(timer)
                    this.isRock = false
                    setTimeout(() => {
                        this.createBees()
                    }, 400)
                }
                return
            }
            const r = Math.floor(Math.random() * bees.length)
            getBee(bees[r].id).attack()
        }, 2000);
    }
}

export default BeeGroup