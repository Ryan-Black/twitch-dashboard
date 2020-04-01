import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Games from './components/Games';
import Header from './components/Header';
import Streams from './components/Streams';
import GameStreams from './components/GameStreams';
import Stream from './components/Stream';
import StreamSearch from './components/StreamSearch';

function App() {
  return (
    <Router>
      <div className="App container-fluid">
        <Header></Header>
        <Route exact path="/" component={Games} />
        <Route exact path="/top-streams" component={Streams} />
        <Route exact path="/game/:id" component={GameStreams} />
        <Route exact path="/game/stream/:id" component={Stream} />
        <Route exact path="/top-streams/stream/:id" component={Stream} />
        <Route exact path="/search" component={StreamSearch} />
      </div>
    </Router>
  );
}

export default App;
