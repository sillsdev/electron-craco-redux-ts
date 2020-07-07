// src/store/tree/reducers.ts
import * as types from './types';

export const playerCleanStore: types.MediaPlayerState = {
  url: '',
  playing: false,
  volume: 0.8,
  muted: false,
  controls: false,
  played: false,
  loaded: false,
  duration: -1,
  playbackRate: 1.0,
  loop: false,
  pip: false,
};

export function playerReducer(
  state = playerCleanStore,
  action: types.PlayerActionTypes
): types.MediaPlayerState {
  switch (action.type) {
    case types.UPDATE_PLAYER_SESSION: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case types.PLAY_PAUSE: {
      return {
        ...state,
        playing: !state.playing,
      };
    }
    case types.STOP_PLAYING: {
      return {
        ...state,
        playing: false,
        url: 'none',
      };
    }
    case types.TOGGLE_LOOP: {
      return {
        ...state,
        loop: !state.loop,
      };
    }
    case types.ON_PLAY: {
      return {
        ...state,
        playing: true,
      };
    }
    case types.ON_ENDED: {
      return {
        ...state,
        playing: state.loop,
      };
    }
    case types.ON_PROGRESS: {
      return {
        ...state,
        played: action.payload,
      };
    }
    //this.setState({ url: null, playing: false })
    default:
      return state;
  }
}
