import {observable} from 'mobx'

import { ResourceEnum, EnumStringifier } from './TheLostExpedition'

export class MonoAction {

    @observable private _resource: ResourceEnum; 
    @observable private _drop: boolean;

	constructor(resource: ResourceEnum, drop: boolean) {
        this.resource = resource
        this.drop = drop
	}

	getDefinition(){
		let str = ''
		if(this.drop){
			str = 'drop';
		}
		else {
			let resourcesWhoDoesntCareAboutDropOption = [
				ResourceEnum.Add,
				ResourceEnum.Remove,
				ResourceEnum.Run,
				ResourceEnum.Skip,
				ResourceEnum.Switch
			] 
			if(resourcesWhoDoesntCareAboutDropOption.indexOf(this.resource) === -1){
				str = 'get'
			}
		}
		str += ' ' + EnumStringifier.getRecourceName(this.resource)
		return str
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