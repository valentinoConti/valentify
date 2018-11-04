import React from 'react';

class Search extends React.Component {
	
	constructor(){
		super();
		this.state = {
			textito: 'Search your favourite song here...',
			whatTo: 'song',
			busqueda: ''
		}
	}

	whatTo = () => {
		let radios = document.getElementsByName('tosearch');

		for (let i = 0; i < radios.length; i++) {
			if (radios[i].checked) {
				this.setState({
					whatTo: radios[i].value,
					textito: 'Search your favourite '+ radios[i].value +' here...'
				});
			}
		}
	}

	render(){
		return(
			<div style={{margin:'auto' ,maxWidth:1000}}>
				<p>
					Search your favourite songs, artists and albums over Spotify, 
					just select what you want to search and type it in 
					the following search box!
				</p>
				<p>
					<input type="radio" onClick={ this.whatTo } name='tosearch' value='song' defaultChecked />
					<span className='marginRightt'>Song</span>
					<input type="radio" onClick={ this.whatTo } name='tosearch' value='artist' />
					<span className='marginRightt'>Artist</span>
					<input type="radio" onClick={ this.whatTo } name='tosearch' value='album' />
					<span className='marginRightt'>Album</span>
					<br/>
					<input type="text" id="placingholder" placeholder={this.state.textito} 
					onChange={ (e) => { this.setState({busqueda:e.target.value}) } } 
					onKeyDown={ (e) => { if (e.key === 'Enter') { 
						e.preventDefault(); 
						window.document.getElementById('searching').click();
						}}}
					onFocus={ (e) => { e.target.placeholder=''; } }
					onBlur={ (e) => { e.target.placeholder=this.state.textito; } }
					/>
				</p>
				<p>
					<button id='searching' onClick={ 
						() => { 
							this.props.search(this.state.busqueda, this.state.whatTo, 0);
						} 
					} >Search</button>
				</p>
			</div>
		);
	}
}

export default Search;