import React from 'react';
import PropTypes from 'prop-types'
import './playing.css'

const Playing = ({ nowPlaying, getNowPlaying }) => (
  <div>
    <hr />
    <p>Now Playing:</p>
    <p>{ nowPlaying.name }</p>
    <p>{ nowPlaying.artist }</p>
    <div>
      <img alt="" src={nowPlaying.albumArt} style={{ height: 200 }} />
    </div>
    <button
      type="button"
      className="item"
      onClick={() => window.open('https://open.spotify.com/browse', '_blank')}
    >
      Open Spotify Player
    </button>
    <button
      type="button"
      className="item"
      onClick={() => getNowPlaying()}
    >
      Check Now Playing
    </button>
    <p className="footerInfo">valentinoConti. Globant Bootcamp 2018</p>
  </div>
)

Playing.defaultProps = {
  nowPlaying: {}
}

Playing.propTypes = {
  getNowPlaying: PropTypes.func.isRequired,
  nowPlaying: PropTypes.object
}

export default Playing;
