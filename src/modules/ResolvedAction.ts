import {ResolvedMonoAction} from './ResolvedMonoAction';
import {ActionType} from './TheLostExpedition';
import {observable} from 'mobx'

import { BaseAction } from './BaseAction';

export class ResolvedAction extends BaseAction{
	
	@observable private _monoActions: ResolvedMonoAction[];

    constructor(type: ActionType, monoActions: ResolvedMonoAction[]){
		super(type)
        this.monoActions = monoActions
    }

    // Getter / Setters
	public get monoActions(): ResolvedMonoAction[] {
		return this._monoActions;
	}
	public set monoActions(value: ResolvedMonoAction[]) {
		this._monoActions = value;
	}
    
}