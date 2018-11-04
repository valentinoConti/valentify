import React from 'react';
// import './App.css';
// import {bindActionCreators} from "redux";
import { connect } from "react-redux";

import Header from './components/headerView/header';
import Search from './components/searchView/search';
import Playing from './components/playingView/playing';
import Profile from './components/profileView/profile';
import Results from './components/resultsView/results';
import PrivateResults from './components/resultsView/privateResults';
import PrevNext from './components/prevnextView/prevnext';
import Specific from './components/specificView/specific';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

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
};

function mapDispatchToProps(dispatch) {
	return {
		goingProfile : (resp, respon) => { 
			dispatch({
				type: 'GO_PROFILE', 
				profile: resp, 
				savedTracks: respon}) 
		},
		goingSearch : () => { 
			dispatch({type: 'GO_SEARCH'}) 
		},
		gettingSomething : (spec, what, isfav) => { 
			dispatch({
				type: 'GET_SOMETHING', 
				specificShow: spec, 
				whatToSearch: what, 
				isFavourite: isfav}) 
		},
		aboutToSearchSomething : (speShow, searPage, searVal, searRes) => {
			dispatch({
				type: 'ABOUT_SEARCH_SOMETHING',
				specificShow: speShow,
				searchPage: searPage,
				searchValue: searVal,
				searchResult: searRes
			})
		},
		searchingSomething : (morToSirch, watToSirch, searRes) => {
			dispatch({
				type: 'SEARCH_SOMETHING',
				moreToSearch: morToSirch,
				whatToSearch: watToSirch,
				searchResult: searRes
			})
		},
		changingNowPlaying : (neim, artix, albArt) => { 
			dispatch({
				type:'CHANGE_NOWPLAYING',
				nowPlaying: {
					name:neim, 
					artist:artix, 
					albumArt:albArt
				}
			})
		}
	}
};

class App extends React.Component {

	constructor(){
		super();
		const params = this.getUrlParams();
		const token = params.access_token;
		if (token) {
			spotifyApi.setAccessToken(token);
		}
	}

	/*/
	 * Method: getUrlParams
	 * Description: Returns an object with URL parameters and its values.
	 * Author: Spotify
	/*/
	getUrlParams() {
		var parameters = {};
		var e, r = /([^&;=]+)=?([^&;]*)/g,	
			q = window.location.hash.substring(1);
		
		// eslint-disable-next-line
		while ( e = r.exec(q) ) {
			parameters[e[1]] = decodeURIComponent(e[2]);
		}
		return parameters;
	};

