import {observable} from 'mobx'

import { ResolvedAction } from './ResolvedAction'

// Collection of actions selected by user with choice to resolve the card
export class ActionSelection {

    @observable private _actions: ResolvedAction[];

    constructor(actions: ResolvedAction[]){
        this.actions = actions
    }

    // Getters / Setters
	public get actions(): ResolvedAction[] {
		return this._actions;
	}
	public set actions(value: ResolvedAction[]) {
		this._actions = value;
    }    
    
}