import React from 'react';
import PropTypes from 'prop-types'
import './prevnext.css'

const PrevNext = ({
  moreToSearch,
  search,
  searchPage,
  searchValue,
  whatToSearch
}) => (
  <div className="theCont">
    <span className="floatLeft">
      <button
        type="button"
        className="bigger"
        onClick={() => {
          if (searchPage >= 1) {
            search(
              searchValue,
              whatToSearch,
              searchPage - 1
            );
            window.scrollTo(0, 110);
          }
        }}
      >
        ←Prev
      </button>
    </span>
    <span className="floatRight">
      <button
        type="button"
        className="bigger"
        onClick={() => {
          if (moreToSearch) {
            search(
              searchValue,
              whatToSearch,
              searchPage + 1
            );
            window.scrollTo(0, 110);
          }
        }}
      >
        Next→
      </button>
    </span>
  </div>
)

PrevNext.propTypes = {
  moreToSearch: PropTypes.any.isRequired,
  search: PropTypes.any.isRequired,
  searchPage: PropTypes.any.isRequired,
  searchValue: PropTypes.any.isRequired,
  whatToSearch: PropTypes.any.isRequired
}

export default PrevNext;
