import Bee from '../model/bee'
/**
 * 游戏主舞台dom
 */
export const GAME_EL = document.querySelector(".game-body")
/**
 * 蜜蜂点阵
 */
export const BEE_POINTS = [
    [0, 0, 0, 4, 0, 0, 4, 0, 0, 0],
    [0, 0, 3, 3, 3, 3, 3, 3, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]
/**
 * 蜜蜂大小
 */
export const BEE_SIZE = 40
/**
 * 蜜蜂行宽度
 */
export const BEE_ROW_SIZE = BEE_POINTS[0].length * BEE_SIZE
/**
 * 
 * @param {number} bee 蜜蜂type
 * @returns {string} 蜜蜂type
 */
export const getBeeType = (bee) => {
    switch (bee) {
        case 4:
            return "bee-small"
        case 3:
            return "bee-red"
        case 2:
            return "bee-blue"
        default:
            return "bee-green"
    }
}

let index = 0

/**
 * 
 * @param {string} tag 标签
 * @returns id
 */
export const getNextId = (tag) => {
    return tag ?
        tag + (index++) :
        index++
}
export const BEES = {}
window.Bees = BEES
/**
 * 
 * @param {Bee} Bee 
 */
export const pushBee = (Bee) => {
    const id = Bee.id
    BEES[id] = Bee
}
/**
 * 获取指定标识的蜜蜂
 * @param id 蜜蜂标识
 * @returns {Bee} bee
 */
export const getBee = (id) => {
    return BEES[id]
}
/**
 * 删除指定标识的蜜蜂
 * @param id 蜜蜂标识
 */
export const deleteBee = (id) => {
    delete BEES[id]
}

window.getBee = getBee