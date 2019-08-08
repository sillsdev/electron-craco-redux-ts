import React, { Component } from "react";
import { connect } from 'react-redux'
import ReactPlayer from "react-player"
import { UpdatePlayerParam } from "../App";
import '../App.css';


//updatePlayerAction,



interface PlayProps {
    url: string,
    playing: boolean,
    volume: number,
    muted: boolean,
    playbackRate: number,
    parent?: any,
    loop: boolean,
    loaded?: number,
    played: number,
    pip?: boolean,
    duration?: number,
    controls?: boolean,
    player?: any,
    seeking?: boolean,
    state?: any

    playPause: () => void;
    stopPlaying: () => void;
    toggleLoop: () => void;
    onPlay: () => void;
    onEnded: () => void;
    onProgress: (state: any) => void;
    refreshApp?: (event: UpdatePlayerParam) => void
  }

class PlayerZone extends Component<PlayProps> {

    private player!:ReactPlayer
    //private audioPlayer!:WaveSurferInstance & WaveSurferRegions;


    pip = () => {
    this.setState({ pip: !this.props.pip })
    }
    setVolume = (e:any) => {
    this.setState({ volume: parseFloat(e.target.value) })
    }
    onPause = () => {
    console.log('onPause')
    this.setState({ playing: false })
    }
    onDuration = (duration: any) => {
    console.log('onDuration', duration)
    this.setState({ duration })
    }

    ref = (player: any) => {
        this.player = player
      }
    
    render() {
    return (
       <div>
            <div className='player-wrapper'>
                    <ReactPlayer
                    ref={this.ref}
                    className='react-player'
                    width='100%'
                    height='100%'
                    url={this.props.url}
                    pip={this.props.pip}
                    playing={this.props.playing}
                    loop={this.props.loop}
                    playbackRate={this.props.playbackRate}
                    volume={this.props.volume}
                    muted={this.props.muted}
                    onReady={() => console.log('onReady')}
                    onStart={() => console.log('onStart')}
                    onPlay={this.props.onPlay}
                    onPause={this.onPause}
                    onBuffer={() => console.log('onBuffer')}
                    onSeek={e => console.log('onSeek', e)}
                    onEnded={this.props.onEnded}
                    onError={e => console.log('onError', e)}
                    onProgress={this.props.onProgress}
                    onDuration={this.onDuration}
                    />
            </div>

            <div className="mediaControls">
            <table>
                <tbody>
                    <tr>
                    <th>Controls</th>
                    <td>
                        <button onClick={this.props.stopPlaying}>Stop</button>
                        <button onClick={this.props.playPause}>{this.props.playing ? 'Pause' : 'Play'}</button>
                    </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
        );
    }
}


export default connect()(PlayerZone)