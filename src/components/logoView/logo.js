import React from 'react';

class Logo extends React.Component {
	render(){
		return (
			<p className="valentify" 
			onClick={()=>{ 
				if (window.location.hash === "") this.props.handleClick();
				else window.location.reload();
			}}>
				<img className="loguex" src={require('./logo.png')} alt="Spotify Logo"/>
				<span className='textex'>Valentify</span>
			</p>
		);
	}
}

export default Logo;