import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {MonoAction as MonoActionModel} from '../modules/MonoAction'
import {ResolvedMonoActionOptions} from '../modules/TheLostExpedition'
import { ResolvedAction as ResolvedActionModel } from '../modules/ResolvedAction';

import Card from './Card'
import Hero from './Hero'

interface MonoActionOptionProps extends DefaultProps {
    option: ResolvedMonoActionOptions
    selected: boolean
    onSelection: Function
}

interface MonoActionOptionState {
}

@inject(injector)
@observer
class MonoActionOption extends React.Component<MonoActionOptionProps> {
    
    constructor(props: MonoActionOptionProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        console.log('option', this.props.option)
        return (
            <div 
                className={'resolved-actions-choice' + (this.props.selected && ' resolved-actions-choice-selected')} 
                onClick={() => this.props.onSelection}
            >
                { this.props.option.cardsToSwitch && 
                    <div className='choice-cards-to-switch'>
                        <Card card={this.props.option.cardsToSwitch[0]} />
                        <Card card={this.props.option.cardsToSwitch[1]} />
                    </div>
                }
                { this.props.option.hero && 
                    <div className='choice-hero'>
                        <Hero hero={this.props.option.hero} /> 
                    </div>
                }
                { this.props.option.keptCard && 
                    <div className='choice-hero'>
                        <Card card={this.props.option.keptCard.card} /> 
                    </div>
                }

            </div>
        );
    }
}

export default MonoActionOption;