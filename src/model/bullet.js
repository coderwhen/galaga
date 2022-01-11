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
    constructor(target, x, y) {
        super('bullet', getNextId('bullet-'), x, y, 3, 15)
        this.target = target
        this.move()
    }

    move() {
        let i = 0
        const bezier = new Bezier([
            { x: this.x, y: this.y },
            { x: this.x, y: -50 }
        ], 120)
        const points = bezier.excute()
        const fn = () => {
            super.move(points[i].x, points[i].y)
            i++
            for (const [key, value] of Object.entries(this.target)) {
                if(this.checkCrash(value)) {
                    this.getCurrentEl().remove()
                    delete BEES[value.id]
                    value.getCurrentEl().remove()
                    return
                }
            }
            if (i < bezier.unit) {
                requestAnimationFrame(fn)
            } else {
                this.getCurrentEl().remove()
            }
        }
        fn()
    }
}

export default Bullet