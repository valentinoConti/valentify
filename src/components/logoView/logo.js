import React from 'react'
import PropTypes from 'prop-types'
import './logo.css'

const Logo = ({ handleClick }) => (
  <div
    role="button"
    tabIndex="0"
    className="valentify"
    onClick={() => {
      if (window.location.hash === '') handleClick()
      else window.location.reload();
    }}
  >
    <img className="loguex" src={require('./logo.png')} alt="Spotify Logo" />
    <span className="textex">Valentify</span>
  </div>
)

Logo.defaultProps = {
  handleClick: () => {}
}

Logo.propTypes = {
  handleClick: PropTypes.func
}

export default Logo
