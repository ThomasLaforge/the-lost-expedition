import * as React from 'react';
import {observer, Provider } from 'mobx-react';

import DevTools from 'mobx-react-devtools';

import Game from './components/Game';
import CardCollection from './components/CardCollection';
import Logger from './components/Logger';
import { Game as GameModel } from './modules/Game'
import { Store } from './modules/Store'
import './styles/App.scss';

@observer
class App extends React.Component<{}, { store: Store} > {

  constructor(props: any){
    super(props);
    this.state = {
      store: new Store()
    }
  }

  render() {
    return (
      <Provider store={this.state.store} >
          <div className="App">
            <Game />
            {/* <Logger logger={this.state.game.logger} /> */}
            <CardCollection />
            {/* <DevTools /> */}
          </div>
      </Provider>
    );
  }
}

export default App;
