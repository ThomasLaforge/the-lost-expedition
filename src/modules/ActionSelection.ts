import {observable} from 'mobx'

import { SelectedAction } from './SelectedAction'

export class ActionSelection {

    @observable private _actions: SelectedAction[];

    constructor(actions: SelectedAction[]){
        this.actions = actions
    }

    // Getters / Setters
	public get actions(): SelectedAction[] {
		return this._actions;
	}
	public set actions(value: SelectedAction[]) {
		this._actions = value;
    }    
    
}