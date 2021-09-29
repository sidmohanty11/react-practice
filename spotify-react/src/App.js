import { useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Player from './components/Player';
import { getTokenFromUrl } from './spotify';
import SpotifyWebAPI from 'spotify-web-api-js';
import { useDataLayerValue } from './StateProvider';

const spotify = new SpotifyWebAPI();

function App() {
  const [{user,token}, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";

    const _token = hash.access_token;

    if (_token) {
      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      });

      spotify.setAccessToken(_token);

      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user: user
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists
        });
      });

      spotify.getPlaylist('37i9dQZEVXcLJ46tGnoYsH?gtm=1').then(res => {
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: res
        });
      });
    }
  }, []);

  return (
    <div className="App">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
