import Particle from '../units/Particle.vue';
import { store } from '../store';

interface Position {
    x: number,
    y: number
}

interface Size {
    height: number,
    width: number
}

interface Style {
    backgroundColor?: string
}

//interface Path<Position>

const ParticleEmitter = class {
  static emitParticle(path: [Position], particle: Style  = {}, time: number = 3) {
    store.commit('addActor', { type: Particle, config: { ...particle, animation: {
      animation: [
        { transform: 'rotate(0) translate3D(-50%, -50%, 0)', color: '#000' },
        { color: '#431236', offset: 0.333},
        { transform: 'rotate(360deg) translate3D(-50%, -50%, 0)', color: '#000' }
      ],
      time: time * 1000,
      callback: this.disposeParticle
    }}});
  }

  static generateParticlesFromObject(position: Position, size: Size, style: Style, time: number = 3) {

  }

  static disposeParticle(particle: any) {
    store.commit('removeActor', particle);
  }
};

export { ParticleEmitter };
