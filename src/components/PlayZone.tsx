import * as React from 'react';
import {observer} from 'mobx-react';

import {Stack as StackModel} from '../modules/Stack'

import Card from './Card'

interface PlayZoneProps {
    stack: StackModel;
}

@observer
class PlayZone extends React.Component<PlayZoneProps> {
    
    constructor(props: PlayZoneProps) {
        super(props);
        this.state = {
        };
    }

    renderCards(){
        return this.props.stack.objects.map( c => {
            return <Card card={c} />
        })
    }

    render() {
        return (
            <div className="Stack">
                {this.renderCards()}
            </div>
        );
    }
}

export default PlayZone;