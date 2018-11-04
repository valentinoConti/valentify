import React from 'react';

class Login extends React.Component {
	constructor(){
		super();
    	this.redirectURI = 'http://localhost:3000/callback';
    	this.clientId = '69b9f492645c4f3f8f09175d51cca574';
    	this.clientSecret = '9771b0b1821e4aa39e2e3ff9a749061a';
    	this.type = 'token';
    	this.scope = 'user-read-private user-read-email user-read-playback-state user-library-read user-library-modify user-read-recently-played';
    	this.stateID = Math.floor(Math.random() * (9999-1000))+ 1000;
	}

	handleClick = () => {
		const URL = 'https://accounts.spotify.com/authorize?client_id='+this.clientId+'&client_secret='+this.clientSecret+'&redirect_uri='+this.redirectURI+'&scope='+this.scope.split(' ').join('%20')+'&response_type='+this.type+'&state='+this.stateID;
		window.location.href = URL;
	}

	render(){
		return (
			<div>
				<div className='fondo' onClick={this.handleClick}>
					<a title='Spotify Login' >
						Click to login to Spotify
					</a>
				</div>
				<br/>
				<img src="https://imgur.com/tXtpFkS" alt="logo"></img>
				<p>Please login to your Spotify Account to use this app</p> 
			</div>
		);
	}
}

export default Login;

