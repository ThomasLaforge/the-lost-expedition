import { MonoAction } from './MonoAction'
import { ActionType } from './TheLostExpedition'

export class Action {

    private _type: ActionType;
    private _monoActions: MonoAction[];

    constructor(type: ActionType, monoActions: MonoAction[]){
        this.type = type
        this.monoActions = monoActions
    }

    // Getter / Setters
	public get type(): ActionType {
		return this._type;
	}
	public set type(value: ActionType) {
		this._type = value;
    }

	public get monoActions(): MonoAction[] {
		return this._monoActions;
	}
	public set monoActions(value: MonoAction[]) {
		this._monoActions = value;
	}
    
    
}