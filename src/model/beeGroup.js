import { BEE_POINTS, getBeeType } from "../config/game.config";
import Bee from "./bee";

class BeeGroup {
    constructor() {

    }


    createBees() {
        BEE_POINTS.forEach((rowBees, row) => {
            rowBees.forEach((beeType, colunm) => {
                if(!beeType) return
                const bee = new Bee(getBeeType(beeType),  colunm * 40 + 50, row * 40 + 10)
                console.log(bee)
            })
        })
    }
}

export default BeeGroup