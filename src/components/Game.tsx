import * as React from 'react';

import { Game as GameModel } from '../modules/Game'

import Road from './Road';
import TimeToken from './TimeToken';
import Hand from './Hand';
import Deck from './Deck';
import PlayZone from './PlayZone';
import Heroes from './Heroes';
import Stocks from './Stocks';

interface GameProps {
    game: GameModel
}

class Game extends React.PureComponent <GameProps> {

    constructor(props: GameProps){
        super(props)
    }

    componentWillUpdate(newProps: GameProps){
        console.log('new Props',newProps)
    }

    render() {
        let game = this.props.game
        let player = game.player

        return (
        <div className="game">
            <Road object={game.road} />
            <Stocks bulletStock={player.bulletStock} foodStock={player.foodStock} />
            <TimeToken morning={game.morning} />
            <Deck deck={game.deck} />
            <Heroes heroes={game.heroes} />
            <PlayZone stack={game.playedCards} />
            <Hand hand={player.hand} />
            <button onClick={() => { game.switchMorning() }}>Switch Morning</button>
            <button onClick={() => { game.progress() }}>Progress</button>
        </div>
        );
    }
}

export default Game;
