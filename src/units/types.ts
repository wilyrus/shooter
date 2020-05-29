export enum PowerUpTypes {
    'FlySpeed' = 'flySpeed',
    'Power' = 'power',
    'ShootSpeed' = 'shootSpeed',
    'WeaponUpgrade' = 'WeaponUpgrade'
}

export enum ProjectileTypes {
    Self,
    Enemy
}

export interface PlanePoint {
    x: number;
    y: number;
}

export interface MotionConfig {
    moveSize: number;
    moveDelay: number;
}

export enum UniteTypes {
    None,
    Player,
    Enemy,
    Projectile,
    PowerUp
}
