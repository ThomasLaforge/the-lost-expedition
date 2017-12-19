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

interface InfoZoneProps {
    game: GameModel;
}

interface InfoZoneState {
}

@observer
class InfoZone extends React.Component<InfoZoneProps, InfoZoneState> {
    
    constructor(props: InfoZoneProps) {
        super(props);
        this.state = {
        };
    }


    render() {
        let game = this.props.game
        let player = game.player

        return (
            <div className="game-info">
                {/* <Road object={game.road} /> */}
                <Deck deck={game.deck} />
                <TimeToken morning={game.morning} />
                <Stocks bulletStock={player.bulletStock} foodStock={player.foodStock} />
                <Heroes heroes={player.heroesCollection.heroes} />
                <KeptCards cards={game.keptCards.objects} />
            </div>
        );
    }
}

export default InfoZone;