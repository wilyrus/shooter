const Target = class {
    moveSize = 5
    direction = 1
    xPosition = 0

    constructor(selector) {
        this.el = document.querySelector(selector);
        this.startMoving();
    }

    startMoving() {
        setInterval(() => {
            this.direction = parseInt(Math.random() * 10) % 2 === 0 ? this.direction * 1 : this.direction * -1;
        }, 1000);

        setInterval(() => {
            if (this.checkOutOfBoundsExceed(1)) {
                this.xPosition = this.xPosition + this.moveSize * this.direction;
                this.el.style.transform = `translate(${this.xPosition}px, 0)`;
            } else {
                this.direction *= -1;
            }
        }, 2);
    }

    checkOutOfBoundsExceed() {
        if (this.direction === 1) {
            return this.moveSize + this.el.getBoundingClientRect().width + this.xPosition < window.innerWidth;
        }
        return this.el.getBoundingClientRect().width + this.xPosition - this.moveSize > 0;
    }

    kill() {
        this.el.remove();
    }
}

export { Target };