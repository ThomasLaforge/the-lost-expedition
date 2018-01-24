import {CardStack} from './Stack'
import {Card} from './Card'

export class Hand extends CardStack {

    constructor(objects: Card[] = []) {
        super(objects)
    }

}