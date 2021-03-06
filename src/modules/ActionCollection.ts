import {observable} from 'mobx'

import { Action } from './Action'
import { ActionType, ResourceEnum } from './TheLostExpedition'

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

	getMustDoActions(){
		return this.actions.filter(a => a.type === ActionType.MustDo)
	}

	getActionsWithExpertiseGain(){
		return this.actions.filter(a => {
			return a.monoActions.filter(mono => {
				let r = mono.resource
				let isExpertise = r === ResourceEnum.Camp || r === ResourceEnum.Compass || r === ResourceEnum.Leaf
				return !mono.drop && isExpertise 
			}).length > 0
		})
	}

    // Getters / Setters
	public get actions(): Action[] {
		return this._actions;
	}
	public set actions(value: Action[]) {
		this._actions = value;
	}
    

}