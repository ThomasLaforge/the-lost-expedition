import { Hero } from "./Hero";
import { Card } from "./Card";
import { Game } from "./Game";

export enum ResourceEnum {
    Bullet = 0,
    Food = 1,
    PV = 2,
    Life = 3,
    Run = 4,
    Leaf = 5,
    Camp = 6,
    Compass = 7,
    Switch = 8,
    Skip = 9,
    Add = 10,
    Remove = 11
}

export enum ActionType {
    Optional = 0,
    MustDo = 1,
    Chose = 2
}

export enum Side {
    Left,
    Right
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

export interface SelectedActionOptions {
    hero?: Hero,
    keptCard?: Card,
    cardsToSwitch?: Card[]
}

export class EnumStringifier {

    static getActionType(type: ActionType){
        switch (type) {
            case ActionType.Chose:
                return 'chose'
            case ActionType.MustDo:
                return 'must-do'
            case ActionType.Optional:
                return 'optional'
            default:
                throw new Error('');
        }
    }

}