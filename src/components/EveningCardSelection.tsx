import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

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

interface MorningCardSelectionProps extends DefaultProps {
}

interface MorningCardSelectionState {
    side: Side,
    cardToAdd: CardModel | null
}

@inject(injector)
@observer
class MorningCardSelection extends React.Component<MorningCardSelectionProps, MorningCardSelectionState> {
    
    constructor(props: MorningCardSelectionProps) {
        super(props);
        this.state = {
            side: Side.Left,
            cardToAdd: null
        };
    }

    switchSide(){
        this.setState({side: this.state.side === Side.Left ? Side.Right : Side.Left})
    }

    playCard(c: CardModel){
        this.props.game.playerPlayCard(c, this.state.side)
    }

    render() {
        let game = this.props.game
        let player = game.player
        let mustPlayCard = !game.playedCards.isFull()                

        return (
            <div className="evening-card-selection">
                    <PlayerActionBox
                        card={this.state.cardToAdd}
                        side={this.state.side}
                        onClickChangeSide={() => this.switchSide()}
                        />
                    <Hand
                        hand={player.hand} 
                        mustPlayCard={mustPlayCard}
                        playCard={(c: CardModel) => this.playCard(c)}
                    />
            </div>
        );
    }
}

export default MorningCardSelection;