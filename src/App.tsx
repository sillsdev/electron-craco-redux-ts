import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.css';
import { hot } from 'react-hot-loader';
import { AppState } from './store';
import { SystemState } from './store/system/types';
import { TreeState } from './store/tree/types';
import { MediaPlayerState } from './store/player/types';
import * as actions from './store';
import TestFs from './components/testFs';
import PlayerZone from './components/player';
const isElectron = process.env.REACT_APP_MODE === 'electron';
const ipc = require('electron').ipcRenderer;
const { remote } = require('electron');
export type UpdatePlayerParam = React.SyntheticEvent<{ value: string }>;

interface StateProps {
  system: SystemState;
  tree: TreeState;
  player: MediaPlayerState;
}

interface DispatchProps {
  updateSession: typeof actions.updateSession;
  updateActiveFolder: typeof actions.updateActiveFolder;
  updatePlayerAction: typeof actions.updatePlayerAction;
  playPause: typeof actions.playPause;
  stopPlaying: typeof actions.stopPlaying;
  toggleLoop: typeof actions.toggleLoop;
  onPlay: typeof actions.onPlay;
  onEnded: typeof actions.onEnded;
  onProgress: typeof actions.onProgress;
}

interface AppProps extends StateProps, DispatchProps {
  // local stat props go here
}

const initState = {
  user: 'User',
};

class App extends React.Component<AppProps, typeof initState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { ...initState };
  }

  componentDidMount() {
    const { updateActiveFolder, updatePlayerAction } = this.props;

    if (isElectron) {
      updateActiveFolder({
        env: 'electron',
        path: 'local',
        loaded: true,
      });
    } else {
      updateActiveFolder({
        env: 'web',
        path: 'bing',
        loaded: true,
      });
    }
    updatePlayerAction({
      url: 'http://www.youtube.com/watch?v=Fc1P-AEaEp8',
      //url: "https://www.youtube.com/watch?v=Hz63M3v11nE&t=7",
      playing: false,
      volume: 0.8,
      muted: false,
      playbackRate: 1.0,
      controls: false,
      played: false,
      pip: false,
      loaded: false,
      duration: -1,
      loop: false,
      seeking: false,
    });
  }

  componentDidUpdate() {
    const { updateSession } = this.props;

    // const profile = authService.getProfile();
    if (isElectron) {
      ipc.invoke('get-profile').then((result: any) => {
        if (result?.name !== this.state.user) {
          this.setState({ user: result?.name });
        }
      });
    }
    if (this.state.user && this.props.system.userName !== this.state.user) {
      updateSession({
        loggedIn: true,
        session: 'my_session',
        userName: this.state?.user || 'User',
        clicks: 0,
      });
    }
  }

  // Player Features
  playPause = () => {
    this.props.playPause();
    console.log('onPlay/PauseApp');
  };
  stopPlaying = () => {
    this.props.stopPlaying();
    console.log('onStopApp');
  };
  toggleLoop = () => {
    this.props.toggleLoop();
    console.log('ToggleLoopApp');
  };
  onPlay = () => {
    this.props.onPlay();
    console.log('onPlayApp');
  };
  onEnded = () => {
    this.props.onEnded();
    console.log('onEndedApp');
  };
  onProgress = (playState: any) => {
    const { onProgress, player } = this.props;

    onProgress(playState);
    console.log('onProgressApp', playState);
    if (!player.seeking) {
      //this.setState({player: {played: playState.played}})
      //this.setState(playState)
    }
  };
  onUpdatePath = () => {
    console.log('onUpdatePath not defined');
  };

  logout = () => {
    if (isElectron) {
      ipc.invoke('logout');
      remote.getCurrentWindow().close();
    }
  };

  render() {
    const { user } = this.state;
    const { player } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <p>
            Welcome to <code>Electron - Craco - Redux - Boilerplate</code>.{' '}
            <button onClick={this.logout}>{'Logout'}</button>
          </p>
        </header>
        <div className="App-body">
          <div className="App-sidebar">
            <PlayerZone
              url={player.url}
              playing={player.playing}
              muted={player.muted}
              playbackRate={player.playbackRate}
              volume={player.volume}
              loop={player.loop}
              played={player.played}
              playPause={this.playPause}
              stopPlaying={this.stopPlaying}
              toggleLoop={this.toggleLoop}
              onPlay={this.onPlay}
              onEnded={this.onEnded}
              onProgress={this.onProgress}
            />
          </div>
          <div className="DetailsZone">
            <p>{`User: ${user}`}</p>
            <p>
              {process.env.REACT_APP_MODE}: {process.env.NODE_ENV}
            </p>
            <p>
              <textarea
                value={TestFs.getDirectoryListing()}
                readOnly
                rows={20}
              />
            </p>
          </div>
        </div>
        <div className="App-footer" />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  system: state.system,
  tree: state.tree,
  player: state.player,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      updateSession: actions.updateSession,
      updateActiveFolder: actions.updateActiveFolder,
      updatePlayerAction: actions.updatePlayerAction,
      playPause: actions.playPause,
      stopPlaying: actions.stopPlaying,
      toggleLoop: actions.toggleLoop,
      onPlay: actions.onPlay,
      onEnded: actions.onEnded,
      onProgress: actions.onProgress,
    },
    dispatch
  ),
});

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App));
