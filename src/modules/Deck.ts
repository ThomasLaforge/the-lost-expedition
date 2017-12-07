import {observable} from 'mobx'

import {Action} from './Action';
import {Card} from './Card';
import {ActionCollection} from './ActionCollection';
import {CardJSON} from './TheLostExpedition'
import { MonoAction } from './MonoAction';

const cards_json = require('../datas/cards.json')

export class Deck {

    @observable private _cards: Card[];

	constructor(cards?: Card[]) {
        if(cards){
            this.cards = cards
        }
        else {
            this.cards = cards_json.map( (card: CardJSON) => {
                let actions = card.actions_collections.map(action => {
                    let monoActions =  action.mono_actions.map(monoAction => {
                        return new MonoAction(monoAction.resource, monoAction.drop)   
                    })
                    return new Action( action.type, monoActions )
                })
                let actionCollection: ActionCollection = new ActionCollection(actions);
                return new Card(card.number, card.name, actionCollection)
            });
        }
    }

    pick(nb = 1){
        return this.cards.splice(0, nb)
    }
    
    shuffle(){
        this.cards = this.cards.sort(() => Math.random() - 0.5)
    }

    length(){
        return this.cards.length
    }

    // Getters / Setters
	public get cards(): Card[] {
		return this._cards;
	}
	public set cards(value: Card[]) {
		this._cards = value;
	}
    

}