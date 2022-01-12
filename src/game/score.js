class Score {
    constructor() {
        this.highScore = 0
        this.score = 0
    }

    init() {

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
            this.renderHigh()
        }
    }

    compute(score) {
        this.score += score
        this.refresh()
    }
}

export default Score