import React from 'react';
import { Players } from '../api/players';

export default class AddPlayer extends React.Component {
    addPlayer(event) {
      let playerName = event.target.playerName.value;
      event.preventDefault();
      if (playerName) {
        event.target.playerName.value = '';
        Players.insert({
          name: playerName,
          score: 0,
        });
      }
    }
    
    render() {
        return (
          <div>
            <form onSubmit={this.addPlayer.bind(this)}>
              <input type="text" name="playerName" placeholder="Player name"/>
              <button>Add Player</button>
            </form>
          </div>
        );
    }
}