import { Hero } from "./Hero";
import { Card } from "./Card";
import { KeptCard } from "./KeptCards";
import { Game } from "./Game";

export enum Difficulty {
    Easy,
    Normal,
    Hard
}

export const DEFAULT_LVL = Difficulty.Hard

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

export interface ResolvedMonoActionOptions {
    hero?: Hero,
    keptCard?: KeptCard,
    cardsToSwitch?: Card[]
}

export interface ResolvedActionOptions {
    [index: number]: ResolvedMonoActionOptions[]
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
                throw new Error('not action type valid');
        }
    }

    
    static getRecourceName(resource: ResourceEnum) {
        switch (resource) {
            case ResourceEnum.Bullet:
                return 'bullet'
            case ResourceEnum.Food:
                return 'food'
            case ResourceEnum.PV:
                return 'pv'
            case ResourceEnum.Life:
                return 'life' 
            case ResourceEnum.Run:
                return 'run'
            case ResourceEnum.Leaf:
                return 'leaf'
            case ResourceEnum.Camp:
                return 'camp'
            case ResourceEnum.Compass:
                return 'compass'
            case ResourceEnum.Switch:
                return 'switch'
            case ResourceEnum.Skip:
                return 'skip' 
            case ResourceEnum.Add:
                return 'add'
            case ResourceEnum.Remove:
                return 'remove'
            default:
                throw new Error('not resource valid');
        }
    }

}