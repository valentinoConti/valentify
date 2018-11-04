import React from 'react';

class Profile extends React.Component {
	render(){

		return(
			<div>
				<p>Profile</p>
				<p style={{fontSize:'25px'}}>{ this.props.datos.display_name }</p>
				<img style={{width:'220px'}} src={this.props.datos.images[0].url} alt="Profile"/>
				<p>{ this.props.datos.email }</p>
				<span className="fa fa-star checked bigFont"></span>
				<span className="bigFont"><b>FAV</b></span>
				<span className="fa fa-star checked bigFont"></span>
			</div>
		);
	}
}

export default Profile;