import {observable} from 'mobx'

import { MonoAction } from './MonoAction'
import { ActionType } from './TheLostExpedition'
import { BaseAction } from './BaseAction';

export class Action extends BaseAction {

    @observable private _monoActions: MonoAction[];

    constructor(type: ActionType, monoActions: MonoAction[]){
		super(type)
        this.monoActions = monoActions
    }

    // Getter / Setters
	public get monoActions(): MonoAction[] {
		return this._monoActions;
	}
	public set monoActions(value: MonoAction[]) {
		this._monoActions = value;
	}
    
    
}