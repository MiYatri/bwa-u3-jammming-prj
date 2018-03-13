import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

const playlistName = 'My Jamming list';
const playlistTracks = [{name:'Unstoppable', artist:'Sia',album:'This is Acting'}, {Name:'Born in the USA', artist:'Bruce Springstein',album:'Born in USA'}]
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{name:'Unstoppable', artist:'Sia',album:'This is Acting'}]
    };
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track) {
    const newId = track.id;
    const newplaylistTracks = this.state.playlistTracks;
    const index = newplaylistTracks(newId);
      if (index == 0 ){
        newplaylistTracks.push(this.track);
        this.setState({playlistTracks: newplaylistTracks});
      }
  }

  removeTrack(track) {
    const newId = track.id;
    const newplaylistTracks = this.state.playlistTracks;
    const index = newplaylistTracks(newId);
      if (index > 0 ){
        newplaylistTracks.splice(index,1);
        this.setState({playlistTracks: newplaylistTracks});
      }
  }

  updatePlaylistName(name){
    this.playlistName = 'New Playlist';
  }

  savePlaylist(){
    let trackURIs =Spotify.savePlaylist;
    this.setState({playlistName:'New Playlist', searchResults: []})
    return trackURIs;
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then( tracks => {
      this.setState({tracks: tracks});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
