export enum Resource {
    Bullet,
    Food,
    PV,
    Life,
    Run,
    Leaf,
    Camp,
    Compass
}

export enum ActionType {
    Optionnal,
    MustDo,
    Chose
}

export interface HeroJSON {
    name: string,
    resource: number
}

export interface CardJSON {
    number: number,
    name: string,
    actions_collections: ActionJSON[]
}

export interface MonoActionJSON {
    drop: boolean,
    resource: number
}

export interface ActionJSON {
    type: number,
    mono_actions: MonoActionJSON[]
}