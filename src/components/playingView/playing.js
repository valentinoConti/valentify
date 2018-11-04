import React from 'react';

class Playing extends React.Component {
	render(){
		return(
			<div>
				<hr/>
				<p>Now Playing:</p>
				<p>{ this.props.nowPlaying.name }</p>
				<p>{ this.props.nowPlaying.artist }</p>
				<div>
					<img alt='' src={ this.props.nowPlaying.albumArt} style={{ height: 200 }}/>
				</div>
				<button className='item' style={{width:'150px'}} onClick={() => window.open('https://open.spotify.com/browse','_blank')}>
					Open Spotify Player
				</button>
				<button className='item' style={{width:'150px'}} onClick={() => this.props.getNowPlaying()}>
					Check Now Playing
				</button>
				<p style={{fontSize:'11px',marginBottom:'5px'}} >valentinoConti. Globant Bootcamp 2018</p>
			</div>
		);
	}
}

export default Playing;