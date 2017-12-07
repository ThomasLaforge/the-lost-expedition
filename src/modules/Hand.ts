import {Stack} from './Stack'
import {Card} from './Card'

export class Hand extends Stack {

    constructor(objects: Card[] = []){
        super(objects)
    }

    pick(card: Card | number){
        let index = card instanceof Card ? this.objects.indexOf(card) : card
        if(index >= 0 && index < this.objects.length){
            this.objects = this.objects.slice(index, 1)
        }
        else {
            throw new Error('cant remove this card' + JSON.stringify(card))
        }
    }

}