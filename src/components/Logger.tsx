import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Logger as LoggerModel, Log as LogInterface} from '../modules/Logger'

interface LogProps extends DefaultProps {
    log: LogInterface
}

@inject(injector)
@observer
class Log extends React.Component<LogProps> {
    constructor(props: LogProps) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
            <div className='log'>
                {this.props.log.timestamp} - {this.props.log.action}
            </div>
        );
    }
}

// -------------------------------------------------------------------------------------------------------

interface LoggerProps {
    logger: LoggerModel
}

@observer
class Logger extends React.Component<LoggerProps> {
    constructor(props: LoggerProps) {
        super(props);
        this.state = {
        };
    }

    renderLogs(){
        return this.props.logger.logs.map( (l, i: number ) => {
            return <Log log={l} />
        })
    }

    render() {
        return (
            <div className='logger'>
                <div className='logger-title'>Logger</div>
                <div className='logger-list'>
                    {this.renderLogs()}
                </div>
            </div>
        );
    }
}

export default Logger;