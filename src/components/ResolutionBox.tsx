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
    game: GameModel;
    card: CardModel;
}

interface ResolutionBoxStates {
    optionalActionChoice?: ActionModel[];
    choiceActionChoice?: ActionModel;
    selectingActions: boolean;
    selectedActions: ActionModel[];
}

@inject(injector)
@observer
class ResolutionBox extends React.Component<ResolutionBoxProps, ResolutionBoxStates> {
    
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
        console.log('resolve', this.state.choiceActionChoice, this.state.optionalActionChoice)
        // this.props.game.resolveCard(this.props.card, this.())
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

    renderSelectedActionOptions(): JSX.Element{
        return <SelectedActionsBox 
            actions={this.state.selectedActions}
            game={this.props.game}
        />
    }

    canEndSelection(){
        let choicesActionLength = this.props.card.actionCollection.getChoiceActions().length
        console.log('can end selection', choicesActionLength === 0, this.state.choiceActionChoice !== null)
        return choicesActionLength === 0 || this.state.choiceActionChoice !== null
    }

    endingSelectAction() { 
        console.log('ending selecting actions')
        if( this.canEndSelection()){
            let seletectedActions = this.state.selectedActions.concat(this.state.optionalActionChoice, this.state.choiceActionChoice ? [this.state.choiceActionChoice] : [])
            if(seletectedActions.length === 0){
                console.log('resolve an empty card')
            } 
            else {
                this.setState({
                    selectingActions: false,
                    selectedActions: seletectedActions
                })
            }
        }
    }

    renderButton(){
        return (
            <button disabled={!this.state.selectingActions || !this.canEndSelection()} onClick={() => { this.state.selectingActions ? this.endingSelectAction() : this.handleResolve()}}>
                {this.state.selectingActions ? 'Ending selection' : 'Resolve'}
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
                {this.state.selectingActions ? this.renderActions() : this.renderSelectedActionOptions()}
                {this.renderButton()}
            </div>
        );
    }
}

export default ResolutionBox;