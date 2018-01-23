import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {MonoAction as MonoActionModel} from '../modules/MonoAction'
import {ResolvedActionOptions, ResolvedMonoActionOptions} from '../modules/TheLostExpedition'
import { ResolvedAction as ResolvedActionModel } from '../modules/ResolvedAction';

import MonoActionOption from './MonoActionOption'

interface MonoActionChoicesProps extends DefaultProps {
    monoAction: MonoActionModel;
    choices: ResolvedMonoActionOptions[];
}

interface MonoActionChoicesState {
    selectedChoice: number;
}

@inject(injector)
@observer
class MonoActionChoices extends React.Component<MonoActionChoicesProps> {
    
    constructor(props: MonoActionChoicesProps) {
        super(props);
        
        this.state = {
            selectedChoice: 0
        };
    }

    renderOptions(){
        return this.props.choices.map( (c, k) => (
            <MonoActionOption key={k} option={c} />
        ))
    }

    render() {
        return (
            <div className="mono-action-choices">
                {this.renderOptions()}
            </div>
        );
    }
}

export default MonoActionChoices;