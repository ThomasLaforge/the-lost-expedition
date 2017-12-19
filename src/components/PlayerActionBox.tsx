import * as React from 'react';
import {observer} from 'mobx-react';

import {Game as GameModel} from '../modules/Game'
import {Card as CardModel} from '../modules/Card'
import {Side} from '../modules/TheLostExpedition'

interface HeroesProps {
    side: Side;
    onClickChangeSide: Function;
    card: CardModel | null;
    playCard?: Function;    
}

@observer
class Heroes extends React.Component<HeroesProps> {
    
    constructor(props: HeroesProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="player-action-box">
                <div className="evening-play-box">
                    <button onClick={() => this.props.onClickChangeSide()}>
                        {this.props.side === Side.Right ? 'Right' : 'Left'}
                    </button>
                </div>
            </div>
        );
    }
}

export default Heroes;