import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';

import Header from './components/headerView/header';
import Search from './components/searchView/search';
import Playing from './components/playingView/playing';
import Profile from './components/profileView/profile';
import Results from './components/resultsView/results';
import PrivateResults from './components/resultsView/privateResults';
import PrevNext from './components/prevnextView/prevnext';
import Specific from './components/specificView/specific';

import './App.css'

const spotifyApi = new SpotifyWebApi();

class App extends React.Component {
  constructor() {
    super();
    const params = this.getUrlParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }

    this.getUrlParams = this.getUrlParams.bind(this)
    this.getAlbum = this.getAlbum.bind(this)
    this.getArtist = this.getArtist.bind(this)
    this.getNowPlaying = this.getNowPlaying.bind(this)
    this.getSong = this.getSong.bind(this)
    this.addFavourite = this.addFavourite.bind(this)
    this.removeFavourite = this.removeFavourite.bind(this)
    this.search = this.search.bind(this)
    this.goProfile = this.goProfile.bind(this)
    this.goSearch = this.goSearch.bind(this)
    this.showSpecific = this.showSpecific.bind(this)
  }

  /* /
   * Method: getUrlParams
   * Description: Returns an object with URL parameters and its values.
   * Author: Spotify
  / */
  getUrlParams() {
    const parameters = {};
    let e; const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);

    // eslint-disable-next-line
    while ( e = r.exec(q) ) {
      parameters[e[1]] = decodeURIComponent(e[2]);
    }
    return parameters;
  }

  async getAlbum(id) {
    spotifyApi.getAlbum(id).then((resp) => {
      window.scrollTo(0, 110);
      this.props.gettingSomething(resp, 'Albums', false);
    })
  }

  async getArtist(id) {
    const artistAndItsAlbums = [];
    spotifyApi.getArtist(id).then((resp) => {
      artistAndItsAlbums.push(resp);
      spotifyApi.getArtistAlbums(id).then((albumresp) => {
        artistAndItsAlbums.push(albumresp);
        window.scrollTo(0, 110);
        this.props.gettingSomething(artistAndItsAlbums, 'Artists', false);
      })
    });
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        if (response.item) {
          this.props.changingNowPlaying(
            `Song: ${response.item.name}`,
            `Artist: ${response.item.artists[0].name}`,
            response.item.album.images[0].url
          );
        } else {
          this.props.changingNowPlaying(
            'You are not playing any song.-',
            '',
            ''
          );
        }
      })
      .catch((e) => {
        console.log(e)
        return false
      });
  }

  async getSong(id) {
    spotifyApi.getTrack(id).then((resp) => {
      spotifyApi.containsMySavedTracks([id]).then((respon) => {
        window.scrollTo(0, 110);
        this.props.gettingSomething(resp, 'Songs', respon[0]);
      })
    });
  }

  addFavourite(id, whatCat) {
    if (whatCat === 'Songs') {
      spotifyApi.addToMySavedTracks([id]).then(() => {
        this.showSpecific(id, 'Songs');
      })
    } else {
      spotifyApi.addToMySavedAlbums([id]).then(() => {
        this.showSpecific(id, 'Albums');
      })
    }
  }

  removeFavourite(id, whatCat) {
    if (whatCat === 'Songs') {
      spotifyApi.removeFromMySavedTracks([id]).then(() => {
        this.showSpecific(id, 'Songs');
      })
    } else {
      spotifyApi.removeFromMySavedAlbums([id]).then(() => {
        this.showSpecific(id, 'Albums');
      })
    }
  }

  /* /
   * Method: search
   * Description: searching method for a song, artist or album.
   * Parameters:
   *  > busqueda: search string, example 'Gangnam Style', 'Green Day',etc.
   *  > whatTo: string containing 'song','Songs','artist','Artists','album' or 'Albums'
   *  > page: integer containing the page of the search results, starting from 0
   * Return: if the session expired, redirection to login; else, it changes the App
   *         states to match the results
   * Author: valentinoConti
  / */
  async search(busqueda, whatTo, page) {
    const offsetting = page * 20;
    await this.props.aboutToSearchSomething(false, page, busqueda, false);
    switch (whatTo) {
      case 'song':
      case 'Songs':
        spotifyApi.searchTracks(busqueda, { limit: 20, offset: offsetting }).then((response) => {
          if (response.tracks.items.length >= 20) {
            this.props.searchingSomething(response.tracks.next, 'Songs', response.tracks.items)
          } else {
            this.props.searchingSomething(false, 'Songs', response.tracks.items)
          }
        })
          .catch((e) => {
            if (e.status >= 400 && e.status < 500) window.location.href = window.location.origin;
          });
        break;
      case 'album':
      case 'Albums':
        spotifyApi.searchAlbums(busqueda, { limit: 20, offset: offsetting }).then((response) => {
          if (response.albums.items.length >= 20) {
            this.props.searchingSomething(response.albums.next, 'Albums', response.albums.items)
          } else {
            this.props.searchingSomething(false, 'Albums', response.albums.items)
          }
        })
          .catch((e) => {
            if (e.status >= 400 && e.status < 500) window.location.href = window.location.origin;
          });
        break;
      case 'artist':
      case 'Artists':
        spotifyApi.searchArtists(busqueda, { limit: 20, offset: offsetting }).then((response) => {
          if (response.artists.items.length >= 20) {
            this.props.searchingSomething(response.artists.next, 'Artists', response.artists.items)
          } else {
            this.props.searchingSomething(false, 'Artists', response.artists.items)
          }
        })
          .catch((e) => {
            if (e.status >= 400 && e.status < 500) window.location.href = window.location.origin;
          });
        break;
      default:
        break
    }
  }

  async goProfile() {
    spotifyApi.getMe().then((resp) => {
      spotifyApi.getMySavedTracks().then((respon) => {
        this.props.goingProfile(resp, respon);
      })
    });
  }

  goSearch() {
    this.props.goingSearch();
  }

  showSpecific(specificId, whatTo) {
    switch (whatTo) {
      case 'Albums':
        this.getAlbum(specificId);
        break;
      case 'Songs':
        this.getSong(specificId);
        break;
      case 'Artists':
        this.getArtist(specificId);
        break;
      default:
        break;
    }
    this.goSearch();
  }

  render() {
    const {
      addFavourite,
      getAlbum,
      getArtist,
      getNowPlaying,
      getSong,
      goProfile,
      goSearch,
      removeFavourite,
      search,
      showSpecific
    } = this
    const {
      moreToSearch,
      nowPlaying,
      profile,
      savedTracks,
      searchPage,
      searchResult,
      searchValue,
      specificShow,
      whatToSearch
    } = this.props

    return (
      <div className="App">
        <div>
          <Header goProfile={goProfile} goSearch={goSearch} cual={profile} />
        </div>

        { profile
        && (
          <div>
            <Profile datos={profile} />
            <PrivateResults
              whatToSearch={whatToSearch}
              showSpecific={showSpecific}
              resultados={savedTracks}
            />
            <br />
            <Playing nowPlaying={nowPlaying} getNowPlaying={getNowPlaying} />
          </div>
        )}

        { (specificShow && !profile)
        && (
          <Specific
            specificShow={specificShow}
            addFavourite={addFavourite}
            removeFavourite={removeFavourite}
            getArtist={getArtist}
            getSong={getSong}
            getAlbum={getAlbum}
          />
        )}

        { !profile && <Search search={search} />}

        { (searchResult && !profile)
        && (
          <div>
            <Results
              whatToSearch={whatToSearch}
              showSpecific={showSpecific}
              resultados={searchResult}
            />
            <PrevNext
              searchPage={searchPage}
              searchValue={searchValue}
              whatToSearch={whatToSearch}
              moreToSearch={moreToSearch}
              search={search}
            />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    nowPlaying: state.nowPlaying,
    searchValue: state.searchValue,
    whatToSearch: state.whatToSearch,
    searchPage: state.searchPage,
    searchResult: state.searchResult,
    moreToSearch: state.moreToSearch,
    specificShow: state.specificShow,
    privateSpecificShow: state.privateSpecificShow,
    profile: state.profile,
    savedTracks: state.savedTracks,
    isFavourite: state.isFavourite
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goingProfile: (resp, respon) => {
      dispatch({
        type: 'GO_PROFILE',
        profile: resp,
        savedTracks: respon
      })
    },
    goingSearch: () => {
      dispatch({
        type: 'GO_SEARCH'
      })
    },
    gettingSomething: (spec, what, isfav) => {
      dispatch({
        type: 'GET_SOMETHING',
        specificShow: spec,
        whatToSearch: what,
        isFavourite: isfav
      })
    },
    aboutToSearchSomething: (speShow, searPage, searVal, searRes) => {
      dispatch({
        type: 'ABOUT_SEARCH_SOMETHING',
        specificShow: speShow,
        searchPage: searPage,
        searchValue: searVal,
        searchResult: searRes
      })
    },
    searchingSomething: (morToSirch, watToSirch, searRes) => {
      dispatch({
        type: 'SEARCH_SOMETHING',
        moreToSearch: morToSirch,
        whatToSearch: watToSirch,
        searchResult: searRes
      })
    },
    changingNowPlaying: (neim, artix, albArt) => {
      dispatch({
        type: 'CHANGE_NOWPLAYING',
        nowPlaying: {
          name: neim,
          artist: artix,
          albumArt: albArt
        }
      })
    }
  }
}

App.propTypes = {
  aboutToSearchSomething: PropTypes.any.isRequired,
  changingNowPlaying: PropTypes.any.isRequired,
  gettingSomething: PropTypes.any.isRequired,
  goingProfile: PropTypes.any.isRequired,
  goingSearch: PropTypes.any.isRequired,
  moreToSearch: PropTypes.any.isRequired,
  nowPlaying: PropTypes.any.isRequired,
  profile: PropTypes.any.isRequired,
  savedTracks: PropTypes.any.isRequired,
  searchingSomething: PropTypes.any.isRequired,
  searchPage: PropTypes.any.isRequired,
  searchResult: PropTypes.any.isRequired,
  searchValue: PropTypes.any.isRequired,
  specificShow: PropTypes.any.isRequired,
  whatToSearch: PropTypes.any.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
