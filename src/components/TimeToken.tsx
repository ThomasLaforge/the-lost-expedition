import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

interface TimeTokenProps extends DefaultProps {
    morning: boolean;
}

@inject(injector)
@observer
class TimeToken extends React.Component<TimeTokenProps> {
    constructor(props: TimeTokenProps) {
        super(props);
        this.state = {
        };
    }

    timeToken() {
        return this.props.morning ? 'Morning' : 'Evening'
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