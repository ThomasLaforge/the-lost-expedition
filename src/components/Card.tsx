import * as React from 'react';
import {observer} from 'mobx-react';

import {Card as CardModel} from '../modules/Card'

interface CardProps {
    card: CardModel;
    clicked?: boolean;
    canClick?: boolean;
    onClick?: Function;
    imgMode?: boolean;
    withActions?: boolean;
}

@observer
class Card extends React.Component<CardProps> {
    constructor(props: CardProps) {
        super(props);
        this.state = {
        };
    }

    renderActions(){
        return <div>Actions: </div>
    }

    handleClick(){
        if(this.props.canClick && this.props.onClick){
            this.props.onClick()
        }
    }

    render() {
        let card = this.props.card
        return (
            <div className={'card card-' + card.number} onClick={() => this.handleClick()}>
                {!this.props.imgMode && this.props.withActions && 
                    <div className="card-actions">
                        {/* {this.renderActions()} */}
                    </div>
                }
                {!this.props.imgMode ? 
                    <div className="card-title">
                        <div className="card-number">{card.number}</div>
                        <div className="card-title-separator">-</div>
                        <div className="card-name">{card.name}</div>
                    </div>
                    : <div className={"card-img " + 'card-img-' + this.props.card.number}  />
                }
            </div>
        );
    }
}

export default Card;