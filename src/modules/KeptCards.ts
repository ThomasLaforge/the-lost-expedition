import {Stack} from './Stack'
import {Card} from './Card'
import { ResourceEnum } from './TheLostExpedition';
import { observable } from 'mobx';

export class KeptCard {

    @observable private _card: Card;

    constructor(card: Card){
        this.card = card
    }

	public get resources(): ResourceEnum[] {
        let actionsWithResourcesGain = this.card.actionCollection.getActionsWithExpertiseGain()
		return [].concat.apply(actionsWithResourcesGain.map(a => a.monoActions.map(mono => mono.resource)))
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