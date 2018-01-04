import {observable} from 'mobx'

import { Action } from './Action'
import { ResolvedActionOptions } from './TheLostExpedition'

export class ResolvedAction extends Action{

    @observable private _options: ResolvedActionOptions[];

    constructor(action: Action, options: ResolvedActionOptions[] = []){
        super(action.type, action.monoActions)
        this.options = options
    }    

	public get options(): ResolvedActionOptions[] {
		return this._options;
	}
	public set options(value: ResolvedActionOptions[]) {
		this._options = value;
	}
    
}