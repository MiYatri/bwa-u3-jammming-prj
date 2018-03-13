const access_token = '';
const client_id = 'de7d73f427ce4f0586d4b540ac851187';
const url = "http://localhost:3000/";
const expires_in='';
const Spotify = {
  getAccessToken (){
    if(access_token.length) {
      return accessToken;
    } else {
      return fetch(`https://accounts.spotify.com/authorize`, {
        client_id: 'de7d73f427ce4f0586d4b540ac851187',
        response_type: 'token',
        redirect_uri: 'http://localhost:3000/'
      }).then(response => {
        if(response.ok) {
          return response.json();
        }
      }).then(jsonResponse => {
        if (jsonResponse.accesstToken) {
          this.access_token = jsonResponse.match.params.access_token;
          this.expires_in = jsonResponse.match.params.expires_in;
        }
      })
    }
    }

  search() {
    return fetch(`https://api.spotify.com/v1/search?type=${track}&q=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${access_token}`
    }
    }).then(response => {
      if(response.ok) {
        return response.json();
      }
    }).then(jsonResponse => {
      if (jsonResponse.access_token) {
        return jsonResponse.tracks.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artist[0].name,
          album: track.album.name,
          state: business.location.state,
          uri: track.uri
        }));
      }
    })
  }

  savePlaylist(name, trackURIs) {
    const accesstoken = this.access_token;
    const headers {
      Authorization: this.access_token
    };
    const user_id = '';
    return fetch(`https://api.spotify.com/v1/me`, {
      headers: headers
    }
    }).then(response => {
      if(response.ok) {
        return response.json();
      }
    }).then(jsonResponse => {
      if (jsonResponse.access_token) {
        user_id = jsonResponse.user_id;
      }
    });

//post the playlist
    return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(this.playlistName)
    }).then(response => {
      if(response.ok) {
        return response.json();
      }
    }).then(jsonResponse => {
      playlist_id = jsonResponse.user_id;
      })
  //post track
  return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/{playlist_id}/tracks`, {
    headers: headers,
    method: 'POST',
    body: JSON.stringify(this.track)
  }).then(response => {
    if(response.ok) {
      return response.json();
    }
  }).then(jsonResponse => {
    playlistid = jsonResponse.user_id;
    })
}
};


export default Spotify;
