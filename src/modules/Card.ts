import { ActionCollection } from './ActionCollection'

export class Card {

    private _number: number
    private _name: string
    private _actionCollection: ActionCollection
    private _imgPath: string

    constructor(number: number, name: string, actionCollection: ActionCollection){
        this.number = number
        this.name = name;
        this.actionCollection = actionCollection
        this.imgPath = this.number + '.jpg'
    }

    private get name(): string {
        return this._name
    }
    private set name(name: string){
        this._name = name
    }
    private get number(){
        return this._number
    }
    private set number(number: number){
        this._number = number
    }
    private get imgPath(){
        return this._imgPath
    }
    private set imgPath(imgPath: string){
        this._imgPath = imgPath
    }
    private get actionCollection(){
        return this._actionCollection
    }
    private set actionCollection(actionCollection: ActionCollection){
        this._actionCollection = actionCollection
    }

}