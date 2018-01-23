import {observable} from 'mobx'

import { Action } from './Action'

// Collection of actions selected by user with choice to resolve the card
export class ActionSelection {

    @observable private _actions: Action[];

    constructor(actions: Action[]){
        this.actions = actions
    }

    // Getters / Setters
	public get actions(): Action[] {
		return this._actions;
	}
	public set actions(value: Action[]) {
		this._actions = value;
    }    
    
}