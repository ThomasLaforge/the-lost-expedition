import {observable} from 'mobx'

export interface Log {
    timestamp: number,
    action: string,
    objects: string
}

export class Logger {

    @observable private _logs: Log[];

    constructor(logs: Log[] = []){
        this.logs = logs
    }

    push(l: Log){
        this.logs.push(l)
    }

	public get logs(): Log[] {
		return this._logs;
    }
	public set logs(value: Log[]) {
		this._logs = value;
	}
    
}