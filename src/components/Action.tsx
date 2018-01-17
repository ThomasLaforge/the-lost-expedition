import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'


import {Action as ActionModel} from '../modules/Action'
import {EnumStringifier} from '../modules/TheLostExpedition'

import MonoAction from './MonoAction'

interface ActionProps extends DefaultProps {
    action: ActionModel;
    onClick?: Function;
    selected?: boolean;
}

@inject(injector)
@observer
class Action extends React.Component<ActionProps> {
    
    constructor(props: ActionProps) {
        super(props);
        this.state = {
        };
    }

    renderMonoActions(){
        return this.props.action.monoActions.map( (monoAction, k) => <MonoAction key={k} monoAction={monoAction} />)
    }

    render() {
        let typeString = EnumStringifier.getActionType(this.props.action.type)
        let classType = 'action-' + typeString

        return (
            <div className='action' onClick={() => this.props.onClick && this.props.onClick()}>
                <div className={classType + (this.props.selected ? ' action-selected' : '')}>
                    {this.renderMonoActions()}
                </div>
            </div>
        );
    }
}

export default Action;