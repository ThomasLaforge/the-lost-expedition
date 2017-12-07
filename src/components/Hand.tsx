import * as React from 'react';
import {Hand as HandModel} from '../modules/Hand'
import Card from './Card'

interface HandProps {
    hand: HandModel;
}

class Hand extends React.Component<HandProps> {
    constructor(props: HandProps) {
        super(props);
        this.state = {
        };
    }

    renderCards(){
        return this.props.hand.objects.map( c => {
            console.log('Card', c)
            return <Card card={c} />
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