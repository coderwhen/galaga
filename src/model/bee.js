import { getNextId } from "../config/game.config";
import Base from "./base";

class Bee extends Base {
    constructor(className, x, y) {
        super(`bee ${className}`, getNextId('bee-'), x, y)
        console.log(className)
    }
}

export default Bee