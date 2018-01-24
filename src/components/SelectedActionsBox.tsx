import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Action as ActionModel} from '../modules/Action'
import {ResolvedActionOptions, ResolvedMonoActionOptions} from '../modules/TheLostExpedition'
import {ResolvedAction} from '../modules/ResolvedAction'
import {Game} from '../modules/Game'
import { MonoAction as MonoActionModel } from '../modules/MonoAction';

import Action from './Action'
import MonoAction from './MonoAction'
import MonoActionChoices from './MonoActionChoices'

interface SelectedActionsBoxProps extends DefaultProps {
    actions: ActionModel[],
}

interface SelectedActionsBoxState {
    currentActionToResolve: ActionModel,
    resolvedActions: ResolvedAction[],
    currentResolveOptions: ResolvedActionOptions[],
    currentMonoAction: MonoActionModel,
    choices: ResolvedMonoActionOptions[]
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
            resolvedActions: [],
            choices: this.props.game.getOptionsForMonoAction(this.props.actions[0].monoActions[0])
        };
    }

    renderActionsList(){
        return this.props.actions.length > 1 && this.props.actions.map( (a, i) => {
            return (
                <div className="actions-to-resolve-elt" key={i}>
                    <Action action={a} />
                </div>
            )
        })
    }

    renderCurrentAction(){
        console.log('options', this.props.game.getOptionsForMonoAction(this.state.currentMonoAction))
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
                        choices={this.state.choices}
                    />
                </div>
            </div>            
        )
    }

    render() {
        return (
            <div className="selected-actions-box">
                {this.props.actions.length > 1 && 'actions to resolve'}
                <div className="actions-to-resolve">
                    {this.renderActionsList()}
                </div>
                {this.renderCurrentAction()}
            </div>
        );
    }
}

export default SelectedActionsBox;