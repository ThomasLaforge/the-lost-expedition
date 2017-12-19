import {observable} from 'mobx'

import { Action } from './Action'
import { ActionType } from './TheLostExpedition'

export class ActionCollection {

    @observable private _actions: Action[];

    constructor(actions: Action[]){
        this.actions = actions
	}
	
	getOptionalActions(){
		return this.actions.filter(a => a.type === ActionType.Optional)
	}

	getChoiceActions(){
		return this.actions.filter(a => a.type === ActionType.Chose)
	}

    // Getters / Setters
	public get actions(): Action[] {
		return this._actions;
	}
	public set actions(value: Action[]) {
		this._actions = value;
	}
    

}