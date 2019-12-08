const Projectile = class {
    selector = 'projectile'
    template =  "<div></div>"
    moveSize = 20
    direction = 1
    intervalId = ''

    constructor(coords) {
        var newDiv = document.createElement("div");
        newDiv.classList.add(this.selector);
        newDiv.innerHTML = this.template;
        newDiv.style.left = coords.x;
        newDiv.style.bottom = coords.y;
        document.body.append(newDiv);
        this.el = newDiv;
        this.startMoving();
    }

    startMoving() {
        this.intervalId = setInterval(() => {
            if (this.checkOutOfBoundsExceed()) {
                this.el.style.bottom = (parseInt(this.el.style.bottom) || 0 ) + this.moveSize * this.direction;
                if (this.checkIntersection()) {
                    this.killTarget();
                }
            }
        }, 15);
    }

    checkOutOfBoundsExceed() {
        const isExceed = this.el.getBoundingClientRect().height + this.el.getBoundingClientRect().top <= 0;

        if (isExceed) {
            this.el.remove();
            clearInterval(this.intervalId);
            return false;
        }
        return true;
    }

    killTarget() {
        facade.target.kill();
    }

    checkIntersection() {
        const targetLeft = facade.target.el.getBoundingClientRect().left;
        const targetWidth = facade.target.el.getBoundingClientRect().width;
        const isYIntercest = facade.target.el.getBoundingClientRect().top + facade.target.el.getBoundingClientRect().height >= this.el.getBoundingClientRect().top;
        const isXIntercest = targetLeft <= this.el.getBoundingClientRect().left && targetLeft + targetWidth > this.el.getBoundingClientRect().left;

        return isYIntercest && isXIntercest;
    }
}

export { Projectile };