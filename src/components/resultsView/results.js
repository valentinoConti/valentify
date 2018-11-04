import React from 'react';

class Results extends React.Component {

	constructor(){
		super();
		this.state = {
			keepWhat:'',
			image: ''
		}
	}

	componentDidMount() {
		this.setState({keepWhat:this.props.whatToSearch});
	}
	
	/* 
	 * Method: whatImage
	 * Description: receives a number from a td element and it can return its
	 *				image, a 'no image' image, or nothing if the element is null
	 * Author: valentinoConti
	 */
	whatImage = (here) => {
		try {
			//Album or Track
			if(this.props.resultados[here].album.images[0].url){
				return this.props.resultados[here].album.images[0].url;
			}
		} 
		catch(e){
			try{
				//Artist
				return this.props.resultados[here].images[0].url;
			}
			catch (e) {
				if (e instanceof TypeError) {
					//There is a result on the square but doesnt have picture
					if (this.props.resultados.length > here) return require('./noHay.png');
				}
			}
		}
	}

	/* 
	 * Methods: whatFirstText & whatSecondText
	 * Description: this methods receive a number from a td element and return:
	 *		-> first title & second artist (for Tracks)
	 *      -> first album & second artist (for Albums)
	 *		-> just the artist name (for Artists)
	 * Author: valentinoConti
	 */
	whatFirstText = (here) => {
		try {
			if ( this.props.resultados[here].name ) {
				return this.props.resultados[here].name;
			}
		}
		catch (e) {
			setTimeout(()=>{this.whatFirstText(here)}, 500);
		}
	}
	whatSecondText = (here) => {
		try {
			if(this.props.resultados[here].artists[0].name){
				return this.props.resultados[here].artists[0].name;
			}
		}
		catch(e){
			return '';
		}
	}
	
	/* 
	 * Method: hasClicked
	 * Description: receives a number from the td element that was clicked and it 
	 *				sends its information to the App to process  
	 * Author: valentinoConti
	 */
	hasClicked = (here) => {
		try{
			this.props.showSpecific(this.props.resultados[here].id, this.state.keepWhat);
		}
		catch (err){
			console.log('empty square clicked');
		}
	}

	render(){
		let entera = Math.floor(this.props.resultados.length/4);
		const cociente = this.props.resultados.length % 4;
		if (cociente > 0) entera++;

		let filas = [];
		let errorMessage = [];
		let noRepeat = 0;
		if (entera === 0) {
			errorMessage.push(<b key='123123123'>THERE ARE NO RESULTS HERE</b>)
		}
		
		for (var i = 0; i < entera; i++){
			let columnas = [];
			for (var j = 0; j < 4; j++){
				let thisNumber = i*4+j;
				columnas.push(
					<td key={noRepeat++} 
					className='square elemSize'
					style={{backgroundImage: "url("+ this.whatImage(thisNumber) +")"}}
					//eslint-disable-next-line
					onClick={ (e) => { this.hasClicked(thisNumber) } } >

						<div className="sobreLaImagen">
							<span className="taxt">{this.whatFirstText(thisNumber)}</span> 
							<br />
							<br />
							<span className="taxt">{this.whatSecondText(thisNumber)}</span>
						</div>	
					</td>
				);
			}
			filas.push(<tr key={noRepeat++}>{columnas}</tr>);
		}
		
		return(
			<div>
				<h2>{this.state.keepWhat}</h2>
				<hr style={{width:'45%'}} />
				{errorMessage}
				<table>
					<tbody>
						{filas}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Results;