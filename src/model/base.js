import {
    GAME_EL
} from '../config/game.config.js'

class Base {
    constructor(className,id,x,y) {
        this.id = id
        this.x = x
        this.y = y
        this.render(className)
    }

    render(className) {
       const el = document.createElement('div')
       el.style.left = this.x + 'px'
       el.style.top = this.y + 'px'
       el.id = this.id
       el.className = className
       GAME_EL.appendChild(el)
    }

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

    getCurrentEl() {
        return document.querySelector('#' + this.id)
    }
}

export { Base }
export default Base