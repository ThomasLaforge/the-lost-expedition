import {observable} from 'mobx'

import { Action } from './Action'

export class ActionCollection {

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