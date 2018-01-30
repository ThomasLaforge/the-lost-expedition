import {observable} from 'mobx'
import { objectAssign } from 'mobx/lib/utils/utils';

interface LogWithoutTimestamp {
    action: string,
    objects?: string
}

export interface Log extends LogWithoutTimestamp {
    timestamp: number
}

export class Logger {

    @observable private _logs: Log[];

    constructor(logs: Log[] = []){
        this.logs = logs
    }

    push(log: LogWithoutTimestamp){
        this.logs.push(Object.assign({timestamp: Date.now()}, log))
    }

	public get logs(): Log[] {
		return this._logs;
    }
	public set logs(value: Log[]) {
		this._logs = value;
	}
    
}