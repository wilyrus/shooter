const PhysicsEngine = class {
    static actors: any[] = []
    private static innerActors: any[] = []

    constructor() {
        PhysicsEngine.actors = new Proxy(PhysicsEngine.innerActors, this.arrayChangeHandler);
    }

    private static checkIntersection(el1: any, el2: any) { //todo wtf
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

    private static calculateCollisions(movedElement: any) {
        PhysicsEngine.innerActors.filter(a => a !== movedElement).forEach(a => {
            const isIntersected = PhysicsEngine.checkIntersection(movedElement, a);

            if (isIntersected) {
                movedElement.intersectedBy(a);
                a.intersectedBy(movedElement);
            }
        });
    }

    arrayChangeHandler = {
        set: function(target: any, property: any, value: any, receiver: any) {
            if (value.eventEmitter) {
                value.eventEmitter.on('move', PhysicsEngine.calculateCollisions);
            }
          target[property] = value;

          return true;
        }
      };

    static toggleActivity(isActive: boolean): void {
        PhysicsEngine.innerActors.forEach(actor => actor.isActive = isActive);
    }
}

export { PhysicsEngine };
