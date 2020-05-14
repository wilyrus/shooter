<script>
import { Shooter } from './units/Shooter';
import { Target } from './units/Target';
import { Menu } from './menu';
import { PowerupsFactory } from './factories/PowerupsFactory';
import { PhysicsEngine } from './engines/PhysicsEngine';

export default {
    beforeMount() {
        window.facade = {};
    },

    mounted() {
        new PhysicsEngine();
        new Menu();
        new PowerupsFactory();
        PhysicsEngine.actors.push(new Target(), new Target(), new Shooter());
        window.facade.physicsEngine = PhysicsEngine;

        console.log( '%c%s', 'color: green; font: 1.2rem/1 Tahoma;', 'elements ready' );
    }
}
</script>
