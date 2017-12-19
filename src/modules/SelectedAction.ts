import {observable} from 'mobx'

import { Action } from './Action'
import { SelectedActionOptions } from './TheLostExpedition'

export class SelectedAction extends Action{

    @observable private _options: SelectedActionOptions[];

    constructor(action: Action, options: SelectedActionOptions[] = []){
        super(action.type, action.monoActions)
        this.options = options
    }    

	public get options(): SelectedActionOptions[] {
		return this._options;
	}
	public set options(value: SelectedActionOptions[]) {
		this._options = value;
	}
    
}