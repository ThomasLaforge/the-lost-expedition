import { CardStack } from './Stack';
import { Card } from './Card';

export class PlayedCards extends CardStack {
    constructor(maxNbCards: number, cards: Card[] = [], lock = false){
        super(cards, maxNbCards, lock)
    }
}