const UniteBase = class {
    xPosition = 0
    yPosition = 0
    actionsIntervals = []

    shoot(Projectile, projectileType) {
        new Projectile(this.getShootPoint(), projectileType);
    }

    getShootPoint() {
        const leftCenter = this.getLeft() + this.getWidth() / 2;

        return { x: leftCenter, y: this.getTop() };
    }

    kill() {
        this.el.remove();
        this.actionsIntervals.forEach(int => clearInterval(int));
        facade[this.id] = null;
    }

    getTop() {
        return this.el.getBoundingClientRect().top;
    }

    getLeft() {
        return this.el.getBoundingClientRect().left;
    }

    getWidth() {
        return this.el.getBoundingClientRect().width;
    }

    getHeight() {
        return this.el.getBoundingClientRect().height;
    }

    checkIntersection(el1, el2) {
        if (!el1 || !el2) {
            return;
        }
        
        const targetLeft = el1.getLeft();
        const targetWidth = el1.getWidth();

        const isYIntercest = el1.getTop() - el1.getHeight() <= el2.getTop() && el2.getTop() + el2.getHeight() <= el1.getTop();
        const isXIntercest = targetLeft <= el2.getLeft() && targetLeft + targetWidth > el2.getLeft();

        return isYIntercest && isXIntercest;
    }

    updatePosition() {

    }
}

export { UniteBase };