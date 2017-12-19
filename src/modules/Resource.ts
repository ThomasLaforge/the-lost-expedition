import {observable} from 'mobx'

import {ResourceEnum} from './TheLostExpedition'

export class Resource {

    @observable private _type: number;

    constructor(type: ResourceEnum){
        this.type = type
    }

    getPath(){
        return './img/resources/' + this.type + '.jpg'
    }

    // Getters / Setters
	public get type(): number {
		return this._type;
	}
	public set type(value: number) {
		this._type = value;
	}

}