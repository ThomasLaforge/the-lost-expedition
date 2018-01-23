import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Game as GameModel} from '../modules/Game'
import {Card as CardModel} from '../modules/Card'
import {Action as ActionModel} from '../modules/Action'
import {ActionSelection as ActionSelectionModel, ActionSelection} from '../modules/ActionSelection'
import {ResolvedAction as ResolvedActionModel, ResolvedAction} from '../modules/ResolvedAction'
import {Side} from '../modules/TheLostExpedition'

import Card from './Card'
import Action from './Action'
import SelectedActionsBox from './SelectedActionsBox'

interface ResolutionBoxProps extends DefaultProps {
    card: CardModel;
}

interface ResolutionBoxState {
    optionalActionChoice?: ActionModel[];
    choiceActionChoice?: ActionModel;
    selectingActions: boolean;
    selectedActions: ActionModel[];
}

@inject(injector)
@observer
class ResolutionBox extends React.Component<ResolutionBoxProps, ResolutionBoxState> {
    
    constructor(props: ResolutionBoxProps) {
        super(props);
        this.state = {
            choiceActionChoice: null,
            optionalActionChoice: [],
            selectingActions: this.props.card.getOptionalActions().concat(this.props.card.getChoiceActions()).length > 0,
            selectedActions: this.props.card.getMustDoActions()
        };
    }

    handleResolve(){
        console.log('handleResolve: to complete')        
        // this.props.game.resolveCard(this.props.card)
    }
    handleAutoResolve(){
        console.log('handleAutoResolve: to complete')
        // this.props.game.autoResolve(this.props.card)
    }

    handleClickOnOptionalAction(newChoice: ActionModel){
        console.log('change optional action', newChoice)
        let optionalChoices = this.state.optionalActionChoice.slice()       
        let newChoiceIndex = optionalChoices.indexOf(newChoice)
        if( newChoiceIndex === -1){
            optionalChoices.push(newChoice)
        }
        else {
            optionalChoices.splice(newChoiceIndex, 1)
        }
        console.log('optional choices', optionalChoices)
        this.setState({optionalActionChoice: optionalChoices})
    }

    handleClickOnChoiceAction(newChoice: ActionModel){
        console.log('change choice action', newChoice)
        this.setState({choiceActionChoice: newChoice === this.state.choiceActionChoice ? null : newChoice })
    }

    renderOptionalActions(){
        return this.props.card.actionCollection.getOptionalActions().map( (a, k) => {
            return <Action 
                        key={k} 
                        action={a} 
                        onClick={() => this.handleClickOnOptionalAction(a)} 
                        selected={this.state.optionalActionChoice.indexOf(a) !== -1}
                    />
        })
    }

    renderChoiceActions(){
        return this.props.card.actionCollection.getChoiceActions().map( (a, k) => {
            return <Action 
                        key={k}
                        selected={this.state.choiceActionChoice === a} 
                        action={a} 
                        onClick={() => this.handleClickOnChoiceAction(a)} 
                    />
        })
    }

    renderActions(){
        return <div className="choice-actions">
            { this.props.card.getChoiceActions().length > 0 &&
                <div className="choice-actions-choice">            
                    Choice:
                    {this.renderChoiceActions()}
                </div>
            }
            { this.props.card.getOptionalActions().length > 0 && 
                <div className="choice-actions-optional">
                    Optional:
                    {this.renderOptionalActions()}
                </div>
            }
        </div>
    }

    renderSelectedActions(): JSX.Element{
        return <SelectedActionsBox
            actions={this.state.selectedActions}
        />
    }

    canEndSelection(){
        let choicesActionLength = this.props.card.actionCollection.getChoiceActions().length
        // console.log('can end selection', choicesActionLength === 0, this.state.choiceActionChoice !== null)
        return choicesActionLength === 0 || this.state.choiceActionChoice !== null
    }

    endingSelectAction() { 
        console.log('ending selecting actions')
        if( this.canEndSelection()){
            let selectedActions = this.state.selectedActions.concat(this.state.optionalActionChoice, this.state.choiceActionChoice ? [this.state.choiceActionChoice] : [])
            if(selectedActions.length === 0){
                console.log('resolve an empty card')
            } 
            else {
                console.log('all actions selected', selectedActions)
                let actionSelection = new ActionSelection(selectedActions)
                let actionsCanBeAutoResolved = !this.props.game.actionSelectionCanBeAutoResolved(actionSelection)

                this.setState({
                    selectingActions: false,
                    selectedActions: selectedActions
                }, () => {
                    console.log('ending selection of actions', actionsCanBeAutoResolved ? 'actions don\'t need options' : 'actions need options')
                    if(actionsCanBeAutoResolved) {
                        this.props.game.autoResolveCard(this.props.card, actionSelection)
                    }
                })
            }
        }
    }

    renderResolveBtn(){
        return (
            <button 
                disabled={!this.state.selectingActions || !this.canEndSelection()} 
                onClick={this.endingSelectAction}
            >
                Ending selection
            </button>
        )
    }
    
    render() {
        console.log('render resolution box', this.props.card)
        return (
            <div className="resolution-box">
                <div className='resolution-box-card'>
                    <Card card={this.props.card} />
                </div>
                {this.state.selectingActions ? this.renderActions() : this.renderSelectedActions()}
                {this.renderResolveBtn()}
            </div>
        );
    }
}

export default ResolutionBox;