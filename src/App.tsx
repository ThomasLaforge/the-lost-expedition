import * as React from 'react';
import {observer } from 'mobx-react';

import DevTools from 'mobx-react-devtools';

import Game from './components/Game';
import CardCollection from './components/CardCollection';
import Logger from './components/Logger';
import { Game as GameModel } from './modules/Game'
// import { ActionSelection as ActionSelectionModel } from './modules/ActionSelection'
// import { SelectedAction as SelectedActionModel } from './modules/SelectedAction'
import './styles/App.scss';

@observer
class App extends React.Component<{}, { game: GameModel} > {

  constructor(props: any){
    super(props);
    this.state = {
      game : new GameModel()
    }
  }

  render() {
    return (
      <div className="App">
        {/* <Game game={this.state.game} /> */}
        {/* <Logger logger={this.state.game.logger} /> */}
        <CardCollection />
        <DevTools />
      </div>
    );
  }
}

export default App;
