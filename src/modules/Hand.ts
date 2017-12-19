import {Stack} from './Stack'
import {Card} from './Card'

export class Hand extends Stack {

    constructor(objects: Card[] = []){
        super(objects)
    }

}