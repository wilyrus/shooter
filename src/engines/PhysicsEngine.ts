import { UniteTypes, ProjectileTypes } from '../units/types';
import { store } from '../store';

const PhysicsEngine = class {
  private checkIntersection(el1: any, el2: any) { //todo wtf
    if (!el1 || !el2) {
      return;
    }

    const targetLeft = el1.xPosition;
    const targetWidth = el1.width;
    const el1Bottom = el1.yPosition + el1.height;
    const el2Bottom = el2.yPosition + el2.height;

    const isYIntercest = el1Bottom <= el2.yPosition && el1.yPosition >= el2Bottom
            || el1Bottom >= el2.yPosition && el1.yPosition <= el2Bottom;
    const isXIntercest = targetLeft >= el2.xPosition + el2.width && targetLeft + targetWidth <= el2.xPosition
            || targetLeft <= el2.xPosition + el2.width && targetLeft + targetWidth >= el2.xPosition;

    return isYIntercest && isXIntercest;
  }

  public calculateCollisions(movedElement: any) {
    // @ts-ignore
    for (let actor of store.state.actors) {
      if (actor.el === movedElement) {
        continue;
      }
      const isIntersected = this.checkIntersection(movedElement, actor.el);

      if (isIntersected) {
        if (!this.handleIntersection(movedElement, actor.el)) {
          this.handleIntersection(actor.el, movedElement);
        }
      }
    }
  }

  private handleIntersection(movedElement: any, intersectedElement: any) {
    switch (movedElement.uniteType) {
    case UniteTypes.Projectile: {
      if (movedElement.type === ProjectileTypes.Enemy && intersectedElement.uniteType === UniteTypes.Player) {
        this.removeActors([movedElement, intersectedElement]);
        return true;
      } else if (movedElement.type === ProjectileTypes.Self && intersectedElement.uniteType === UniteTypes.Enemy) {
        this.removeActors([movedElement, intersectedElement]);
        return true;
      }
      break;
    }
    case UniteTypes.PowerUp: {
      if (intersectedElement.uniteType === UniteTypes.Player) {
        this.removeActors([movedElement]);
        intersectedElement.upgrade(movedElement);
        return true;
      }
      break;
    }
    }
  }

  private removeActors(actorsToRemove: any[]) {
    actorsToRemove.forEach(actor => store.commit('removeActor', actor));
  }

  static toggleActivity(isActive: boolean): void {
    store.commit('toggleActivity', isActive);
  }
};

export { PhysicsEngine };
