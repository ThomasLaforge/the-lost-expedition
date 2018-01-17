import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Action as ActionModel} from '../modules/Action'
import {ResolvedActionOptions} from '../modules/TheLostExpedition'
import {ResolvedAction} from '../modules/ResolvedAction'
import {Game} from '../modules/Game'
import { MonoAction as MonoActionModel } from '../modules/MonoAction';

import Action from './Action'
import MonoAction from './MonoAction'
import MonoActionChoices from './MonoActionChoices'

interface SelectedActionsBoxProps extends DefaultProps {
    actions: ActionModel[],
    game: Game
}

interface SelectedActionsBoxState {
    currentActionToResolve: ActionModel,
    resolvedActions: ResolvedAction[],
    currentResolveOptions: ResolvedActionOptions[],
    currentMonoAction: MonoActionModel
}

@inject(injector)
@observer
class SelectedActionsBox extends React.Component<SelectedActionsBoxProps, SelectedActionsBoxState> {
    
    constructor(props: SelectedActionsBoxProps) {
        super(props);
        this.state = {
            currentActionToResolve: this.props.actions[0],
            currentMonoAction: this.props.actions[0].monoActions[0],
            currentResolveOptions: [],
            resolvedActions: []
        };
    }

    renderActions(){
        return this.props.actions.map( (a, i) => {
            return (
                <div className="actions-to-resolve-elt" key={i}>
                    <Action action={a} />
                </div>
            )
        })
    }

    renderCurrentAction(){
        return (
            <div className='actual-action-to-resolve'>
                <div className='actual-action-to-resolve-title'>
                    Current action to resolve
                </div>
                <div className='actual-action-to-resolve-action'>        
                    <Action action={this.state.currentActionToResolve} />
                </div>
                <div className='actual-action-to-resolve-action'>
                    <MonoAction monoAction={this.state.currentMonoAction} />
                </div>
                <div className='mono-action-choices'>
                    <MonoActionChoices
                        monoAction={this.state.currentMonoAction} 
                        choices={this.props.game.getOptionsForMonoAction(this.state.currentMonoAction)}
                    />
                </div>
            </div>            
        )
    }

    render() {
        return (
            <div className="selected-actions-box">
                Selected Action box
                <div className="actions-to-resolve">
                    {this.renderActions()}
                </div>
                {this.renderCurrentAction()}
            </div>
        );
    }
}

export default SelectedActionsBox;