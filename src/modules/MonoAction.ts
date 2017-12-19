import {observable} from 'mobx'

import { ResourceEnum } from './TheLostExpedition'

export class MonoAction {

    @observable private _resource: ResourceEnum; 
    @observable private _drop: boolean;

	constructor(resource: ResourceEnum, drop: boolean) {
        this.resource = resource
        this.drop = drop
	}

	public get resource(): ResourceEnum {
		return this._resource;
	}
	public set resource(value: ResourceEnum) {
		this._resource = value;
	}
	public get drop(): boolean {
		return this._drop;
	}
	public set drop(value: boolean) {
		this._drop = value;
	}
    

}