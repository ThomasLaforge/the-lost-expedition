import { Resource } from './TheLostExpedition'

export class MonoAction {

    private _resource: Resource; 
    private _drop: boolean;

	constructor(resource: Resource, drop: boolean) {
        this.resource = resource
        this.drop = drop
	}

	public get resource(): Resource {
		return this._resource;
	}
	public set resource(value: Resource) {
		this._resource = value;
	}
	public get drop(): boolean {
		return this._drop;
	}
	public set drop(value: boolean) {
		this._drop = value;
	}
    

}