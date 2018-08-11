import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {Players} from './../imports/api/players';

const renderPlayers = (players) => {
  return players.map((player) => {
    return (
      <p key={player._id}>
        {player.name} has {player.score} point(s).
        <button onClick={() => {
          Players.update(player._id, {$inc: {score: -1}});}}>-1</button>
        <button onClick={() => {
          Players.update(player._id, {$inc: {score: 1}});}}>+1</button>
        <button onClick={() => { 
          Players.remove({_id: player._id});}}>X</button>
      </p>
    );
  });
};
const addPlayer = (event) => {
  let name = event.target.playerName.value;
  event.preventDefault();
  if (name) {
    event.target.playerName.value = '';
    Players.insert({
      name: name,
      score: 15
    });
  }
};

Meteor.startup(() => {
  Tracker.autorun(() => {
    let players = Players.find().fetch();
    let title = 'Score Keep';
    let name = 'Xizors';
    let jsx = (
      <div>
        <h1>{title}</h1>
        <p>Hello {name}!</p>
        {renderPlayers(players)}
        <form onSubmit={addPlayer}>
          <input type="text" name="playerName" placeholder="Player Name"/>
          <button>Add Player</button>
        </form>
      </div>
    );
    ReactDOM.render(jsx, document.getElementById('app'));
  });
});
