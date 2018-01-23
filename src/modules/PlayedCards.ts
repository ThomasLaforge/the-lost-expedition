import { Stack } from './Stack';
import { Card } from './Card';

export class PlayedCards extends Stack {
    constructor(maxNbCards: number, cards: Card[] = [], lock = false){
        super(cards, maxNbCards, lock)
    }
}