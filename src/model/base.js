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
     */
    constructor(className,id,x,y) {
        this.id = id
        this.x = x
        this.y = y
        this.render(className)
    }

    /**
     * 渲染DOM节点
     * @param {string} className 类名
     */
    render(className) {
       const el = document.createElement('div')
    //    el.style.left = this.x + 'px'
    //    el.style.top = this.y + 'px'
       el.id = this.id
       el.className = className
       GAME_EL.appendChild(el)
    }

    /**
     * 基本移动方法
     * @param {number} x 横坐标
     * @param {number} y 纵坐标
     */
    move(x,y) {
        const currentEl = this.getCurrentEl()
        const style = {
            left: x + 'px',
            top: y + 'px'
        }
        for(const key in style) {
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
}

export { Base }
export default Base