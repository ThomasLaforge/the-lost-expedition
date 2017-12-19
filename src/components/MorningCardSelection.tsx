import * as React from 'react';
import {observer} from 'mobx-react';

import {Game as GameModel} from '../modules/Game'
import {Card as CardModel} from '../modules/Card'
import {Side} from '../modules/TheLostExpedition'

import TimeToken from './TimeToken';
import Deck from './Deck';
import Heroes from './Heroes';
import Stocks from './Stocks';
import KeptCards from './KeptCards';
import PlayerActionBox from './PlayerActionBox';
import Hand from './Hand';

interface MorningCardSelectionProps {
    game: GameModel;
}

interface MorningCardSelectionState {
}

@observer
class MorningCardSelection extends React.Component<MorningCardSelectionProps, MorningCardSelectionState> {
    
    constructor(props: MorningCardSelectionProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        let game = this.props.game
        let player = game.player
        let mustPlayCard = !game.playedCards.isFull()        
        
        return (
            <div className="morning-card-selection">
                <Hand 
                    hand={player.hand} 
                    mustPlayCard={mustPlayCard} 
                    playCard={(c: CardModel) => game.playerPlayCard(c)} 
                />
            </div>
        );
    }
}

export default MorningCardSelection;