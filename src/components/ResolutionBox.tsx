import * as React from 'react';
import {observer} from 'mobx-react';

import {Game as GameModel} from '../modules/Game'
import {Card as CardModel} from '../modules/Card'
import {Action as ActionModel} from '../modules/Action'
import {ActionSelection as ActionSelectionModel, ActionSelection} from '../modules/ActionSelection'
import {SelectedAction as SelectedActionModel, SelectedAction} from '../modules/SelectedAction'
import {Side} from '../modules/TheLostExpedition'

import Card from './Card'
import Action from './Action'

interface ResolutionBoxProps {
    game: GameModel;
    card: CardModel;
}

interface ResolutionBoxStates {
    optionalActionChoice: ActionModel[];
    choiceActionChoice?: ActionModel;
}

@observer
class ResolutionBox extends React.Component<ResolutionBoxProps, ResolutionBoxStates> {
    
    constructor(props: ResolutionBoxProps) {
        super(props);
        this.state = {
            choiceActionChoice: undefined,
            optionalActionChoice: []
        };
    }

    generateActionSelection(): ActionSelectionModel {
        let selectedActions: SelectedActionModel[] = []



        return new ActionSelectionModel(selectedActions);
    }

    handleResolve(){
        console.log('resolve', this.state.choiceActionChoice, this.state.optionalActionChoice)
        this.props.game.resolveCard(this.props.card, this.generateActionSelection())
    }

    handleClickOnOptionalAction(newChoice: ActionModel){
        console.log('change optional action', newChoice)
        let optionalChoices = this.state.optionalActionChoice        
        let newChoiceIndex = optionalChoices.indexOf(newChoice)
        if( newChoiceIndex !== -1){
            optionalChoices.push(newChoice)
        }
        else {
            optionalChoices.splice(newChoiceIndex, 1)
        }
        this.setState({optionalActionChoice: optionalChoices})
    }

    handleClickOnChoiceAction(newChoice: ActionModel){
        console.log('change choice action', newChoice)
        this.setState({choiceActionChoice: newChoice})
    }

    renderOptionalActions(){
        return this.props.card.actionCollection.getOptionalActions().map( (a, k) => {
            return <Action 
                        key={k} 
                        action={a} 
                        onClick={() => this.handleClickOnOptionalAction(a)} 
                    />
        })
    }

    renderChoiceActions(){
        return this.props.card.actionCollection.getChoiceActions().map( (a, k) => {
            return <Action 
                        key={k} 
                        action={a} 
                        onClick={() => this.handleClickOnChoiceAction(a)} 
                    />
        })
    }

    renderActions(){
        return <div className="choice-actions">
            <div className="choice-actions-choice">            
                Choice:
                {this.renderChoiceActions()}
            </div>
            <div className="choice-actions-optional">
                Optional:
                {this.renderOptionalActions()}
            </div>
        </div>
    }

    render() {
        console.log('render resolution box', this.props.card)
        return (
            <div className="resolution-box">
                <Card card={this.props.card} />
                {this.renderActions()}
                <button onClick={() => {this.handleResolve()}}>Resolve</button>
            </div>
        );
    }
}

export default ResolutionBox;