	showSpecific(specificId, whatTo){
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

	goSearch(){
		this.props.goingSearch();
	}

	async goProfile(){
		spotifyApi.getMe().then((resp) => {
			// console.log(resp);
			spotifyApi.getMySavedTracks().then((respon) =>{
				// console.log(respon);
				this.props.goingProfile(resp, respon);
			})
		});
	}

	/*/
	 * Method: search
	 * Description: searching method for a song, artist or album.
	 * Parameters: 
	 *  > busqueda: search string, example 'Gangnam Style', 'Green Day',etc.
	 *  > whatTo: string containing 'song','Songs','artist','Artists','album' or 'Albums'
	 *  > page: integer containing the page of the search results, starting from 0
	 * Return: if the session expired, redirection to login; else, it changes the App
	 *			states to match the results
	 * Author: valentinoConti
	/*/
	async search(busqueda, whatTo, page){
		let offsetting = page*20;
		await this.props.aboutToSearchSomething(false,page, busqueda, false);
		switch (whatTo) {
			case 'song':
			case 'Songs':
				spotifyApi.searchTracks(busqueda, {limit: 20, offset: offsetting}).then((response) => {
					if (response.tracks.items.length >= 20){
						this.props.searchingSomething(response.tracks.next, 'Songs', response.tracks.items)
					} else {
						this.props.searchingSomething(false, 'Songs', response.tracks.items)
					}
				})
				.catch((e)=>{
					if (e.status >= 400 && e.status < 500) window.location.href = window.location.origin;
				});
				break;
			case 'album':
			case 'Albums':
				spotifyApi.searchAlbums(busqueda, {limit: 20, offset: offsetting}).then((response) => {
					if (response.albums.items.length >= 20){
						this.props.searchingSomething(response.albums.next, 'Albums', response.albums.items)
					} else {
						this.props.searchingSomething(false, 'Albums', response.albums.items)
					}
				})
				.catch((e)=>{
					if (e.status >= 400 && e.status < 500) window.location.href = window.location.origin;
				});
				break;
			case 'artist':
			case 'Artists':
				spotifyApi.searchArtists(busqueda, {limit: 20, offset: offsetting}).then((response) => {
					if (response.artists.items.length >= 20){
						this.props.searchingSomething(response.artists.next, 'Artists', response.artists.items)
					} else {
						this.props.searchingSomething(false, 'Artists', response.artists.items)
					}
				})
				.catch((e)=>{
					if (e.status >= 400 && e.status < 500) window.location.href = window.location.origin;
				});
				break;
			default:
				console.log('eslint is gr8 but sometimes medio pesado with his warnings');
		}	
	}

	async getArtist(id){
		let artistAndItsAlbums = [];
		spotifyApi.getArtist(id).then((resp) => {

			artistAndItsAlbums.push(resp);
			spotifyApi.getArtistAlbums(id).then((albumresp)=>{

				artistAndItsAlbums.push(albumresp);
				window.scrollTo(0, 110);
				this.props.gettingSomething(artistAndItsAlbums, 'Artists', false);
			})
		});
	}

	async getAlbum(id){
		spotifyApi.getAlbum(id).then((resp) => {
			window.scrollTo(0, 110);
			this.props.gettingSomething(resp, 'Albums', false);
		})
	}

	async getSong(id){
		spotifyApi.getTrack(id).then((resp) => {
			spotifyApi.containsMySavedTracks([id]).then((respon)=>{
				window.scrollTo(0,110);
				this.props.gettingSomething(resp, 'Songs', respon[0]);
			})
		});
	}

	addFavourite(id, whatCat){
		if (whatCat === 'Songs'){
			spotifyApi.addToMySavedTracks([id]).then((res)=>{
				this.showSpecific(id, 'Songs');
			})
		}
		else{
			spotifyApi.addToMySavedAlbums([id]).then((res)=>{
				this.showSpecific(id, 'Albums');
			})
		}
	}
	removeFavourite(id, whatCat){
		if (whatCat === 'Songs'){
			spotifyApi.removeFromMySavedTracks([id]).then((res)=>{
				this.showSpecific(id, 'Songs');
			})
		}
		else{
			spotifyApi.removeFromMySavedAlbums([id]).then((res)=>{
				this.showSpecific(id, 'Albums');
			})
		}
	}	

	getNowPlaying(){
		spotifyApi.getMyCurrentPlaybackState()
			.then((response) => {
				if (response.item){

					this.props.changingNowPlaying(
						'Song: '+ response.item.name,
						'Artist: '+ response.item.artists[0].name,
						response.item.album.images[0].url
					);

				}else{

					this.props.changingNowPlaying(
						'You are not playing any song.-',
						'',
						''
					);

				}
			})
			.catch((e) => {
				console.log(e);
			});
	};
	
	render() {

		return (
			<div className="App">

				<div>
					<Header goProfile={this.goProfile.bind(this)} goSearch={this.goSearch.bind(this)} cual={this.props.profile}/>
					
				</div>

				{ this.props.profile &&
					(
					<div>
						<Profile datos={this.props.profile} />
						<PrivateResults whatToSearch={this.props.whatToSearch} showSpecific={this.showSpecific.bind(this)} resultados={this.props.savedTracks} />
						<br/>
						<Playing nowPlaying={this.props.nowPlaying} getNowPlaying={this.getNowPlaying.bind(this)} />
					</div>
					)
				}

				{ (this.props.specificShow && !this.props.profile) && <Specific specificShow={this.props.specificShow} addFavourite={this.addFavourite.bind(this)} removeFavourite={this.removeFavourite.bind(this)} getArtist={this.getArtist.bind(this)} getSong={this.getSong.bind(this)} getAlbum={this.getAlbum.bind(this)}/> }

				{ !this.props.profile && <Search search={this.search.bind(this)}/>}

				{ (this.props.searchResult && !this.props.profile) &&
					(
					<div>
						<Results whatToSearch={this.props.whatToSearch} showSpecific={this.showSpecific.bind(this)} resultados={this.props.searchResult} />
						<PrevNext searchPage={this.props.searchPage} searchValue={this.props.searchValue} whatToSearch={this.props.whatToSearch} moreToSearch={this.props.moreToSearch} search={this.search.bind(this)} />
					</div>
					)
				}

			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
