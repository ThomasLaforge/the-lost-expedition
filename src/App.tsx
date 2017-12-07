import * as React from 'react';
import Game from './components/Game';
import { Game as GameModel } from './modules/Game'
import './App.css';

class App extends React.PureComponent<{}, { game: GameModel} > {

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
