import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import { UpdatePlayerParam } from "../App";
import "../App.css";

//updatePlayerAction,

interface PlayProps {
  url: string;
  playing: boolean;
  volume: number;
  muted: boolean;
  playbackRate: number;
  parent?: any;
  loop: boolean;
  loaded?: number;
  played: number;
  pip?: boolean;
  duration?: number;
  controls?: boolean;
  player?: any;
  seeking?: boolean;
  state?: any;

  playPause: () => void;
  stopPlaying: () => void;
  toggleLoop: () => void;
  onPlay: () => void;
  onEnded: () => void;
  onProgress: (state: any) => void;
  refreshApp?: (event: UpdatePlayerParam) => void;
}

class PlayerZone extends Component<PlayProps> {
  private player!: ReactPlayer;
  //private audioPlayer!:WaveSurferInstance & WaveSurferRegions;

  pip = () => {
    this.setState({ pip: !this.props.pip });
  };
  setVolume = (e: any) => {
    this.setState({ volume: parseFloat(e.target.value) });
  };
  onPause = () => {
    console.log("onPause");
    this.setState({ playing: false });
  };
  onDuration = (duration: any) => {
    console.log("onDuration", duration);
    this.setState({ duration });
  };

  ref = (player: any) => {
    this.player = player;
  };

  render() {
    const { url, pip, playing, loop, playbackRate, volume, muted } = this.props;
    const { onPlay, onEnded, onProgress, stopPlaying, playPause } = this.props;
    return (
      <div>
        <div className="player-wrapper">
          <ReactPlayer
            ref={this.ref}
            className="react-player"
            width="100%"
            height="100%"
            url={url}
            pip={pip}
            playing={playing}
            loop={loop}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            onReady={() => console.log("onReady")}
            onStart={() => console.log("onStart")}
            onPlay={onPlay}
            onPause={this.onPause}
            onBuffer={() => console.log("onBuffer")}
            onSeek={e => console.log("onSeek", e)}
            onEnded={onEnded}
            onError={e => console.log("onError", e)}
            onProgress={onProgress}
            onDuration={this.onDuration}
          />
        </div>

        <div className="mediaControls">
          <table>
            <tbody>
              <tr>
                <th>Controls</th>
                <td>
                  <button onClick={stopPlaying}>Stop</button>
                  <button onClick={playPause}>
                    {playing ? "Pause" : "Play"}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect()(PlayerZone);
