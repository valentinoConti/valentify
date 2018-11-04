import React from 'react';
import { connect } from "react-redux";

function mapStateToProps(state) {
	return { 
		...state,
		whatToSearch: state.whatToSearch,
		isFavourite: state.isFavourite
	}
};

class Specific extends React.Component {
	
	/* 
	 * Method: drawImage
	 * Description: Return the correct image no matter if song/artist/album was selected, and with no errors.-
	 * Author: valentinoConti
	 */
	drawImage = () => {
		try {
			//Track
			if(this.props.specificShow.album.images[0].url) return this.props.specificShow.album.images[0].url;
		} 
		catch(e){
			try{
				//Album
				if (this.props.specificShow.images[0].url) return this.props.specificShow.images[0].url;
			}
			catch (err) {
				try{
					//Artist
					if (this.props.specificShow[0].images[0].url) return this.props.specificShow[0].images[0].url;
				}
				catch (error) {
					if (error instanceof TypeError) {
						//There is a result selected but doesnt have picture
						return require('./noHay.png');
					}
				}
			}
		}
	}

	drawInfo = () => {
		let noRepeat = 0;
		let info = [];
		switch (this.props.whatToSearch) {
			case 'Songs':
				
				try{
					if (this.props.specificShow.preview_url){
						info.push(
							<div key={noRepeat++}>
							<p>Preview:</p>
							<audio type="audio/mpeg" controls src={this.props.specificShow.preview_url}>
							</audio>
							</div>
							
						);
					}else{
						info.push(
							<p key={noRepeat++}>No preview available for this song</p>
						);
					}
				}
				catch(e){};

				info.push(
					<p key={noRepeat++}>
						<b>Album</b>: 
						<a onClick={ () => 
							{
							 this.props.getAlbum(this.props.specificShow.album.id);
							} 
						}>
							{ this.props.specificShow.album.name }
						</a>
						<br/>
						<br/>
						<b>Artist/s:</b>
					</p>
				);
				this.props.specificShow.artists.forEach((each)=>{ 
					info.push(
						<p className="nomar" key={noRepeat++}  onClick={ () => 
								{
								 this.props.getArtist(each.id);
								} 
							}>
							<a>
								{ each.name }
							</a>
						</p>
					);
				});
				if (this.props.isFavourite){
					info.push(
						<p key={noRepeat++}>
							<b style={{cursor:'pointer'}}>Favorited </b><br/>
							<span style={{cursor:'pointer'}}
							onClick={() => {this.props.removeFavourite(this.props.specificShow.id, 'Songs')}} 
							className="bigFont fa fa-star checked"></span>
						</p>
					);
				}else{
					info.push(
						<p key={noRepeat++}>
							<b style={{cursor:'pointer'}}>Not Favorited </b><br/>
							<span style={{cursor:'pointer'}} 
							onClick={() => {this.props.addFavourite(this.props.specificShow.id, 'Songs')}} 
							className="bigFont fa fa-star"></span>
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
				this.props.specificShow[1].items.forEach((each)=>{
					info.push(
						<p className="nomar" key={noRepeat++} onClick={ () => 
								{
								 this.props.getAlbum(each.id);
								} 
							}>
							<a>
								{ each.name }
							</a>
						</p>
					);
				});

				break;
			case 'Albums':
				info.push(
					<p key={noRepeat++}>
						<b>Artist:</b>
						<a onClick={ () => 
							{
							 this.props.getArtist(this.props.specificShow.artists[0].id);
							} 
						}>
							{ this.props.specificShow.artists[0].name }
						</a>
						<br/>
						<br/>
						<b>Songs List: </b><a style={{fontSize:'12px'}} 
						onClick={()=>{alert(ordenado)}}> (show ordered by duration)</a>
					</p>
				);
				let trackNum = 0;
				const msToMinAndSec = (ms) => {
					let minutes = Math.floor(ms / 60000);
					let seconds = ((ms % 60000) / 1000).toFixed(0);
					return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
				}
				let aOrdenar = [];
				this.props.specificShow.tracks.items.forEach((each)=>{
					trackNum++;
					aOrdenar.push({numb:trackNum+') '+each.name+' - '+msToMinAndSec(each.duration_ms), duration:each.duration_ms});
					info.push(
						<p className="nomar" key={noRepeat++}  onClick={ () => 
								{
								 this.props.getSong(each.id);
								} 
							}>
							{trackNum +') '}
							<a>
								{ each.name }
							</a>
							<span> - </span>
							{msToMinAndSec(each.duration_ms)}
						</p>
					);
				});
				aOrdenar.sort((a,b)=>{
					return a.duration-b.duration
				});
				let ordenado='';
				aOrdenar.forEach((each)=>{ ordenado+=each.numb+'\n' })
				try{
					if(this.props.specificShow.release_date){
						info.push(
							<p key={noRepeat++}>
								<b>Release Date : </b>
								<span>{this.props.specificShow.release_date}</span>
							</p>
						);
					}
				}catch(e){};
				try{
					if(this.props.specificShow.label){
						info.push(
							<p key={noRepeat++}>
								<b>Label : </b>
								<span>{this.props.specificShow.label}</span>
							</p>
						);
					}
				}catch(e){};

				break;
			default:
				break;
		}
		return info;
	}

	render(){

		// console.log(this.props.este.state.specificShow);

 		return(

 			<div>
 				<p>{ this.props.whatToSearch.slice(0,-1) }</p>
 				<h2>{ this.props.specificShow.name || this.props.specificShow[0].name }</h2>
 				<img alt='Artwork' src={ this.drawImage() } style={{width:'35%'}} />
 				<div>{ this.drawInfo() }</div>
 				<hr style={{width:'45%'}}/>
 			</div>

		)
	}
}

export default connect(mapStateToProps)(Specific);