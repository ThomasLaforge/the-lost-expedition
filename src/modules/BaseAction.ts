import {observable} from 'mobx'

import { ActionType } from './TheLostExpedition'

export class BaseAction {

    @observable private _type: ActionType;

    constructor(type: ActionType){
        this.type = type
    }

    // Getter / Setters
	public get type(): ActionType {
		return this._type;
	}
	public set type(value: ActionType) {
		this._type = value;
    }
    
    
}