import {observable} from 'mobx'

import { ActionCollection } from './ActionCollection'
import { ActionSelection } from './ActionSelection';

export class Card {

    @observable private _number: number
    @observable private _name: string
    @observable private _actionCollection: ActionCollection
    @observable private _imgPath: string

    constructor(number: number, name: string, actionCollection: ActionCollection){
        this.number = number
        this.name = name;
        this.actionCollection = actionCollection
        this.imgPath = 'img/cards/' + this.number + '.png'
    }

    /**
     * Wrappers
     */
    getOptionalActions(){
		return this.actionCollection.getOptionalActions()
	}
	getChoiceActions(){
		return this.actionCollection.getChoiceActions()
	}
	getMustDoActions(){
		return this.actionCollection.getMustDoActions()
    }
    
    /**
     * Auto action selection
     * 
     * return only action who don't need user selection =>  return actionSelect with "must do" actions
     * cause options can or not be chosen, and choice action need a choice.
     */
    cardHaveAutoActionSelection(){
        return this.getChoiceActions().length === 0 && this.getOptionalActions.length === 0
    }
    getAutoActionSelectionFromCard(): ActionSelection{
        return new ActionSelection(this.getMustDoActions())
    }

    /**
     * Getters / Setters
     */
    public get name(): string {
        return this._name
    }
    public set name(name: string){
        this._name = name
    }
    public get number(){
        return this._number
    }
    public set number(number: number){
        this._number = number
    }
    public get imgPath(){
        return this._imgPath
    }
    public set imgPath(imgPath: string){
        this._imgPath = imgPath
    }
    public get actionCollection(){
        return this._actionCollection
    }
    public set actionCollection(actionCollection: ActionCollection){
        this._actionCollection = actionCollection
    }

}