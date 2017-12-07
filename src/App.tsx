import * as React from 'react';
import {observer} from 'mobx-react';

import Game from './components/Game';
import { Game as GameModel } from './modules/Game'
import './App.scss';

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
        <Game game={this.state.game} />
      </div>
    );
  }
}

export default App;
