import React from 'react';
import PropTypes from 'prop-types'
import Logo from '../logoView/logo'
import './header.css'

const Header = ({ cual, goSearch, goProfile }) => (
  <div>
    <div className="fondo">
      <Logo />
    </div>
    <div className="fondoEleccion">
      <button
        type="button"
        className={(!cual && 'completeButton selectedButton') || 'completeButton'}
        onClick={() => goSearch()}
      >
        Search
      </button>
      <button
        type="button"
        className={(cual && 'completeButton selectedButton') || 'completeButton'}
        onClick={() => goProfile()}
      >
        Profile
      </button>
    </div>
  </div>
)

Header.propTypes = {
  cual: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  goProfile: PropTypes.func.isRequired,
  goSearch: PropTypes.func.isRequired
}

export default Header;
