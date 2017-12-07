import * as React from 'react';
import {observer} from 'mobx-react';

import {Hand as HandModel} from '../modules/Hand'
import Card from './Card'

interface HandProps {
    hand: HandModel;
}

@observer
class Hand extends React.Component<HandProps> {
    constructor(props: HandProps) {
        super(props);
        this.state = {
        };
    }

    renderCards(){
        return this.props.hand.objects.map( (c, k) => {
            return <Card card={c} key={k} />
        })
    }

    render() {
        return (
            <div className="hand">
                {this.renderCards()}
            </div>
        );
    }
}

export default Hand;