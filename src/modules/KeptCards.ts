import {Stack} from './Stack'
import {Card} from './Card'
import { ResourceEnum } from './TheLostExpedition';
import { observable } from 'mobx';

export class KeptCard {

    @observable private _card: Card;
    @observable private _resources: ResourceEnum[];

    constructor(card: Card, resources: ResourceEnum[]){
        this.card = card
        this.resources = resources
    }

	public get resources(): ResourceEnum[] {
		return this._resources;
	}
	public set resources(value: ResourceEnum[]) {
		this._resources = value;
	}
	public get card(): Card {
		return this._card;
	}
	public set card(value: Card) {
		this._card = value;
	}
    
}


export class KeptCards extends Stack<KeptCard> {

    constructor(objects: KeptCard[] = []){
        super(objects as KeptCard[])
    }

    getCardsWithResourceAccessible(resource: ResourceEnum){
        return this.objects.filter(kp => {
            let actionsWithResource = kp.resources.filter( r => {
                return r === resource
            })

            return actionsWithResource.length > 0
        })
    }

}