import {observable} from 'mobx'

import { ResourceEnum, EnumStringifier, ResolvedMonoActionOptions } from './TheLostExpedition'
import { MonoAction } from './MonoAction';

export class ResolvedMonoAction extends MonoAction {

    @observable private _options: ResolvedMonoActionOptions;

	constructor(resource: ResourceEnum, drop: boolean, options: ResolvedMonoActionOptions = {}) {
		super(resource, drop)
		this.options = options
	}

	public get options(): ResolvedMonoActionOptions {
		return this._options;
	}
	public set options(value: ResolvedMonoActionOptions) {
		this._options = value;
	}
    

}