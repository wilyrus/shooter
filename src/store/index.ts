import { createStore } from 'vuex';
import { uuidv4 } from '../utils';
import { IUnite } from '../units/types';

interface IShooter {
    actors: Set<IUnite>
}

const store = createStore({
  strict: true,

  state(): IShooter {
    return {
      actors: new Set()
    };
  },

  mutations: {
    addActor(state, { type, config = {} }) {
      const id = uuidv4();
      // @ts-ignore
      state.actors.add({ id, type, config: { ...config, id } });
    },

    setInstance(state, { id, el }) {
      // @ts-ignore
      for (let a of state.actors) {
        if (a.id === id) {
          // @ts-ignore
          a.el = el;
          return;
        }
      }
    },

    removeActor(state, actor) {
      // @ts-ignore
      for (let a of state.actors) {
        if (a.id === actor.id) {
          // @ts-ignore
          state.actors.delete(a);
          return;
        }
      }
    },

    toggleActivity(state, isActive) {
      // @ts-ignore
      for (let a of state.actors) {
        a.isActive = isActive;
      }
    },
  }
});

export { store };
