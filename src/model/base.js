import {
    GAME_EL
} from '../config/game.config.js'

/**
 * 基本类
 */
class Base {
    /**
     * 
     * @param {string} className 类名
     * @param {string} id 唯一标识
     * @param {number} x 横坐标
     * @param {number} y 纵坐标
     * @param {number} w 宽度
     * @param {number} h 高度
     */
    constructor(className, id, x, y, w, h) {
        this.id = id
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.isCrash = false
        this.render(className)
    }

    /**
     * 渲染DOM节点
     * @param {string} className 类名
     */
    render(className) {
        const el = document.createElement('div')
        el.id = this.id
        el.className = className
        GAME_EL.appendChild(el)
    }

    /**
     * 基本移动方法
     * @param {number} x 横坐标
     * @param {number} y 纵坐标
     */
    move(x, y) {
        this.x = x
        this.y = y
        const currentEl = this.getCurrentEl()
        const style = {
            left: x + 'px',
            top: y + 'px'
        }
        for (const key in style) {
            currentEl.style[key] = style[key]
        }
    }

    /**
     * 获取当前元素
     * @returns {HTMLElement}
     */
    getCurrentEl() {
        return document.querySelector('#' + this.id)
    }

    /**
     * 检测碰撞
     */
    checkCrash(target) {
        if(!target.isCrash) return false
        const { x, y, w, h } = this
        const { x: x1, y: y1, w: w1, h: h1 } = target
        const [l1, t1, r1, b1] = [x, y, x + w, y + h]
        const [l2, t2, r2, b2] = [x1, y1, x1 + w1, y1 + h1]

        return !(l1 > r2 || t1 > b2 || r1 < l2 || b1 < t2)
    }

    remove() {
        this.getCurrentEl().remove()
    }
}

export { Base }
export default Base