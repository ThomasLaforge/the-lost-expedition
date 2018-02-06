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
    indexCurrentAction: number,
    indexCurrentMonoAction: number,
    resolvedActions: ResolvedAction[],
    currentResolveOptions: ResolvedActionOptions[]
}

@inject(injector)
@observer
class SelectedActionsBox extends React.Component<SelectedActionsBoxProps, SelectedActionsBoxState> {
    
    constructor(props: SelectedActionsBoxProps) {
        super(props);
        let indexFirstActionToResolve = this.props.game.getIndexFirstActionWhoNeedOptions(this.props.actions)        
        if(indexFirstActionToResolve === this.props.actions.length){
            console.error('error on SelectedActionsBox: no actions to resolve')
        }
        else{
            console.log('SelectedActionsBox: initial action', indexFirstActionToResolve, this.props.actions[indexFirstActionToResolve])
        }
        let firstActionToResolve = this.props.actions[indexFirstActionToResolve]        
        
        let indexFirstMonoActionToResolve = this.props.game.getIndexFirstMonoActionToResolve(firstActionToResolve)
        if(indexFirstMonoActionToResolve === firstActionToResolve.monoActions.length){
            console.error('error on SelectedActionsBox: no mono actions to resolve')
        }
        else{
            console.log('SelectedActionsBox: initial mono action', indexFirstMonoActionToResolve, this.props.actions[indexFirstMonoActionToResolve])
        }

        this.state = {
            indexCurrentAction: indexFirstActionToResolve,
            indexCurrentMonoAction: indexFirstMonoActionToResolve,
            currentResolveOptions: [],
            resolvedActions: []
        };
    }

    get currentActionToResolve(){
        return this.props.actions[this.state.indexCurrentAction]
    }
    get currentMonoAction(){
        return this.currentActionToResolve.monoActions[this.state.indexCurrentMonoAction]
    }
    get choices(){
        return this.props.game.getOptionsForMonoAction(this.currentMonoAction)
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
        console.log('options', this.props.game.getOptionsForMonoAction(this.currentMonoAction))
        return (
            <div className='actual-action-to-resolve'>
                <div className='actual-action-to-resolve-title'>
                    Current action to resolve
                </div>
                <div className='actual-action-to-resolve-action'>        
                    <Action action={this.currentActionToResolve} />
                </div>
                <div className='actual-action-to-resolve-action'>
                    <MonoAction monoAction={this.currentMonoAction} />
                </div>
                <div className='mono-action-choices'>
                    <MonoActionChoices
                        monoAction={this.currentMonoAction} 
                        choices={this.choices}
                    />
                </div>
            </div>            
        )
    }

    render() {
        return (
            <div className="selected-actions-box">
                {this.props.actions.length > 1 && 
                    <div>actions to resolve
                        <div className="actions-to-resolve">
                            {this.renderActionsList()}
                        </div>
                    </div>
                }
                {this.renderCurrentAction()}
            </div>
        );
    }
}

export default SelectedActionsBox;