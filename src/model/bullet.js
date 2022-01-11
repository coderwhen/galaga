import {BEES, getNextId} from "../config/game.config";
import Bezier from "../utils/bezier";
import { Base } from "./base";

class Bullet extends Base {
    /**
     * 
     * @param {*} target 
     * @param {*} x 
     * @param {*} y 
     */
    constructor(target, x, y, isBee) {
        super('bullet', getNextId('bullet-'), x, y, 3, 15)
        this.target = target
        this.isBee = isBee
        this.move()
    }

    move() {
        let i = 0
        const bezier = new Bezier(this.isBee ?
            [
                { x: this.x, y: this.y },
                { x: this.target[0].x, y:this.target[0].y + 50 }
            ]:
            [
                { x: this.x, y: this.y },
                { x: this.x, y: -50 }
            ],60)
        const points = bezier.excute()
        const fn = () => {
            super.move(points[i].x, points[i].y)
            i++
            for (const [key, value] of Object.entries(this.target)) {
                if(this.checkCrash(value)) {
                    this.remove()
                    delete BEES[value.id]
                    value.destroy()
                    return
                }
            }
            if (i < bezier.unit) {
                requestAnimationFrame(fn)
            } else {
                this.remove()
            }
        }
        fn()
    }
}

export default Bullet