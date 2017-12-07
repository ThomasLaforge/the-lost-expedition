import * as React from 'react';
import {Deck as DeckModel} from '../modules/Deck'

interface DeckProps {
    deck: DeckModel;
}

class Deck extends React.Component<DeckProps> {
    
    constructor(props: DeckProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="deck">
                {this.props.deck.length() > 0 ? 'not empty' : 'empty'}
            </div>
        );
    }
}

export default Deck;