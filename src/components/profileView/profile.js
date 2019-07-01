import React from 'react';
import PropTypes from 'prop-types'

const Profile = ({ datos }) => (
  <div>
    <p>Profile</p>
    <p style={{ fontSize: '25px' }}>{ datos.display_name }</p>
    <img style={{ width: '220px' }} src={datos.images[0].url} alt="Profile" />
    <p>{ datos.email }</p>
    <span className="fa fa-star checked bigFont" />
    <span className="bigFont"><b>FAV</b></span>
    <span className="fa fa-star checked bigFont" />
  </div>
)

Profile.propTypes = {
  datos: PropTypes.object.isRequired
}

export default Profile;
