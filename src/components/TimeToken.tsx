import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

interface TimeTokenProps extends DefaultProps {
}

@inject(injector)
@observer
class TimeToken extends React.Component<TimeTokenProps> {
    constructor(props: TimeTokenProps) {
        super(props);
        this.state = {
        };
    }

    get morning(){ return this.props.game.morning }

    timeToken() {
        return this.morning ? 'Morning' : 'Evening'
    }

    render() {
        return (
            <div className="time-token">
                {this.timeToken()}
            </div>
        );
    }
}

export default TimeToken;