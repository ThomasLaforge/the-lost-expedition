import {Stack} from './Stack'
import {Card} from './Card'
import { ResourceEnum } from './TheLostExpedition';

export class KeptCards extends Stack {

    constructor(objects: Card[] = []){
        super(objects)
    }

    getCardsWithResourceAccessible(resource: ResourceEnum){
        return this.cards.filter(c => {
            let actionsWithResource = c.actionCollection.actions.filter( a => {
                let monoActions = a.monoActions
                return monoActions.filter(monoAction => {
                    return monoAction.drop = false && monoAction.resource === resource
                }).length > 0
            })

            return actionsWithResource.length > 0
        })
    }

}