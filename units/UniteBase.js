const UniteBase = class {
    xPosition = 0
    yPosition = 0
    actionsIntervals = []

    constructor() {
        this.init();
    }

    async init() {
        const module = await import('./WeaponsFactory.js');
        this.WeaponsFactory = module.WeaponsFactory;
    }

    shoot(projectileType, config) {
        this.WeaponsFactory.shootDouble(this.getShootPoint(), projectileType, config);
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
        const el1Bottom = el1.getTop() + el1.getHeight();
        const el2Bottom = el2.getTop() + el2.getHeight();

        const isYIntercest = el1Bottom <= el2.getTop() && el1.getTop() >= el2Bottom 
            || el1Bottom >= el2.getTop() && el1.getTop() <= el2Bottom;
        const isXIntercest = targetLeft >= el2.getLeft() + el2.getWidth() && targetLeft + targetWidth <= el2.getLeft()
            || targetLeft <= el2.getLeft() + el2.getWidth() && targetLeft + targetWidth >= el2.getLeft();

        return isYIntercest && isXIntercest;
    }

    checkOutOfBoundsExceed() {
        const isExceed = this.getTop() + this.getHeight() <= 0 || this.getTop() > window.innerHeight;

        if (isExceed) {
            this.kill();
            return false;
        }
        return true;
    }
}

export { UniteBase };