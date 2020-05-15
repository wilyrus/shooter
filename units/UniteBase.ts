import { EventEmitter } from '../services/EventEmiter';

const UniteBase = class {
    xPosition = 0
    yPosition = 0
    actionsIntervals: NodeJS.Timeout[] = []
    id = ''
    el: HTMLElement
    eventEmitter: any
    isActive = true

    constructor() {
        this.eventEmitter = new EventEmitter();
    }

    getShootPoint() {
        const leftCenter = this.getLeft() + this.getWidth() / 2;

        return { x: leftCenter, y: this.getTop() };
    }

    kill() {
        this.el.remove();
        this.actionsIntervals.forEach(int => clearInterval(int));

        window.facade[this.id] = null; //todo remove from actors
    }

    getTop() {
        return this.el.getBoundingClientRect().top;
    }

    getLeft(): number {
        return this.el.getBoundingClientRect().left;
    }

    getWidth() {
        return this.el.getBoundingClientRect().width;
    }

    getHeight() {
        return this.el.getBoundingClientRect().height;
    }

    checkOutOfBoundsExceed(xPosition?: number, yPosition?: number) {
        const isExceed = this.getTop() + this.getHeight() <= 0 || this.getTop() > window.innerHeight;

        if (isExceed) {
            this.kill();
            return false;
        }
        return true;
    }
}

export { UniteBase };
