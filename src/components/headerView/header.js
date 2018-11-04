import React from 'react';
import Logo from '../logoView/logo';

class Header extends React.Component {

	render(){
		return(
			<div>
				<div className='fondo'>
					<Logo />
				</div>
				<div className="fondoEleccion">
					<button className={(!this.props.cual && 'completeButton selectedButton') || 'completeButton'} onClick={()=>this.props.goSearch()}>Search</button>
					<button className={(this.props.cual && 'completeButton selectedButton') || 'completeButton'} onClick={()=>this.props.goProfile()}>Profile</button>
				</div>
			</div>
		);
	}
}

export default Header;