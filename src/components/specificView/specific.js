import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import './specific.css'

function mapStateToProps(state) {
  return {
    ...state,
    whatToSearch: state.whatToSearch,
    isFavourite: state.isFavourite
  }
}

class Specific extends React.Component {
  /*
   * Method: drawImage
   * Description: Return the correct image no matter if song/artist/album
   *              was selected, and with no errors.-
   * Author: valentinoConti
   */
  drawImage = () => {
    const { specificShow } = this.props
    try {
      // Track
      if (specificShow.album.images[0].url) return specificShow.album.images[0].url;
    } catch (e) {
      try {
        // Album
        if (specificShow.images[0].url) return specificShow.images[0].url;
      } catch (err) {
        try {
          // Artist
          if (specificShow[0].images[0].url) return specificShow[0].images[0].url;
        } catch (error) {
          if (error instanceof TypeError) {
            // There is a result selected but doesnt have picture
            return require('./noHay.png');
          }
        }
      }
    }
    return require('./noHay.png');
  }

  drawInfo = () => {
    const {
      addFavourite,
      getAlbum,
      getArtist,
      getSong,
      isFavourite,
      removeFavourite,
      specificShow,
      whatToSearch
    } = this.props

    let noRepeat = 0;
    const info = [];
    let trackNum = 0;
    const msToMinAndSec = (ms) => {
      const minutes = Math.floor(ms / 60000);
      const seconds = ((ms % 60000) / 1000).toFixed(0);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    const aOrdenar = []
    let ordenado = ''

    switch (whatToSearch) {
      case 'Songs':
        try {
          if (specificShow.preview_url) {
            info.push(
              <div key={noRepeat++}>
                <p>Preview:</p>
                <audio type="audio/mpeg" controls src={specificShow.preview_url} />
              </div>
            )
          } else {
            info.push(
              <p key={noRepeat++}>No preview available for this song</p>
            )
          }
        } catch (e) { return false }

        info.push(
          <div key={noRepeat++}>
            <b>Album</b>
            <div
              role="button"
              tabIndex="0"
              className="nomar"
              onClick={() => {
                getAlbum(specificShow.album.id);
              }}
            >
              { specificShow.album.name }
            </div>
            <br />
            <b>Artist/s:</b>
          </div>
        );
        specificShow.artists.forEach((each) => {
          info.push(
            <div
              role="link"
              tabIndex="0"
              className="nomar"
              key={noRepeat++}
              onClick={() => {
                getArtist(each.id);
              }}
            >
              <div className="cursorPointer">
                { each.name }
              </div>
            </div>
          );
        });
        if (isFavourite) {
          info.push(
            <p key={noRepeat++}>
              <b style={{ cursor: 'pointer' }}>Favorited </b>
              <br />
              <span
                role="button"
                tabIndex="0"
                style={{ cursor: 'pointer' }}
                onClick={() => { removeFavourite(specificShow.id, 'Songs') }}
                className="bigFont fa fa-star checked"
              />
            </p>
          );
        } else {
          info.push(
            <p key={noRepeat++}>
              <b style={{ cursor: 'pointer' }}>Not Favorited </b>
              <br />
              <span
                role="button"
                tabIndex="0"
                style={{ cursor: 'pointer' }}
                onClick={() => { addFavourite(specificShow.id, 'Songs') }}
                className="bigFont fa fa-star"
              />
            </p>
          );
        }

        break;
      case 'Artists':

        info.push(
          <p key={noRepeat++}>
            <b>Albums:</b>
          </p>
        );
        specificShow[1].items.forEach((each) => {
          info.push(
            <div
              role="link"
              tabIndex="0"
              className="nomar"
              key={noRepeat++}
              onClick={() => {
                getAlbum(each.id);
              }}
            >
              <div className="cursorPointer">
                { each.name }
              </div>
            </div>
          );
        });

        break;
      case 'Albums':
        info.push(
          <div key={noRepeat++}>
            <b>Artist:</b>
            <div
              role="link"
              tabIndex="0"
              className="nomar"
              onClick={() => {
                getArtist(specificShow.artists[0].id);
              }}
            >
              { specificShow.artists[0].name }
            </div>
            <br />
            <b>Songs List: </b>
            <div
              role="button"
              tabIndex="0"
              className="nomar"
              style={{ fontSize: '12px' }}
              onClick={() => { alert(ordenado) }}
            >
              (show ordered by duration)
            </div>
          </div>
        )
        specificShow.tracks.items.forEach((each) => {
          trackNum++;
          aOrdenar.push({ numb: `${trackNum}) ${each.name} - ${msToMinAndSec(each.duration_ms)}`, duration: each.duration_ms });
          info.push(
            <div
              role="link"
              tabIndex="0"
              className="nomar"
              key={noRepeat++}
              onClick={() => {
                getSong(each.id);
              }}
            >
              {`${trackNum}) ${each.name} - ${msToMinAndSec(each.duration_ms)}`}
            </div>
          );
        });
        aOrdenar.sort((a, b) => a.duration - b.duration);
        aOrdenar.forEach((each) => { ordenado += `${each.numb}\n` })
        try {
          if (specificShow.release_date) {
            info.push(
              <p key={noRepeat++}>
                <b>Release Date : </b>
                <span>{specificShow.release_date}</span>
              </p>
            );
          }
        } catch (e) { return true }
        try {
          if (specificShow.label) {
            info.push(
              <p key={noRepeat++}>
                <b>Label : </b>
                <span>{specificShow.label}</span>
              </p>
            );
          }
        } catch (e) { return true }

        break;
      default:
        break;
    }
    return info;
  }

  render() {
    const { whatToSearch, specificShow } = this.props

    return (

      <div>
        <p>{ whatToSearch.slice(0, -1) }</p>
        <h2>{ specificShow.name || specificShow[0].name }</h2>
        <img alt="Artwork" src={this.drawImage()} style={{ width: '35%' }} />
        <div>{ this.drawInfo() }</div>
        <hr style={{ width: '45%' }} />
      </div>

    )
  }
}

Specific.propTypes = {
  addFavourite: PropTypes.any.isRequired,
  getAlbum: PropTypes.any.isRequired,
  getArtist: PropTypes.any.isRequired,
  getSong: PropTypes.any.isRequired,
  isFavourite: PropTypes.any.isRequired,
  removeFavourite: PropTypes.any.isRequired,
  specificShow: PropTypes.any.isRequired,
  whatToSearch: PropTypes.any.isRequired
}

export default connect(mapStateToProps)(Specific);
