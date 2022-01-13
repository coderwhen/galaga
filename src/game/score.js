import md5 from "md5-node"

class Score {
    constructor() {
        this.highScore = 0
        this.score = 0
        this.isHigh = false
        this.init()
    }

    init() {
        const __SCORE = window.localStorage.getItem("__SCORE")
        const __SIGN = window.localStorage.getItem("__SIGN")
        if(!(__SCORE || __SIGN)) return
        const sign = md5(__SCORE, "coderwhen")
        if(__SIGN === sign) {
            const score = JSON.parse(__SCORE)
            this.highScore = score.score
        } else {
            alert("分数校验存在问题,分数已清空请")
            window.localStorage.removeItem("__SCORE")
            window.localStorage.removeItem("__SIGN")
        }
    }

    render() {
        const scoreEl = document.querySelector('.score span')
        scoreEl.innerHTML = this.score
    }

    renderHigh() {
        const scoreEl = document.querySelector('.high-score span')
        scoreEl.innerHTML = this.highScore
    }

    refresh() {
        this.render()
        if(this.score > this.highScore) {
            this.highScore = this.score
            this.isHigh = true
            this.renderHigh()
        }
    }

    compute(score) {
        this.score += score
        this.refresh()
    }

    save() {
        if(this.isHigh) {
            const __SCORE = {
                score: this.score,
                timestamp: new Date().getTime()
            }
            const __SIGN = md5(JSON.stringify(__SCORE), "coderwhen")
            window.localStorage.setItem("__SCORE", JSON.stringify(__SCORE))
            window.localStorage.setItem("__SIGN", __SIGN)
        }
    }
}

export default Score