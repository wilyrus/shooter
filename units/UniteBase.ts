import { EventEmitter } from '../services/EventEmiter';

const UniteBase = class {
    xPosition = 0
    yPosition = 0
    actionsIntervals: NodeJS.Timeout[] = []
    id = ''
    el: HTMLElement
    eventEmitter: any
    isActive = true
    width = 0
    height = 0

    constructor() {
        this.eventEmitter = new EventEmitter();
    }

    getShootPoint() {
        const leftCenter = this.xPosition + this.width / 2;

        return { x: leftCenter, y: this.yPosition };
    }

    kill() {
        this.el.remove();
        this.actionsIntervals.forEach(int => clearInterval(int));

        window.facade[this.id] = null; //todo remove from actors
    }

    checkOutOfBoundsExceed(xPosition: number = this.xPosition, yPosition: number = this.yPosition) {
        const isExceed = yPosition + this.height <= 0 || yPosition > window.innerHeight;

        if (isExceed) {
            this.kill();
            return false;
        }
        return true;
    }
}

export { UniteBase };
