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

    renderMorning(){
        return <div className='time-token-morning'>Morning</div>
    }
    renderEvening(){
        return <div className='time-token-evening'>Evening</div>
    }

    render() {
        return (
            <div className="time-token">
                {this.morning ? this.renderMorning() : this.renderEvening()}
            </div>
        );
    }
}

export default TimeToken;