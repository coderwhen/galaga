export const GAME_EL = document.querySelector(".game-body")
export const BEE_POINTS = [
    [0, 0, 0, 4, 0, 0, 4, 0, 0, 0],
    [0, 0, 3, 3, 3, 3, 3, 3, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]
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


export const getNextId = (tag) => {
    return tag ?
        tag + (index++) :
        index++
}