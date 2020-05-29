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
    constructor() {

    }

    static emiteParticle(path: [Position], particle: Style, time: number = 3) {
        //todo web animation api

    }

    static generateParticlesFromObject(position: Position, size: Size, style: Style, time: number = 3) {

    }
};

export { ParticleEmitter };